/**
 * Darslarning mashqlari (topshiriqlari) — Гусева, Румянцева «Интенсивный курс
 * русского языка», 1-sikl asosida. Har bir savol uch xil bo'lishi mumkin:
 *   - oddiy test: `options` + `correct`;
 *   - tinglash: `audio` — savol ochilganda so'z/gap ovoz chiqarib o'qiladi
 *     (kitobdagi «Слушайте, повторяйте...» mashqlari kabi);
 *   - yozish: `answer` — o'quvchi javobni o'zi yozadi (bir nechta to'g'ri
 *     javob bo'lsa, "|" bilan ajratiladi). Bunda `options` bo'sh bo'ladi.
 * `explanation` — javobdan keyin ko'rsatiladigan qisqa izoh (nega shunday).
 */

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
  questions: SeedQuestion[];
}

const PRONOUNS = ["он", "она", "оно", "они"];

/** 1-dars, 1-bo'lim: tovushlar, birinchi so'zlar, rod, egalik va ko'plik
 *  (kitobning 1–14-mashqlari). */
export const LESSON1_SECTION1: SeedExercise[] = [
  {
    title: "1.1 Tinglang va toping",
    skill: "Tinglash",
    questions: [
      { prompt: "Eshitgan so'zingizni toping", audio: "дом", options: ["дом", "дома", "там", "да"], correct: 0 },
      {
        prompt: "Eshitgan so'zingizni toping",
        audio: "дома",
        options: ["дом", "дома", "мама", "тут"],
        correct: 1,
        explanation: "Дом — uy, дома — uyda (Мама дома — Onam uyda).",
      },
      {
        prompt: "Eshitgan so'zingizni toping",
        audio: "тут",
        options: ["там", "тот", "тут", "ты"],
        correct: 2,
        explanation: "Тут — shu yerda, там — u yerda.",
      },
      { prompt: "Eshitgan so'zingizni toping", audio: "окно", options: ["окно", "кино", "она", "оно"], correct: 0 },
      { prompt: "Eshitgan so'zingizni toping", audio: "подруга", options: ["друг", "подруга", "группа", "город"], correct: 1 },
      {
        prompt: "Eshitgan so'zingizni toping",
        audio: "выход",
        options: ["вход", "выход", "вода", "вы"],
        correct: 1,
        explanation: "Вход — kirish, выход — chiqish. Oxiridagi «д» [т] bo'lib eshitiladi.",
      },
    ],
  },
  {
    title: "1.2 Он, она, оно или они?",
    skill: "Grammatika",
    questions: [
      { prompt: "батон", options: PRONOUNS, correct: 0, explanation: "Undosh bilan tugagan so'z odatda — он." },
      { prompt: "комната", options: PRONOUNS, correct: 1, explanation: "-а bilan tugagan so'z odatda — она." },
      { prompt: "окно", options: PRONOUNS, correct: 2, explanation: "-о bilan tugagan so'z — оно." },
      { prompt: "мама и папа", options: PRONOUNS, correct: 3, explanation: "Bir nechta kishi yoki narsa — они." },
      { prompt: "кино", options: PRONOUNS, correct: 2 },
      { prompt: "буква", options: PRONOUNS, correct: 1 },
      {
        prompt: "папа",
        options: PRONOUNS,
        correct: 0,
        explanation: "Diqqat, istisno! «Папа» -а bilan tugasa ham erkak kishi — он.",
      },
      { prompt: "диктант", options: PRONOUNS, correct: 0 },
      { prompt: "радио", options: PRONOUNS, correct: 2 },
    ],
  },
  {
    title: "1.3 Suhbatni davom ettiring",
    skill: "Dialog",
    questions: [
      {
        prompt: "— Кто это?\n— …",
        options: ["Это Инна.", "Это книга.", "Да, она дома.", "Тут."],
        correct: 0,
        explanation: "«Кто?» (kim?) odam haqida so'raydi. Narsa haqida — «Что?».",
      },
      {
        prompt: "— Мама дома?\n— …",
        options: ["Да, она дома.", "Да, он дома.", "Это дом.", "Там окно."],
        correct: 0,
        explanation: "Мама — она.",
      },
      { prompt: "— Это мама и папа?\n— Да, это …", options: PRONOUNS, correct: 3 },
      {
        prompt: "— Вы Иван?\n— …",
        options: ["Да, Иван.", "Да, это дом.", "Он тут.", "Это мама."],
        correct: 0,
      },
      {
        prompt: "— Дом там?\n— Да, … там.",
        options: PRONOUNS,
        correct: 0,
        explanation: "Дом — он.",
      },
      {
        prompt: "Мы тут, … мама там.",
        options: ["и", "а", "но", "да"],
        correct: 1,
        explanation: "Qarama-qarshi qo'yilsa — «а» (Он тут, а она там).",
      },
      {
        prompt: "Он тут, … она тут.",
        options: ["и", "а", "но", "да"],
        correct: 0,
        explanation: "Ikkalasi bir xil bo'lsa — «и» (Он тут, и она тут).",
      },
    ],
  },
  {
    title: "1.4 Kimning? (Это книга Ивана)",
    skill: "Egalik",
    questions: [
      {
        prompt: "Вот книга … (Иван)",
        options: ["Иван", "Ивана", "Ивану", "Иваны"],
        correct: 1,
        explanation: "Erkak ismiga -а qo'shiladi: Иван → книга Ивана.",
      },
      {
        prompt: "Это фото … (мама)",
        options: ["мама", "мамы", "маме", "маму"],
        correct: 1,
        explanation: "-а bilan tugagan so'zda -а → -ы: мама → фото мамы.",
      },
      { prompt: "Это комната … (Анна)", options: ["Анна", "Анны", "Анне", "Анну"], correct: 1 },
      { prompt: "Это друг … (брат)", options: ["брат", "брата", "браты", "брату"], correct: 1 },
      {
        prompt: "Вот остановка … (автобус)",
        options: ["автобус", "автобуса", "автобусы", "автобусу"],
        correct: 1,
      },
      {
        prompt: "Это книга … (папа)",
        options: ["папа", "папы", "папу", "папе"],
        correct: 1,
        explanation: "Папа ham xuddi мама kabi o'zgaradi: книга папы.",
      },
    ],
  },
  {
    title: "1.5 Bitta — ko'p",
    skill: "Yozish",
    questions: [
      { prompt: "батон → …", answer: "батоны", explanation: "Undoshdan keyin -ы qo'shiladi: батон → батоны." },
      { prompt: "буква → …", answer: "буквы", explanation: "-а → -ы: буква → буквы." },
      { prompt: "комната → …", answer: "комнаты" },
      {
        prompt: "урок → …",
        answer: "уроки",
        explanation: "Diqqat: г, к, х dan keyin -ы emas, -и yoziladi: урок → уроки.",
      },
      { prompt: "книга → …", answer: "книги", explanation: "г dan keyin -и: книга → книги." },
      { prompt: "поэт → …", answer: "поэты" },
      { prompt: "стих → …", answer: "стихи", explanation: "х dan keyin -и: стих → стихи." },
    ],
  },
  {
    title: "1.6 Diktant",
    skill: "Tinglab yozish",
    questions: [
      { prompt: "Eshitgan so'zingizni yozing", audio: "мама", answer: "мама" },
      { prompt: "Eshitgan so'zingizni yozing", audio: "окно", answer: "окно" },
      { prompt: "Eshitgan so'zingizni yozing", audio: "брат", answer: "брат" },
      { prompt: "Eshitgan so'zingizni yozing", audio: "урок", answer: "урок" },
      {
        prompt: "Eshitgan so'zingizni yozing",
        audio: "город",
        answer: "город",
        explanation: "Oxiridagi «д» [т] bo'lib eshitiladi, lekin «д» yoziladi: город.",
      },
    ],
  },
];
