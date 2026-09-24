import Link from "next/link";
import { ArrowRight, ChevronRight, CircleCheck, Flame, PartyPopper, RefreshCw } from "lucide-react";
import {
  DAILY_GOAL,
  type ActivityOverview,
  type ReviewSummary,
  type UnitDetail,
  type UserRecord,
} from "@/lib/data";
import { EditableAvatar } from "./EditableAvatar";

interface NextStep {
  title: string;
  detail: string;
  percent: number;
  href: string;
}

/** O'quvchi to'xtagan joy: birinchi ochiq darsdagi tugallanmagan lug'at
 *  bosqichi, bo'lmasa hali ishlanmagan mashq. */
function findNextStep(units: UnitDetail[]): NextStep | null {
  for (const unit of units) {
    if (unit.locked) continue;
    for (const round of unit.rounds) {
      const left = round.words.filter((w) => !w.learned).length;
      if (left > 0) {
        return {
          title: `${unit.title} · Lug'at, ${round.title}`,
          detail: `${left} ta so'z qoldi`,
          percent: Math.round(((round.words.length - left) / round.words.length) * 100),
          href: `/lessons?unit=${unit.id}`,
        };
      }
    }
    const done = unit.exercises.filter((e) => e.attempted).length;
    const next = unit.exercises.find((e) => !e.attempted);
    if (next) {
      return {
        title: `${unit.title} · Mashqlar`,
        detail: next.title,
        percent: Math.round((done / unit.exercises.length) * 100),
        href: `/lessons?unit=${unit.id}`,
      };
    }
  }
  return null;
}

function GoalRing({ value, goal }: { value: number; goal: number }) {
  const r = 19;
  const circ = 2 * Math.PI * r;
  const filled = Math.min(value / goal, 1) * circ;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0" aria-hidden="true">
      <circle cx="24" cy="24" r={r} fill="none" strokeWidth="5" className="stroke-ink-100 dark:stroke-white/10" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        transform="rotate(-90 24 24)"
        className="stroke-mint-500 transition-[stroke-dasharray] duration-700"
      />
    </svg>
  );
}

export function TodayPanel({
  user,
  units,
  activity,
  review,
}: {
  user: UserRecord;
  units: UnitDetail[];
  activity: ActivityOverview;
  review: ReviewSummary;
}) {
  const next = findNextStep(units);
  const learned = units.reduce(
    (s, u) => s + u.rounds.reduce((rs, r) => rs + r.words.filter((w) => w.learned).length, 0),
    0
  );
  const totalWords = units.reduce((s, u) => s + u.totalWords, 0);
  const goalReached = activity.todayCorrect >= DAILY_GOAL;

  return (
    <div className="animate-fade-up rounded-3xl bg-white p-5 shadow-sm shadow-ink-950/5 ring-1 ring-ink-950/5 sm:p-6 dark:bg-[#161b26] dark:shadow-none dark:ring-white/10">
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <EditableAvatar name={user.name} avatarUrl={user.avatar_url} size={52} triggerClassName="items-center gap-3">
          <div className="text-left">
            <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
              Salom, {user.name.split(" ")[0]}!
            </p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              {goalReached ? "Bugungi maqsad bajarildi — zo'r!" : "Bugun yana bir qadam — 10 daqiqa yetarli"}
            </p>
          </div>
        </EditableAvatar>
        <div
          className={`ml-auto flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold ${
            activity.streak > 0
              ? "bg-gold-100 text-gold-800 dark:bg-gold-950/50 dark:text-gold-200"
              : "bg-ink-50 text-ink-500 dark:bg-white/5 dark:text-ink-400"
          }`}
        >
          <Flame size={20} className={activity.streak > 0 ? "text-gold-600 dark:text-gold-300" : ""} />
          {activity.streak > 0 ? `${activity.streak} kun ketma-ket` : "Streakni bugun boshlang"}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.3fr_1fr]">
        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col rounded-2xl bg-gradient-to-br from-azure-600 to-azure-900 p-5 text-white shadow-md shadow-azure-900/20 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Davom ettirish</p>
            <p className="font-display mt-1 text-lg font-bold">{next.title}</p>
            <p className="text-sm text-white/75">{next.detail}</p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-gold-400" style={{ width: `${next.percent}%` }} />
            </div>
            <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-bold text-azure-800 transition-colors group-hover:bg-azure-50">
              Davom ettirish <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ) : (
          <Link
            href="/lessons"
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-mint-500 to-mint-800 p-5 text-center text-white"
          >
            <PartyPopper size={28} />
            <p className="font-bold">Ochiq darslarning hammasi tugallandi!</p>
            <p className="text-sm text-white/80">Keyingi dars tez orada ochiladi.</p>
          </Link>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-ink-50 p-4 dark:bg-white/5">
            <GoalRing value={activity.todayCorrect} goal={DAILY_GOAL} />
            <div>
              <p className="text-xs text-ink-500 dark:text-ink-400">Bugungi maqsad</p>
              <p className="font-bold text-ink-950 dark:text-ink-50">
                {Math.min(activity.todayCorrect, DAILY_GOAL)} / {DAILY_GOAL} to'g'ri javob
              </p>
            </div>
          </div>
          <Link
            href="/review"
            className={`group flex items-center gap-3 rounded-2xl p-4 transition-colors ${
              review.due > 0
                ? "bg-gold-100 hover:bg-gold-200/70 dark:bg-gold-950/50 dark:hover:bg-gold-950/70"
                : "bg-ink-50 hover:bg-ink-100 dark:bg-white/5 dark:hover:bg-white/10"
            }`}
          >
            <RefreshCw
              size={24}
              className={`shrink-0 ${review.due > 0 ? "text-gold-600 dark:text-gold-300" : "text-ink-400"}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink-500 dark:text-ink-400">Takrorlash vaqti</p>
              <p className="font-bold text-ink-950 dark:text-ink-50">
                {review.due > 0 ? `${review.due} ta so'z` : "Hozircha yo'q"}
              </p>
              <p className="text-[11px] text-ink-400 dark:text-ink-500">
                O'rganilgan: {learned} / {totalWords}
              </p>
            </div>
            <ChevronRight size={18} className="shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 dark:border-white/10">
        <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">Bu hafta</span>
        <div className="flex gap-2 sm:gap-3">
          {activity.week.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-1">
              {d.active ? (
                <CircleCheck size={24} className="text-mint-500" />
              ) : d.isToday ? (
                <Flame size={24} className="text-gold-500" />
              ) : (
                <span
                  className={`h-6 w-6 rounded-full border-2 ${
                    d.isFuture ? "border-ink-100 dark:border-white/10" : "border-ink-200 dark:border-white/15"
                  }`}
                />
              )}
              <span
                className={`text-[11px] ${
                  d.isToday ? "font-bold text-ink-900 dark:text-ink-50" : "text-ink-400 dark:text-ink-500"
                }`}
              >
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
