import { BookMarked } from "lucide-react";

export function VocabGauge({ learned, total }: { learned: number; total: number }) {
  const pct = total === 0 ? 0 : Math.min(100, Math.round((learned / total) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="group relative animate-fade-up overflow-hidden rounded-3xl bg-gradient-to-br from-olive-700 via-olive-800 to-olive-950 p-6 text-white shadow-sm shadow-olive-950/20 ring-1 ring-transparent transition-transform duration-300 hover:-translate-y-0.5 dark:ring-white/10">
      {/* Fon naqshi */}
      <svg
        className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 opacity-20"
        viewBox="0 0 200 200"
        fill="none"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M ${-20 + i * 14} 200 C ${40 + i * 10} ${140 - i * 6}, ${60 + i * 8} ${90 - i * 4}, ${140 + i * 6} ${20 - i * 2}`}
            stroke="#cfa249"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/10 blur-2xl animate-float-slow" />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gold-200/90">Lug'at</p>
          <p className="font-display mt-1 text-lg font-bold">O'rganilgan so'zlar</p>
          <p className="mt-3 text-xs text-white/60">
            Jami {total} ta so'zdan {learned} tasini o'rgandingiz
          </p>
        </div>

        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#dfbd6c"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <BookMarked size={16} className="mb-0.5 text-gold-300" />
            <span className="text-base font-bold">{learned}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
