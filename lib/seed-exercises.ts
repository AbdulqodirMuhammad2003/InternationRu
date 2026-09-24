/**
 * Darslarning mashqlari (topshiriqlari) — Гусева, Румянцева «Интенсивный курс
 * русского языка», 1-sikl asosida. Mashq turi (`kind`) savol qanday
 * ko'rsatilishini belgilaydi:
 *   - choice  — katta so'z/gap va variantlar (odatiy test);
 *   - listen  — `audio` ovoz chiqarib o'qiladi, eshitilgan so'z tanlanadi;
 *   - dialog  — `prompt` suhbatdoshning savoli, javob variantlardan tanlanadi;
 *   - ending  — `prompt` "книга (Иван)" ko'rinishida, qo'shimcha tanlanadi;
 *   - anagram — `prompt` aralash harflar, `answer` yig'ilishi kerak bo'lgan so'z;
 *   - type    — `prompt` berilgan so'z, `answer` o'quvchi yozadigan javob
 *               (bir nechta to'g'ri javob "|" bilan ajratiladi).
 * `explanation` — javobdan keyin ko'rsatiladigan qisqa izoh.
 */

export type ExerciseKind = "choice" | "listen" | "dialog" | "ending" | "anagram" | "type";

export interface SeedQuestion {
  prompt: string;
  options?: string[];
  correct?: number;
  audio?: string;
  answer?: string;
  explanation?: string;
}

export interface SeedExercise {
  title: string;
  skill: string;
  kind: ExerciseKind;
  instructions: string;
  questions: SeedQuestion[];
}

const PRONOUNS = ["он", "она", "оно", "они"];
const ENDINGS = ["а", "ы", "и", "у"];

/** Harflarni har safar bir xil tartibda aralashtiradi (seed qayta ishga
 *  tushirilganda ham mashq o'zgarmasligi uchun). */
function scramble(word: string) {
  const a = word.split("");
  let seed = word.length * 7;
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 31 + 11) % 97;
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("") === word ? a.reverse().join("") : a.join("");
}

function listen(word: string, options: string[], explanation?: string): SeedQuestion {
  return { prompt: "Eshitgan so'zingizni toping", audio: word, options, correct: options.indexOf(word), explanation };
}

function ending(noun: string, owner: string, end: string, explanation?: string): SeedQuestion {
  return { prompt: `${noun} (${owner})`, options: ENDINGS, correct: ENDINGS.indexOf(end), explanation };
}

/** 1-dars: harflar, tovushlar va birinchi so'zlar (kitobning 1–14-mashqlari
 *  va 1-sikl oxiridagi «Упражнения» 2–4). Har bir mashqda 10 ta savol. */
export const LESSON1_EXERCISES: SeedExercise[] = [
  {
    title: "Tinglang va toping",
    skill: "Tinglash",
    kind: "listen",
    instructions:
      "So'z ovoz chiqarib o'qiladi. Diqqat bilan tinglang va eshitgan so'zingizni toping. Qayta eshitish uchun tugmani bosing.",
    questions: [
      listen("дом", ["дом", "дома", "там", "да"]),
      listen("дома", ["дом", "дома", "мама", "тут"], "Дом — uy, дома — uyda."),
      listen("тут", ["там", "тот", "тут", "ты"], "Тут — shu yerda, там — u yerda."),
      listen("там", ["тут", "там", "мама", "да"]),
      listen("окно", ["окно", "кино", "она", "оно"]),
      listen("кино", ["окно", "кино", "книга", "они"]),
      listen("вход", ["вход", "выход", "вода", "вы"]),
      listen("выход", ["вход", "выход", "вода", "вы"], "Вход — kirish, выход — chiqish."),
      listen("подруга", ["друг", "подруга", "группа", "город"]),
      listen("брат", ["банк", "брат", "батон", "банан"]),
    ],
  },
  {
    title: "Он, она, оно или они?",
    skill: "Grammatika",
    kind: "choice",
    instructions:
      "So'z o'rniga qaysi olmosh ishlatiladi: он, она, оно yoki они? Masalan: мама → она, окно → оно.",
    questions: [
      { prompt: "батон", options: PRONOUNS, correct: 0, explanation: "Undosh bilan tugagan so'z — он." },
      { prompt: "комната", options: PRONOUNS, correct: 1, explanation: "-а bilan tugagan so'z — она." },
      { prompt: "окно", options: PRONOUNS, correct: 2, explanation: "-о bilan tugagan so'z — оно." },
      { prompt: "мама и папа", options: PRONOUNS, correct: 3, explanation: "Bir nechta kishi — они." },
      { prompt: "кино", options: PRONOUNS, correct: 2 },
      { prompt: "буква", options: PRONOUNS, correct: 1 },
      {
        prompt: "папа",
        options: PRONOUNS,
        correct: 0,
        explanation: "Istisno! «Папа» -а bilan tugasa ham erkak kishi — он.",
      },
      { prompt: "диктант", options: PRONOUNS, correct: 0 },
      { prompt: "радио", options: PRONOUNS, correct: 2 },
      { prompt: "подруга", options: PRONOUNS, correct: 1 },
    ],
  },
  {
    title: "Suhbatni davom ettiring",
    skill: "Dialog",
    kind: "dialog",
    instructions: "Suhbatdoshingiz savol berdi. Unga mos javobni tanlang.",
    questions: [
      {
        prompt: "Кто это?",
        options: ["Это Инна.", "Это книга.", "Да, она дома.", "Тут."],
        correct: 0,
        explanation: "«Кто?» (kim?) odam haqida so'raydi.",
      },
      {
        prompt: "Мама дома?",
        options: ["Да, она дома.", "Да, он дома.", "Это дом.", "Там окно."],
        correct: 0,
        explanation: "Мама — она.",
      },
      { prompt: "Это мама и папа?", options: ["Да, это они.", "Да, это она.", "Да, это он.", "Да, это оно."], correct: 0 },
      { prompt: "Вы Иван?", options: ["Да, Иван.", "Да, это дом.", "Он тут.", "Это мама."], correct: 0 },
      {
        prompt: "Дом там?",
        options: ["Да, он там.", "Да, она там.", "Да, оно там.", "Да, они там."],
        correct: 0,
        explanation: "Дом — он.",
      },
      { prompt: "Кто там? Антон?", options: ["Да, там Антон.", "Да, там окно.", "Это дом.", "Мама дома?"], correct: 0 },
      { prompt: "Кто дома?", options: ["Мы дома.", "Дом там.", "Это дом.", "Да, дом."], correct: 0 },
      { prompt: "Мы тут. А мама?", options: ["Мама дома.", "Мама — она.", "Это мы.", "Да, мы тут."], correct: 0 },
      { prompt: "Мама дома, а папа?", options: ["И папа дома.", "А папа мама.", "Папа — она.", "Это дом."], correct: 0 },
      {
        prompt: "Он тут, … она там.",
        options: ["и", "а", "но", "да"],
        correct: 1,
        explanation: "Qarama-qarshi qo'yilsa — «а» (Он тут, а она там).",
      },
    ],
  },
  {
    title: "Kimning?",
    skill: "Egalik",
    kind: "ending",
    instructions:
      "Bu narsa kimniki? Ismga to'g'ri qo'shimchani qo'shing. Masalan: книга (Иван) → книга Ивана, фото (мама) → фото мамы.",
    questions: [
      ending("книга", "Иван", "а", "Undosh bilan tugagan ismga -а qo'shiladi: Ивана."),
      ending("фото", "мама", "ы", "-а → -ы: мама → мамы."),
      ending("комната", "Анна", "ы"),
      ending("друг", "брат", "а"),
      ending("дом", "папа", "ы", "Папа ham мама kabi o'zgaradi: папы."),
      ending("книга", "Антон", "а"),
      ending("подруга", "Инна", "ы"),
      ending("фото", "Нина", "ы"),
      ending("стихи", "поэт", "а"),
      ending("брат", "друг", "а"),
    ],
  },
  {
    title: "So'zni toping",
    skill: "Harflar",
    kind: "anagram",
    instructions:
      "Harflar aralashib ketgan. Ularni to'g'ri tartibda bosib, 1-darsdagi so'zni yig'ing. Masalan: нотамак → комната.",
    questions: [
      // Birinchi ikkitasi kitobdagi «Узнайте слово» mashqidan aynan olingan.
      { prompt: "нотамак", answer: "комната" },
      { prompt: "пурпаг", answer: "группа" },
      ...["диктант", "банан", "книга", "подруга", "город"].map((w) => ({ prompt: scramble(w), answer: w })),
      // scramble("окно") "окон" beradi — bu ham haqiqiy so'z, chalg'itmasligi uchun qo'lda.
      { prompt: "нкоо", answer: "окно" },
      ...["урок", "радио"].map((w) => ({ prompt: scramble(w), answer: w })),
    ],
  },
  {
    title: "Bitta — ko'p",
    skill: "Yozish",
    kind: "type",
    instructions:
      "So'zni ko'plik shaklida yozing (bitta narsa → ko'p narsa). Masalan: банан → бананы, книга → книги. Pastdagi klaviaturadan foydalanishingiz mumkin.",
    questions: [
      { prompt: "батон", answer: "батоны", explanation: "Undoshdan keyin -ы qo'shiladi." },
      { prompt: "банан", answer: "бананы" },
      { prompt: "буква", answer: "буквы", explanation: "-а → -ы." },
      { prompt: "комната", answer: "комнаты" },
      { prompt: "диктант", answer: "диктанты" },
      { prompt: "поэт", answer: "поэты" },
      { prompt: "урок", answer: "уроки", explanation: "г, к, х dan keyin -ы emas, -и yoziladi." },
      { prompt: "книга", answer: "книги", explanation: "г dan keyin -и: книги." },
      { prompt: "подруга", answer: "подруги" },
      { prompt: "группа", answer: "группы" },
    ],
  },
];
