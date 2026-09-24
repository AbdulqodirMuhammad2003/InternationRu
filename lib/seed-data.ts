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
import { LESSON1_EXERCISES, type SeedExercise, type SeedQuestion } from "./seed-exercises";

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
    "extra_lesson_bookings",
    "extra_lessons",
    "ranking_entries",
    "marks",
    "user_unit_progress",
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

  // ---------- Darslar (Units) — "Интенсивный курс русского языка"
  // (И. С. Гусева, Н. М. Румянцева) kitobidagi 8 ta SIKL asosida.
  // Har bir sikl grammatik bosqichga qurilgan (mavzuviy emas) — 1-4-sikllar
  // A1, 5-8-sikllar esa A2 darajasiga mos keladi (kitobning "элементарный +
  // базовый" tuzilmasiga muvofiq).
  const units = [
    {
      code: "C1a",
      level: "A1",
      title: "1-dars",
      subtitle: "Harflar, tovushlar va birinchi so'zlar",
      color: "green",
      icon: "headphones",
      locked: 0,
      date: "11 avg",
      // "Ruscha tomosha" — mashqlar tugatilgach ochiladigan haqiqiy ruscha
      // parcha (5-10 daqiqa). Faqat rasmiy kanallardan va O'zbekistonda
      // ochiladiganlari tanlangan (Soyuzmultfilm klassikalari u yerda
      // bloklangan — "владелец запретил просмотр в вашей стране").
      clip: {
        url: "https://www.youtube.com/watch?v=1V3ZY_TXKwU",
        title: "Маша и Медведь — «Первая встреча»",
        kind: "multfilm",
        start: null,
        end: null,
      },
    },
    {
      code: "C1b",
      level: "A1",
      title: "2-dars",
      subtitle: "Kasblar, buyumlar va oziq-ovqat",
      color: "blue",
      icon: "book",
      locked: 1,
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
      code: "C1c",
      level: "A1",
      title: "3-dars",
      subtitle: "Tillar, mamlakatlar va egalik olmoshlari",
      color: "orange",
      icon: "chart",
      locked: 1,
      date: "",
      clip: {
        url: "https://www.youtube.com/watch?v=VQLLqosmixY",
        title: "Смешарики — самые весёлые серии",
        kind: "multfilm",
        start: 0,
        end: 600,
      },
    },
    {
      code: "C2",
      level: "A1",
      title: "4-dars",
      subtitle: "Ismlar va birinchi fe'l",
      color: "purple",
      icon: "chat",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C3",
      level: "A1",
      title: "5-dars",
      subtitle: "Fe'llar: bor-yo'q va harakatlar",
      color: "black",
      icon: "lock",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C4",
      level: "A1",
      title: "6-dars",
      subtitle: "Vaqt, joy va mashg'ulotlar",
      color: "green",
      icon: "headphones",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C5",
      level: "A2",
      title: "7-dars",
      subtitle: "Sifatlar va solishtirish darajasi",
      color: "blue",
      icon: "book",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C6",
      level: "A2",
      title: "8-dars",
      subtitle: "Fe'l turlari va \"Necha yosh?\"",
      color: "orange",
      icon: "chart",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C7",
      level: "A2",
      title: "9-dars",
      subtitle: "Harakat fe'llari va narx so'rash",
      color: "purple",
      icon: "chat",
      locked: 1,
      date: "",
      clip: null,
    },
    {
      code: "C8",
      level: "A2",
      title: "10-dars",
      subtitle: "Kelishiklar va harakat fe'llari",
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

  // Hozircha faqat 1-sikl (1, 2, 3-darslar) to'liq lug'at bilan tayyor —
  // demo foydalanuvchi ularni "0%" holatda ochib, yangi lug'at tizimini
  // birinchi marta sinab ko'ra oladi (so'zlar oldindan "yodlandi" deb
  // belgilanmagan).

  // ---------- Lug'at (Vocabulary) ----------

  type WordSeed = {
    emoji: string;
    word: string;
    transcription: string;
    pos: string;
    uz: string;
    /** So'zning rus tilidagi izohi (ta'rifi) — lug'at ma'nosi emas,
     *  balki so'zni rus tilida tushuntiruvchi ta'rif. */
    def: string;
    /** So'z ishtirok etgan namunaviy rus tilidagi gap — "gapda to'ldirish"
     *  bosqichida so'z o'rniga bo'sh joy qoldirish uchun ishlatiladi. */
    ex: string;
    /** `ex` gapining o'zbek tiliga tarjimasi. */
    exUz: string;
  };

  // 1-sikl: kitobning "Словарь цикла" ro'yxati — 95 so'z, xuddi kitobdagi
  // tartibda. Avval 3 ta katta guruhga (`cycle1Round1/2/3`) yig'ilgan —
  // quyida bu 95 so'z 3 ta darsga (~40/40/15 so'zdan), har biri esa 4
  // roundga (~10 so'zdan) bo'lib qayta taqsimlanadi. Misol gaplarning katta
  // qismi kitobning o'zidagi dialog va namunalardan olingan.
  const cycle1Round1: WordSeed[] = [
    { emoji: "👨", word: "Он", transcription: "on", pos: "olmosh", uz: "U (erkak)", def: "Местоимение 3-го лица единственного числа мужского рода.", ex: "Он тут, и она тут.", exUz: "U (erkak) shu yerda, u (ayol) ham shu yerda." },
    { emoji: "👩", word: "Она", transcription: "aná", pos: "olmosh", uz: "U (ayol)", def: "Местоимение 3-го лица единственного числа женского рода.", ex: "Мама дома? — Да, она дома.", exUz: "Onam uydami? — Ha, u uyda." },
    { emoji: "🔹", word: "Оно", transcription: "anó", pos: "olmosh", uz: "U (narsa, neytral)", def: "Местоимение 3-го лица единственного числа среднего рода.", ex: "Это окно. Оно там.", exUz: "Bu deraza. U ana u yerda." },
    { emoji: "👥", word: "Они", transcription: "aní", pos: "olmosh", uz: "Ular", def: "Местоимение 3-го лица множественного числа.", ex: "Это Инна и Анна? Да, это они.", exUz: "Bu Inna va Annami? Ha, bular ular." },
    { emoji: "👩‍👧", word: "Мама", transcription: "máma", pos: "ot", uz: "Onam / ona", def: "Женщина по отношению к своим детям.", ex: "Мама дома? — Да, она дома.", exUz: "Onam uydami? — Ha, u uyda." },
    { emoji: "👫", word: "Мы", transcription: "mi", pos: "olmosh", uz: "Biz", def: "Местоимение 1-го лица множественного числа.", ex: "Мы тут. А мама? — Мама дома.", exUz: "Biz shu yerdamiz. Onam-chi? — Onam uyda." },
    { emoji: "✅", word: "Да", transcription: "da", pos: "yuklama", uz: "Ha", def: "Слово, выражающее согласие или подтверждение.", ex: "Мама дома? — Да, она дома.", exUz: "Onam uydami? — Ha, u uyda." },
    { emoji: "🏠", word: "Дом", transcription: "dom", pos: "ot", uz: "Uy", def: "Здание, в котором живут люди.", ex: "Мой дом там.", exUz: "Mening uyim ana u yerda." },
    { emoji: "🏡", word: "Дома", transcription: "dóma", pos: "ravish", uz: "Uyda", def: "Наречие места со значением «в своём доме».", ex: "Мама и папа дома.", exUz: "Onam va otam uyda." },
    { emoji: "↔️", word: "А", transcription: "a", pos: "bog'lovchi", uz: "Ammo, -a (qarshi qo'yish)", def: "Союз, который используется для противопоставления двух фактов.", ex: "Он тут, а она там.", exUz: "U (erkak) shu yerda, u (ayol) esa u yerda." },
    { emoji: "📍", word: "Тут", transcription: "tut", pos: "ravish", uz: "Bu yerda", def: "Наречие места со значением «в этом, близком месте».", ex: "Мы тут. А мама?", exUz: "Biz shu yerdamiz. Onam-chi?" },
    { emoji: "📌", word: "Там", transcription: "tam", pos: "ravish", uz: "U yerda", def: "Наречие места со значением «в том, далёком месте».", ex: "Мой дом там.", exUz: "Mening uyim ana u yerda." },
    { emoji: "👉", word: "Это", transcription: "éta", pos: "olmosh", uz: "Bu", def: "Местоимение, указывающее на предмет или человека рядом.", ex: "Это ты? Это мы.", exUz: "Bu senmisan? Bu bizmiz." },
    { emoji: "👨‍👧", word: "Папа", transcription: "pápa", pos: "ot", uz: "Otam / ota", def: "Мужчина по отношению к своим детям.", ex: "Мама и папа дома.", exUz: "Onam va otam uyda." },
    { emoji: "➕", word: "И", transcription: "i", pos: "bog'lovchi", uz: "Va", def: "Союз, который соединяет слова или предложения.", ex: "Мама и папа дома.", exUz: "Onam va otam uyda." },
    { emoji: "👆", word: "Ты", transcription: "ti", pos: "olmosh", uz: "Sen", def: "Местоимение 2-го лица единственного числа (неформальное обращение).", ex: "Это ты? Это ты?", exUz: "Bu senmisan? Bu senmisan?" },
    { emoji: "🥖", word: "Батон", transcription: "batón", pos: "ot", uz: "Uzun non (baton)", def: "Белый хлеб продолговатой формы.", ex: "Вот батон.", exUz: "Mana baton (uzun non)." },
    { emoji: "🍌", word: "Банан", transcription: "banán", pos: "ot", uz: "Banan", def: "Жёлтый продолговатый сладкий фрукт.", ex: "Это банан.", exUz: "Bu banan." },
    { emoji: "🪟", word: "Окно", transcription: "aknó", pos: "ot", uz: "Deraza", def: "Отверстие в стене для света и воздуха.", ex: "Это окно. Оно там.", exUz: "Bu deraza. U ana u yerda." },
    { emoji: "🎬", word: "Кино", transcription: "kinó", pos: "ot", uz: "Kino", def: "Фильм или место, где его показывают.", ex: "Это кино. Кино там.", exUz: "Bu kino. Kino ana u yerda." },
    { emoji: "🏦", word: "Банк", transcription: "bank", pos: "ot", uz: "Bank", def: "Учреждение, где хранят и обменивают деньги.", ex: "Вот банк. Банк там.", exUz: "Mana bank. Bank ana u yerda." },
    { emoji: "🔤", word: "Буква", transcription: "búkva", pos: "ot", uz: "Harf", def: "Знак письма, обозначающий звук.", ex: "Это буква. Буква тут.", exUz: "Bu harf. Harf shu yerda." },
    { emoji: "✍️", word: "Диктант", transcription: "diktánt", pos: "ot", uz: "Diktant (imlo yozuvi)", def: "Письменное упражнение под диктовку.", ex: "Это диктант.", exUz: "Bu diktant." },
    { emoji: "🛋️", word: "Комната", transcription: "kómnata", pos: "ot", uz: "Xona", def: "Часть дома или квартиры.", ex: "Это комната. Комната тут.", exUz: "Bu xona. Xona shu yerda." },
    { emoji: "🔀", word: "Но", transcription: "no", pos: "bog'lovchi", uz: "Lekin", def: "Союз, который выражает противоречие.", ex: "Дом там, но комната тут.", exUz: "Uy ana u yerda, lekin xona shu yerda." },
    { emoji: "📖", word: "Книга", transcription: "kníga", pos: "ot", uz: "Kitob", def: "Печатное издание для чтения.", ex: "Вот книга Ивана.", exUz: "Mana Ivanning kitobi." },
    { emoji: "💧", word: "Вода", transcription: "vadá", pos: "ot", uz: "Suv", def: "Прозрачная жидкость, которую пьют.", ex: "Вот вода.", exUz: "Mana suv." },
    { emoji: "🙋", word: "Вы", transcription: "vi", pos: "olmosh", uz: "Siz", def: "Местоимение 2-го лица (вежливое обращение или множественное число).", ex: "Вы студент? — Да, я студент.", exUz: "Siz talabamisiz? — Ha, men talabaman." },
    { emoji: "📷", word: "Фото", transcription: "fóta", pos: "ot", uz: "Foto (surat)", def: "Изображение, снятое фотоаппаратом.", ex: "Вот фото Ивана.", exUz: "Mana Ivanning fotosurati." },
    { emoji: "🚪", word: "Вход", transcription: "fxot", pos: "ot", uz: "Kirish joyi", def: "Место, через которое входят внутрь.", ex: "Вход тут, а выход там.", exUz: "Kirish joyi shu yerda, chiqish joyi esa ana u yerda." },
    { emoji: "🚶", word: "Выход", transcription: "víxat", pos: "ot", uz: "Chiqish joyi", def: "Место, через которое выходят наружу.", ex: "Вход тут, а выход там.", exUz: "Kirish joyi shu yerda, chiqish joyi esa ana u yerda." },
    { emoji: "📜", word: "Стихи", transcription: "stikhí", pos: "ot (ko'plik)", uz: "She'rlar", def: "Произведение в стихотворной форме.", ex: "Это стихи поэта.", exUz: "Bu shoirning she'rlari." },
  ];

  const cycle1Round2: WordSeed[] = [
    { emoji: "✒️", word: "Поэт", transcription: "paét", pos: "ot", uz: "Shoir", def: "Человек, который пишет стихи.", ex: "Это стихи поэта.", exUz: "Bu shoirning she'rlari." },
    { emoji: "🧑‍🤝‍🧑", word: "Друг", transcription: "druk", pos: "ot", uz: "Do'st", def: "Близкий, верный человек.", ex: "Это друг сына.", exUz: "Bu o'g'ilning do'sti." },
    { emoji: "👭", word: "Подруга", transcription: "padrúga", pos: "ot", uz: "Do'st (ayol)", def: "Близкая, верная женщина или девушка.", ex: "Это моя подруга.", exUz: "Bu mening do'stim (ayol)." },
    { emoji: "👦", word: "Брат", transcription: "brat", pos: "ot", uz: "Aka / uka", def: "Сын тех же родителей.", ex: "Иван — мой родной брат.", exUz: "Ivan — mening tug'ishgan akam (yoki ukam)." },
    { emoji: "👨‍👩‍👧‍👦", word: "Группа", transcription: "grúppa", pos: "ot", uz: "Guruh", def: "Люди, которые вместе учатся или работают.", ex: "Это моя группа.", exUz: "Bu mening guruhim." },
    { emoji: "📚", word: "Урок", transcription: "urók", pos: "ot", uz: "Dars", def: "Занятие в процессе обучения.", ex: "Урок тут.", exUz: "Dars shu yerda." },
    { emoji: "📻", word: "Радио", transcription: "rádia", pos: "ot", uz: "Radio", def: "Устройство или передача звука в эфире.", ex: "Моё радио.", exUz: "Mening radiom." },
    { emoji: "🏙️", word: "Город", transcription: "górat", pos: "ot", uz: "Shahar", def: "Большой населённый пункт.", ex: "Мой родной город — Москва.", exUz: "Mening tug'ilgan shahrim — Moskva." },
    { emoji: "⚽", word: "Спорт", transcription: "sport", pos: "ot", uz: "Sport", def: "Физические упражнения и соревнования.", ex: "Это спорт.", exUz: "Bu sport." },
    { emoji: "🌍", word: "Страна", transcription: "straná", pos: "ot", uz: "Mamlakat", def: "Территория с определёнными границами и государством.", ex: "Моя родная страна — Россия.", exUz: "Mening vatanim — Rossiya." },
    { emoji: "❓", word: "Вопрос", transcription: "vaprós", pos: "ot", uz: "Savol", def: "Фраза, которая требует ответа.", ex: "Это вопрос.", exUz: "Bu savol." },
    { emoji: "👦", word: "Сын", transcription: "sin", pos: "ot", uz: "O'g'il", def: "Ребёнок мужского пола по отношению к родителям.", ex: "Это сын брата.", exUz: "Bu akaning (ukaning) o'g'li." },
    { emoji: "🖼️", word: "Выставка", transcription: "vístafka", pos: "ot", uz: "Ko'rgazma", def: "Мероприятие, на котором показывают предметы.", ex: "Вот выставка.", exUz: "Mana ko'rgazma." },
    { emoji: "🚌", word: "Автобус", transcription: "aftóbus", pos: "ot", uz: "Avtobus", def: "Большой транспорт для перевозки пассажиров.", ex: "Вот остановка автобуса.", exUz: "Mana avtobus bekati." },
    { emoji: "🚏", word: "Остановка", transcription: "astanófka", pos: "ot", uz: "Bekat", def: "Место, где останавливается транспорт.", ex: "Вот остановка автобуса.", exUz: "Mana avtobus bekati." },
    { emoji: "🔊", word: "Звук", transcription: "zvuk", pos: "ot", uz: "Tovush", def: "То, что слышно; единица речи.", ex: "Это звук.", exUz: "Bu tovush." },
    { emoji: "1️⃣", word: "Один раз", transcription: "adín ras", pos: "ravish", uz: "Bir marta", def: "Наречие со значением «только один раз».", ex: "Это один раз.", exUz: "Bu bir marta." },
    { emoji: "🔁", word: "Много раз", transcription: "mnóga ras", pos: "ravish", uz: "Ko'p marta", def: "Наречие со значением «несколько раз».", ex: "Это много раз.", exUz: "Bu ko'p marta." },
    { emoji: "📅", word: "Завтра", transcription: "záftra", pos: "ravish", uz: "Ertaga", def: "День после сегодняшнего дня.", ex: "Пока, увидимся завтра!", exUz: "Xayr, ertaga ko'rishamiz!" },
    { emoji: "🏪", word: "Магазин", transcription: "magazín", pos: "ot", uz: "Do'kon", def: "Место, где продают товары.", ex: "Вот магазин.", exUz: "Mana do'kon." },
    { emoji: "🔤", word: "Слово", transcription: "slóva", pos: "ot", uz: "So'z", def: "Единица речи, имеющая значение.", ex: "Это слово.", exUz: "Bu so'z." },
    { emoji: "🧱", word: "Основа слова", transcription: "asnóva slóva", pos: "ot", uz: "So'z asosi (o'zagi)", def: "Неизменяемая основная часть слова.", ex: "Основа слова тут.", exUz: "So'z asosi shu yerda." },
    { emoji: "🪑", word: "Стол", transcription: "stol", pos: "ot", uz: "Stol", def: "Мебель для работы или еды.", ex: "Где твой стол? — Мой стол слева.", exUz: "Sening stoling qayerda? — Mening stolim chap tomonda." },
    { emoji: "💺", word: "Стул", transcription: "stul", pos: "ot", uz: "Stul", def: "Мебель для сидения.", ex: "Это стул.", exUz: "Bu stul." },
    { emoji: "🏫", word: "Класс", transcription: "klas", pos: "ot", uz: "Sinf", def: "Комната или группа учеников.", ex: "Это класс.", exUz: "Bu sinf." },
    { emoji: "🧽", word: "Ластик", transcription: "lástik", pos: "ot", uz: "O'chirg'ich", def: "Предмет для стирания написанного.", ex: "Вот ластик.", exUz: "Mana o'chirg'ich." },
    { emoji: "🥛", word: "Молоко", transcription: "malakó", pos: "ot", uz: "Sut", def: "Белый напиток, который дают животные.", ex: "Молоко нужно поставить в холодильник.", exUz: "Sutni muzlatgichga qo'yish kerak." },
    { emoji: "🧈", word: "Масло", transcription: "másla", pos: "ot", uz: "Moy / sariyog'", def: "Жировой продукт питания.", ex: "Масло тут.", exUz: "Moy (sariyog') shu yerda." },
    { emoji: "🍞", word: "Хлеб", transcription: "khlep", pos: "ot", uz: "Non", def: "Основной продукт питания, приготовленный из муки.", ex: "Хлеб лежит на столе.", exUz: "Non stol ustida yotibdi." },
    { emoji: "🍋", word: "Лимон", transcription: "limón", pos: "ot", uz: "Limon", def: "Кислый жёлтый фрукт.", ex: "Это лимон.", exUz: "Bu limon." },
    { emoji: "🙋‍♂️", word: "Я", transcription: "ya", pos: "olmosh", uz: "Men", def: "Местоимение 1-го лица единственного числа.", ex: "Да, я студент.", exUz: "Ha, men talabaman." },
    { emoji: "🍽️", word: "Столовая", transcription: "stalóvaya", pos: "ot", uz: "Oshxona (ovqatlanish joyi)", def: "Место, предназначенное для приёма пищи.", ex: "Это столовая.", exUz: "Bu oshxona." },
  ];

  const cycle1Round3: WordSeed[] = [
    { emoji: "❓", word: "Кто", transcription: "kto", pos: "olmosh", uz: "Kim", def: "Вопросительное местоимение о человеке.", ex: "Кто это? Это Инна.", exUz: "Bu kim? Bu Inna." },
    { emoji: "⚖️", word: "Юрист", transcription: "yuríst", pos: "ot", uz: "Yurist (huquqshunos)", def: "Специалист в области права.", ex: "Он юрист, и она юрист.", exUz: "U (erkak) yurist, u (ayol) ham yurist." },
    { emoji: "🧑‍🎓", word: "Студент", transcription: "studént", pos: "ot", uz: "Talaba (yigit)", def: "Учащийся высшего учебного заведения мужского пола.", ex: "Вы студент? — Да, я студент.", exUz: "Siz talabamisiz? — Ha, men talabaman." },
    { emoji: "👩‍🎓", word: "Студентка", transcription: "studéntka", pos: "ot", uz: "Talaba (qiz)", def: "Учащаяся высшего учебного заведения женского пола.", ex: "И Анна студентка.", exUz: "Anna ham talaba (qiz)." },
    { emoji: "❌", word: "Нет", transcription: "net", pos: "yuklama", uz: "Yo'q", def: "Слово, выражающее отрицание.", ex: "Нет, Ирина не студентка, она артистка.", exUz: "Yo'q, Irina talaba emas, u artistka." },
    { emoji: "🚫", word: "Не", transcription: "ne", pos: "yuklama", uz: "-mas / emas (inkor yuklamasi)", def: "Частица отрицания перед словом.", ex: "Нет, я не доктор, я агроном.", exUz: "Yo'q, men shifokor emasman, men agronomman." },
    { emoji: "🎭", word: "Артист(-ка)", transcription: "artíst(ka)", pos: "ot", uz: "Artist (aktyor / aktrisa)", def: "Работник театра или кино.", ex: "Она не студентка, она артистка.", exUz: "U talaba emas, u artistka." },
    { emoji: "👨‍⚕️", word: "Доктор", transcription: "dóktar", pos: "ot", uz: "Shifokor", def: "Специалист, который лечит больных.", ex: "Вы доктор? — Нет, я не доктор, я агроном.", exUz: "Siz shifokormisiz? — Yo'q, men shifokor emasman, men agronomman." },
    { emoji: "🌾", word: "Агроном", transcription: "agranóm", pos: "ot", uz: "Agronom", def: "Специалист по сельскому хозяйству.", ex: "Я не доктор, я агроном.", exUz: "Men shifokor emasman, men agronomman." },
    { emoji: "🏃", word: "Спортсмен(-ка)", transcription: "spartsmén(ka)", pos: "ot", uz: "Sportchi", def: "Человек, который занимается спортом.", ex: "Он студент-биолог и спортсмен.", exUz: "U biolog-talaba va sportchi." },
    { emoji: "🔬", word: "Биолог", transcription: "biólak", pos: "ot", uz: "Biolog", def: "Специалист в области биологии.", ex: "Он студент-биолог и спортсмен.", exUz: "U biolog-talaba va sportchi." },
    { emoji: "📰", word: "Газета", transcription: "gazéta", pos: "ot", uz: "Gazeta", def: "Периодическое издание с новостями.", ex: "Вот газета.", exUz: "Mana gazeta." },
    { emoji: "🙋‍♂️", word: "Мой (моя, моё, мои)", transcription: "moy (mayá, mayó, maí)", pos: "olmosh", uz: "Mening -im (egalik olmoshi)", def: "Притяжательное местоимение со значением «принадлежащий мне».", ex: "Мой стол слева. Моя мама дома.", exUz: "Mening stolim chap tomonda. Mening onam uyda." },
    { emoji: "👆", word: "Твой (твоя, твоё, твои)", transcription: "tvoy (tvayá, tvayó, tvaí)", pos: "olmosh", uz: "Sening -ing (egalik olmoshi)", def: "Притяжательное местоимение со значением «принадлежащий тебе».", ex: "Где твой стол? — Мой стол слева.", exUz: "Sening stoling qayerda? — Mening stolim chap tomonda." },
    { emoji: "📍", word: "Место", transcription: "mésta", pos: "ot", uz: "Joy / o'rin", def: "Пространство, где кто-то или что-то находится.", ex: "Моё место справа.", exUz: "Mening o'rnim o'ng tomonda." },
    { emoji: "❗", word: "Проблема", transcription: "prabléma", pos: "ot", uz: "Muammo", def: "Трудность, которую нужно решить.", ex: "Твоя проблема тут.", exUz: "Sening muammoing shu yerda." },
    { emoji: "❓", word: "Где", transcription: "gde", pos: "olmosh", uz: "Qayerda", def: "Вопросительное местоимение о месте.", ex: "Где твой стол? — Мой стол слева.", exUz: "Sening stoling qayerda? — Mening stolim chap tomonda." },
    { emoji: "⬅️", word: "Слева", transcription: "sléva", pos: "ravish", uz: "Chap tomonda", def: "Наречие места «на левой стороне».", ex: "Мой стол слева.", exUz: "Mening stolim chap tomonda." },
    { emoji: "➡️", word: "Справа", transcription: "správa", pos: "ravish", uz: "O'ng tomonda", def: "Наречие места «на правой стороне».", ex: "Моё место справа.", exUz: "Mening o'rnim o'ng tomonda." },
    { emoji: "❤️", word: "Родной(-ая, -ое, -ые)", transcription: "radnóy", pos: "sifat", uz: "Tug'ishgan / ona (til, yurt)", def: "Близкий по рождению — родной край, родной язык, родная семья.", ex: "Мой родной город — Москва.", exUz: "Mening tug'ilgan shahrim — Moskva." },
    { emoji: "🗣️", word: "Язык", transcription: "yazík", pos: "ot", uz: "Til", def: "Система общения между людьми.", ex: "Родной язык Инны и Анны — русский.", exUz: "Inna va Annaning ona tili — rus tili." },
    { emoji: "🇷🇺", word: "Русский", transcription: "rússkiy", pos: "sifat", uz: "Rus (tili / millati)", def: "Относящийся к России, к русскому языку.", ex: "Родной язык Инны и Анны — русский.", exUz: "Inna va Annaning ona tili — rus tili." },
    { emoji: "🇩🇪", word: "Немецкий (германский)", transcription: "nemétskiy", pos: "sifat", uz: "Nemis (tili)", def: "Относящийся к Германии, к немецкому языку.", ex: "Родной язык Карла и Клары — германский.", exUz: "Karl va Klaraning ona tili — nemis tili." },
    { emoji: "🇨🇳", word: "Китайский", transcription: "kitáyskiy", pos: "sifat", uz: "Xitoy (tili)", def: "Относящийся к Китаю, к китайскому языку.", ex: "Родной язык Ван Фана — китайский.", exUz: "Van Fanning ona tili — xitoy tili." },
    { emoji: "💬", word: "Диалог", transcription: "dialók", pos: "ot", uz: "Dialog (suhbat)", def: "Разговор между двумя людьми.", ex: "Это диалог.", exUz: "Bu dialog (suhbat)." },
    { emoji: "🏞️", word: "Родина", transcription: "ródina", pos: "ot", uz: "Vatan", def: "Страна, где человек родился.", ex: "Китай — моя родная страна (= родина).", exUz: "Xitoy — mening vatanim." },
    { emoji: "🇷🇺", word: "Россия", transcription: "rassíya", pos: "ot", uz: "Rossiya", def: "Государство в Европе и Азии.", ex: "Моя родная страна — Россия.", exUz: "Mening vatanim — Rossiya." },
    { emoji: "🇩🇪", word: "Германия", transcription: "germániya", pos: "ot", uz: "Germaniya", def: "Государство в Европе.", ex: "Родная страна Карла — Германия.", exUz: "Karlning vatani — Germaniya." },
    { emoji: "🇨🇳", word: "Китай", transcription: "kitáy", pos: "ot", uz: "Xitoy", def: "Государство в Азии.", ex: "Родная страна Ван Фана — Китай.", exUz: "Van Fanning vatani — Xitoy." },
    { emoji: "🇰🇷", word: "Корея", transcription: "karéya", pos: "ot", uz: "Koreya", def: "Государство в Азии.", ex: "Родная страна Хе Ёна — Корея.", exUz: "Xe Yonning vatani — Koreya." },
    { emoji: "👧", word: "Сестра", transcription: "sestrá", pos: "ot", uz: "Opa / singil", def: "Дочь тех же родителей.", ex: "Анна — моя родная сестра.", exUz: "Anna — mening tug'ishgan opam (yoki singlim)." },
  ];

  async function createRound(unitId: number, title: string, order: number, words: WordSeed[]) {
    const [round] = await sql<{ id: number }[]>`
      INSERT INTO vocabulary_rounds (unit_id, title, order_index) VALUES (${unitId}, ${title}, ${order})
      RETURNING id
    `;
    const roundId = round.id;

    const rows = words.map((w, i) => ({
      round_id: roundId,
      emoji: w.emoji,
      word: w.word,
      transcription: w.transcription,
      part_of_speech: w.pos,
      translation_uz: w.uz,
      definition: w.def,
      example_sentence: w.ex,
      example_translation: w.exUz,
      order_index: i + 1,
    }));
    // postgres.js'ning ko'p qatorli INSERT yordamchisi — har bir so'z uchun
    // alohida so'rov yubormaslik uchun (tezroq, Supabase'ga kam murojaat).
    await sql`INSERT INTO vocabulary_words ${sql(rows)}`;

    return roundId;
  }

  // 95 so'zni 3 ta darsga (~40/40/15) va har birini 4 roundga (~10 so'zdan)
  // taqsimlaymiz — mavjud `cycle1Round1/2/3` massivlaridan bo'lib olish
  // orqali (so'zlar qayta terilmaydi, faqat qismlarga bo'linadi).
  const dars1Round1 = cycle1Round1.slice(0, 10);
  const dars1Round2 = cycle1Round1.slice(10, 20);
  const dars1Round3 = cycle1Round1.slice(20, 30);
  const dars1Round4 = [...cycle1Round1.slice(30, 32), ...cycle1Round2.slice(0, 8)];

  const dars2Round1 = cycle1Round2.slice(8, 18);
  const dars2Round2 = cycle1Round2.slice(18, 28);
  const dars2Round3 = [...cycle1Round2.slice(28, 32), ...cycle1Round3.slice(0, 6)];
  const dars2Round4 = cycle1Round3.slice(6, 16);

  const dars3Round1 = cycle1Round3.slice(16, 20);
  const dars3Round2 = cycle1Round3.slice(20, 24);
  const dars3Round3 = cycle1Round3.slice(24, 28);
  const dars3Round4 = cycle1Round3.slice(28, 31);

  await createRound(unitIds["C1a"], "1-bosqich", 1, dars1Round1);
  await createRound(unitIds["C1a"], "2-bosqich", 2, dars1Round2);
  await createRound(unitIds["C1a"], "3-bosqich", 3, dars1Round3);
  await createRound(unitIds["C1a"], "4-bosqich", 4, dars1Round4);

  await createRound(unitIds["C1b"], "1-bosqich", 1, dars2Round1);
  await createRound(unitIds["C1b"], "2-bosqich", 2, dars2Round2);
  await createRound(unitIds["C1b"], "3-bosqich", 3, dars2Round3);
  await createRound(unitIds["C1b"], "4-bosqich", 4, dars2Round4);

  await createRound(unitIds["C1c"], "1-bosqich", 1, dars3Round1);
  await createRound(unitIds["C1c"], "2-bosqich", 2, dars3Round2);
  await createRound(unitIds["C1c"], "3-bosqich", 3, dars3Round3);
  await createRound(unitIds["C1c"], "4-bosqich", 4, dars3Round4);

  // ---------- Mashqlar (Exercises) ----------
  await insertExercises(sql, unitIds["C1a"], LESSON1_EXERCISES);

  async function addSimpleExercise(
    unitId: number,
    title: string,
    skill: string,
    questions: SeedQuestion[]
  ) {
    await insertExercises(sql, unitId, [
      { title, skill, kind: "choice", instructions: "To'g'ri javobni tanlang.", questions },
    ]);
  }

  await addSimpleExercise(unitIds["C1c"], "1-topshiriq", "Olmoshlar", [
    { prompt: "«Она» olmoshi kimga nisbatan ishlatiladi?", options: ["Erkakka", "Ayolga", "Ko'plikka", "Narsaga"], correct: 1 },
    { prompt: "«Мой стол» iborasidagi «мой» nima ma'noni bildiradi?", options: ["Sening", "Mening", "Bizning", "Ularning"], correct: 1 },
    { prompt: "«Да» so'zining tarjimasi qanday?", options: ["Yo'q", "Ha", "Balki", "Albatta"], correct: 1 },
    { prompt: "«Где» so'zi nimani so'raydi?", options: ["Kim", "Nima", "Qayerda", "Qachon"], correct: 2 },
  ]);

  await addSimpleExercise(unitIds["C1c"], "2-topshiriq", "So'z boyligi", [
    { prompt: "«Родной город» iborasi nimani anglatadi?", options: ["Yangi shahar", "Tug'ilgan shahar", "Katta shahar", "Chet el shahri"], correct: 1 },
    { prompt: "«Студентка» kim?", options: ["O'qituvchi ayol", "Talaba qiz", "Shifokor ayol", "Sotuvchi ayol"], correct: 1 },
    { prompt: "«Слева» so'zining tarjimasi qanday?", options: ["O'ng tomonda", "Chap tomonda", "Yuqorida", "Pastda"], correct: 1 },
  ]);

  // ---------- Baholar (Marks) ----------
  await sql`
    INSERT INTO marks (user_id, unit_id, subject, score, max_score, date)
    VALUES (${userId}, ${unitIds["C1a"]}, ${"Tinglab tushunish"}, ${96}, ${100}, ${"2026-08-11"})
  `;
  await sql`
    INSERT INTO marks (user_id, unit_id, subject, score, max_score, date)
    VALUES (${userId}, ${null}, ${"Sinov testi (A1 darajasi)"}, ${78}, ${100}, ${"2026-08-17"})
  `;

  // ---------- Reyting (Ranking) ----------
  const branchNames = [
    "Sherzod Karimov", "Nilufar Tosheva", "Aziz Rahimov", "Dilnoza Yuldasheva",
    "Otabek Nazarov", "Madina Yusupova", "Jasur Aminov", "Sevara Ismoilova",
    "Behruz Sobirov", "Gulnoza Ergasheva",
  ];
  const branchRows = branchNames.map((name, i) => ({
    user_id: userId,
    scope: "branch",
    display_name: name,
    points: 15000 - i * 620,
    place: i + 1,
  }));
  branchRows.push({ user_id: userId, scope: "branch", display_name: "Abdulqodir Xabibullayev", points: 11130, place: 20 });
  await sql`INSERT INTO ranking_entries ${sql(branchRows)}`;

  const groupNames = ["Dilshod Norov", "Kamola Ahmedova", "Sanjar Yuldashev", "Zarina Po'latova"];
  const groupRows = groupNames.map((name, i) => ({
    user_id: userId,
    scope: "group",
    display_name: name,
    points: 13200 - i * 700,
    place: i + 1,
  }));
  groupRows.push({ user_id: userId, scope: "group", display_name: "Abdulqodir Xabibullayev", points: 11130, place: 5 });
  await sql`INSERT INTO ranking_entries ${sql(groupRows)}`;

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
