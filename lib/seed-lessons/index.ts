/** Mazmuni tayyor darslar: unit kodi → lug'at bosqichlari va mashqlar.
 *  Yangi dars qo'shilganda shu ro'yxatga qo'shiladi. */
import { mixAnswers, type SeedExercise } from "../seed-exercises";
import type { VocabSeed } from "./types";
import { R00_EXERCISES, R00_ROUNDS } from "./r00-alifbo";
import { R01_EXERCISES, R01_ROUNDS } from "./r01-privet";
import { R02_EXERCISES, R02_ROUNDS } from "./r02-kto-vy";
import { R03_EXERCISES, R03_ROUNDS } from "./r03-semya";
import { R04_EXERCISES, R04_ROUNDS } from "./r04-zhivu";
import { R05_EXERCISES, R05_ROUNDS } from "./r05-goroda";
import { R06_EXERCISES, R06_ROUNDS } from "./r06-vchera";
import { R07_EXERCISES, R07_ROUNDS } from "./r07-restoran";
import { R08_EXERCISES, R08_ROUNDS } from "./r08-moy-den";
import { R09_EXERCISES, R09_ROUNDS } from "./r09-kino";

export interface LessonContent {
  code: string;
  rounds: { title: string; words: VocabSeed[] }[];
  exercises: SeedExercise[];
}

/** Mualliflik qulayligi uchun to'g'ri javob ko'pincha birinchi yoziladi —
 *  bu yerda u har bir savolda boshqa o'ringa ko'chiriladi. Barcha savollarda
 *  bir xil variantlar to'plami bo'lgan mashqlar (был/была…, в/на) va tartibi
 *  muhim turlar (match, stress, truefalse) tegilmaydi. */
const MIXED_KINDS = new Set(["listen", "dialog", "picture", "situation", "choice"]);

function withMixedAnswers(exercises: SeedExercise[]): SeedExercise[] {
  return exercises.map((e) => {
    if (!MIXED_KINDS.has(e.kind)) return e;
    const optionSets = new Set(e.questions.map((q) => (q.options ?? []).join("|")));
    return optionSets.size === 1 ? e : { ...e, questions: mixAnswers(e.questions) };
  });
}

const LESSONS: LessonContent[] = [
  { code: "R00", rounds: R00_ROUNDS, exercises: R00_EXERCISES },
  { code: "R01", rounds: R01_ROUNDS, exercises: R01_EXERCISES },
  { code: "R02", rounds: R02_ROUNDS, exercises: R02_EXERCISES },
  { code: "R03", rounds: R03_ROUNDS, exercises: R03_EXERCISES },
  { code: "R04", rounds: R04_ROUNDS, exercises: R04_EXERCISES },
  { code: "R05", rounds: R05_ROUNDS, exercises: R05_EXERCISES },
  { code: "R06", rounds: R06_ROUNDS, exercises: R06_EXERCISES },
  { code: "R07", rounds: R07_ROUNDS, exercises: R07_EXERCISES },
  { code: "R08", rounds: R08_ROUNDS, exercises: R08_EXERCISES },
  { code: "R09", rounds: R09_ROUNDS, exercises: R09_EXERCISES },
];

export const LESSON_CONTENT: LessonContent[] = LESSONS.map((l) => ({
  ...l,
  exercises: withMixedAnswers(l.exercises),
}));
