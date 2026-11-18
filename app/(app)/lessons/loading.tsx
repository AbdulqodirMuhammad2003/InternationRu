/** «Darslar» skeleti: daraja sarlavhasi va dars kartalari karuseli/to'ri
 *  shaklida — sahifa ochilganda joylashuv sakramaydi. */
export default function LessonsLoading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4" role="status" aria-busy="true">
      <span className="sr-only">Darslar yuklanmoqda…</span>
      <div className="skeleton h-8 w-36 rounded-xl" />
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-14 shrink-0 rounded-2xl" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="skeleton h-5 w-56 max-w-full rounded-lg" />
          <div className="skeleton h-4 w-72 max-w-full rounded-lg" />
        </div>
      </div>
      <div className="skeleton h-9 w-44 rounded-full" />
      {/* Telefon: markazdagi bitta karta; katta ekran: kartalar to'ri */}
      <div className="flex justify-center py-8 lg:hidden">
        <div className="skeleton h-72 w-60 scale-110 rounded-[2rem]" />
      </div>
      <div className="hidden grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] gap-5 py-2 lg:grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton h-64 rounded-[2rem]" />
        ))}
      </div>
    </div>
  );
}
