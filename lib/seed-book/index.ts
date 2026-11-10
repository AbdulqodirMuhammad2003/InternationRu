import type { BookExercise, BookLesson } from "./types";
import { KA1_01A, KA1_01B } from "./ka1-01";
import { KA1_02A, KA1_02B } from "./ka1-02";
import { KA1_03A, KA1_03B } from "./ka1-03";
import { KA1_04A, KA1_04B } from "./ka1-04";
import { KA1_05A, KA1_05B } from "./ka1-05";

export type { BookExercise, BookLesson };

/** Kitob asosidagi darslar, kitob tartibida (har daraja ichida). */
export const BOOK_LESSONS: BookLesson[] = [KA1_01A, KA1_01B, KA1_02A, KA1_02B, KA1_03A, KA1_03B, KA1_04A, KA1_04B, KA1_05A, KA1_05B];
