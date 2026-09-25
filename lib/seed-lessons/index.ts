/** Mazmuni tayyor darslar: unit kodi → lug'at bosqichlari va mashqlar.
 *  Yangi dars qo'shilganda shu ro'yxatga qo'shiladi. */
import type { SeedExercise } from "../seed-exercises";
import type { VocabSeed } from "./types";
import { R00_EXERCISES, R00_ROUNDS } from "./r00-alifbo";
import { R01_EXERCISES, R01_ROUNDS } from "./r01-privet";
import { R02_EXERCISES, R02_ROUNDS } from "./r02-kto-vy";
import { R03_EXERCISES, R03_ROUNDS } from "./r03-semya";

export interface LessonContent {
  code: string;
  rounds: { title: string; words: VocabSeed[] }[];
  exercises: SeedExercise[];
}

export const LESSON_CONTENT: LessonContent[] = [
  { code: "R00", rounds: R00_ROUNDS, exercises: R00_EXERCISES },
  { code: "R01", rounds: R01_ROUNDS, exercises: R01_EXERCISES },
  { code: "R02", rounds: R02_ROUNDS, exercises: R02_EXERCISES },
  { code: "R03", rounds: R03_ROUNDS, exercises: R03_EXERCISES },
];
