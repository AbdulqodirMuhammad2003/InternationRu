import type { SeedExercise, SeedQuestion } from "../../seed-exercises";

/** Darsning «Qoida» bo'limi — `kind: "rule"` mashqi. */
export type LessonRule = SeedExercise;

export function rule(topic: string, text: string, questions: SeedQuestion[]): LessonRule {
  return { title: `Qoida: ${topic}`, skill: "Grammatika", kind: "rule", instructions: text, questions };
}

/** To'g'ri javob birinchi yoziladi (seed paytida aralashtiriladi). */
export const q = (prompt: string, options: string[], explanation?: string): SeedQuestion => ({
  prompt,
  options,
  correct: 0,
  explanation,
});
