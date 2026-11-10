import type { BookExercise, BookLesson } from "./types";
import { KA1_01A, KA1_01B } from "./ka1-01";
import { KA1_02A, KA1_02B } from "./ka1-02";
import { KA1_03A, KA1_03B } from "./ka1-03";
import { KA1_04A, KA1_04B } from "./ka1-04";
import { KA1_05A, KA1_05B } from "./ka1-05";
import { KA1_06A, KA1_06B } from "./ka1-06";
import { KA1_07A, KA1_07B } from "./ka1-07";
import { KA1_08A, KA1_08B } from "./ka1-08";
import { KA1_09A, KA1_09B } from "./ka1-09";
import { KA1_10A, KA1_10B } from "./ka1-10";

export type { BookExercise, BookLesson };

/** Kitob asosidagi darslar, kitob tartibida (har daraja ichida). */
export const BOOK_LESSONS: BookLesson[] = [KA1_01A, KA1_01B, KA1_02A, KA1_02B, KA1_03A, KA1_03B, KA1_04A, KA1_04B, KA1_05A, KA1_05B, KA1_06A, KA1_06B, KA1_07A, KA1_07B, KA1_08A, KA1_08B, KA1_09A, KA1_09B, KA1_10A, KA1_10B];
