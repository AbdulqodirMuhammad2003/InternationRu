import { LESSON_CONTENT } from "../seed-lessons";
import type { VocabSeed } from "../seed-lessons/types";

const ALL = LESSON_CONTENT.flatMap((l) => l.rounds.flatMap((r) => r.words));
const plain = (s: string) => s.toLowerCase().replace(/́/g, "").replace(/ё/g, "е");

/** Kitob «Словарь»idagi so'zlarni eski darslardagi tayyor kartalardan oladi
 *  (emoji, transkripsiya, izoh, misol). Topilmagani `extra`dan olinadi —
 *  ikkalasida ham bo'lmasa, xato (seed vaqtida darhol ko'rinadi). */
export function words(list: string[], extra: VocabSeed[] = []): VocabSeed[] {
  return list.map((w) => {
    const found = extra.find((x) => plain(x.word) === plain(w)) ?? ALL.find((x) => plain(x.word) === plain(w));
    if (!found) throw new Error(`Lug'at: «${w}» uchun karta yo'q — extra'ga qo'shing.`);
    return found;
  });
}
