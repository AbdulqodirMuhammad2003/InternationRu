import { getSession } from "@/lib/auth";
import { getLevelBoard, getMarksForUser } from "@/lib/data";
import { Avatar } from "@/components/Avatar";

function scoreColor(pct: number) {
  if (pct >= 90) return "text-ink-700 bg-ink-50 dark:bg-ink-900/40 dark:text-ink-200";
  if (pct >= 70) return "text-gold-700 bg-gold-50 dark:bg-gold-950/40 dark:text-gold-300";
  return "text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300";
}

/** Dars natijasi doirasining rangi: 80%+ — yashil, 50–79% — sariq, undan past — qizil. */
function cellColor(pct: number) {
  if (pct >= 80) return "bg-mint-500 text-white";
  if (pct >= 50) return "bg-gold-400 text-ink-950";
  return "bg-rose-500 text-white";
}

export default async function MarksPage() {
  const session = await getSession();
  const [board, marks] = await Promise.all([
    getLevelBoard(session!.userId),
    getMarksForUser(session!.userId),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">Baholar</h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
          {board.level} darajasidagi o'quvchilarning har bir dars bo'yicha natijasi (lug'at va mashqlar).
        </p>
      </div>

      <div className="animate-fade-up overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:shadow-none dark:ring-white/10">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-xs text-ink-500 dark:text-ink-400">
                <th className="sticky left-0 z-10 min-w-44 border-b border-ink-100 bg-white px-4 py-3 text-left font-semibold dark:border-white/10 dark:bg-[#161b26]">
                  O'quvchilar
                </th>
                {board.units.map((unit) => (
                  <th
                    key={unit.id}
                    title={unit.subtitle}
                    className="whitespace-nowrap border-b border-ink-100 px-1.5 py-3 text-center font-semibold dark:border-white/10"
                  >
                    {unit.title}
                  </th>
                ))}
                <th className="whitespace-nowrap border-b border-ink-100 px-3 py-3 text-center font-semibold dark:border-white/10">
                  O'rtacha
                </th>
              </tr>
            </thead>
            <tbody>
              {board.students.map((student, i) => (
                <tr key={student.id} style={{ animationDelay: `${i * 30}ms` }} className="animate-fade-up">
                  <td
                    className={`sticky left-0 z-10 border-b border-ink-50 px-4 py-2.5 dark:border-white/5 ${
                      student.is_current_user ? "bg-gold-50 dark:bg-[#2a2517]" : "bg-white dark:bg-[#161b26]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 text-xs text-ink-400">{i + 1}</span>
                      <Avatar name={student.name} photoUrl={student.avatar_url} size={32} />
                      <span
                        className={`whitespace-nowrap ${
                          student.is_current_user ? "font-bold text-ink-950 dark:text-ink-50" : "font-medium text-ink-800 dark:text-ink-200"
                        }`}
                      >
                        {student.name}
                        {student.is_current_user && " (siz)"}
                      </span>
                    </div>
                  </td>
                  {student.percents.map((pct, j) => (
                    <td
                      key={board.units[j].id}
                      className={`border-b border-ink-50 px-1.5 py-2.5 text-center dark:border-white/5 ${
                        student.is_current_user ? "bg-gold-50/60 dark:bg-gold-950/20" : ""
                      }`}
                    >
                      {pct === null ? (
                        <span className="text-ink-300 dark:text-ink-600">—</span>
                      ) : (
                        <span
                          title={`${board.units[j].title}: ${board.units[j].subtitle}`}
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${cellColor(pct)}`}
                        >
                          {pct}
                        </span>
                      )}
                    </td>
                  ))}
                  <td
                    className={`border-b border-ink-50 px-3 py-2.5 text-center font-bold text-ink-950 dark:border-white/5 dark:text-ink-50 ${
                      student.is_current_user ? "bg-gold-50/60 dark:bg-gold-950/20" : ""
                    }`}
                  >
                    {student.average}%
                  </td>
                </tr>
              ))}
              {board.students.length === 0 && (
                <tr>
                  <td colSpan={board.units.length + 2} className="px-4 py-8 text-center text-ink-400 dark:text-ink-600">
                    Hozircha natijalar yo'q.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-4 border-t border-ink-100 px-4 py-3 text-xs text-ink-500 dark:border-white/10 dark:text-ink-400">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-mint-500" /> 80% va yuqori</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-gold-400" /> 50–79%</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-rose-500" /> 50% dan past</span>
          <span className="flex items-center gap-1.5"><span className="text-ink-300 dark:text-ink-600">—</span> hali boshlanmagan</span>
        </div>
      </div>

      <div className="animate-fade-up">
        <h2 className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">Test va imtihonlar</h2>
      </div>
      <div className="animate-fade-up overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:shadow-none dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 text-left text-xs uppercase text-ink-400 dark:border-white/10 dark:text-ink-500">
              <th className="px-3 py-3 sm:px-6 font-semibold">Fan</th>
              <th className="hidden px-3 py-3 font-semibold sm:table-cell sm:px-6">Dars</th>
              <th className="px-3 py-3 sm:px-6 font-semibold">Sana</th>
              <th className="px-3 py-3 sm:px-6 text-right font-semibold">Natija</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => {
              const pct = Math.round((m.score / m.max_score) * 100);
              return (
                <tr
                  key={m.id}
                  className="border-b border-ink-50 transition-colors last:border-0 hover:bg-ink-50/40 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-3 py-3.5 sm:px-6 sm:py-4 font-medium text-ink-950 dark:text-ink-50">{m.subject}</td>
                  <td className="hidden px-3 py-3.5 text-ink-700/60 sm:table-cell sm:px-6 sm:py-4 dark:text-ink-300/60">{m.unit_title || "—"}</td>
                  <td className="px-3 py-3.5 sm:px-6 sm:py-4 text-ink-700/60 dark:text-ink-300/60">
                    {new Date(m.date).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long" })}
                  </td>
                  <td className="px-3 py-3.5 sm:px-6 sm:py-4 text-right">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${scoreColor(pct)}`}>
                      {m.score}/{m.max_score}
                    </span>
                  </td>
                </tr>
              );
            })}
            {marks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-8 sm:px-6 text-center text-ink-400 dark:text-ink-600">
                  Hozircha test natijalari yo'q.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
