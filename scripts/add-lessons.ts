/**
 * Ishlab turgan bazaga yangi darslarni qo'shish skripti — mavjud
 * ma'lumotlarga (o'quvchilar, progress, baholar, mavjud darslar) tegmaydi.
 *
 *   npm run db:add-lessons            — nima qo'shilishini ko'rsatadi (bazaga yozmaydi)
 *   npm run db:add-lessons -- --apply — haqiqatan qo'shadi
 *
 * Qo'shiladi:
 *  - lib/seed-data.ts → UNITS ro'yxatidagi, bazada hali yo'q darslar;
 *  - lib/seed-lessons → lug'ati ham, mashqlari ham hali bo'lmagan darslarning
 *    mazmuni (har dars bitta tranzaksiyada).
 * Mazmuni qisman bor dars o'tkazib yuboriladi (ogohlantirish bilan) —
 * uni qo'lda tekshirish kerak.
 *
 *   npm run db:add-lessons -- --replace=B1-01 [--apply]
 *
 * Mavjud darsning mazmunini (lug'at va mashqlar) koddagi bilan almashtiradi.
 * DIQQAT: o'quvchilarning shu darsdagi so'z va mashq natijalari ham o'chadi
 * (ON DELETE CASCADE) — sinov rejimi ularning sonini ko'rsatadi.
 *
 *   npm run db:add-lessons -- --sync=B1-01,B1-02 [--apply]
 *
 * Mavjud darsga kodda qo'shilgan YANGI mashqlarni (nomi bo'yicha) qo'shadi
 * va mashqlar tartibini koddagidek qiladi. Lug'at, mavjud mashqlar va
 * o'quvchi natijalari o'zgarmaydi. Bazada kodda yo'q mashq bo'lsa yoki
 * mavjud mashqning savollari soni o'zgargan bo'lsa — dars o'tkazib
 * yuboriladi (unda --replace kerak).
 */
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { getDb } from "../lib/db";
import { insertExercises, insertRound, insertUnit, LEVELS, UNITS } from "../lib/seed-data";
import { LESSON_CONTENT } from "../lib/seed-lessons";

const apply = process.argv.includes("--apply");
const listArg = (name: string) =>
  process.argv
    .filter((a) => a.startsWith(`--${name}=`))
    .flatMap((a) => a.slice(name.length + 3).split(","))
    .filter(Boolean);
const syncCodes = listArg("sync");
const replaceCodes = process.argv
  .filter((a) => a.startsWith("--replace="))
  .flatMap((a) => a.slice("--replace=".length).split(","))
  .filter(Boolean);

async function main() {
  const sql = getDb();
  type Db = typeof sql;

  const levels = await sql<{ id: number; code: string }[]>`SELECT id, code FROM levels`;
  const levelIds = new Map(levels.map((l) => [l.code, l.id]));
  const units = await sql<{ id: number; code: string }[]>`SELECT id, code FROM units`;
  const unitIds = new Map(units.map((u) => [u.code, u.id]));

  const missingLevels = LEVELS.filter((l) => !levelIds.has(l.code));
  const missingUnits = UNITS.filter((u) => !unitIds.has(u.code));

  const counts = await sql<{ code: string; rounds: number; exercises: number }[]>`
    SELECT u.code,
           (SELECT count(*) FROM vocabulary_rounds r WHERE r.unit_id = u.id)::int AS rounds,
           (SELECT count(*) FROM exercises e WHERE e.unit_id = u.id)::int AS exercises
    FROM units u
  `;
  const countOf = new Map(counts.map((c) => [c.code, c]));
  for (const code of replaceCodes) {
    if (!LESSON_CONTENT.some((l) => l.code === code) || !unitIds.has(code)) {
      throw new Error(`--replace=${code}: bunday dars kodda yoki bazada yo'q.`);
    }
  }
  const toReplace = LESSON_CONTENT.filter((l) => replaceCodes.includes(l.code));
  const toSync: { lesson: (typeof LESSON_CONTENT)[number]; unitId: number; missing: number[] }[] = [];
  for (const code of syncCodes) {
    const lesson = LESSON_CONTENT.find((l) => l.code === code);
    const unitId = unitIds.get(code);
    if (!lesson || !unitId) throw new Error(`--sync=${code}: bunday dars kodda yoki bazada yo'q.`);
    const dbEx = await sql<{ title: string; n: number }[]>`
      SELECT e.title, (SELECT count(*) FROM exercise_questions q WHERE q.exercise_id = e.id)::int AS n
      FROM exercises e WHERE e.unit_id = ${unitId}
    `;
    const codeTitles = new Set(lesson.exercises.map((e) => e.title));
    const extra = dbEx.filter((e) => !codeTitles.has(e.title)).map((e) => e.title);
    const changed = dbEx.filter((e) => {
      const c = lesson.exercises.find((x) => x.title === e.title);
      return c && c.questions.length !== e.n;
    });
    if (extra.length || changed.length) {
      console.warn(`! ${code}: bazada kodda yo'q mashqlar (${extra.join("; ") || "—"}) yoki savollar soni o'zgargan (${changed.map((e) => e.title).join("; ") || "—"}) — o'tkazib yuborildi.`);
      continue;
    }
    const dbTitles = new Set(dbEx.map((e) => e.title));
    const missing = lesson.exercises.flatMap((e, i) => (dbTitles.has(e.title) ? [] : [i]));
    toSync.push({ lesson, unitId, missing });
  }
  const toFill = LESSON_CONTENT.filter((l) => {
    if (replaceCodes.includes(l.code) || syncCodes.includes(l.code)) return false;
    const c = countOf.get(l.code);
    if (!c) return true; // dars hozir qo'shiladi
    if (c.rounds === 0 && c.exercises === 0) return true;
    if (c.rounds !== l.rounds.length || c.exercises !== l.exercises.length) {
      console.warn(
        `! ${l.code}: bazada ${c.rounds} bosqich / ${c.exercises} mashq, kodda ${l.rounds.length} / ${l.exercises.length} — o'tkazib yuborildi.`
      );
    }
    return false;
  });

  console.log(`Yangi darajalar: ${missingLevels.map((l) => l.code).join(", ") || "yo'q"}`);
  console.log(`Yangi darslar: ${missingUnits.map((u) => u.code).join(", ") || "yo'q"}`);
  console.log(
    `Mazmuni qo'shiladigan darslar: ${
      toFill.map((l) => `${l.code} (${l.rounds.reduce((s, r) => s + r.words.length, 0)} so'z, ${l.exercises.length} mashq)`).join(", ") || "yo'q"
    }`
  );

  for (const l of toReplace) {
    const unitId = unitIds.get(l.code)!;
    const [p] = await sql<{ words: number; stages: number; reviews: number; questions: number; exercises: number; units: number }[]>`
      SELECT
        (SELECT count(*) FROM user_word_progress p JOIN vocabulary_words w ON w.id = p.word_id
           JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id = ${unitId})::int AS words,
        (SELECT count(*) FROM user_word_stage_progress p JOIN vocabulary_words w ON w.id = p.word_id
           JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id = ${unitId})::int AS stages,
        (SELECT count(*) FROM user_word_review p JOIN vocabulary_words w ON w.id = p.word_id
           JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id = ${unitId})::int AS reviews,
        (SELECT count(*) FROM user_question_progress p JOIN exercise_questions q ON q.id = p.question_id
           JOIN exercises e ON e.id = q.exercise_id WHERE e.unit_id = ${unitId})::int AS questions,
        (SELECT count(*) FROM user_exercise_progress p JOIN exercises e ON e.id = p.exercise_id
           WHERE e.unit_id = ${unitId})::int AS exercises,
        (SELECT count(*) FROM user_unit_progress WHERE unit_id = ${unitId})::int AS units
    `;
    console.log(
      `Mazmuni almashtiriladigan dars: ${l.code} — o'chadigan natijalar: ${p.words} so'z, ${p.stages} so'z bosqichi, ${p.reviews} takrorlash, ${p.questions} savol, ${p.exercises} mashq, ${p.units} dars foizi`
    );
  }

  for (const { lesson, missing } of toSync) {
    console.log(
      `Yangi mashqlar qo'shiladigan dars: ${lesson.code} — ${missing.map((i) => lesson.exercises[i].title).join("; ") || "yo'q (faqat tartib)"}`
    );
  }

  if (!apply) {
    console.log("\nBu sinov rejimi — bazaga hech narsa yozilmadi. Qo'shish uchun: npm run db:add-lessons -- --apply");
    return;
  }

  for (const l of missingLevels) {
    const [{ max }] = await sql<{ max: number }[]>`SELECT COALESCE(MAX(order_index), 0)::int AS max FROM levels`;
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO levels (code, title, description, order_index, locked)
      VALUES (${l.code}, ${l.title}, ${l.description}, ${max + 1}, ${l.locked})
      RETURNING id
    `;
    levelIds.set(l.code, row.id);
  }

  for (const u of missingUnits) {
    // Tartib raqami — dars UNITS ro'yxatida o'z darajasi ichida nechanchi bo'lsa.
    const order = UNITS.filter((x) => x.level === u.level).indexOf(u) + 1;
    unitIds.set(u.code, await insertUnit(sql, levelIds.get(u.level)!, order, u));
    console.log(`+ dars ${u.code} «${u.subtitle}»`);
  }

  for (const lesson of toReplace) {
    const unitId = unitIds.get(lesson.code)!;
    await sql.begin(async (t) => {
      const db = t as unknown as Db;
      await db`DELETE FROM vocabulary_rounds WHERE unit_id = ${unitId}`;
      await db`DELETE FROM exercises WHERE unit_id = ${unitId}`;
      await db`DELETE FROM user_unit_progress WHERE unit_id = ${unitId}`;
      for (const [i, round] of lesson.rounds.entries()) {
        await insertRound(db, unitId, round.title, i + 1, round.words);
      }
      await insertExercises(db, unitId, lesson.exercises);
    });
    console.log(`~ mazmun almashtirildi ${lesson.code}`);
  }

  for (const { lesson, unitId, missing } of toSync) {
    await sql.begin(async (t) => {
      const db = t as unknown as Db;
      await insertExercises(db, unitId, missing.map((i) => lesson.exercises[i]));
      // Tartib koddagidek: avval vaqtincha manfiy raqamlar (takrorlanmasligi uchun).
      for (const [i, ex] of lesson.exercises.entries()) {
        await db`UPDATE exercises SET order_index = ${-(i + 1)} WHERE unit_id = ${unitId} AND title = ${ex.title}`;
      }
      await db`UPDATE exercises SET order_index = -order_index WHERE unit_id = ${unitId}`;
    });
    console.log(`+ ${lesson.code}: ${missing.length} ta mashq qo'shildi, tartib yangilandi`);
  }

  for (const lesson of toFill) {
    const unitId = unitIds.get(lesson.code);
    if (!unitId) {
      console.warn(`! ${lesson.code}: UNITS ro'yxatida yo'q — o'tkazib yuborildi.`);
      continue;
    }
    await sql.begin(async (t) => {
      const db = t as unknown as Db;
      for (const [i, round] of lesson.rounds.entries()) {
        await insertRound(db, unitId, round.title, i + 1, round.words);
      }
      await insertExercises(db, unitId, lesson.exercises);
    });
    console.log(`+ mazmun ${lesson.code}`);
  }
  console.log("Tayyor.");
}

main()
  .catch((err) => {
    console.error("Xatolik:", err);
    process.exitCode = 1;
  })
  .finally(() => getDb().end());
