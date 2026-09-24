import { getSession } from "@/lib/auth";
import { getRanking } from "@/lib/data";
import { RankingTabs } from "@/components/RankingTabs";

export default async function RankingPage() {
  const session = await getSession();
  const [branch, group] = await Promise.all([
    getRanking("branch", session!.userId),
    getRanking("group", session!.userId),
  ]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">Reyting</h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">O'z natijalaringizni boshqa o'quvchilar bilan solishtiring.</p>
      </div>
      <RankingTabs branch={branch} group={group} />
    </div>
  );
}
