/** «Reyting» skeleti: sarlavha va o'quvchilar qatorlari. */
export default function RankingLoading() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6" role="status" aria-busy="true">
      <span className="sr-only">Reyting yuklanmoqda…</span>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-36 rounded-xl" />
        <div className="skeleton h-4 w-full max-w-md rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-white/[0.045] dark:shadow-none dark:ring-white/10">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-3">
            <div className="skeleton h-8 w-8 shrink-0 rounded-full" />
            <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="skeleton h-4 w-32 rounded-md" />
              <div className="skeleton h-3 w-24 rounded-md" />
            </div>
            <div className="skeleton h-4 w-12 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
