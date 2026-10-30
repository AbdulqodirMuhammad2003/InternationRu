import type { BookExercise, BookLesson } from "./types";
import { KA1_01 } from "./ka1-01";

export type { BookExercise, BookLesson };

/** Kitob asosidagi darslar, kitob tartibida (har daraja ichida). */
export const BOOK_LESSONS: BookLesson[] = [KA1_01];
