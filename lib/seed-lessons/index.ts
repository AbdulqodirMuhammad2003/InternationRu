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
import { R10_EXERCISES, R10_ROUNDS } from "./r10-dom";
import { R11_EXERCISES, R11_ROUNDS } from "./r11-universitet";
import { R12_EXERCISES, R12_ROUNDS } from "./r12-den-rozhdeniya";
import { R13_EXERCISES, R13_ROUNDS } from "./r13-v-gorode";
import { R14_EXERCISES, R14_ROUNDS } from "./r14-literatura";
import { A2_01_EXERCISES, A2_01_ROUNDS } from "./a2-01-davaite-pogovorim";
import { A2_02_EXERCISES, A2_02_ROUNDS } from "./a2-02-biografiya";
import { A2_03_EXERCISES, A2_03_ROUNDS } from "./a2-03-semya";
import { A2_04_EXERCISES, A2_04_ROUNDS } from "./a2-04-puteshestviya";
import { A2_05_EXERCISES, A2_05_ROUNDS } from "./a2-05-dom";
import { A2_06_EXERCISES, A2_06_ROUNDS } from "./a2-06-moy-den";
import { A2_07_EXERCISES, A2_07_ROUNDS } from "./a2-07-budushchee";
import { A2_08_EXERCISES, A2_08_ROUNDS } from "./a2-08-dvizhenie";

export interface LessonContent {
  code: string;
  rounds: { title: string; words: VocabSeed[] }[];
  exercises: SeedExercise[];
}

/** Mualliflik qulayligi uchun to'g'ri javob ko'pincha birinchi yoziladi —
 *  bu yerda u har bir savolda boshqa o'ringa ko'chiriladi. Qat'iy tartibli
 *  variantlar to'plamidan foydalanadigan mashqlar (был/была…, в/на, этот/тот —
 *  bir yoki ikki to'plam, har biri bir necha savolda) va tartibi muhim turlar
 *  (match, stress, truefalse) tegilmaydi. */
const MIXED_KINDS = new Set(["listen", "dialog", "picture", "situation", "choice", "reading", "audiotext"]);

function withMixedAnswers(exercises: SeedExercise[]): SeedExercise[] {
  return exercises.map((e) => {
    if (!MIXED_KINDS.has(e.kind)) return e;
    const setUse = new Map<string, number>();
    for (const q of e.questions) {
      const key = (q.options ?? []).join("|");
      setUse.set(key, (setUse.get(key) ?? 0) + 1);
    }
    const fixedSets = setUse.size <= 2 && [...setUse.values()].every((n) => n >= 3);
    return fixedSets ? e : { ...e, questions: mixAnswers(e.questions) };
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
  { code: "R10", rounds: R10_ROUNDS, exercises: R10_EXERCISES },
  { code: "R11", rounds: R11_ROUNDS, exercises: R11_EXERCISES },
  { code: "R12", rounds: R12_ROUNDS, exercises: R12_EXERCISES },
  { code: "R13", rounds: R13_ROUNDS, exercises: R13_EXERCISES },
  { code: "R14", rounds: R14_ROUNDS, exercises: R14_EXERCISES },
  { code: "A2-01", rounds: A2_01_ROUNDS, exercises: A2_01_EXERCISES },
  { code: "A2-02", rounds: A2_02_ROUNDS, exercises: A2_02_EXERCISES },
  { code: "A2-03", rounds: A2_03_ROUNDS, exercises: A2_03_EXERCISES },
  { code: "A2-04", rounds: A2_04_ROUNDS, exercises: A2_04_EXERCISES },
  { code: "A2-05", rounds: A2_05_ROUNDS, exercises: A2_05_EXERCISES },
  { code: "A2-06", rounds: A2_06_ROUNDS, exercises: A2_06_EXERCISES },
  { code: "A2-07", rounds: A2_07_ROUNDS, exercises: A2_07_EXERCISES },
  { code: "A2-08", rounds: A2_08_ROUNDS, exercises: A2_08_EXERCISES },
];

export const LESSON_CONTENT: LessonContent[] = LESSONS.map((l) => ({
  ...l,
  exercises: withMixedAnswers(l.exercises),
}));
