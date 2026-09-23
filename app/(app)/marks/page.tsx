import { getSession } from "@/lib/auth";
import { getMarksForUser } from "@/lib/data";

function scoreColor(pct: number) {
  if (pct >= 90) return "text-olive-700 bg-olive-50 dark:bg-olive-900/40 dark:text-olive-200";
  if (pct >= 70) return "text-gold-700 bg-gold-50 dark:bg-gold-950/40 dark:text-gold-300";
  return "text-wine-700 bg-wine-50 dark:bg-wine-950/40 dark:text-wine-300";
}

export default async function MarksPage() {
  const session = await getSession();
  const marks = await getMarksForUser(session!.userId);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-olive-950 dark:text-olive-50">Baholar</h1>
        <p className="text-sm text-olive-700/60 dark:text-olive-300/60">Barcha fanlar bo'yicha natijalar tarixi.</p>
      </div>

      <div className="animate-fade-up overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-olive-950/5 dark:bg-[#1f2115] dark:shadow-none dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-olive-100 text-left text-xs uppercase text-olive-400 dark:border-white/10 dark:text-olive-500">
              <th className="px-6 py-3 font-semibold">Fan</th>
              <th className="px-6 py-3 font-semibold">Dars</th>
              <th className="px-6 py-3 font-semibold">Sana</th>
              <th className="px-6 py-3 text-right font-semibold">Natija</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m, i) => {
              const pct = Math.round((m.score / m.max_score) * 100);
              return (
                <tr
                  key={m.id}
                  style={{ animationDelay: `${i * 30}ms` }}
                  className="animate-fade-up border-b border-olive-50 transition-colors last:border-0 hover:bg-olive-50/40 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-6 py-4 font-medium text-olive-950 dark:text-olive-50">{m.subject}</td>
                  <td className="px-6 py-4 text-olive-700/60 dark:text-olive-300/60">{m.unit_title || "—"}</td>
                  <td className="px-6 py-4 text-olive-700/60 dark:text-olive-300/60">
                    {new Date(m.date).toLocaleDateString("uz-UZ", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${scoreColor(pct)}`}>
                      {m.score}/{m.max_score}
                    </span>
                  </td>
                </tr>
              );
            })}
            {marks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-olive-400 dark:text-olive-600">
                  Hozircha baholar yo'q.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
