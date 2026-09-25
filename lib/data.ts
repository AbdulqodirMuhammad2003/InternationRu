import "server-only";
import { cache } from "react";
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
  /** O'quvchi bu savolga avval to'g'ri javob berganmi — mashq qayta
   *  ochilganda bunday savollar so'ralmaydi. */
  answered_correctly: boolean;
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
  /** Dars yopiq bo'lsa — nega (o'quvchiga ko'rsatiladi), aks holda null. */
  lock_reason: string | null;
}

/** Keyingi dars ochilishi uchun oldingi dars shu foizga yetishi kerak. */
export const UNLOCK_THRESHOLD = 80;
/** VAQTINCHA o'chirilgan: darslar mazmunini tekshirish uchun hamma
 *  tayyor darslar ochiq. Qoidani qaytarish uchun `true` qiling. */
export const UNLOCK_RULE_ENABLED = false;

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

/** `cache` — bitta so'rov (sahifa render) ichida layout va sahifa ikkalasi
 *  chaqirsa ham bazaga faqat bir marta murojaat qilinadi. */
export const getUserStats = cache(async (userId: number): Promise<UserRecord | undefined> => {
  const rows = await sql<UserRecord[]>`
    SELECT id, name, email, avatar_url, course, level, coins, stars, branch_rank, group_rank,
           battle_wins, august_average, reading_pct, writing_pct, listening_pct, speaking_pct
    FROM users WHERE id = ${userId}
  `;
  return rows[0];
});

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

// ---------- So'zlarni takrorlash (Leitner tizimi) ----------

/** Qutichaga qarab keyingi takrorlashgacha necha kun: 1-quticha — ertaga,
 *  5-quticha — bir oydan keyin. */
export const REVIEW_INTERVAL_DAYS: Record<number, number> = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
export const MAX_REVIEW_BOX = 5;
/** Bir takrorlash seansidagi eng ko'p so'z soni. */
export const REVIEW_SESSION_SIZE = 15;

export interface ReviewSummary {
  due: number;
  /** Hozir takrorlanadigan so'z bo'lmasa — keyingisi qachon. */
  nextDueAt: string | null;
}

export async function getReviewSummary(userId: number): Promise<ReviewSummary> {
  const [row] = await sql<{ due: number; next_due_at: Date | null }[]>`
    SELECT count(*) FILTER (WHERE due_at <= now())::int AS due,
           min(due_at) FILTER (WHERE due_at > now()) AS next_due_at
    FROM user_word_review WHERE user_id = ${userId}
  `;
  return { due: row?.due ?? 0, nextDueAt: row?.next_due_at ? row.next_due_at.toISOString() : null };
}

export interface ReviewWord {
  id: number;
  word: string;
  transcription: string;
  translation_uz: string;
  emoji: string;
  box: number;
}

export async function getDueReviewWords(userId: number): Promise<ReviewWord[]> {
  return sql<ReviewWord[]>`
    SELECT w.id, w.word, w.transcription, w.translation_uz, w.emoji, r.box
    FROM user_word_review r
    JOIN vocabulary_words w ON w.id = r.word_id
    WHERE r.user_id = ${userId} AND r.due_at <= now()
    ORDER BY r.box ASC, r.due_at ASC
    LIMIT ${REVIEW_SESSION_SIZE}
  `;
}

/** Noto'g'ri variantlar (distraktorlar) uchun barcha so'zlar. */
export async function getWordPool(): Promise<{ id: number; word: string; translation_uz: string }[]> {
  return sql`SELECT id, word, translation_uz FROM vocabulary_words`;
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

/** Barcha darslarni lug'at, mashq va o'quvchi progressi bilan birga yuklaydi.
 *  Baza boshqa mintaqada bo'lgani uchun har bir so'rov qimmat — shu sababli
 *  darslar soniga bog'liq bo'lmagan holda 5 ta so'rov parallel yuboriladi va
 *  natijalar shu yerda yig'iladi (avval har bir bosqich/mashq uchun alohida
 *  so'rov ketardi — ~50 ta ketma-ket so'rov). */
export async function getAllUnitsDetailed(userId: number): Promise<UnitDetail[]> {
  const [units, rounds, words, exerciseRows, questionRows] = await Promise.all([
    getUnitsForUser(userId),
    sql<{ id: number; unit_id: number; title: string; order_index: number }[]>`
      SELECT id, unit_id, title, order_index FROM vocabulary_rounds ORDER BY order_index ASC
    `,
    // PostgreSQL GROUP BY'da faqat w.id bo'lsa ham w.* ustunlarini beradi
    // (PRIMARY KEY orqali funksional bog'liq); boshqa jadvallardan kelgan
    // qiymatlar MAX() bilan o'raladi — har bir (user, word, stage) uchun
    // ko'pi bilan bitta qator bo'lgani sababli natija o'zgarmaydi.
    sql<(VocabWord & { round_id: number })[]>`
      SELECT w.id, w.round_id, w.word, w.transcription, w.part_of_speech, w.translation_uz, w.definition,
             w.example_sentence, w.example_translation, w.emoji, w.order_index,
             COALESCE(MAX(p.learned), 0) as learned,
             COALESCE(MAX(CASE WHEN sp.stage = 'spelling' THEN sp.passed END), 0) as stage_spelling,
             COALESCE(MAX(CASE WHEN sp.stage = 'definition' THEN sp.passed END), 0) as stage_definition,
             COALESCE(MAX(CASE WHEN sp.stage = 'pronunciation' THEN sp.passed END), 0) as stage_pronunciation,
             COALESCE(MAX(CASE WHEN sp.stage = 'sentence' THEN sp.passed END), 0) as stage_sentence
      FROM vocabulary_words w
      LEFT JOIN user_word_progress p ON p.word_id = w.id AND p.user_id = ${userId}
      LEFT JOIN user_word_stage_progress sp ON sp.word_id = w.id AND sp.user_id = ${userId}
      GROUP BY w.id
      ORDER BY w.order_index ASC
    `,
    sql<
      {
        id: number;
        unit_id: number;
        title: string;
        skill_label: string;
        kind: ExerciseKind;
        instructions: string | null;
        order_index: number;
        score_pct: number;
        attempted: boolean;
      }[]
    >`
      SELECT e.id, e.unit_id, e.title, e.skill_label, e.kind, e.instructions, e.order_index,
             COALESCE(p.score_pct, 0) as score_pct,
             (p.exercise_id IS NOT NULL) as attempted
      FROM exercises e
      LEFT JOIN user_exercise_progress p ON p.exercise_id = e.id AND p.user_id = ${userId}
      ORDER BY e.order_index ASC
    `,
    sql<
      {
        id: number;
        exercise_id: number;
        prompt: string;
        options_json: string;
        correct_index: number;
        order_index: number;
        audio_text: string | null;
        answer_text: string | null;
        explanation: string | null;
        answered_correctly: boolean;
      }[]
    >`
      SELECT q.id, q.exercise_id, q.prompt, q.options_json, q.correct_index, q.order_index,
             q.audio_text, q.answer_text, q.explanation,
             COALESCE(p.correct, 0) = 1 AS answered_correctly
      FROM exercise_questions q
      LEFT JOIN user_question_progress p ON p.question_id = q.id AND p.user_id = ${userId}
      ORDER BY q.order_index ASC
    `,
  ]);

  function groupBy<T, K>(rows: readonly T[], key: (row: T) => K) {
    const map = new Map<K, T[]>();
    for (const row of rows) {
      const k = key(row);
      const list = map.get(k);
      if (list) list.push(row);
      else map.set(k, [row]);
    }
    return map;
  }

  const wordsByRound = groupBy(words, (w) => w.round_id);
  const roundsByUnit = groupBy(rounds, (r) => r.unit_id);
  const questionsByExercise = groupBy(questionRows, (q) => q.exercise_id);
  const exercisesByUnit = groupBy(exerciseRows, (e) => e.unit_id);

  const detailed: UnitDetail[] = units.map((unit) => {
    const fullRounds: VocabRound[] = (roundsByUnit.get(unit.id) ?? []).map(({ unit_id: _u, ...r }) => ({
      ...r,
      words: (wordsByRound.get(r.id) ?? []).map(({ round_id: _r, ...w }) => w),
    }));
    const exercises: ExerciseRecord[] = (exercisesByUnit.get(unit.id) ?? []).map(({ unit_id: _u, ...e }) => {
      const questions: ExerciseQuestion[] = (questionsByExercise.get(e.id) ?? []).map((q) => ({
        id: q.id,
        prompt: q.prompt,
        options: JSON.parse(q.options_json) as string[],
        correct_index: q.correct_index,
        order_index: q.order_index,
        audio_text: q.audio_text,
        answer_text: q.answer_text,
        explanation: q.explanation,
        answered_correctly: q.answered_correctly,
      }));
      return { ...e, question_count: questions.length, questions };
    });
    const totalWords = fullRounds.reduce((sum, r) => sum + r.words.length, 0);
    return { ...unit, rounds: fullRounds, exercises, totalWords, lock_reason: null as string | null };
  });

  // Dars progressi = lug'at va mashqlar foizining o'rtachasi (qaysi qismi
  // bo'lsa). Darslar bazadagi `locked` bayrog'i bilan emas, o'quvchining
  // haqiqiy natijasi bilan ochiladi: 1-dars doim ochiq, keyingisi — oldingi
  // dars UNLOCK_THRESHOLD% ga yetganda. Mazmuni hali yo'q dars yopiq turadi.
  let previous: UnitDetail | null = null;
  for (const unit of detailed) {
    const parts: number[] = [];
    if (unit.totalWords > 0) {
      const learned = unit.rounds.reduce((s, r) => s + r.words.filter((w) => w.learned).length, 0);
      parts.push((learned / unit.totalWords) * 100);
    }
    if (unit.exercises.length > 0) {
      parts.push(unit.exercises.reduce((s, e) => s + e.score_pct, 0) / unit.exercises.length);
    }
    unit.percent = parts.length > 0 ? Math.round(parts.reduce((a, b) => a + b, 0) / parts.length) : 0;

    if (parts.length === 0) unit.lock_reason = "Tez orada";
    else if (UNLOCK_RULE_ENABLED && previous && previous.percent < UNLOCK_THRESHOLD)
      unit.lock_reason = `${previous.title}ni ${UNLOCK_THRESHOLD}% ga yetkazing`;
    unit.locked = unit.lock_reason ? 1 : 0;
    previous = unit;
  }
  return detailed;
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
