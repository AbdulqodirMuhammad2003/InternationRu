import type { BookExercise, BookLesson } from "./types";
import { KA1_01A, KA1_01B } from "./ka1-01";
import { KA1_02A, KA1_02B } from "./ka1-02";
import { KA1_03A, KA1_03B } from "./ka1-03";

export type { BookExercise, BookLesson };

/** Kitob asosidagi darslar, kitob tartibida (har daraja ichida). */
export const BOOK_LESSONS: BookLesson[] = [KA1_01A, KA1_01B, KA1_02A, KA1_02B, KA1_03A, KA1_03B];
