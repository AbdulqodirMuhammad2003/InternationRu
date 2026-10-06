import { getPlacementLevels, getTeacherStudents, requireTeacher } from "@/lib/teacher";
import { TeacherPanel } from "@/components/teacher/TeacherPanel";

export default async function TeacherPage() {
  await requireTeacher();
  const [students, levels] = await Promise.all([getTeacherStudents(), getPlacementLevels()]);
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">O'qituvchi paneli</h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
          O'quvchilarga login va parol bering, suhbatdan keyin ularni kerakli daraja va darsdan boshlating.
        </p>
      </div>
      <TeacherPanel students={students} levels={levels} />
    </div>
  );
}
