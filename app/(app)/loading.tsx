/** Sahifa ma'lumotlari serverdan kelguncha ko'rsatiladigan skelet — havola
 *  bosilishi bilan darhol javob beradi (ekran "qotib" turmaydi). Next.js
 *  uni dinamik sahifalar uchun oldindan yuklab ham qo'yadi. */
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6" role="status" aria-busy="true">
      <span className="sr-only">Yuklanmoqda…</span>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-48 rounded-xl" />
        <div className="skeleton h-4 w-full max-w-md rounded-lg" />
      </div>
      <div className="skeleton h-64 rounded-3xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="skeleton h-32 rounded-3xl" />
        <div className="skeleton h-32 rounded-3xl" />
      </div>
    </div>
  );
}
