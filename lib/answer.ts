import { toCyrillicLookalikes } from "./cyrillic";

/** Yozma javobni solishtirish uchun: kichik harf, ё → е, urg'u belgisi va
 *  tinish belgilari olib tashlanadi; lotin «o'xshash» harflar kirillga. */
export function normalizeAnswer(s: string) {
  return toCyrillicLookalikes(s)
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/́/g, "")
    .replace(/[.,!?;:«»"'—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Savolning to'g'ri javoblari ("|" bilan bir nechta bo'lishi mumkin). */
export function isAcceptedAnswer(value: string, answerText: string | null) {
  const v = normalizeAnswer(value);
  return v !== "" && (answerText ?? "").split("|").map(normalizeAnswer).includes(v);
}
