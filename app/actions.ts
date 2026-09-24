"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { getUserByEmail, REVIEW_INTERVAL_DAYS, MAX_REVIEW_BOX } from "@/lib/data";
import {
  AUTH_COOKIE,
  createSessionToken,
  getSession,
  verifyPassword,
} from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email va parolni kiriting." };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "Bunday email bilan foydalanuvchi topilmadi." };
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return { error: "Parol noto'g'ri. Qaytadan urinib ko'ring." };
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/lessons");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/login");
}

async function requireUserId(): Promise<number> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session.userId;
}

export async function markWordLearned(wordId: number, learned: boolean) {
  const userId = await requireUserId();
  await sql`
    INSERT INTO user_word_progress (user_id, word_id, learned, updated_at)
    VALUES (${userId}, ${wordId}, ${learned ? 1 : 0}, now())
    ON CONFLICT (user_id, word_id) DO UPDATE SET learned = excluded.learned, updated_at = now()
  `;
  revalidatePath("/lessons");
}

/** Bugungi (Toshkent vaqti) faollikka to'g'ri javoblarni qo'shadi — streak
 *  va kunlik maqsad shundan hisoblanadi. */
async function recordActivity(userId: number, correctAnswers: number) {
  await sql`
    INSERT INTO user_daily_activity (user_id, day, correct_answers)
    VALUES (${userId}, (now() AT TIME ZONE 'Asia/Tashkent')::date, ${correctAnswers})
    ON CONFLICT (user_id, day)
    DO UPDATE SET correct_answers = user_daily_activity.correct_answers + excluded.correct_answers
  `;
}

export async function submitExerciseResult(exerciseId: number, scorePct: number) {
  const userId = await requireUserId();

  const [{ total }] = await sql<{ total: number }[]>`
    SELECT count(*)::int AS total FROM exercise_questions WHERE exercise_id = ${exerciseId}
  `;
  await recordActivity(userId, Math.round((scorePct / 100) * total));
  await sql`
    INSERT INTO user_exercise_progress (user_id, exercise_id, score_pct, completed_at)
    VALUES (${userId}, ${exerciseId}, ${scorePct}, now())
    ON CONFLICT (user_id, exercise_id) DO UPDATE SET score_pct = excluded.score_pct, completed_at = now()
  `;

  // Dars bo'yicha umumiy foizni mashqlar bo'yicha o'rtacha qiymat sifatida hisoblaymiz
  const exerciseRows = await sql<{ unit_id: number }[]>`
    SELECT unit_id FROM exercises WHERE id = ${exerciseId}
  `;
  const exercise = exerciseRows[0];
  if (exercise) {
    const unitId = exercise.unit_id;
    const exRows = await sql<{ score_pct: number }[]>`
      SELECT COALESCE(p.score_pct, 0) as score_pct FROM exercises e
      LEFT JOIN user_exercise_progress p ON p.exercise_id = e.id AND p.user_id = ${userId}
      WHERE e.unit_id = ${unitId}
    `;
    const avg =
      exRows.length > 0
        ? Math.round(exRows.reduce((s, r) => s + r.score_pct, 0) / exRows.length)
        : 0;
    await sql`
      INSERT INTO user_unit_progress (user_id, unit_id, percent, updated_at)
      VALUES (${userId}, ${unitId}, ${avg}, now())
      ON CONFLICT (user_id, unit_id) DO UPDATE SET percent = excluded.percent, updated_at = now()
    `;
  }

  revalidatePath("/lessons");
  revalidatePath("/practice");
}

export async function bookExtraLesson(lessonId: number) {
  const userId = await requireUserId();
  const existing = await sql`
    SELECT 1 FROM extra_lesson_bookings WHERE user_id = ${userId} AND extra_lesson_id = ${lessonId}
  `;
  if (existing.length === 0) {
    await sql`INSERT INTO extra_lesson_bookings (user_id, extra_lesson_id) VALUES (${userId}, ${lessonId})`;
    await sql`UPDATE extra_lessons SET seats_taken = seats_taken + 1 WHERE id = ${lessonId}`;
  }
  revalidatePath("/extra-lesson");
}

export type VocabStage = "spelling" | "definition" | "pronunciation" | "sentence";

const ALL_STAGES: VocabStage[] = ["spelling", "definition", "pronunciation", "sentence"];

/**
 * Lug'at so'zini tekshirishning 4 bosqichidan (imlo, ta'rif, talaffuz, gap)
 * biri o'tildi/o'tilmadi — shu yerda saqlanadi. Agar barcha 4 bosqich
 * o'tilgan bo'lsa, so'z avtomatik "yodlandi" deb belgilanadi.
 */
export async function setWordStagePassed(
  wordId: number,
  stage: VocabStage,
  passed: boolean
) {
  const userId = await requireUserId();

  await sql`
    INSERT INTO user_word_stage_progress (user_id, word_id, stage, passed, updated_at)
    VALUES (${userId}, ${wordId}, ${stage}, ${passed ? 1 : 0}, now())
    ON CONFLICT (user_id, word_id, stage) DO UPDATE SET passed = excluded.passed, updated_at = now()
  `;

  if (passed) {
    await recordActivity(userId, 1);
    const rows = await sql<{ stage: string; passed: number }[]>`
      SELECT stage, passed FROM user_word_stage_progress WHERE user_id = ${userId} AND word_id = ${wordId}
    `;
    const allPassed = ALL_STAGES.every(
      (s) => rows.find((r) => r.stage === s)?.passed === 1
    );
    if (allPassed) {
      await sql`
        INSERT INTO user_word_progress (user_id, word_id, learned, updated_at)
        VALUES (${userId}, ${wordId}, 1, now())
        ON CONFLICT (user_id, word_id) DO UPDATE SET learned = 1, updated_at = now()
      `;
      // O'rganilgan so'z ertaga birinchi marta takrorlashga chiqadi.
      await sql`
        INSERT INTO user_word_review (user_id, word_id, box, due_at)
        VALUES (${userId}, ${wordId}, 1, now() + make_interval(days => ${REVIEW_INTERVAL_DAYS[1]}))
        ON CONFLICT (user_id, word_id) DO NOTHING
      `;
    }
  }

  revalidatePath("/lessons");
}

/** Takrorlashdagi bitta javob: to'g'ri bo'lsa so'z keyingi qutichaga o'tadi
 *  (keyingi safar kechroq so'raladi), xato bo'lsa 1-qutichaga qaytadi. */
export async function submitReviewAnswer(wordId: number, correct: boolean) {
  const userId = await requireUserId();
  const [row] = await sql<{ box: number }[]>`
    SELECT box FROM user_word_review WHERE user_id = ${userId} AND word_id = ${wordId}
  `;
  if (!row) return;
  const box = correct ? Math.min(row.box + 1, MAX_REVIEW_BOX) : 1;
  await sql`
    UPDATE user_word_review
    SET box = ${box},
        due_at = now() + make_interval(days => ${REVIEW_INTERVAL_DAYS[box]}),
        last_reviewed_at = now()
    WHERE user_id = ${userId} AND word_id = ${wordId}
  `;
  if (correct) await recordActivity(userId, 1);
}

export interface ProfileState {
  error?: string;
  ok?: boolean;
}

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB

export async function updateProfileAction(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const userId = await requireUserId();

  const name = String(formData.get("name") || "").trim();
  if (!name) {
    return { error: "Ism kiritilishi shart." };
  }
  if (name.length > 60) {
    return { error: "Ism juda uzun (60 belgidan oshmasin)." };
  }

  const avatar = formData.get("avatar");

  if (avatar instanceof File && avatar.size > 0) {
    if (!avatar.type.startsWith("image/")) {
      return { error: "Faqat rasm fayli yuklash mumkin." };
    }
    if (avatar.size > MAX_AVATAR_BYTES) {
      return { error: "Rasm hajmi 2MB dan oshmasligi kerak." };
    }
    const buf = Buffer.from(await avatar.arrayBuffer());
    const dataUrl = `data:${avatar.type};base64,${buf.toString("base64")}`;
    await sql`UPDATE users SET name = ${name}, avatar_url = ${dataUrl} WHERE id = ${userId}`;
  } else {
    await sql`UPDATE users SET name = ${name} WHERE id = ${userId}`;
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
