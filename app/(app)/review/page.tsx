import { getSession } from "@/lib/auth";
import { getDueReviewWords, getReviewSummary, getWordPool } from "@/lib/data";
import { ReviewSession, type ReviewItem } from "@/components/review/ReviewSession";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MODES: ReviewItem["mode"][] = ["ru-uz", "uz-ru", "audio"];

export default async function ReviewPage() {
  const session = await getSession();
  const userId = session!.userId;
  const [words, pool, summary] = await Promise.all([
    getDueReviewWords(userId),
    getWordPool(),
    getReviewSummary(userId),
  ]);

  // Seans rejasi serverda tuziladi (tasodifiy tartib va variantlar) — shunda
  // klient bilan server bir xil narsani chizadi.
  const items: ReviewItem[] = shuffle(words).map((w, i) => {
    const mode = MODES[i % MODES.length];
    const toUz = mode === "ru-uz";
    const answer = toUz ? w.translation_uz : w.word;
    const distractors = shuffle(
      pool
        .filter((p) => p.id !== w.id)
        .map((p) => (toUz ? p.translation_uz : p.word))
        .filter((v, idx, arr) => v !== answer && arr.indexOf(v) === idx)
    ).slice(0, 3);
    const options = shuffle([answer, ...distractors]);
    return { word: w, mode, options, correct: options.indexOf(answer) };
  });

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">Takrorlash</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400">
          O'rgangan so'zlaringizni unutmaslik uchun — har kuni bir necha daqiqa.
        </p>
      </div>
      <ReviewSession items={items} nextDueAt={summary.nextDueAt} />
    </div>
  );
}
