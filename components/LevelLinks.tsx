import Link from "next/link";

/** O'qituvchi uchun darajalar yorliqlari («Baholar», «Reyting»).
 *  O'quvchiga (levels bo'sh) hech narsa chiqmaydi. */
export function LevelLinks({ levels, current, basePath }: { levels: string[]; current: string; basePath: string }) {
  if (levels.length < 2) return null;
  return (
    <nav aria-label="Darajalar" className="inline-flex w-fit animate-fade-up rounded-full bg-ink-100 p-1 dark:bg-white/5">
      {levels.map((level) => {
        const selected = level === current;
        return (
          <Link
            key={level}
            href={`${basePath}?level=${level}`}
            aria-current={selected ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              selected
                ? "bg-white text-ink-950 shadow-sm dark:bg-white/15 dark:text-ink-50"
                : "text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
            }`}
          >
            {level}
          </Link>
        );
      })}
    </nav>
  );
}
