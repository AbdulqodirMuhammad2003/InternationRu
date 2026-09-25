import "server-only";
import { sql } from "./db";
import { getLevelBoard, UNLOCK_RULE_ENABLED, UNLOCK_THRESHOLD } from "./data";
import { A1_GRAMMAR_BANK } from "./exam-a1";

/**
 * Daraja yakuniy imtihoni (hozircha A1 — Elementar).
 *
 *  - 40 savol: 20 ta lug'at (rasm + o'zbekcha tarjima → ruscha so'zni yozish)
 *    va 20 ta grammatika (variant tanlash). Har dars kamida bittadan savol
 *    bilan qamraladi; har urinishda yangi variant.
 *  - 40 daqiqa; o'tish bali — 80 %. Javob to'g'ri-noto'g'riligi imtihon
 *    tugaguncha ko'rsatilmaydi, tekshirish faqat serverda.
 *  - 3 ta urinish. Urinishlar orasida kamida 24 soat va takrorlash rejasi:
 *    zaif darslar ≥ 90 % ga yetkaziladi. Imtihonda xato yozilgan so'zlar
 *    «Takrorlash» bo'limiga tushadi.
 *  - 3 ta urinishda ham o'tolmasa — daraja qayta o'qiladi: shu daraja
 *    darslaridagi natijalar nolga tushadi va yangi sikl (yana 3 urinish)
 *    boshlanadi. Baholar tarixi va takrorlash so'zlari saqlanadi.
 */

export const EXAM_LEVEL = "A1";
export const EXAM_TITLE = "Elementar daraja imtihoni";
export const EXAM_VOCAB_COUNT = 20;
export const EXAM_GRAMMAR_COUNT = 20;
export const EXAM_MINUTES = 40;
export const EXAM_PASS_PCT = 80;
export const EXAM_MAX_ATTEMPTS = 3;
export const EXAM_COOLDOWN_HOURS = 24;
/** Zaif dars qayta topshirishdan oldin shu foizga yetkazilishi kerak. */
export const EXAM_REMEDIATION_PCT = 90;
/** Imtihonda shu ulushdan kam to'g'ri javob berilgan dars — zaif. */
const WEAK_LESSON_RATIO = 0.75;

/** O'quvchiga yuboriladigan savol (to'g'ri javobsiz). */
export interface ExamQuestion {
  section: "vocab" | "grammar";
  lesson: number;
  kind: "type" | "choice";
  emoji?: string;
  uz?: string;
  letters?: number;
  prompt?: string;
  options?: string[];
}

interface StoredQuestion extends ExamQuestion {
  answer: string | number;
  unitId: number;
  wordId?: number;
}

export type ExamAnswer = string | number | null;

export interface ExamResult {
  score: number;
  total: number;
  pct: number;
  passed: boolean;
  vocabPct: number;
  grammarPct: number;
  lessons: { lesson: number; correct: number; total: number }[];
  wrongWords: { emoji: string; uz: string; given: string; answer: string }[];
  weakLessons: number[];
  attemptNumber: number;
  attemptsLeft: number;
  levelReset: boolean;
}

export interface ExamStatus {
  level: string;
  title: string;
  passed: boolean;
  cycle: number;
  attemptsUsed: number;
  attemptsLeft: number;
  /** Davom etayotgan urinish (sahifa yangilansa ham shu savollar). */
  active: { id: number; questions: ExamQuestion[]; answers: ExamAnswer[]; deadline: string } | null;
  canStart: boolean;
  /** Nega hozir boshlab bo'lmaydi (o'quvchiga ko'rsatiladi). */
  blockReason: string | null;
  nextAvailableAt: string | null;
  /** Oxirgi urinishdan keyingi takrorlash rejasi. */
  plan: { lesson: number; title: string; percent: number; done: boolean }[];
  lastResult: { pct: number; passed: boolean; finishedAt: string } | null;
  levelResetHappened: boolean;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/́/g, "")
    .replace(/[.,!?;:«»"'—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Har darsdan bittadan, qolganini tasodifiy darslardan olib, `count` ta
 *  elementni tanlaydi (bir darsdan ikki martadan ko'p emas). */
function spreadPick<T>(byLesson: T[][], count: number): { lessonIndex: number; item: T }[] {
  const pools = byLesson.map((items) => shuffle(items));
  const picked: { lessonIndex: number; item: T }[] = [];
  pools.forEach((pool, i) => {
    if (pool.length > 0) picked.push({ lessonIndex: i, item: pool.shift()! });
  });
  for (const i of shuffle(pools.map((_, i) => i))) {
    if (picked.length >= count) break;
    if (pools[i].length > 0) picked.push({ lessonIndex: i, item: pools[i].shift()! });
  }
  return picked.slice(0, count);
}

async function levelUnits(level: string) {
  return sql<{ id: number; code: string; title: string; order_index: number }[]>`
    SELECT u.id, u.code, u.title, u.order_index
    FROM units u JOIN levels l ON l.id = u.level_id
    WHERE l.code = ${level}
    ORDER BY u.order_index
  `;
}

async function buildVariant(level: string): Promise<StoredQuestion[]> {
  const units = (await levelUnits(level)).filter((u) => A1_GRAMMAR_BANK[u.code]);
  const words = await sql<{ id: number; unit_id: number; word: string; emoji: string; translation_uz: string }[]>`
    SELECT w.id, r.unit_id, w.word, w.emoji, w.translation_uz
    FROM vocabulary_words w JOIN vocabulary_rounds r ON r.id = w.round_id
    WHERE r.unit_id IN ${sql(units.map((u) => u.id))}
  `;
  // O'zbekcha tarjimasi boshqa so'znikiga to'g'ri keladigan so'zlar
  // (masalan, «kechikmoq» — опаздывать / опоздать) imtihonga olinmaydi.
  const key = (uz: string) => uz.toLowerCase().replace(/\(.*?\)/g, "").split(/[;,]/)[0].trim();
  const seen = new Map<string, number>();
  for (const w of words) seen.set(key(w.translation_uz), (seen.get(key(w.translation_uz)) ?? 0) + 1);
  const unique = words.filter((w) => seen.get(key(w.translation_uz)) === 1);

  const vocab = spreadPick(
    units.map((u) => unique.filter((w) => w.unit_id === u.id)),
    EXAM_VOCAB_COUNT
  ).map(({ lessonIndex, item }): StoredQuestion => ({
    section: "vocab",
    lesson: lessonIndex + 1,
    kind: "type",
    emoji: item.emoji,
    uz: item.translation_uz,
    letters: item.word.replace(/[\s-]/g, "").length,
    answer: item.word,
    unitId: units[lessonIndex].id,
    wordId: item.id,
  }));

  const grammar = spreadPick(
    units.map((u) => A1_GRAMMAR_BANK[u.code]),
    EXAM_GRAMMAR_COUNT
  ).map(({ lessonIndex, item }): StoredQuestion => {
    const options = shuffle(item.options);
    return {
      section: "grammar",
      lesson: lessonIndex + 1,
      kind: "choice",
      prompt: item.prompt,
      options,
      answer: options.indexOf(item.options[0]),
      unitId: units[lessonIndex].id,
    };
  });

  return [...shuffle(vocab), ...shuffle(grammar)];
}

const toPublic = ({ answer: _a, unitId: _u, wordId: _w, ...q }: StoredQuestion): ExamQuestion => q;

function isCorrect(q: StoredQuestion, a: ExamAnswer) {
  if (q.kind === "type") return typeof a === "string" && normalize(a) === normalize(String(q.answer));
  return a === q.answer;
}

interface AttemptRow {
  id: number;
  cycle: number;
  questions_json: string;
  answers_json: string | null;
  passed: number | null;
  score: number | null;
  total: number;
  weak_units_json: string | null;
  started_at: Date;
  finished_at: Date | null;
}

async function attemptsOf(userId: number, level: string) {
  return sql<AttemptRow[]>`
    SELECT id, cycle, questions_json, answers_json, passed, score, total, weak_units_json, started_at, finished_at
    FROM exam_attempts WHERE user_id = ${userId} AND level_code = ${level}
    ORDER BY id
  `;
}

const deadlineOf = (a: AttemptRow) => new Date(a.started_at.getTime() + EXAM_MINUTES * 60_000);

/** Yakunlanmagan urinishni tekshiradi va baholaydi. Faqat shu o'quvchining
 *  ochiq urinishi bo'lsa ishlaydi. */
export async function finishExam(userId: number, attemptId: number, answers: ExamAnswer[]): Promise<ExamResult | null> {
  const [row] = await sql<AttemptRow[]>`
    SELECT id, cycle, questions_json, answers_json, passed, score, total, weak_units_json, started_at, finished_at
    FROM exam_attempts WHERE id = ${attemptId} AND user_id = ${userId} AND finished_at IS NULL
  `;
  if (!row) return null;
  const questions = JSON.parse(row.questions_json) as StoredQuestion[];
  const given = questions.map((_, i) => answers[i] ?? null);
  const correct = questions.map((q, i) => isCorrect(q, given[i]));
  const score = correct.filter(Boolean).length;
  const pct = Math.round((score / questions.length) * 100);
  const passed = pct >= EXAM_PASS_PCT;

  const sectionPct = (s: ExamQuestion["section"]) => {
    const idx = questions.map((q, i) => i).filter((i) => questions[i].section === s);
    return idx.length ? Math.round((idx.filter((i) => correct[i]).length / idx.length) * 100) : 0;
  };
  const byLesson = new Map<number, { unitId: number; correct: number; total: number }>();
  questions.forEach((q, i) => {
    const entry = byLesson.get(q.lesson) ?? { unitId: q.unitId, correct: 0, total: 0 };
    entry.total++;
    if (correct[i]) entry.correct++;
    byLesson.set(q.lesson, entry);
  });
  const lessons = [...byLesson.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([lesson, e]) => ({ lesson, correct: e.correct, total: e.total }));
  const weak = [...byLesson.entries()]
    .filter(([, e]) => e.correct / e.total < WEAK_LESSON_RATIO)
    .map(([lesson, e]) => ({ lesson, unitId: e.unitId }));
  const wrongVocab = questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => q.section === "vocab" && !correct[i]);

  await sql`
    UPDATE exam_attempts
    SET answers_json = ${JSON.stringify(given)}, score = ${score}, passed = ${passed ? 1 : 0},
        weak_units_json = ${JSON.stringify(weak)}, finished_at = now()
    WHERE id = ${row.id}
  `;

  const all = await attemptsOf(userId, EXAM_LEVEL);
  const attemptNumber = all.filter((a) => a.cycle === row.cycle && a.finished_at).length;
  await sql`
    INSERT INTO marks (user_id, unit_id, subject, score, max_score, date)
    VALUES (${userId}, ${null}, ${`${EXAM_TITLE} (${attemptNumber}-urinish)`}, ${pct}, ${100},
            ${new Date().toISOString().slice(0, 10)})
  `;

  // Xato yozilgan so'zlar «Takrorlash»ga — darhol takrorlanadigan qilib.
  const wordIds = wrongVocab.map(({ q }) => q.wordId).filter((id): id is number => !!id);
  if (wordIds.length > 0) {
    await sql`
      INSERT INTO user_word_review ${sql(wordIds.map((word_id) => ({ user_id: userId, word_id, box: 1, due_at: new Date() })))}
      ON CONFLICT (user_id, word_id) DO UPDATE SET box = 1, due_at = now()
    `;
  }

  // O'tgan o'quvchi keyingi darajaga ko'tariladi — keyingi daraja ochiladi.
  if (passed) {
    await sql`
      UPDATE users SET level = next.code
      FROM levels cur JOIN levels next ON next.order_index = cur.order_index + 1
      WHERE users.id = ${userId} AND users.level = ${EXAM_LEVEL} AND cur.code = ${EXAM_LEVEL}
    `;
  }

  // 3-urinishda ham o'tolmasa — daraja qayta o'qiladi.
  const levelReset = !passed && attemptNumber >= EXAM_MAX_ATTEMPTS;
  if (levelReset) await resetLevelProgress(userId, EXAM_LEVEL);

  return {
    score,
    total: questions.length,
    pct,
    passed,
    vocabPct: sectionPct("vocab"),
    grammarPct: sectionPct("grammar"),
    lessons,
    wrongWords: wrongVocab.map(({ q, i }) => ({
      emoji: q.emoji ?? "",
      uz: q.uz ?? "",
      given: typeof given[i] === "string" ? (given[i] as string) : "",
      answer: String(q.answer),
    })),
    weakLessons: weak.map((w) => w.lesson),
    attemptNumber,
    attemptsLeft: passed || levelReset ? 0 : EXAM_MAX_ATTEMPTS - attemptNumber,
    levelReset,
  };
}

/** Daraja darslaridagi lug'at va mashq natijalarini nolga tushiradi. Baholar
 *  tarixi va «Takrorlash» so'zlari saqlanadi. */
async function resetLevelProgress(userId: number, level: string) {
  const unitIds = (await levelUnits(level)).map((u) => u.id);
  if (unitIds.length === 0) return;
  await sql.begin(async (t) => {
    await t`
      DELETE FROM user_word_progress WHERE user_id = ${userId} AND word_id IN (
        SELECT w.id FROM vocabulary_words w JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id IN ${t(unitIds)})
    `;
    await t`
      DELETE FROM user_word_stage_progress WHERE user_id = ${userId} AND word_id IN (
        SELECT w.id FROM vocabulary_words w JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id IN ${t(unitIds)})
    `;
    await t`
      DELETE FROM user_question_progress WHERE user_id = ${userId} AND question_id IN (
        SELECT q.id FROM exercise_questions q JOIN exercises e ON e.id = q.exercise_id WHERE e.unit_id IN ${t(unitIds)})
    `;
    await t`
      DELETE FROM user_exercise_progress WHERE user_id = ${userId} AND exercise_id IN (
        SELECT id FROM exercises WHERE unit_id IN ${t(unitIds)})
    `;
    await t`DELETE FROM user_unit_progress WHERE user_id = ${userId} AND unit_id IN ${t(unitIds)}`;
  });
}

export async function getExamStatus(userId: number): Promise<ExamStatus> {
  let attempts = await attemptsOf(userId, EXAM_LEVEL);

  // Vaqti tugagan, lekin topshirilmagan urinish — saqlangan javoblar bilan yakunlanadi.
  const open = attempts.find((a) => !a.finished_at);
  if (open && deadlineOf(open).getTime() < Date.now()) {
    await finishExam(userId, open.id, open.answers_json ? JSON.parse(open.answers_json) : []);
    attempts = await attemptsOf(userId, EXAM_LEVEL);
  }

  const passed = attempts.some((a) => a.passed === 1);
  const finished = attempts.filter((a) => a.finished_at);
  const last = finished[finished.length - 1] ?? null;
  const lastCycle = attempts.length ? Math.max(...attempts.map((a) => a.cycle)) : 1;
  const failedInLastCycle = finished.filter((a) => a.cycle === lastCycle && a.passed === 0).length;
  const levelResetHappened = !passed && failedInLastCycle >= EXAM_MAX_ATTEMPTS;
  const cycle = levelResetHappened ? lastCycle + 1 : lastCycle;
  const attemptsUsed = finished.filter((a) => a.cycle === cycle).length;

  const board = await getLevelBoard(userId);
  const me = board.students.find((s) => s.is_current_user);
  const percentOf = (unitId: number) => {
    const i = board.units.findIndex((u) => u.id === unitId);
    return i >= 0 ? me?.percents[i] ?? 0 : 0;
  };

  const activeRow = attempts.find((a) => !a.finished_at) ?? null;
  const active = activeRow
    ? {
        id: activeRow.id,
        questions: (JSON.parse(activeRow.questions_json) as StoredQuestion[]).map(toPublic),
        answers: activeRow.answers_json ? (JSON.parse(activeRow.answers_json) as ExamAnswer[]) : [],
        deadline: deadlineOf(activeRow).toISOString(),
      }
    : null;

  // Takrorlash rejasi — faqat shu siklning oxirgi urinishi muvaffaqiyatsiz bo'lsa.
  const planSource = last && last.passed === 0 && last.cycle === cycle ? last : null;
  const plan = planSource
    ? (JSON.parse(planSource.weak_units_json ?? "[]") as { lesson: number; unitId: number }[]).map((w) => {
        const percent = percentOf(w.unitId);
        const unit = board.units.find((u) => u.id === w.unitId);
        return { lesson: w.lesson, title: unit?.title ?? `${w.lesson}-dars`, percent, done: percent >= EXAM_REMEDIATION_PCT };
      })
    : [];

  let blockReason: string | null = null;
  let nextAvailableAt: string | null = null;
  if (passed) blockReason = "Imtihondan o'tgansiz.";
  else if (active) blockReason = null;
  else {
    // Darslar ketma-ketligi qoidasi yoqilgan bo'lsa yoki daraja qayta
    // o'qilayotgan bo'lsa (2-sikl va keyingilari), imtihon barcha darslar
    // 80 % ga yetgach ochiladi.
    const notReady = board.units.filter((u, i) => (me?.percents[i] ?? 0) < UNLOCK_THRESHOLD);
    if ((UNLOCK_RULE_ENABLED || cycle > 1) && notReady.length > 0) {
      blockReason = `Imtihon barcha darslar ${UNLOCK_THRESHOLD}% ga yetgach ochiladi. Qolgan darslar: ${notReady
        .map((u) => u.title)
        .join(", ")}.`;
    } else if (planSource) {
      const readyAt = new Date(planSource.finished_at!.getTime() + EXAM_COOLDOWN_HOURS * 3_600_000);
      if (readyAt.getTime() > Date.now()) {
        nextAvailableAt = readyAt.toISOString();
        blockReason = "Qayta topshirish oldingi urinishdan kamida 24 soat o'tgach ochiladi.";
      } else if (plan.some((p) => !p.done)) {
        blockReason = `Avval takrorlash rejasini bajaring: zaif darslarni ${EXAM_REMEDIATION_PCT}% ga yetkazing.`;
      }
    }
  }

  return {
    level: EXAM_LEVEL,
    title: EXAM_TITLE,
    passed,
    cycle,
    attemptsUsed,
    attemptsLeft: passed ? 0 : EXAM_MAX_ATTEMPTS - attemptsUsed,
    active,
    canStart: !passed && !active && blockReason === null,
    blockReason,
    nextAvailableAt,
    plan,
    lastResult: last ? { pct: Math.round(((last.score ?? 0) / last.total) * 100), passed: last.passed === 1, finishedAt: last.finished_at!.toISOString() } : null,
    levelResetHappened,
  };
}

/** Yangi urinish boshlaydi (agar ruxsat bo'lsa) va uning id sini qaytaradi. */
export async function startExam(userId: number): Promise<number | null> {
  const status = await getExamStatus(userId);
  if (status.active) return status.active.id;
  if (!status.canStart) return null;
  const questions = await buildVariant(EXAM_LEVEL);
  const [row] = await sql<{ id: number }[]>`
    INSERT INTO exam_attempts (user_id, level_code, cycle, questions_json, total)
    VALUES (${userId}, ${EXAM_LEVEL}, ${status.cycle}, ${JSON.stringify(questions)}, ${questions.length})
    RETURNING id
  `;
  return row.id;
}

/** Imtihon davomida javoblarni saqlab boradi (sahifa yopilsa ham yo'qolmaydi). */
export async function saveExamAnswers(userId: number, attemptId: number, answers: ExamAnswer[]) {
  await sql`
    UPDATE exam_attempts SET answers_json = ${JSON.stringify(answers)}
    WHERE id = ${attemptId} AND user_id = ${userId} AND finished_at IS NULL
  `;
}

export interface Certificate {
  level: string;
  /** Sertifikat raqami, masalan AVG-A1-000012. */
  number: string;
  pct: number;
  date: string;
}

/** O'quvchi o'tgan har bir daraja imtihoni uchun sertifikat (birinchi
 *  muvaffaqiyatli urinish bo'yicha). */
export async function getCertificates(userId: number): Promise<Certificate[]> {
  const rows = await sql<{ id: number; level_code: string; score: number; total: number; finished_at: Date }[]>`
    SELECT DISTINCT ON (level_code) id, level_code, score, total, finished_at
    FROM exam_attempts
    WHERE user_id = ${userId} AND passed = 1
    ORDER BY level_code, finished_at
  `;
  return rows.map((r) => ({
    level: r.level_code,
    number: `AVG-${r.level_code}-${String(r.id).padStart(6, "0")}`,
    pct: Math.round((r.score / r.total) * 100),
    date: r.finished_at.toISOString(),
  }));
}
