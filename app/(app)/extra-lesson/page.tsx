import { getSession } from "@/lib/auth";
import { getExtraLessons } from "@/lib/data";
import { ExtraLessonCard } from "@/components/ExtraLessonCard";

export default async function ExtraLessonPage() {
  const session = await getSession();
  const lessons = getExtraLessons(session!.userId);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-olive-950">Qo'shimcha dars</h1>
        <p className="text-sm text-olive-700/60">
          O'qituvchilar bilan qo'shimcha darslarga yoziling.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, i) => (
          <div key={lesson.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <ExtraLessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
}
