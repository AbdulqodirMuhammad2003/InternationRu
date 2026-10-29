import type { ActivityOverview } from "@/lib/data";

/** Kunlik to'g'ri javoblar soniga qarab katak rangi (GitHub «contribution
 *  graph» uslubi): har kuni katakni yashil qilish — kichik, lekin kuchli odat. */
function shade(count: number) {
  if (count === 0) return "bg-ink-100 dark:bg-white/[0.06]";
  if (count < 10) return "bg-mint-200 dark:bg-mint-900";
  if (count < 20) return "bg-mint-400 dark:bg-mint-700";
  if (count < 40) return "bg-mint-500 dark:bg-mint-500";
  return "bg-mint-600 shadow-[0_0_8px_rgba(16,185,129,0.6)] dark:bg-mint-400";
}

const MONTHS = ["yan", "fev", "mar", "apr", "may", "iyun", "iyul", "avg", "sen", "okt", "noy", "dek"];

export function ActivityHeatmap({ heatmap }: { heatmap: ActivityOverview["heatmap"] }) {
  const activeDays = heatmap.flat().filter((d) => d.count > 0).length;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">Faollik</span>
        <span className="text-xs text-ink-500 dark:text-ink-400">
          Oxirgi 4 oyda <b className="text-ink-900 dark:text-ink-50">{activeDays}</b> kun mashq qildingiz
        </span>
      </div>
      <div className="no-scrollbar overflow-x-auto">
        <div className="flex w-max gap-[3px] sm:gap-1">
          {heatmap.map((week, w) => {
            const first = week[0].day;
            const showMonth = w === 0 || first.slice(5, 7) !== heatmap[w - 1][0].day.slice(5, 7);
            return (
              <div key={first} className="flex flex-col gap-[3px] sm:gap-1">
                <span className="h-3 text-[10px] leading-3 text-ink-400 dark:text-ink-500">
                  {showMonth ? MONTHS[Number(first.slice(5, 7)) - 1] : ""}
                </span>
                {week.map((d) => (
                  <span
                    key={d.day}
                    title={d.isFuture ? undefined : `${d.day}: ${d.count} ta to'g'ri javob`}
                    className={`h-3.5 w-3.5 rounded-[4px] transition-transform duration-200 hover:scale-125 sm:h-4 sm:w-4 ${
                      d.isFuture ? "opacity-0" : shade(d.count)
                    }`}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 text-[10px] text-ink-400 dark:text-ink-500">
        Kam
        {[0, 5, 15, 30, 50].map((c) => (
          <span key={c} className={`h-2.5 w-2.5 rounded-[3px] ${shade(c)}`} />
        ))}
        Ko'p
      </div>
    </div>
  );
}
