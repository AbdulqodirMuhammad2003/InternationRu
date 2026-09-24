import Link from "next/link";
import {
  GraduationCap,
  ListChecks,
  Trophy,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  PartyPopper,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { getUserStats, getAllUnitsDetailed } from "@/lib/data";
import { ProfileHeader } from "@/components/ProfileHeader";
import { VocabGauge } from "@/components/VocabGauge";

const QUICK_LINKS = [
  {
    href: "/lessons",
    label: "Darslar",
    desc: "4-darsdan davom eting",
    icon: GraduationCap,
    iconBg: "bg-ink-50 dark:bg-ink-900/40",
    iconColor: "text-ink-600 dark:text-ink-300",
    hover: "group-hover:bg-ink-600 group-hover:text-white",
  },
  {
    href: "/marks",
    label: "Baholar",
    desc: "Natijalar tarixi",
    icon: ListChecks,
    iconBg: "bg-ink-100 dark:bg-white/10",
    iconColor: "text-ink-700 dark:text-ink-200",
    hover: "group-hover:bg-ink-700 group-hover:text-white",
  },
  {
    href: "/ranking",
    label: "Reyting",
    desc: "O'quvchilar orasidagi o'rningiz",
    icon: Trophy,
    iconBg: "bg-ink-950/5 dark:bg-white/10",
    iconColor: "text-ink-950 dark:text-ink-100",
    hover: "group-hover:bg-ink-950 group-hover:text-gold-300",
  },
];

export default async function HomePage() {
  const session = await getSession();
  const user = (await getUserStats(session!.userId))!;
  const unitsDetailed = await getAllUnitsDetailed(user.id);

  const totalWords = unitsDetailed.reduce((s, u) => s + u.totalWords, 0);
  const learnedWords = unitsDetailed.reduce(
    (s, u) => s + u.rounds.reduce((rs, r) => rs + r.words.filter((w) => w.learned).length, 0),
    0
  );
  const totalUnits = unitsDetailed.length;
  const currentUnit = unitsDetailed.find((u) => !u.locked && u.percent < 100) || null;

  const LIBRARY_CARDS = [
    {
      href: "/lessons",
      label: "Darslar",
      desc: `${totalUnits} ta dars mavjud`,
      icon: GraduationCap,
      color: "text-ink-600",
    },
    {
      href: "/lessons",
      label: "Lug'at",
      desc: `${totalWords} ta so'z o'rganish uchun`,
      icon: BookOpen,
      color: "text-gold-600",
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="animate-fade-up">
        <h1 className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">
          Xush kelibsiz, {user.name.split(" ")[0]}!
        </h1>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">Progressingiz haqida qisqacha ma'lumot.</p>
      </div>

      <ProfileHeader user={user} />

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
                  <p className="mt-1 text-sm text-ink-700/60 dark:text-ink-300/60">{c.desc}</p>
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
              <p className="text-xs text-white/70">{currentUnit.code}</p>
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

      <div>
        <h2 className="font-display mb-3 text-lg font-semibold text-ink-950 dark:text-ink-50">Tezkor o'tish</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((l, i) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group relative flex animate-fade-up items-center gap-4 rounded-2xl bg-white p-5 shadow-sm outline outline-1 outline-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-[#161b26] dark:outline-white/10"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${l.iconBg} ${l.iconColor} ${l.hover}`}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink-950 dark:text-ink-50">{l.label}</p>
                  <p className="truncate text-xs text-ink-700/60 dark:text-ink-300/60">{l.desc}</p>
                </div>
                <ChevronRight
                  size={16}
                  className="ml-auto shrink-0 text-ink-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-ink-600"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
