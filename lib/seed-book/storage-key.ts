/** Supabase Storage fayl nomida faqat lotin harflari ishlaydi — darslik
 *  audiolarining kirillcha nomlari («у1_м1_з1б.mp3») lotinchaga o'giriladi.
 *  Yuklash skripti ham, seed ham shu funksiyadan foydalanadi. */
const MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function toStorageKey(path: string) {
  return path
    .normalize("NFC")
    .replace(/[а-яё]/gi, (ch) => {
      const lat = MAP[ch.toLowerCase()] ?? "";
      return ch === ch.toLowerCase() ? lat : lat.toUpperCase();
    })
    .replace(/[^A-Za-z0-9._/-]/g, "_");
}
