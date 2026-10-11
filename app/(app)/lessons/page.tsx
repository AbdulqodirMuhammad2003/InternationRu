import { getSession } from "@/lib/auth";
import { getAllUnitsDetailed, withoutQuestions, getLevels } from "@/lib/data";
import { LessonsBoard } from "@/components/lessons/LessonsBoard";
import { getExamStatus } from "@/lib/exam";

/** «Darslar» — faqat darajalar va darslar. Kunlik panel (salomlashish,
 *  davom ettirish, maqsad) bosh sahifada turadi — bu yerda takrorlanmaydi,
 *  shunda telefonda darslar birinchi ekranda ko'rinadi. */
export default async function LessonsPage() {
  const session = await getSession();
  const userId = session!.userId;
  const [units, levels, exam] = await Promise.all([
    getAllUnitsDetailed(userId).then(withoutQuestions),
    getLevels(userId),
    getExamStatus(userId),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4">
      <h1 className="font-display animate-fade-up text-2xl font-bold text-ink-950 dark:text-ink-50">Darslar</h1>
      <LessonsBoard
        units={units}
        levels={levels}
        exam={{
          level: exam.level,
          // Imtihon daraja tugagach (barcha darslar 80 %) ochiladi; boshlangan
          // urinish yoki takrorlash rejasi bo'lsa ham kirish mumkin.
          open: exam.levelComplete || !!exam.active || (!!exam.lastResult && !exam.levelResetHappened),
          passed: exam.passed,
          note: exam.active
            ? "Imtihon davom etyapti"
            : exam.canStart
            ? `${exam.attemptsLeft} ta urinish qoldi`
            : exam.blockReason ?? "",
        }}
      />
    </div>
  );
}
