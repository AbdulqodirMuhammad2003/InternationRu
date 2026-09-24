import "server-only";
import { sql } from "./db";
import type { ExerciseKind } from "./seed-exercises";

export type { ExerciseKind };

// ---------- Turlar ----------

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  course: string;
  level: string;
  coins: number;
  stars: number;
  branch_rank: number;
  group_rank: number;
  battle_wins: number;
  august_average: number;
  reading_pct: number;
  writing_pct: number;
  listening_pct: number;
  speaking_pct: number;
}

export interface LevelRecord {
  id: number;
  code: string;
  title: string;
  description: string;
  order_index: number;
  locked: number;
}

export type ClipKind = "film" | "multfilm" | "hujjatli" | "intervyu";

export interface UnitRecord {
  id: number;
  level_id: number;
  level_code: string;
  code: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  order_index: number;
  locked: number;
  date_label: string;
  percent: number;
  /** Mashqlar tugatilgach ochiladigan "Ruscha tomosha" — haqiqiy ruscha
   *  film, multfilm, hujjatli film yoki intervyudan 5-10 daqiqalik parcha
   *  (YouTube). Parcha tanlanmagan darslar uchun `clip_url` — `null`. */
  clip_url: string | null;
  clip_title: string | null;
  clip_kind: ClipKind | null;
  /** Parchaning boshlanishi va oxiri (soniyalarda); `null` — videoning
   *  o'z boshi/oxiri. */
  clip_start: number | null;
  clip_end: number | null;
}

export interface VocabWord {
  id: number;
  word: string;
  transcription: string;
  part_of_speech: string;
  translation_uz: string;
  definition: string;
  example_sentence: string;
  example_translation: string;
  emoji: string;
  order_index: number;
  learned: number;
  /** So'zni tekshirishning 4 bosqichidan qaysilari avvalgi
   *  urinishlarda o'tilgan (true) — shu bosqich qayta so'ralmaydi. */
  stage_spelling: number;
  stage_definition: number;
  stage_pronunciation: number;
  stage_sentence: number;
}

export interface VocabRound {
  id: number;
  title: string;
  order_index: number;
  words: VocabWord[];
}

export interface ExerciseQuestion {
  id: number;
  prompt: string;
  options: string[];
  correct_index: number;
  order_index: number;
  /** Tinglash savoli — ochilganda shu matn ovoz chiqarib o'qiladi. */
  audio_text: string | null;
  /** Yozish savoli — to'g'ri javob(lar), "|" bilan ajratilgan. */
  answer_text: string | null;
  explanation: string | null;
}

export interface ExerciseRecord {
  id: number;
  title: string;
  skill_label: string;
  kind: ExerciseKind;
  instructions: string | null;
  order_index: number;
  question_count: number;
  score_pct: number;
  /** Foydalanuvchi bu mashqni kamida bir marta yakunlab, natija
   *  yuborganmi (score_pct === 0 bilan adashtirmaslik uchun alohida
   *  belgi — masalan, 0% bilan tugatilgan mashq ham "urinilgan"). */
  attempted: boolean;
  questions: ExerciseQuestion[];
}

export interface UnitDetail extends UnitRecord {
  rounds: VocabRound[];
  exercises: ExerciseRecord[];
  totalWords: number;
}

// ---------- Foydalanuvchi ----------

export async function getUserByEmail(email: string) {
  const rows = await sql<
    {
      id: number;
      name: string;
      email: string;
      password_hash: string;
      avatar_url: string | null;
    }[]
  >`SELECT id, name, email, password_hash, avatar_url FROM users WHERE email = ${email}`;
  return rows[0];
}

export async function getUserStats(userId: number): Promise<UserRecord | undefined> {
  const rows = await sql<UserRecord[]>`
    SELECT id, name, email, avatar_url, course, level, coins, stars, branch_rank, group_rank,
           battle_wins, august_average, reading_pct, writing_pct, listening_pct, speaking_pct
    FROM users WHERE id = ${userId}
  `;
  return rows[0];
}

// ---------- Kunlik faollik (streak, haftalik belgilar, kunlik maqsad) ----------

/** Kunlik maqsad: shuncha to'g'ri javob (mashq savollari + lug'at bosqichlari). */
export const DAILY_GOAL = 20;

export interface ActivityOverview {
  streak: number;
  todayCorrect: number;
  /** Joriy hafta, dushanbadan yakshanbagacha. */
  week: { label: string; active: boolean; isToday: boolean; isFuture: boolean }[];
}

const WEEKDAY_LABELS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

function shiftDay(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function getActivityOverview(userId: number): Promise<ActivityOverview> {
  const [{ today }] = await sql<{ today: string }[]>`
    SELECT to_char((now() AT TIME ZONE 'Asia/Tashkent')::date, 'YYYY-MM-DD') AS today
  `;
  const rows = await sql<{ day: string; correct_answers: number }[]>`
    SELECT to_char(day, 'YYYY-MM-DD') AS day, correct_answers
    FROM user_daily_activity
    WHERE user_id = ${userId} AND correct_answers > 0
      AND day > (now() AT TIME ZONE 'Asia/Tashkent')::date - 400
  `;
  const activeDays = new Set(rows.map((r) => r.day));

  // Bugun hali mashq qilinmagan bo'lsa, streak kechagi kundan hisoblanadi
  // (kun tugamaguncha zanjir uzilgan hisoblanmaydi).
  let streak = 0;
  let cursor = activeDays.has(today) ? today : shiftDay(today, -1);
  while (activeDays.has(cursor)) {
    streak++;
    cursor = shiftDay(cursor, -1);
  }

  const weekdayIndex = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7; // Du = 0
  const monday = shiftDay(today, -weekdayIndex);
  const week = WEEKDAY_LABELS.map((label, i) => {
    const day = shiftDay(monday, i);
    return { label, active: activeDays.has(day), isToday: day === today, isFuture: day > today };
  });

  return {
    streak,
    todayCorrect: rows.find((r) => r.day === today)?.correct_answers ?? 0,
    week,
  };
}

// ---------- Darajalar (A1, A2, B1, B2) ----------

export async function getLevels(): Promise<LevelRecord[]> {
  return sql<LevelRecord[]>`
    SELECT id, code, title, description, order_index, locked
    FROM levels ORDER BY order_index ASC
  `;
}

// ---------- Darslar (Units) ----------

export async function getUnitsForUser(userId: number): Promise<UnitRecord[]> {
  return sql<UnitRecord[]>`
    SELECT u.id, u.level_id, l.code as level_code, u.code, u.title, u.subtitle, u.color, u.icon,
           u.order_index, u.locked, u.date_label,
           u.clip_url, u.clip_title, u.clip_kind, u.clip_start, u.clip_end,
           COALESCE(p.percent, 0) as percent
    FROM units u
    JOIN levels l ON l.id = u.level_id
    LEFT JOIN user_unit_progress p ON p.unit_id = u.id AND p.user_id = ${userId}
    ORDER BY l.order_index ASC, u.order_index ASC
  `;
}

export async function getUnitDetail(unitId: number, userId: number): Promise<UnitDetail | undefined> {
  const unitRows = await sql<UnitRecord[]>`
    SELECT u.id, u.level_id, l.code as level_code, u.code, u.title, u.subtitle, u.color, u.icon,
           u.order_index, u.locked, u.date_label,
           u.clip_url, u.clip_title, u.clip_kind, u.clip_start, u.clip_end,
           COALESCE(p.percent, 0) as percent
    FROM units u
    JOIN levels l ON l.id = u.level_id
    LEFT JOIN user_unit_progress p ON p.unit_id = u.id AND p.user_id = ${userId}
    WHERE u.id = ${unitId}
  `;
  const unit = unitRows[0];
  if (!unit) return undefined;

  const rounds = await sql<{ id: number; title: string; order_index: number }[]>`
    SELECT id, title, order_index FROM vocabulary_rounds WHERE unit_id = ${unitId} ORDER BY order_index ASC
  `;

  const fullRounds: VocabRound[] = [];
  for (const r of rounds) {
    // Diqqat: PostgreSQL SQLite'dan farqli o'laroq GROUP BY'da bo'lmagan
    // ustunlarni erkin tanlashga ruxsat bermaydi — bundan mustasno, faqat
    // GROUP BY qilingan jadvalning PRIMARY KEY ustuni orqali "funksional
    // bog'liq" bo'lgan o'sha JADVALNING boshqa ustunlari (w.* — chunki
    // GROUP BY w.id bor). Boshqa jadvaldan kelgan p.learned esa MAX() bilan
    // o'raladi (har bir (user, word) uchun ko'pi bilan bitta qator bo'lgani
        // sababli bu xavfsiz — natija o'zgarmaydi).
    const words = await sql<VocabWord[]>`
      SELECT w.id, w.word, w.transcription, w.part_of_speech, w.translation_uz, w.definition,
             w.example_sentence, w.example_translation, w.emoji, w.order_index,
             COALESCE(MAX(p.learned), 0) as learned,
             COALESCE(MAX(CASE WHEN sp.stage = 'spelling' THEN sp.passed END), 0) as stage_spelling,
             COALESCE(MAX(CASE WHEN sp.stage = 'definition' THEN sp.passed END), 0) as stage_definition,
             COALESCE(MAX(CASE WHEN sp.stage = 'pronunciation' THEN sp.passed END), 0) as stage_pronunciation,
             COALESCE(MAX(CASE WHEN sp.stage = 'sentence' THEN sp.passed END), 0) as stage_sentence
      FROM vocabulary_words w
      LEFT JOIN user_word_progress p ON p.word_id = w.id AND p.user_id = ${userId}
      LEFT JOIN user_word_stage_progress sp ON sp.word_id = w.id AND sp.user_id = ${userId}
      WHERE w.round_id = ${r.id}
      GROUP BY w.id
      ORDER BY w.order_index ASC
    `;
    fullRounds.push({ ...r, words });
  }

  const totalWords = fullRounds.reduce((sum, r) => sum + r.words.length, 0);

  const exerciseRows = await sql<
    {
      id: number;
      title: string;
      skill_label: string;
      kind: ExerciseKind;
      instructions: string | null;
      order_index: number;
      score_pct: number;
      attempted: boolean;
    }[]
  >`
    SELECT e.id, e.title, e.skill_label, e.kind, e.instructions, e.order_index,
           COALESCE(p.score_pct, 0) as score_pct,
           (p.exercise_id IS NOT NULL) as attempted
    FROM exercises e
    LEFT JOIN user_exercise_progress p ON p.exercise_id = e.id AND p.user_id = ${userId}
    WHERE e.unit_id = ${unitId} ORDER BY e.order_index ASC
  `;

  const exercises: ExerciseRecord[] = [];
  for (const e of exerciseRows) {
    const questionRows = await sql<
      {
        id: number;
        prompt: string;
        options_json: string;
        correct_index: number;
        order_index: number;
        audio_text: string | null;
        answer_text: string | null;
        explanation: string | null;
      }[]
    >`
      SELECT id, prompt, options_json, correct_index, order_index, audio_text, answer_text, explanation
      FROM exercise_questions WHERE exercise_id = ${e.id} ORDER BY order_index ASC
    `;
    const questions: ExerciseQuestion[] = questionRows.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: JSON.parse(q.options_json) as string[],
      correct_index: q.correct_index,
      order_index: q.order_index,
      audio_text: q.audio_text,
      answer_text: q.answer_text,
      explanation: q.explanation,
    }));
    exercises.push({ ...e, question_count: questions.length, questions });
  }

  return { ...unit, rounds: fullRounds, exercises, totalWords };
}

export async function getAllUnitsDetailed(userId: number): Promise<UnitDetail[]> {
  const units = await getUnitsForUser(userId);
  const details = await Promise.all(units.map((u) => getUnitDetail(u.id, userId)));
  return details.filter((u): u is UnitDetail => !!u);
}

// ---------- Baholar ----------

export interface MarkRecord {
  id: number;
  subject: string;
  score: number;
  max_score: number;
  date: string;
  unit_title: string | null;
}

export async function getMarksForUser(userId: number): Promise<MarkRecord[]> {
  return sql<MarkRecord[]>`
    SELECT m.id, m.subject, m.score, m.max_score, m.date, u.subtitle as unit_title
    FROM marks m
    LEFT JOIN units u ON u.id = m.unit_id
    WHERE m.user_id = ${userId}
    ORDER BY m.date DESC
  `;
}

// ---------- Reyting ----------

export interface RankingRow {
  id: number;
  display_name: string;
  points: number;
  place: number;
  is_current_user: number;
}

export async function getRanking(scope: "branch" | "group", userId: number): Promise<RankingRow[]> {
  return sql<RankingRow[]>`
    SELECT id, display_name, points, place,
           (user_id = ${userId} AND display_name = (SELECT name FROM users WHERE id = ${userId}))::int as is_current_user
    FROM ranking_entries WHERE scope = ${scope} ORDER BY place ASC
  `;
}

// ---------- Qo'shimcha darslar ----------

export interface ExtraLessonRecord {
  id: number;
  title: string;
  description: string;
  teacher: string;
  date_label: string;
  time_label: string;
  seats_total: number;
  seats_taken: number;
  booked_by_user: number;
}

export async function getExtraLessons(userId: number): Promise<ExtraLessonRecord[]> {
  return sql<ExtraLessonRecord[]>`
    SELECT el.id, el.title, el.description, el.teacher, el.date_label, el.time_label,
           el.seats_total, el.seats_taken,
           (CASE WHEN b.user_id IS NULL THEN 0 ELSE 1 END) as booked_by_user
    FROM extra_lessons el
    LEFT JOIN extra_lesson_bookings b ON b.extra_lesson_id = el.id AND b.user_id = ${userId}
    ORDER BY el.id ASC
  `;
}
