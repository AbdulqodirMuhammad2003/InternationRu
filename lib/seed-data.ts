/**
 * Baza ma'lumotlarini namunaviy kontent bilan to'ldirish uchun umumiy mantiq.
 * Platforma o'zbek o'quvchilariga rus tilini o'rgatadi.
 *
 * Bu fayl faqat `scripts/seed.ts` orqali, qo'lda (`npm run db:seed`)
 * ishga tushiriladi — Supabase (Postgres) doimiy baza bo'lgani uchun
 * (avvalgi SQLite versiyasidan farqli o'laroq) serverning har bir sovuq
 * boshlanishida avtomatik ishlamaydi.
 */
import bcrypt from "bcryptjs";
import { sql } from "./db";
import type { SeedExercise } from "./seed-exercises";
import { LESSON_CONTENT } from "./seed-lessons";
import type { VocabSeed } from "./seed-lessons/types";

/** Mashqlarni savollari bilan birga darsga qo'shadi (tartib raqami
 *  darsdagi mavjud mashqlardan keyin davom etadi). Seed va bir martalik
 *  migratsiya skriptlari ikkalasi ham ishlatadi. */
export async function insertExercises(
  db: typeof sql,
  unitId: number,
  exercises: SeedExercise[]
) {
  const [{ max }] = await db<{ max: number }[]>`
    SELECT COALESCE(MAX(order_index), 0)::int AS max FROM exercises WHERE unit_id = ${unitId}
  `;
  for (const [i, ex] of exercises.entries()) {
    const [row] = await db<{ id: number }[]>`
      INSERT INTO exercises (unit_id, title, skill_label, kind, instructions, order_index)
      VALUES (${unitId}, ${ex.title}, ${ex.skill}, ${ex.kind}, ${ex.instructions}, ${max + i + 1})
      RETURNING id
    `;
    const rows = ex.questions.map((q, qi) => ({
      exercise_id: row.id,
      prompt: q.prompt,
      options_json: JSON.stringify(q.options ?? []),
      correct_index: q.correct ?? 0,
      order_index: qi + 1,
      audio_text: q.audio ?? null,
      answer_text: q.answer ?? null,
      explanation: q.explanation ?? null,
    }));
    await db`INSERT INTO exercise_questions ${db(rows)}`;
  }
}

export async function resetDatabase() {
  const tables = [
    "exam_attempts",
    "extra_lesson_bookings",
    "extra_lessons",
    "ranking_entries",
    "marks",
    "user_unit_progress",
    "user_question_progress",
    "user_exercise_progress",
    "exercise_questions",
    "exercises",
    "user_daily_activity",
    "user_word_review",
    "user_word_stage_progress",
    "user_word_progress",
    "vocabulary_words",
    "vocabulary_rounds",
    "units",
    "levels",
    "users",
  ];
  for (const t of tables) {
    // Jadval nomlari shu yerdagi qattiq kodlangan ro'yxatdan kelgani uchun
    // (foydalanuvchi kiritmasi emas) to'g'ridan-to'g'ri qo'yish xavfsiz.
    await sql.unsafe(`DELETE FROM ${t}`);
  }
}

export async function seedDatabase() {
  // ---------- Foydalanuvchi (demo hisob) ----------
  const passwordHash = bcrypt.hashSync("demo1234", 10);

  const [demoUser] = await sql<{ id: number }[]>`
    INSERT INTO users (name, email, password_hash, avatar_url, course, level, coins, stars,
      branch_rank, group_rank, battle_wins, august_average, reading_pct, writing_pct, listening_pct, speaking_pct)
    VALUES (
      ${"Abdulqodir Xabibullayev"}, ${"demo@avangard.uz"}, ${passwordHash}, ${null},
      ${"Rus tili kursi"}, ${"A1"}, ${11130}, ${6006}, ${20}, ${5}, ${7}, ${78.98}, ${96}, ${100}, ${90}, ${100}
    )
    RETURNING id
  `;
  const userId = demoUser.id;

  await sql`
    INSERT INTO users (name, email, password_hash, avatar_url, course, level, coins, stars,
      branch_rank, group_rank, battle_wins, august_average, reading_pct, writing_pct, listening_pct, speaking_pct)
    VALUES (
      ${"Madina Yusupova"}, ${"madina@avangard.uz"}, ${passwordHash}, ${null},
      ${"Rus tili kursi"}, ${"A2"}, ${9820}, ${5210}, ${4}, ${2}, ${9}, ${81.2}, ${92}, ${95}, ${88}, ${97}
    )
  `;

  // ---------- Darajalar (A1, A2, B1, B2) ----------
  const levels = [
    {
      code: "A1",
      title: "Boshlang'ich daraja",
      description: "Rus tilini noldan boshlaymiz: salomlashish, oila, sonlar va kundalik so'z boyligi.",
      locked: 0,
    },
    {
      code: "A2",
      title: "Asosiy daraja",
      description: "Oddiy suhbatlar, o'tgan zamon va kengroq so'z boyligi.",
      locked: 1,
    },
    {
      code: "B1",
      title: "O'rta daraja",
      description: "Murakkabroq grammatika va erkin muloqot ko'nikmalari.",
      locked: 1,
    },
    {
      code: "B2",
      title: "Yuqori o'rta daraja",
      description: "Rasmiy va ishbilarmonlik nutqi, chuqur grammatika.",
      locked: 1,
    },
  ];
  const levelIds: Record<string, number> = {};
  for (let i = 0; i < levels.length; i++) {
    const l = levels[i];
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO levels (code, title, description, order_index, locked)
      VALUES (${l.code}, ${l.title}, ${l.description}, ${i + 1}, ${l.locked})
      RETURNING id
    `;
    levelIds[l.code] = row.id;
  }

  // ---------- Darslar (Units) ----------
  // A1 darajasi Liden & Denz «Я ❤ Русский Язык» kitobi asosida: 1-dars —
  // kitobning «Вводно-фонетический курс» qismi, 2–15-darslar — uning 14 ta
  // darsi (R01–R14). Kitob faqat dastur sifatida ishlatiladi (mavzu, so'z,
  // grammatika); gap va mashqlar o'zimizniki. Darslar o'quvchi natijasiga
  // qarab ochiladi (lib/data.ts — UNLOCK_THRESHOLD), `locked` bu yerda
  // faqat boshlang'ich qiymat.
  //
  // "Ruscha tomosha" — mashqlar tugatilgach ochiladigan haqiqiy ruscha
  // parcha (5-10 daqiqa). Faqat rasmiy kanallardan va O'zbekistonda
  // ochiladiganlari tanlangan (Soyuzmultfilm klassikalari u yerda
  // bloklangan — "владелец запретил просмотр в вашей стране").
  const units = [
    {
      code: "R00",
      level: "A1",
      title: "1-dars",
      subtitle: "Alifbo va tovushlar",
      color: "green",
      icon: "headphones",
      locked: 0,
      date: "",
      clip: {
        url: "https://www.youtube.com/watch?v=6U6_5G7FPew",
        title: "Смешарики — первый сезон",
        kind: "multfilm",
        start: 0,
        end: 540,
      },
    },
    {
      code: "R01",
      level: "A1",
      title: "2-dars",
      subtitle: "Привет! Tanishuv va salomlashish",
      color: "blue",
      icon: "book",
      locked: 1,
      date: "",
      clip: {
        url: "https://www.youtube.com/watch?v=1V3ZY_TXKwU",
        title: "Маша и Медведь — «Первая встреча»",
        kind: "multfilm",
        start: null,
        end: null,
      },
    },
    {
      code: "R02",
      level: "A1",
      title: "3-dars",
      subtitle: "Кто вы? Kasb, millat va yosh",
      color: "orange",
      icon: "chart",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R03",
      level: "A1",
      title: "4-dars",
      subtitle: "Моя семья. Oila",
      color: "purple",
      icon: "chat",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R04",
      level: "A1",
      title: "5-dars",
      subtitle: "Живу, учусь, работаю. Qayerda?",
      color: "black",
      icon: "lock",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R05",
      level: "A1",
      title: "6-dars",
      subtitle: "Города, страны. Shahar va mamlakatlar",
      color: "green",
      icon: "headphones",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R06",
      level: "A1",
      title: "7-dars",
      subtitle: "Что вы делали вчера? O'tgan zamon",
      color: "blue",
      icon: "book",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R07",
      level: "A1",
      title: "8-dars",
      subtitle: "Ресторан. Ovqat va buyurtma",
      color: "orange",
      icon: "chart",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R08",
      level: "A1",
      title: "9-dars",
      subtitle: "Мой день. Kun tartibi va transport",
      color: "purple",
      icon: "chat",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R09",
      level: "A1",
      title: "10-dars",
      subtitle: "Кино. Музыка. Театр. Kelasi zamon",
      color: "black",
      icon: "lock",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R10",
      level: "A1",
      title: "11-dars",
      subtitle: "Дом, квартира. Uy-joy",
      color: "green",
      icon: "headphones",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R11",
      level: "A1",
      title: "12-dars",
      subtitle: "В университете. Fe'l turlari",
      color: "blue",
      icon: "book",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R12",
      level: "A1",
      title: "13-dars",
      subtitle: "День рождения. Sovg'a va bayramlar",
      color: "orange",
      icon: "chart",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R13",
      level: "A1",
      title: "14-dars",
      subtitle: "В городе. Yo'l so'rash",
      color: "purple",
      icon: "chat",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "R14",
      level: "A1",
      title: "15-dars",
      subtitle: "Читаем русскую литературу",
      color: "black",
      icon: "lock",
      locked: 1,
      date: "",
      clip: null,
    },
  ];

  const unitIds: Record<string, number> = {};
  const unitOrderByLevel: Record<string, number> = {};
  for (const u of units) {
    unitOrderByLevel[u.level] = (unitOrderByLevel[u.level] || 0) + 1;
    const [row] = await sql<{ id: number }[]>`
      INSERT INTO units (level_id, code, title, subtitle, color, icon, order_index, locked, date_label,
        clip_url, clip_title, clip_kind, clip_start, clip_end)
      VALUES (
        ${levelIds[u.level]}, ${u.code}, ${u.title}, ${u.subtitle}, ${u.color}, ${u.icon},
        ${unitOrderByLevel[u.level]}, ${u.locked}, ${u.date},
        ${u.clip?.url ?? null}, ${u.clip?.title ?? null}, ${u.clip?.kind ?? null},
        ${u.clip?.start ?? null}, ${u.clip?.end ?? null}
      )
      RETURNING id
    `;
    unitIds[u.code] = row.id;
  }

  // ---------- Lug'at va mashqlar ----------
  async function createRound(unitId: number, title: string, order: number, words: VocabSeed[]) {
    const [round] = await sql<{ id: number }[]>`
      INSERT INTO vocabulary_rounds (unit_id, title, order_index) VALUES (${unitId}, ${title}, ${order})
      RETURNING id
    `;
    // postgres.js'ning ko'p qatorli INSERT yordamchisi — har bir so'z uchun
    // alohida so'rov yubormaslik uchun (tezroq, Supabase'ga kam murojaat).
    await sql`INSERT INTO vocabulary_words ${sql(
      words.map((w, i) => ({
        round_id: round.id,
        emoji: w.emoji,
        word: w.word,
        transcription: w.transcription,
        part_of_speech: w.pos,
        translation_uz: w.uz,
        definition: w.def,
        example_sentence: w.ex,
        example_translation: w.exUz,
        order_index: i + 1,
      }))
    )}`;
  }

  for (const lesson of LESSON_CONTENT) {
    for (const [i, round] of lesson.rounds.entries()) {
      await createRound(unitIds[lesson.code], round.title, i + 1, round.words);
    }
    await insertExercises(sql, unitIds[lesson.code], lesson.exercises);
  }

  // ---------- Baholar (Marks) ----------
  await sql`
    INSERT INTO marks (user_id, unit_id, subject, score, max_score, date)
    VALUES (${userId}, ${unitIds["R00"]}, ${"Tinglab tushunish"}, ${96}, ${100}, ${"2026-08-11"})
  `;
  await sql`
    INSERT INTO marks (user_id, unit_id, subject, score, max_score, date)
    VALUES (${userId}, ${null}, ${"Sinov testi (A1 darajasi)"}, ${78}, ${100}, ${"2026-08-17"})
  `;

  // ---------- Qo'shimcha darslar (Extra lessons) ----------
  // Diqqat: `sql(rows)` helper'ining o'zi "(ustunlar) values (...)" qismini
  // to'liq generatsiya qiladi — shuning uchun ustunlar ro'yxati va "VALUES"
  // so'zini alohida yozish shart emas (aks holda ustunlar ikki marta
  // yozilib, "INSERT has more target columns than expressions" xatosi
  // chiqadi).
  await sql`
    INSERT INTO extra_lessons ${sql([
      {
        title: "Rus tilida suhbat klubi",
        description: "Kundalik mavzularda kichik guruhlarda rus tilida erkin suhbat mashqi.",
        teacher: "Anna Sokolova",
        date_label: "21 avg",
        time_label: "18:00 - 19:00",
        seats_total: 12,
        seats_taken: 7,
      },
      {
        title: "Grammatika bo'yicha individual maslahat",
        description: "Kelishiklar va fe'l zamonlari bo'yicha o'qituvchi bilan yakka tartibda ishlash.",
        teacher: "Viktor Petrov",
        date_label: "23 avg",
        time_label: "17:00 - 18:00",
        seats_total: 8,
        seats_taken: 8,
      },
      {
        title: "Tinglab tushunish mashg'uloti",
        description: "Rus tilidagi audio va videolarni tinglab tushunish amaliyoti.",
        teacher: "Irina Kim",
        date_label: "25 avg",
        time_label: "19:00 - 20:00",
        seats_total: 15,
        seats_taken: 4,
      },
    ])}
  `;
}
