import { getSession } from "@/lib/auth";
import { getAllUnitsDetailed } from "@/lib/data";
import { PracticeBoard } from "@/components/lessons/PracticeBoard";

export default async function PracticePage() {
  const session = await getSession();
  const units = getAllUnitsDetailed(session!.userId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-olive-950 dark:text-olive-50">Mashqlar</h1>
        <p className="text-sm text-olive-700/60 dark:text-olive-300/60">
          Cheklovsiz mashq qiling — natijalar progressingizga saqlanadi.
        </p>
      </div>
      <PracticeBoard units={units} />
    </div>
  );
}
