/** Sahifa ma'lumotlari serverdan kelguncha ko'rsatiladigan skelet — havola
 *  bosilishi bilan darhol javob beradi (ekran "qotib" turmaydi). Next.js
 *  uni dinamik sahifalar uchun oldindan yuklab ham qo'yadi. */
export default function Loading() {
  const block = "animate-pulse rounded-3xl bg-ink-100 dark:bg-white/5";
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6" aria-busy="true" aria-label="Yuklanmoqda">
      <div className="h-8 w-48 animate-pulse rounded-xl bg-ink-100 dark:bg-white/5" />
      <div className={`${block} h-64`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={`${block} h-32`} />
        <div className={`${block} h-32`} />
      </div>
    </div>
  );
}
