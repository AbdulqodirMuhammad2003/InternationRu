/** Rus tilidagi ovozni tanish (Web Speech API) natijasini tekshirish uchun
 *  umumiy yordamchilar — lug'at talaffuz bosqichi va "Ayting" mashqlari
 *  ikkalasi ishlatadi. */

/** Ovoz tanish uchun normallashtirish: kichik harf, ё → е, urg'u belgisi
 *  va tinish belgilari olib tashlanadi. */
export function speechNorm(s: string) {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/́/g, "")
    .replace(/[^a-zа-я\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lug'atdagi yozuvdan talaffuzda kutiladigan shakllarni ajratadi:
 *  "Родной(-ая, -ое, -ые)" → ["родной"] (qo'shimchalar tashlanadi),
 *  "Немецкий (германский)" → ["немецкий", "германский"],
 *  "Он / она" → ["он", "она"]. */
export function pronunciationTargets(word: string): string[] {
  const targets: string[] = [];
  const base = word.replace(/\([^)]*\)/g, " ");
  targets.push(...base.split(/[,/]/));
  for (const group of word.match(/\(([^)]*)\)/g) ?? []) {
    const inner = group.slice(1, -1).trim();
    if (!inner.startsWith("-")) targets.push(...inner.split(/[,/]/));
  }
  return targets.map(speechNorm).filter(Boolean);
}

export function levenshtein(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

/** Brauzer eshitgan matn kutilgan so'zga mosmi. Ovoz tanish ko'pincha bitta
 *  harfda adashadi (масло/масла, ударение), shuning uchun 4+ harfli so'zlarda
 *  ~75% o'xshashlik yetarli; qisqa so'zlar (он, да) aynan mos kelishi kerak. */
export function matchesPronunciation(heard: string, targets: string[]) {
  const h = speechNorm(heard);
  if (!h) return false;
  const heardWords = h.split(" ");
  return targets.some((t) => {
    if (` ${h} `.includes(` ${t} `)) return true;
    if (t.length < 4) return false;
    const close = (x: string) => 1 - levenshtein(x, t) / Math.max(x.length, t.length) >= 0.75;
    return close(h) || heardWords.some(close);
  });
}

export const SPEECH_ERRORS: Record<string, string> = {
  "not-allowed":
    "Mikrofonga ruxsat berilmagan. Manzil satridagi qulf belgisini bosib, mikrofonga ruxsat bering.",
  "service-not-allowed":
    "Brauzer ovozni tanish xizmatini bloklagan. Google Chrome yoki Microsoft Edge'da oching.",
  "audio-capture": "Mikrofon topilmadi. Mikrofon ulanganini tekshiring.",
  network:
    "Ovozni tanish xizmatiga ulanib bo'lmadi. Internetni tekshiring yoki Chrome/Edge'dan foydalaning.",
  "no-speech": "Ovoz eshitilmadi. Mikrofonga yaqinroq, balandroq gapiring.",
  "language-not-supported": "Brauzeringiz rus tilidagi ovozni tanimaydi. Chrome yoki Edge'dan foydalaning.",
};
