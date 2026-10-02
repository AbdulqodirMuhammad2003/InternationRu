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
 */
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { getDb } from "../lib/db";
import { insertExercises, insertRound, insertUnit, LEVELS, UNITS } from "../lib/seed-data";
import { LESSON_CONTENT } from "../lib/seed-lessons";

const apply = process.argv.includes("--apply");

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
  const toFill = LESSON_CONTENT.filter((l) => {
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
