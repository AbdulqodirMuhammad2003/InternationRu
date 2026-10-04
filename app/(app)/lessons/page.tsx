import { getSession } from "@/lib/auth";
import { getUserStats, getAllUnitsDetailed, withoutQuestions, getLevels, getActivityOverview, getReviewSummary } from "@/lib/data";
import { TodayPanel } from "@/components/TodayPanel";
import { LessonsBoard } from "@/components/lessons/LessonsBoard";
import { ExamCard } from "@/components/exam/ExamCard";
import { getExamStatus } from "@/lib/exam";

export default async function LessonsPage() {
  const session = await getSession();
  const userId = session!.userId;
  const [user, units, levels, activity, review, exam] = await Promise.all([
    getUserStats(userId),
    getAllUnitsDetailed(userId).then(withoutQuestions),
    getLevels(userId),
    getActivityOverview(userId),
    getReviewSummary(userId),
    getExamStatus(userId),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <h1 className="font-display animate-fade-up text-2xl font-bold text-ink-950 dark:text-ink-50">Darslar</h1>
      <TodayPanel user={user!} units={units} activity={activity} review={review} />
      <LessonsBoard units={units} levels={levels} />
      {/* Imtihon kartasi daraja tugagach (barcha darslar 80 %) yoki imtihon
          boshlangan / topshirilgan bo'lsa ko'rinadi. */}
      {(exam.level === user!.level || exam.passed) &&
        (exam.levelComplete || exam.active || exam.passed || (exam.lastResult && !exam.levelResetHappened)) && (
          <ExamCard status={exam} />
        )}
    </div>
  );
}
