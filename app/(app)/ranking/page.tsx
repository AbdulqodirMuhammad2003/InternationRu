import { getSession } from "@/lib/auth";
import { getRanking } from "@/lib/data";
import { RankingTabs } from "@/components/RankingTabs";

export default async function RankingPage() {
  const session = await getSession();
  const branch = await getRanking("branch", session!.userId);
  const group = await getRanking("group", session!.userId);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-olive-950 dark:text-olive-50">Reyting</h1>
        <p className="text-sm text-olive-700/60 dark:text-olive-300/60">O'z natijalaringizni boshqa o'quvchilar bilan solishtiring.</p>
      </div>
      <RankingTabs branch={branch} group={group} />
    </div>
  );
}
