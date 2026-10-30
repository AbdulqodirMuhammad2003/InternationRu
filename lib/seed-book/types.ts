import type { SeedExercise } from "../seed-exercises";
import type { VocabSeed } from "../seed-lessons/types";

/** Darslik («Я ❤ Русский язык», Liden & Denz) topshirig'i — nashriyot
 *  ruxsati bilan (2026-10-29). Kurs to'liq kitob asosida qayta quriladi. */
export interface BookExercise extends SeedExercise {
  /** Kitobdagi raqami: «1.1.3» — 1-dars, 1-modul, 3-topshiriq. */
  ref: string;
  /** Dars ichidagi bo'lim: «Модуль 1», «Модуль 2», «Повторяем!», «Свобода слова».
   *  Qoida testi (kind: "rule") uchun berilmaydi — u alohida bo'lim. */
  section?: string;
  /** Audio fayl («book-audio» papkasiga nisbatan yo'l), masalan "A1/lesson1/1.1.3.mp3". */
  audio?: string;
  /** Darslikdan qirqilgan rasm (public/ ichida), masalan "/book/a1/1-1-3.webp". */
  image?: string;
}

/** Kitobning bitta darsi (урок) — saytda bitta dars. */
export interface BookLesson {
  /** Sayt kodi: «KA1-01» (K — kitob; eski darslar kodlari bilan to'qnashmaydi). */
  code: string;
  level: "A1" | "A2" | "B1" | "B2";
  /** Karta sarlavhasi, masalan «1-dars». */
  title: string;
  /** Kitobdagi nomi, masalan «Привет!». */
  subtitle: string;
  /** Kitob sahifalari (izoh uchun), masalan «6–15». */
  pages: string;
  /** Lug'at bosqichlari — kitobning «Словарь» ro'yxatidan. */
  rounds: { title: string; words: VocabSeed[] }[];
  /** Qoida testi va modullar topshiriqlari, kitob tartibida. */
  exercises: BookExercise[];
}
