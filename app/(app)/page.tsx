import Link from "next/link";
import { GraduationCap, BookOpen, ArrowUpRight, PartyPopper } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getUserStats, getAllUnitsDetailed, withoutQuestions, getActivityOverview, getReviewSummary } from "@/lib/data";
import { TodayPanel } from "@/components/TodayPanel";
import { VocabGauge } from "@/components/VocabGauge";
import { currentUnitOf, levelUnits } from "@/lib/progress";

export default async function HomePage() {
  const session = await getSession();
  const userId = session!.userId;
  const [userRow, unitsDetailed, activity, review] = await Promise.all([
    getUserStats(userId),
    getAllUnitsDetailed(userId).then(withoutQuestions),
    getActivityOverview(userId),
    getReviewSummary(userId),
  ]);
  const user = userRow!;

  // Hisoblagichlar va joriy dars — faqat o'quvchining joriy darajasi bo'yicha.
  const myUnits = levelUnits(unitsDetailed, user.level);
  const totalWords = myUnits.reduce((s, u) => s + u.totalWords, 0);
  const learnedWords = myUnits.reduce((s, u) => s + u.learnedWords, 0);
  const totalUnits = myUnits.length;
  const currentUnit = currentUnitOf(unitsDetailed, user.level);

  const LIBRARY_CARDS = [
    {
      href: "/lessons",
      label: "Darslar",
      desc: `${user.level} darajasida ${totalUnits} ta dars`,
      icon: GraduationCap,
      color: "text-ink-600",
    },
    {
      href: "/lessons",
      label: "Lug'at",
      desc: `${user.level} darajasida ${totalWords} ta so'z`,
      icon: BookOpen,
      color: "text-gold-600",
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <h1 className="sr-only">Bosh sahifa</h1>
      <TodayPanel user={user} units={unitsDetailed} activity={activity} review={review} />

      <div>
        <h2 className="font-display mb-3 text-lg font-semibold text-ink-950 dark:text-ink-50">Kutubxona</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LIBRARY_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                style={{ animationDelay: `${i * 70}ms` }}
                className="group flex animate-fade-up flex-col justify-between rounded-2xl bg-white p-5 shadow-sm shadow-ink-950/5 ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-[#161b26] dark:shadow-none dark:ring-white/10"
              >
                <div>
                  <p className="font-semibold text-ink-950 dark:text-ink-50">{c.label}</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{c.desc}</p>
                </div>
                <Icon size={28} className={`mt-6 self-end ${c.color} opacity-80 transition-transform duration-200 group-hover:scale-110`} />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VocabGauge learned={learnedWords} total={totalWords} />

        {currentUnit ? (
          <Link
            href={`/lessons?unit=${currentUnit.id}`}
            className="group relative flex animate-fade-up flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-gold-600 via-gold-700 to-ink-900 p-6 text-white shadow-sm shadow-gold-900/20 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="sheen pointer-events-none absolute inset-0 animate-shimmer opacity-40" />
            <ArrowUpRight
              size={20}
              className="absolute right-5 top-5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <div className="relative">
              <p className="text-sm font-semibold text-white/80">Joriy dars</p>
              <p className="font-display mt-1 text-lg font-bold">{currentUnit.subtitle}</p>
              <p className="text-xs text-white/80">
                {currentUnit.level_code} · {currentUnit.title}
              </p>
            </div>
            <div className="relative mt-6">
              <p className="text-3xl font-bold">{currentUnit.percent}%</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white transition-[width] duration-700 ease-out" style={{ width: `${currentUnit.percent}%` }} />
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex animate-fade-up flex-col items-center justify-center gap-2 rounded-3xl bg-gradient-to-br from-gold-600 to-ink-900 p-6 text-center text-white shadow-sm">
            <PartyPopper size={28} />
            <p className="font-bold">Barcha darslar tugallandi!</p>
            <p className="text-xs text-white/80">Ajoyib natija — davom eting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
