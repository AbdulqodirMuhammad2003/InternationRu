/**
 * Kitob asosidagi darslarni (lib/seed-book) bazaga yozadi.
 *
 *   npm run db:add-book -- --code=KA1-01          — nima bo'lishini ko'rsatadi
 *   npm run db:add-book -- --code=KA1-01 --apply  — haqiqatan yozadi
 *
 * Bazada yo'q dars QORALAMA (units.draft = true) bo'lib yaratiladi — uni
 * faqat o'qituvchi ko'radi. Qoralama darsning mazmuni (lug'at, mashqlar)
 * har safar to'liq koddagi bilan almashtiriladi (u yerda o'quvchi natijasi
 * yo'q). Qoralama bo'lmagan (o'quvchilarga ochilgan) darsga bu skript
 * tegmaydi — buni alohida, ehtiyotkor ko'chirish qiladi.
 *
 * Audio manzili: BOOK_AUDIO_BASE (bo'lmasa — DATABASE_URL'dagi Supabase
 * loyihasining ochiq «book-audio» papkasi).
 */
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { getDb } from "../lib/db";
import { insertRound } from "../lib/seed-data";
import { BOOK_LESSONS } from "../lib/seed-book";
import { toStorageKey } from "../lib/seed-book/storage-key";

const apply = process.argv.includes("--apply");
const codes = process.argv
  .filter((a) => a.startsWith("--code="))
  .flatMap((a) => a.slice("--code=".length).split(","))
  .filter(Boolean);

/** Kitob darslari darajaning eski darslaridan keyin turadi. */
const ORDER_BASE = 100;

function audioBase() {
  if (process.env.BOOK_AUDIO_BASE) return process.env.BOOK_AUDIO_BASE.replace(/\/$/, "");
  const ref = process.env.DATABASE_URL?.match(/postgres\.([a-z0-9]+)[:@]/)?.[1];
  if (!ref) throw new Error("BOOK_AUDIO_BASE topilmadi va DATABASE_URL'dan Supabase loyihasini aniqlab bo'lmadi.");
  return `https://${ref}.supabase.co/storage/v1/object/public/book-audio`;
}

async function main() {
  if (codes.length === 0) throw new Error("--code=KA1-01 kabi dars kodini bering.");
  const sql = getDb();
  const base = audioBase();

  for (const code of codes) {
    const lesson = BOOK_LESSONS.find((l) => l.code === code);
    if (!lesson) throw new Error(`${code}: lib/seed-book'da bunday dars yo'q.`);
    const levelLessons = BOOK_LESSONS.filter((l) => l.level === lesson.level);
    const orderIndex = ORDER_BASE + levelLessons.indexOf(lesson) + 1;

    const [level] = await sql<{ id: number }[]>`SELECT id FROM levels WHERE code = ${lesson.level}`;
    if (!level) throw new Error(`${lesson.level} darajasi bazada yo'q.`);
    const [unit] = await sql<{ id: number; draft: boolean }[]>`SELECT id, draft FROM units WHERE code = ${code}`;
    if (unit && !unit.draft) {
      console.log(`${code}: o'quvchilarga ochilgan dars — bu skript unga tegmaydi.`);
      continue;
    }

    const words = lesson.rounds.reduce((n, r) => n + r.words.length, 0);
    const questions = lesson.exercises.reduce((n, e) => n + e.questions.length, 0);
    const withAudio = lesson.exercises.filter((e) => e.audio).length;
    console.log(
      `\n${code} «${lesson.subtitle}» (${lesson.level}, kitob ${lesson.pages}-betlar): ` +
        `${unit ? "qoralama yangilanadi" : "yangi qoralama yaratiladi"}\n` +
        `  lug'at: ${lesson.rounds.length} bosqich, ${words} so'z\n` +
        `  topshiriqlar: ${lesson.exercises.length} ta (${questions} savol), audio bilan: ${withAudio}`
    );
    const sections = [...new Set(lesson.exercises.map((e) => e.section ?? "Qoida"))];
    for (const s of sections) {
      const list = lesson.exercises.filter((e) => (e.section ?? "Qoida") === s);
      console.log(`  · ${s}: ${list.map((e) => e.ref).join(", ")}`);
    }
    if (!apply) continue;

    await sql.begin(async (t) => {
      let unitId = unit?.id;
      if (!unitId) {
        const [row] = await t<{ id: number }[]>`
          INSERT INTO units (level_id, code, title, subtitle, color, icon, order_index, locked, date_label, draft)
          VALUES (${level.id}, ${code}, ${lesson.title}, ${lesson.subtitle}, 'blue', 'book', ${orderIndex}, 1, '', true)
          RETURNING id
        `;
        unitId = row.id;
      } else {
        await t`UPDATE units SET title = ${lesson.title}, subtitle = ${lesson.subtitle}, order_index = ${orderIndex} WHERE id = ${unitId}`;
        await t`DELETE FROM vocabulary_rounds WHERE unit_id = ${unitId}`;
        await t`DELETE FROM exercises WHERE unit_id = ${unitId}`;
      }
      for (const [i, round] of lesson.rounds.entries()) {
        await insertRound(t as unknown as typeof sql, unitId, round.title, i + 1, round.words);
      }
      for (const [i, ex] of lesson.exercises.entries()) {
        const [row] = await t<{ id: number }[]>`
          INSERT INTO exercises ${t({
            unit_id: unitId,
            title: ex.title,
            skill_label: ex.skill,
            kind: ex.kind,
            instructions: ex.instructions,
            order_index: i + 1,
            book_ref: ex.ref,
            section: ex.section ?? null,
            audio_url: ex.audio ? `${base}/${toStorageKey(ex.audio)}` : null,
            image_url: ex.image ?? null,
          })}
          RETURNING id
        `;
        await t`INSERT INTO exercise_questions ${t(
          ex.questions.map((q, qi) => ({
            exercise_id: row.id,
            prompt: q.prompt,
            options_json: JSON.stringify(q.options ?? []),
            correct_index: q.correct ?? 0,
            order_index: qi + 1,
            audio_text: q.audio ?? null,
            answer_text: q.answer ?? null,
            explanation: q.explanation ?? null,
          }))
        )}`;
      }
    });
    console.log(`  ✓ ${code} yozildi`);
  }
  if (!apply) console.log("\nSinov rejimi — bazaga hech narsa yozilmadi. Yozish uchun: --apply");
  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
