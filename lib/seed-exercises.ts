/**
 * Mashqlar (topshiriqlar) uchun umumiy turlar. Darslarning o'zi —
 * lib/seed-lessons/ ichida. Mashq turi (`kind`) savol qanday
 * ko'rsatilishini belgilaydi; har bir mashqda 10 ta savol.
 * `explanation` — javobdan keyin ko'rsatiladigan qisqa izoh.
 */

export type ExerciseKind =
  | "choice" // katta so'z/gap va variantlar (odatiy test)
  | "listen" // `audio` o'qiladi, eshitilgani variantlardan tanlanadi
  | "dialog" // `prompt` — suhbatdoshning gapi, javob variantlardan tanlanadi
  | "ending" // `prompt` "книга (Иван)", to'g'ri qo'shimcha tanlanadi
  | "anagram" // `prompt` — aralash harflar, `answer` — yig'iladigan so'z
  | "type" // `prompt` — berilgan so'z, `answer` — o'quvchi yozadigan javob
  | "picture" // `prompt` — emoji/rasm, variantlardan nomi tanlanadi
  | "situation" // `prompt` — vaziyat tavsifi, mos ibora tanlanadi
  | "match" // `options` — "chap|o'ng" juftlar, hammasi ulanadi
  | "stress" // `audio` — so'z, `options` — bo'g'inlar, urg'uli bo'g'in tanlanadi
  | "number" // `audio` — ruscha son, `answer` — raqamlar bilan
  | "order" // `answer` — gap, o'quvchi so'z plitkalaridan yig'adi
  | "fill" // `prompt` — "___" bo'sh joyli gap/so'z, `answer` — tushgan qism
  | "speak" // `prompt` — ibora, o'quvchi mikrofonga aytadi
  | "dictation"; // `audio` — so'z (ko'rsatilmaydi), `answer` — o'quvchi yozadi

export interface SeedQuestion {
  prompt: string;
  options?: string[];
  correct?: number;
  audio?: string;
  /** Yozma javob; bir nechta to'g'ri javob "|" bilan ajratiladi. */
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

/** Harflarni har safar bir xil tartibda aralashtiradi (seed qayta ishga
 *  tushirilganda ham mashq o'zgarmasligi uchun). */
export function scramble(word: string) {
  const a = word.split("");
  let seed = word.length * 7;
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 31 + 11) % 97;
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("") === word ? a.reverse().join("") : a.join("");
}
