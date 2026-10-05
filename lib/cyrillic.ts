/** Lotin harfi → unga ko'rinishi aynan o'xshash rus harfi. Ba'zi telefon
 *  klaviaturalari (masalan, «E» bosib turilganda chiqadigan «Ë») yoki
 *  aralash tartibda yozganda o'quvchi ruscha so'zni lotin harflari bilan
 *  yozib qo'yadi — ekranda farqi bilinmaydi, lekin javob xato hisoblanardi. */
const LOOKALIKES: Record<string, string> = {
  A: "А", a: "а", B: "В", C: "С", c: "с", E: "Е", e: "е", Ë: "Ё", ë: "ё",
  H: "Н", K: "К", k: "к", M: "М", O: "О", o: "о", P: "Р", p: "р",
  T: "Т", X: "Х", x: "х", Y: "У", y: "у",
};

/** Yozma javobni solishtirishdan oldin: Unicode bir xil shaklga keltiriladi
 *  (e + ¨ → ë) va rus harfiga o'xshash lotin harflari ruschasiga almashtiriladi. */
export function toCyrillicLookalikes(s: string) {
  return s.normalize("NFC").replace(/[ABCEHKMOPTXYaceëËkopxy]/g, (ch) => LOOKALIKES[ch] ?? ch);
}
