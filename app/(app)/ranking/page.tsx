import { Trophy } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getLevelBoard } from "@/lib/data";
import { Avatar } from "@/components/Avatar";

export default async function RankingPage() {
  const session = await getSession();
  const board = await getLevelBoard(session!.userId);
  // Reyting — darslar foizlari yig'indisi bo'yicha; teng ball bo'lsa, ism bo'yicha.
  const rows = [...board.students].sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">Reyting</h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
          {board.level} darajasida o'qiyotgan o'quvchilar. Ball — barcha darslar bo'yicha natijalaringiz yig'indisi.
        </p>
      </div>

      <div className="animate-fade-up rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:shadow-none dark:ring-white/10">
        <div className="flex flex-col divide-y divide-ink-50 dark:divide-white/5">
          {rows.map((row, i) => {
            const place = i + 1;
            return (
              <div
                key={row.id}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`flex animate-fade-up items-center justify-between gap-3 px-3 py-3 ${
                  row.is_current_user ? "rounded-xl bg-gold-50 dark:bg-gold-950/30" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      place === 1
                        ? "bg-gold-400 text-ink-950"
                        : place === 2
                        ? "bg-ink-200 text-ink-800 dark:bg-white/10 dark:text-ink-200"
                        : place === 3
                        ? "bg-gold-200 text-gold-900 dark:bg-gold-900/40 dark:text-gold-200"
                        : "bg-ink-50 text-ink-500 dark:bg-white/5 dark:text-ink-400"
                    }`}
                  >
                    {place}
                  </span>
                  <Avatar name={row.name} photoUrl={row.avatar_url} size={36} />
                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm ${
                        row.is_current_user ? "font-bold text-ink-950 dark:text-ink-50" : "font-medium text-ink-800 dark:text-ink-200"
                      }`}
                    >
                      {row.name}
                      {row.is_current_user && " (siz)"}
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">O'rtacha natija: {row.average}%</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink-700/70 dark:text-ink-300/70">
                  <Trophy size={14} className="text-gold-500" />
                  {row.points.toLocaleString("ru-RU")}
                </div>
              </div>
            );
          })}
          {rows.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-ink-400 dark:text-ink-600">Hozircha o'quvchilar yo'q.</p>
          )}
        </div>
      </div>
    </div>
  );
}
