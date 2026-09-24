import { getSession } from "@/lib/auth";
import { getUserStats, getAllUnitsDetailed, getLevels, getActivityOverview, getReviewSummary } from "@/lib/data";
import { TodayPanel } from "@/components/TodayPanel";
import { LessonsBoard } from "@/components/lessons/LessonsBoard";

export default async function LessonsPage() {
  const session = await getSession();
  const user = (await getUserStats(session!.userId))!;
  const units = await getAllUnitsDetailed(session!.userId);
  const levels = await getLevels();
  const activity = await getActivityOverview(session!.userId);
  const review = await getReviewSummary(session!.userId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <h1 className="font-display animate-fade-up text-2xl font-bold text-ink-950 dark:text-ink-50">Darslar</h1>
      <TodayPanel user={user} units={units} activity={activity} review={review} />
      <LessonsBoard units={units} levels={levels} />
    </div>
  );
}
