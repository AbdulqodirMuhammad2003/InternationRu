/** «Baholar» skeleti: telefonda o'quvchi kartalari, kompyuterda jadval. */
export default function MarksLoading() {
  const card = "rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-white/[0.045] dark:shadow-none dark:ring-white/10";
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6" role="status" aria-busy="true">
      <span className="sr-only">Baholar yuklanmoqda…</span>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-36 rounded-xl" />
        <div className="skeleton h-4 w-full max-w-lg rounded-lg" />
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className={card}>
            <div className="flex items-center gap-3">
              <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="skeleton h-4 w-32 rounded-md" />
                <div className="skeleton h-3 w-44 rounded-md" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1.5">
              {Array.from({ length: 12 }, (_, j) => (
                <div key={j} className="skeleton aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`hidden flex-col gap-3 md:flex ${card}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="skeleton h-8 w-8 shrink-0 rounded-full" />
            <div className="skeleton h-4 w-36 shrink-0 rounded-md" />
            <div className="flex flex-1 justify-between gap-2">
              {Array.from({ length: 12 }, (_, j) => (
                <div key={j} className="skeleton h-9 w-9 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
