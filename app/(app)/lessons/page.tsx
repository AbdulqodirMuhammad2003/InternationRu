import { getSession } from "@/lib/auth";
import { getUserStats, getAllUnitsDetailed, getLevels } from "@/lib/data";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LessonsBoard } from "@/components/lessons/LessonsBoard";

export default async function LessonsPage() {
  const session = await getSession();
  const user = (await getUserStats(session!.userId))!;
  const units = await getAllUnitsDetailed(session!.userId);
  const levels = await getLevels();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <h1 className="font-display animate-fade-up text-2xl font-bold text-olive-950 dark:text-olive-50">Darslar</h1>
      <ProfileHeader user={user} />
      <LessonsBoard units={units} levels={levels} />
    </div>
  );
}
