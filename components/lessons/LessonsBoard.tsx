"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  LockKeyhole,
  BookOpen,
  ChevronDown,
  Medal,
  Clapperboard,
  Delete,
  Headphones,
  Info,
  ListChecks,
  MessagesSquare,
  PenLine,
  PlayCircle,
  Puzzle,
  Shapes,
  Trophy,
  UserRound,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import type { ClipKind, ExerciseKind, LevelRecord, UnitDetail } from "@/lib/data";
import { submitExerciseResult } from "@/app/actions";
import { UNIT_GRADIENTS } from "./unit-style";
import { VocabRoundFlow } from "./VocabRoundFlow";

type View = "main" | "exercise-run" | "clip";
type Section = "vocab" | "exercises";

const EXERCISE_KIND_ICONS: Record<ExerciseKind, LucideIcon> = {
  listen: Headphones,
  choice: Shapes,
  dialog: MessagesSquare,
  ending: UserRound,
  anagram: Puzzle,
  type: PenLine,
};

/** Darajalarning ruscha rasmiy nomlari (ТРКИ — rus tili bo'yicha davlat
 *  test tizimi shkalasi). */
const LEVEL_NAMES_RU: Record<string, string> = {
  A1: "Элементарный уровень",
  A2: "Базовый уровень",
  B1: "Первый уровень",
  B2: "Второй уровень",
};

const CLIP_KIND_LABELS: Record<ClipKind, string> = {
  film: "Film",
  multfilm: "Multfilm",
  hujjatli: "Hujjatli film",
  intervyu: "Intervyu",
};

/** Turli YouTube havola shakllarini (watch?v=, youtu.be/, shorts/) o'rnatib
 *  ko'rsatish uchun `/embed/VIDEO_ID` ko'rinishiga o'giradi, parchaning
 *  boshi/oxirini (soniyalarda) qo'shadi. Havola tushunarsiz bo'lsa `null`. */
function toYouTubeEmbedUrl(
  url: string,
  start: number | null,
  end: number | null
): string | null {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2];
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
    }
    if (!id) return null;
    const params = new URLSearchParams({ rel: "0", hl: "ru", cc_lang_pref: "ru" });
    if (start) params.set("start", String(start));
    if (end) params.set("end", String(end));
    return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  } catch {
    return null;
  }
}

export function LessonsBoard({
  units,
  levels,
}: {
  units: UnitDetail[];
  levels: LevelRecord[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  // "Joriy dars" kartasidan ?unit=ID bilan kelingan bo'lsa, mos darsni
  // birinchi render'dayoq avtomatik ochish (effektsiz, to'g'ridan-to'g'ri
  // boshlang'ich holat sifatida hisoblanadi).
  const unitParam = searchParams.get("unit");
  const linkedUnit = unitParam
    ? units.find((u) => u.id === Number(unitParam) && !u.locked) || null
    : null;

  // Faqat ochilgan darajalarning darslari ko'rsatiladi; sarlavhada esa
  // o'quvchining joriy (oxirgi ochilgan) darajasi turadi.
  const openLevels = levels.filter((l) => !l.locked);
  const currentLevel = openLevels[openLevels.length - 1] ?? levels[0];

  const [openUnitId, setOpenUnitId] = useState<number | null>(linkedUnit?.id ?? null);
  const [view, setView] = useState<View>("main");
  const [flowRoundId, setFlowRoundId] = useState<number | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null);
  // Har bir boshlashda oshadi — shu bilan bir xil mashqni qayta boshlaganda
  // ExerciseRun o'z holatini noldan boshlaydi.
  const [runKey, setRunKey] = useState(0);
  const [clipNotice, setClipNotice] = useState(false);
  // Dars panelida qaysi yig'ma bo'lim ochiq (lug'at yoki mashqlar).
  const [openSection, setOpenSection] = useState<Section | null>("vocab");

  const visibleUnits = units.filter((u) => openLevels.some((l) => l.code === u.level_code));

  const openUnit = units.find((u) => u.id === openUnitId) || null;
  const flowRound = openUnit?.rounds.find((r) => r.id === flowRoundId) || null;
  const flowAllWords = openUnit?.rounds.flatMap((r) => r.words) || [];
  const activeExercise = openUnit?.exercises.find((e) => e.id === activeExerciseId) || null;

  function closePanel() {
    setOpenUnitId(null);
    setView("main");
    setFlowRoundId(null);
    setActiveExerciseId(null);
    setClipNotice(false);
  }

  function openUnitPanel(unit: UnitDetail) {
    if (unit.locked) return;
    setOpenUnitId(unit.id);
    setView("main");
    // Lug'at tugallangan bo'lsa, to'g'ridan-to'g'ri mashqlar ochiladi.
    setOpenSection(unitVocabPercent(unit) < 100 || unit.exercises.length === 0 ? "vocab" : "exercises");
    setClipNotice(false);
  }

  function roundPercent(round: UnitDetail["rounds"][number]) {
    if (round.words.length === 0) return 0;
    const learned = round.words.filter((w) => !!w.learned).length;
    return Math.round((learned / round.words.length) * 100);
  }

  function unitVocabPercent(unit: UnitDetail) {
    if (unit.totalWords === 0) return 0;
    const learned = unit.rounds.flatMap((r) => r.words).filter((w) => !!w.learned).length;
    return Math.round((learned / unit.totalWords) * 100);
  }

  function unitExercisePercent(unit: UnitDetail) {
    if (unit.exercises.length === 0) return 0;
    return Math.round(
      unit.exercises.reduce((s, e) => s + e.score_pct, 0) / unit.exercises.length
    );
  }

  /** "Ruscha tomosha" faqat shu darsdagi barcha mashqlar kamida bir marta
   *  yakunlangach (ball qanday bo'lishidan qat'iy nazar) ochiladi. */
  function unitClipUnlocked(unit: UnitDetail) {
    return unit.exercises.length > 0 && unit.exercises.every((e) => e.attempted);
  }

  function finishExercise(exerciseId: number, answers: { questionId: number; correct: boolean }[]) {
    startTransition(async () => {
      await submitExerciseResult(exerciseId, answers);
      router.refresh();
    });
  }

  function startExercise(exerciseId: number) {
    setActiveExerciseId(exerciseId);
    setRunKey((k) => k + 1);
    setView("exercise-run");
  }

  // Karusel markazidagi (faol) karta — u kattaroq ko'rsatiladi va faqat
  // shu karta bosilganda dars ochiladi; qolganlari bosilsa markazga keladi.
  const [activeCard, setActiveCard] = useState(0);

  function cardElements() {
    return Array.from(
      scrollerRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []
    );
  }

  function scrollToCard(index: number, behavior: ScrollBehavior = "smooth") {
    const scroller = scrollerRef.current;
    const card = cardElements()[index];
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior,
    });
  }

  function syncActiveCard() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardElements().forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveCard(best);
  }

  // Sahifa ochilganda o'quvchining joriy darsini — oxirgi ochiq darsni —
  // markazga olib kelamiz.
  useEffect(() => {
    let current = 0;
    visibleUnits.forEach((u, i) => {
      if (!u.locked) current = i;
    });
    setActiveCard(current);
    scrollToCard(current, "instant");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      {/* Joriy daraja — ruscha rasmiy nomi bilan (ТРКИ shkalasi) */}
      {currentLevel && (
        <div className="mb-4 flex items-center gap-3">
          <span className="font-display rounded-2xl bg-gradient-to-br from-azure-600 to-azure-900 px-3.5 py-2 text-lg font-bold text-white shadow-sm shadow-azure-900/30">
            {currentLevel.code}
          </span>
          <div className="min-w-0">
            <p lang="ru" className="font-display text-lg font-bold leading-tight text-ink-950 dark:text-ink-50">
              {LEVEL_NAMES_RU[currentLevel.code] ?? currentLevel.title}
            </p>
            <p className="text-sm text-ink-500 dark:text-ink-400">{currentLevel.description}</p>
          </div>
        </div>
      )}

      {visibleUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#161b26] dark:shadow-none">
          <Lock size={28} className="text-ink-200 dark:text-ink-700" />
          <p className="font-semibold text-ink-700 dark:text-ink-200">Hozircha ochiq darslar yo'q</p>
        </div>
      ) : (
        <div>
          <div className="relative">
            <div
              ref={scrollerRef}
              onScroll={syncActiveCard}
              className="no-scrollbar flex min-w-0 snap-x snap-mandatory items-center gap-5 overflow-x-auto scroll-smooth px-[calc(50%-7.5rem)] py-8"
            >
              {visibleUnits.map((unit, i) => {
                const gradient = UNIT_GRADIENTS[unit.color] || UNIT_GRADIENTS.green;
                const active = i === activeCard;
                return (
                  <button
                    key={unit.id}
                    data-card
                    onClick={() => (active ? openUnitPanel(unit) : scrollToCard(i))}
                    aria-disabled={!!unit.locked}
                    style={{ animationDelay: `${i * 70}ms` }}
                    className={`group relative flex h-72 w-60 shrink-0 snap-center animate-fade-up flex-col items-center overflow-hidden rounded-[2rem] bg-gradient-to-br px-5 pb-6 pt-7 text-center text-white ring-1 ring-inset ring-white/10 transition-all duration-500 ease-out ${gradient} ${
                      active
                        ? "z-10 scale-110 shadow-2xl shadow-black/30"
                        : "scale-95 opacity-60 shadow-md hover:opacity-90"
                    } ${active && unit.locked ? "cursor-not-allowed" : ""}`}
                  >
                    {/* Dekorativ pufakchalar va yorug'lik — kartaga chuqurlik beradi */}
                    <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                    <span className="pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-black/10" />
                    <span className="pointer-events-none absolute bottom-16 right-10 h-8 w-8 rounded-full bg-black/10" />
                    <span className="pointer-events-none absolute -left-6 top-24 h-16 w-16 rounded-full bg-white/5" />

                    <span className="relative rounded-full bg-white/15 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      {unit.level_code}
                    </span>
                    <p className="font-display relative mt-3 text-3xl font-bold tracking-tight">
                      {unit.title}
                    </p>
                    <p className="relative mt-2 text-sm leading-snug text-white/80 line-clamp-3">
                      {unit.subtitle}
                    </p>

                    <div className="relative mt-auto flex w-full flex-col items-center gap-2">
                      {unit.locked ? (
                        <span className="flex h-12 items-center gap-2 rounded-full bg-rose-500 px-6 text-base font-bold shadow-lg shadow-rose-900/40">
                          <LockKeyhole size={20} strokeWidth={2.4} /> Yopiq
                        </span>
                      ) : (
                        <div className="relative h-12 w-full overflow-hidden rounded-full bg-white/90 shadow-lg shadow-black/20">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 transition-[width] duration-700"
                            style={{ width: `${unit.percent}%` }}
                          />
                          <span className="relative flex h-full items-center justify-center text-lg font-extrabold text-ink-950">
                            {unit.percent}%
                          </span>
                        </div>
                      )}
                      <span className="h-5 text-sm font-semibold text-white/85">
                        {unit.date_label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollToCard(activeCard - 1)}
              disabled={activeCard === 0}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-lg backdrop-blur transition-all hover:scale-105 disabled:opacity-0 dark:bg-[#161b26]/90 dark:text-ink-100"
              aria-label="Chapga aylantirish"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollToCard(activeCard + 1)}
              disabled={activeCard === visibleUnits.length - 1}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-800 shadow-lg backdrop-blur transition-all hover:scale-105 disabled:opacity-0 dark:bg-[#161b26]/90 dark:text-ink-100"
              aria-label="O’ngga aylantirish"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Sahifa nuqtalari */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {visibleUnits.map((unit, i) => (
              <button
                key={unit.id}
                onClick={() => scrollToCard(i)}
                aria-label={unit.title}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeCard
                    ? "w-6 bg-gold-400"
                    : "w-2 bg-ink-200 hover:bg-ink-300 dark:bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fon qorong’ulashuvi */}
      {openUnit && <div className="fixed inset-0 z-40 bg-black/30" onClick={closePanel} />}

      {/* Dars yon paneli (mashq bajarilayotganda butun ekranga kengayadi) */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-[#121620] ${
          openUnit ? "translate-x-0" : "translate-x-full"
        } ${view === "exercise-run" ? "w-full" : "w-full max-w-md"}`}
      >
        {openUnit && (
          <>
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4 dark:border-white/10">
              <h2 className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
                {view !== "main" ? (
                  <button
                    onClick={() => setView("main")}
                    className="mr-2 inline-flex items-center text-ink-400 hover:text-ink-700 dark:text-ink-500 dark:hover:text-ink-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                ) : null}
                {openUnit.title}
              </h2>
              <button onClick={closePanel} className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto px-6 py-5 ${
                view === "exercise-run" ? "flex items-center justify-center" : ""
              }`}
            >
              {view === "main" && (
                <div className="flex flex-col gap-4">
                  <LessonSection
                    title="Lug'at"
                    subtitle={`${openUnit.totalWords} ta so'z`}
                    percent={unitVocabPercent(openUnit)}
                    icon={<BookOpen size={22} />}
                    gradient="from-azure-500 to-azure-900"
                    open={openSection === "vocab"}
                    disabled={openUnit.totalWords === 0}
                    onToggle={() => setOpenSection(openSection === "vocab" ? null : "vocab")}
                  >
                    {openUnit.rounds.map((round, i) => {
                      const pct = roundPercent(round);
                      return (
                        <button
                          key={round.id}
                          onClick={() => setFlowRoundId(round.id)}
                          style={{ animationDelay: `${i * 50}ms` }}
                          className="relative flex w-40 shrink-0 animate-fade-up snap-start flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10"
                        >
                          <span
                            className={`absolute left-0 top-0 rounded-br-xl rounded-tl-2xl px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                              pct === 100 ? "bg-gold-500" : "bg-mint-500"
                            }`}
                          >
                            {pct === 100 ? "Tugallandi" : "Faol"}
                          </span>
                          {pct === 100 && (
                            <Medal size={26} className="absolute right-2.5 top-2 text-gold-500" />
                          )}
                          <p className="font-semibold text-ink-950 dark:text-ink-50">{round.title}</p>
                          <p className="mb-3 mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                            {round.words.length} ta so'z
                          </p>
                          <div className="mt-auto flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">{pct}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </LessonSection>

                  {openUnit.clip_url && (
                    <>
                      <button
                        onClick={() =>
                          unitClipUnlocked(openUnit) ? setView("clip") : setClipNotice(true)
                        }
                        style={{ animationDelay: "60ms" }}
                        className={`flex animate-fade-up items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ${
                          unitClipUnlocked(openUnit)
                            ? "bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-md shadow-gold-700/20 hover:-translate-y-0.5"
                            : "bg-ink-50 hover:bg-ink-100/70 dark:bg-white/5 dark:hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            unitClipUnlocked(openUnit)
                              ? "bg-white/20"
                              : "bg-ink-200 text-ink-600 dark:bg-white/10 dark:text-ink-300"
                          }`}
                        >
                          {unitClipUnlocked(openUnit) ? <Clapperboard size={22} /> : <Lock size={20} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs ${
                              unitClipUnlocked(openUnit) ? "text-white/75" : "text-ink-500 dark:text-ink-400"
                            }`}
                          >
                            Ruscha tomosha
                            {openUnit.clip_kind ? ` · ${CLIP_KIND_LABELS[openUnit.clip_kind]}` : ""}
                          </p>
                          <p
                            className={`truncate font-semibold ${
                              unitClipUnlocked(openUnit) ? "" : "text-ink-800 dark:text-ink-100"
                            }`}
                          >
                            {openUnit.clip_title || "Ruscha parcha"}
                          </p>
                        </div>
                        {!unitClipUnlocked(openUnit) && (
                          <span className="rounded-full bg-ink-200/70 px-2.5 py-1 text-xs font-semibold text-ink-600 dark:bg-white/10 dark:text-ink-300">
                            Yopiq
                          </span>
                        )}
                      </button>
                      {clipNotice && !unitClipUnlocked(openUnit) && (
                        <p className="-mt-2 animate-fade-up rounded-xl bg-gold-50 px-3 py-2 text-xs text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                          Mashqlarni bajarib bo'lgach, darsni ruscha film yoki multfilmdan parcha
                          bilan yakunlaysiz.
                        </p>
                      )}
                    </>
                  )}

                  <LessonSection
                    title="Mashqlar"
                    subtitle={`${openUnit.exercises.length} ta mashq`}
                    percent={unitExercisePercent(openUnit)}
                    icon={<ListChecks size={22} />}
                    gradient="from-mint-500 to-mint-900"
                    open={openSection === "exercises"}
                    disabled={openUnit.exercises.length === 0}
                    onToggle={() => setOpenSection(openSection === "exercises" ? null : "exercises")}
                    delay={120}
                  >
                    {openUnit.exercises.map((ex, i) => {
                      const KindIcon = EXERCISE_KIND_ICONS[ex.kind] ?? ListChecks;
                      return (
                        <button
                          key={ex.id}
                          onClick={() => startExercise(ex.id)}
                          style={{ animationDelay: `${i * 50}ms` }}
                          className="relative flex w-40 shrink-0 animate-fade-up snap-start flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10"
                        >
                          <span className="absolute left-0 top-0 rounded-br-xl rounded-tl-2xl bg-mint-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                            {ex.skill_label}
                          </span>
                          {ex.score_pct === 100 ? (
                            <Medal size={26} className="absolute right-2.5 top-2 text-gold-500" />
                          ) : (
                            <KindIcon size={22} className="absolute right-3 top-2.5 text-ink-400 dark:text-ink-500" />
                          )}
                          <p className="font-semibold leading-snug text-ink-950 dark:text-ink-50">
                            {i + 1}. {ex.title}
                          </p>
                          <p className="mb-3 mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                            {ex.question_count} ta savol
                          </p>
                          <div className="mt-auto flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
                                style={{ width: `${ex.score_pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-ink-600 dark:text-ink-300">
                              {ex.score_pct}%
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </LessonSection>
                </div>
              )}

              {view === "exercise-run" && activeExercise && (
                <div className="mx-auto w-full max-w-xl py-4">
                  <ExerciseRun
                    key={runKey}
                    exercise={activeExercise}
                    onFinish={(answers) => finishExercise(activeExercise.id, answers)}
                    onRetry={() => startExercise(activeExercise.id)}
                    onDone={() => setView("main")}
                  />
                </div>
              )}

              {view === "clip" && openUnit.clip_url && (
                <div className="flex flex-col gap-3">
                  <div>
                    {openUnit.clip_kind && (
                      <span className="mb-1 inline-block rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                        {CLIP_KIND_LABELS[openUnit.clip_kind]}
                      </span>
                    )}
                    <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
                      {openUnit.clip_title}
                    </p>
                  </div>
                  {(() => {
                    const embedUrl = toYouTubeEmbedUrl(
                      openUnit.clip_url!,
                      openUnit.clip_start,
                      openUnit.clip_end
                    );
                    if (!embedUrl) {
                      return (
                        <p className="text-sm text-ink-600/70 dark:text-ink-300/60">
                          Video havolasi noto'g'ri formatda.
                        </p>
                      );
                    }
                    return (
                      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md">
                        <iframe
                          src={embedUrl}
                          title={openUnit.clip_title || `${openUnit.title} — ruscha parcha`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  })()}
                  <p className="rounded-xl bg-ink-50 px-3 py-2 text-xs text-ink-600 dark:bg-white/5 dark:text-ink-300">
                    Hamma so'zni tushunish shart emas. Bu darsda o'rgangan so'zlaringizni jonli
                    ruscha nutqda eshitishga harakat qiling.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {flowRound && (
        <VocabRoundFlow
          round={flowRound}
          allWords={flowAllWords}
          onClose={() => {
            setFlowRoundId(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

/** Dars panelidagi yig'ma bo'lim: sarlavha kartasi bosilganda ostida
 *  kartalar qatori (lug'at bosqichlari yoki mashqlar) ochiladi. */
function LessonSection({
  title,
  subtitle,
  percent,
  icon,
  gradient,
  open,
  disabled,
  onToggle,
  delay = 0,
  children,
}: {
  title: string;
  subtitle: string;
  percent: number;
  icon: React.ReactNode;
  gradient: string;
  open: boolean;
  disabled: boolean;
  onToggle: () => void;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-up rounded-3xl transition-colors duration-300 ${
        open ? "bg-ink-50 dark:bg-white/5" : ""
      }`}
    >
      <button
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={open}
        className={`relative flex w-full items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-left text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 ${gradient}`}
      >
        <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <span className="pointer-events-none absolute -bottom-8 right-16 h-20 w-20 rounded-full bg-black/10" />
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-500 shadow-sm">
          {icon}
        </span>
        <span className="relative min-w-0 flex-1">
          <span className="font-display block text-xl font-bold">{title}</span>
          <span className="block text-sm text-white/80">{subtitle}</span>
          <span className="mt-2 flex items-center gap-2">
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/25">
              <span
                className="block h-full rounded-full bg-white transition-[width] duration-500"
                style={{ width: `${percent}%` }}
              />
            </span>
            <span className="text-xs font-bold">{percent}%</span>
          </span>
        </span>
        <ChevronDown
          size={22}
          className={`relative shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-4 pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function speakRu(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

/** Yozma javobni solishtirish uchun: kichik harf, ё → е, urg'u belgisi va
 *  tinish belgilari olib tashlanadi. */
function normalizeAnswer(s: string) {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/́/g, "")
    .replace(/[.,!?;:«»"'—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Ko'p o'quvchilarda rus klaviaturasi o'rnatilmagan — yozish savollari
// uchun ekrandagi kichik klaviatura.
const RU_KEYBOARD = ["йцукенгшщзхъ", "фывапролджэ", "ячсмитьбюё"];

function RussianKeyboard({
  onKey,
  onBackspace,
  disabled,
}: {
  onKey: (ch: string) => void;
  onBackspace: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      {RU_KEYBOARD.map((row, ri) => (
        <div key={ri} className="flex w-full justify-center gap-1">
          {row.split("").map((ch) => (
            <button
              key={ch}
              type="button"
              disabled={disabled}
              onClick={() => onKey(ch)}
              className="h-10 min-w-0 max-w-9 flex-1 rounded-lg bg-ink-100 text-sm font-semibold text-ink-800 transition-colors hover:bg-azure-100 active:bg-azure-200 disabled:opacity-40 dark:bg-white/10 dark:text-ink-100 dark:hover:bg-azure-900/50"
            >
              {ch}
            </button>
          ))}
          {ri === RU_KEYBOARD.length - 1 && (
            <button
              type="button"
              disabled={disabled}
              onClick={onBackspace}
              aria-label="O'chirish"
              className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-200 text-ink-700 hover:bg-ink-300 disabled:opacity-40 dark:bg-white/15 dark:text-ink-100"
            >
              <Delete size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/** "книга (Иван)" → { noun: "книга", owner: "Иван", stem: "Иван" };
 *  -а bilan tugagan ismda -а tushib qoladi (мама → мам + ы). */
function parseEnding(prompt: string) {
  const m = prompt.match(/^(.*)\s+\((.*)\)$/);
  const noun = m?.[1] ?? prompt;
  const owner = m?.[2] ?? "";
  const stem = owner.endsWith("а") ? owner.slice(0, -1) : owner;
  return { noun, owner, stem };
}

const OPTION_STATE_CLASSES = {
  right: "border-mint-500 bg-mint-50 font-semibold text-mint-900 dark:bg-mint-950/40 dark:text-mint-100",
  wrong: "border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200",
  selected: "border-azure-500 bg-azure-50 font-semibold text-azure-900 dark:bg-azure-950/40 dark:text-azure-100",
  idle: "border-ink-100 bg-white hover:border-ink-200 hover:bg-ink-50/60 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10",
};

export function ExerciseRun({
  exercise,
  onFinish,
  onRetry,
  onDone,
}: {
  exercise: UnitDetail["exercises"][number];
  /** Oxirgi savoldan keyin shu safar berilgan javoblar bilan bir marta
   *  chaqiriladi (server ularni avvalgi natijalar bilan birlashtiradi). */
  onFinish: (answers: { questionId: number; correct: boolean }[]) => void;
  onRetry: () => void;
  onDone: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  // Anagramma: bosilgan harflarning (aralash qatordagi) indekslari.
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean }[]>([]);
  const [result, setResult] = useState<number | null>(null);

  // Mashq qisman bajarilgan bo'lsa, faqat hali to'g'ri topilmagan savollar
  // beriladi (mashq ochilgandagi holat saqlanadi). Hammasi to'g'ri yoki
  // hech biri ishlanmagan bo'lsa — butun mashq.
  const [pending] = useState(() => {
    const left = exercise.questions.filter((q) => !q.answered_correctly);
    return left.length > 0 ? left : exercise.questions;
  });
  const alreadyCorrect = exercise.questions.length - pending.length;
  const resuming = alreadyCorrect > 0;
  const correctCount = answers.filter((a) => a.correct).length;

  const question = pending[qIndex];
  const kind = exercise.kind;
  const total = pending.length;

  // Tinglash savoli ochilishi bilan so'z bir marta avtomatik o'qiladi.
  useEffect(() => {
    if (question?.audio_text) speakRu(question.audio_text);
  }, [question?.audio_text, qIndex]);

  if (result !== null) {
    const great = result >= 80;
    return (
      <div className="flex animate-pop-in flex-col items-center gap-4 py-10 text-center">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg ${
            great
              ? "bg-gradient-to-br from-mint-400 to-mint-700 shadow-mint-700/30"
              : "bg-gradient-to-br from-gold-400 to-gold-600 shadow-gold-700/30"
          }`}
        >
          {great ? <Trophy size={40} /> : <PlayCircle size={40} />}
        </div>
        <p className="font-display text-4xl font-bold text-ink-950 dark:text-ink-50">{result}%</p>
        <p className="text-sm text-ink-600 dark:text-ink-300">
          {great ? "Ajoyib natija!" : "Xato qilingan savollarni yana bir marta ishlab ko'ring."}{" "}
          To'g'ri javoblar: {alreadyCorrect + correctCount} / {exercise.questions.length}
        </p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={onRetry}
            className="btn-press rounded-full bg-ink-100 px-5 py-2.5 text-sm font-bold text-ink-800 hover:bg-ink-200 dark:bg-white/10 dark:text-ink-100"
          >
            Qayta ishlash
          </button>
          <button
            onClick={onDone}
            className="btn-press rounded-full bg-azure-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-azure-500"
          >
            Tayyor
          </button>
        </div>
      </div>
    );
  }

  const letters = kind === "anagram" ? question.prompt.split("") : [];
  const answerValue = kind === "anagram" ? picked.map((i) => letters[i]).join("") : typed;
  const isWritten = kind === "anagram" || !!question.answer_text;
  const acceptedAnswers = (question.answer_text ?? "").split("|").map(normalizeAnswer);
  const canCheck = isWritten ? answerValue.trim() !== "" : selected !== null;
  const ending = kind === "ending" ? parseEnding(question.prompt) : null;

  function check() {
    if (!canCheck || checked !== null) return;
    const ok = isWritten
      ? acceptedAnswers.includes(normalizeAnswer(answerValue))
      : selected === question.correct_index;
    setChecked(ok);
    setAnswers((a) => [...a, { questionId: question.id, correct: ok }]);
  }

  function next() {
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setTyped("");
      setPicked([]);
      setChecked(null);
    } else {
      const pct = Math.round(((alreadyCorrect + correctCount) / exercise.questions.length) * 100);
      setResult(pct);
      onFinish(answers);
    }
  }

  function optionState(i: number): keyof typeof OPTION_STATE_CLASSES {
    if (checked === null) return selected === i ? "selected" : "idle";
    if (i === question.correct_index) return "right";
    return selected === i ? "wrong" : "idle";
  }

  const shortOptions = question.options.every((o) => o.length <= 8);
  const optionGrid = (prefix = "") => (
    <div
      className={`grid gap-2 ${
        kind === "choice" || kind === "ending"
          ? shortOptions
            ? "grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => checked === null && setSelected(i)}
          className={`rounded-xl border-2 px-3 py-3 text-base transition-all duration-150 ${
            shortOptions ? "text-center" : "text-left"
          } ${OPTION_STATE_CLASSES[optionState(i)]}`}
        >
          {prefix}
          {opt}
        </button>
      ))}
    </div>
  );

  const resultTone =
    checked === null ? "text-azure-600 dark:text-azure-300" : checked ? "text-mint-600" : "text-rose-500";
  const correctAnswerText = isWritten
    ? question.answer_text!.split("|")[0]
    : ending
    ? `${ending.noun} ${ending.stem}${question.options[question.correct_index]}`
    : question.options[question.correct_index];

  return (
    <div className="flex flex-col gap-4">
      {resuming && (
        <p className="rounded-2xl bg-gold-50 px-4 py-2.5 text-sm font-semibold text-gold-800 dark:bg-gold-950/40 dark:text-gold-200">
          Faqat xato qilingan {total} ta savol qoldi — {alreadyCorrect} tasi avval to'g'ri topilgan.
        </p>
      )}
      {exercise.instructions && (
        <div className="flex gap-2.5 rounded-2xl bg-azure-50 px-4 py-3 text-sm leading-relaxed text-azure-900 dark:bg-azure-950/40 dark:text-azure-100">
          <Info size={18} className="mt-0.5 shrink-0" />
          <p>
            <span className="font-bold">Shart: </span>
            {exercise.instructions}
          </p>
        </div>
      )}

      <div key={qIndex} className="flex animate-fade-up flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
              style={{ width: `${(qIndex / total) * 100}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-ink-500 dark:text-ink-400">
            {qIndex + 1} / {total}
          </span>
        </div>

        {kind === "listen" && (
          <>
            <button
              onClick={() => question.audio_text && speakRu(question.audio_text)}
              className="btn-press mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg shadow-gold-700/30 hover:bg-gold-400"
              aria-label="Eshitish"
            >
              <Volume2 size={34} />
            </button>
            {optionGrid()}
          </>
        )}

        {kind === "choice" && (
          <>
            <p
              className={`whitespace-pre-line text-center font-semibold text-ink-950 dark:text-ink-50 ${
                question.prompt.length <= 24 ? "font-display py-2 text-3xl" : "text-lg"
              }`}
            >
              {question.prompt}
            </p>
            {optionGrid()}
          </>
        )}

        {kind === "dialog" && (
          <>
            <div className="flex flex-col gap-2">
              <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-ink-100 px-4 py-2.5 text-base text-ink-900 dark:bg-white/10 dark:text-ink-50">
                — {question.prompt}
              </p>
              <p
                className={`max-w-[80%] self-end rounded-2xl rounded-br-md px-4 py-2.5 text-base transition-colors ${
                  checked === null
                    ? "bg-azure-100 text-azure-900 dark:bg-azure-950/50 dark:text-azure-100"
                    : checked
                    ? "bg-mint-100 text-mint-900 dark:bg-mint-950/50 dark:text-mint-100"
                    : "bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-100"
                }`}
              >
                — {selected === null ? "…" : question.options[selected]}
              </p>
            </div>
            {optionGrid()}
          </>
        )}

        {ending && (
          <>
            <div className="text-center">
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {ending.noun} ({ending.owner}) →
              </p>
              <p className="font-display mt-1 text-3xl font-bold text-ink-950 dark:text-ink-50">
                {ending.noun} {ending.stem}
                <span className={`border-b-2 border-current px-1 ${resultTone}`}>
                  {selected === null ? "_" : question.options[selected]}
                </span>
              </p>
            </div>
            {optionGrid("-")}
          </>
        )}

        {kind === "anagram" && (
          <>
            <div className="flex flex-wrap justify-center gap-1.5">
              {letters.map((_, i) => (
                <span
                  key={i}
                  className={`flex h-12 w-10 items-center justify-center border-b-2 text-2xl font-bold ${
                    checked === null
                      ? "border-ink-300 text-ink-950 dark:border-white/30 dark:text-ink-50"
                      : checked
                      ? "border-mint-500 text-mint-700 dark:text-mint-300"
                      : "border-rose-400 text-rose-600 dark:text-rose-300"
                  }`}
                >
                  {picked[i] !== undefined ? letters[picked[i]] : ""}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {letters.map((ch, i) => (
                <button
                  key={i}
                  disabled={picked.includes(i) || checked !== null}
                  onClick={() => setPicked((p) => [...p, i])}
                  className="btn-press h-12 w-11 rounded-xl bg-azure-50 text-xl font-bold text-azure-900 shadow-sm ring-1 ring-azure-200 transition-opacity hover:bg-azure-100 disabled:opacity-25 dark:bg-azure-950/40 dark:text-azure-100 dark:ring-azure-900"
                >
                  {ch}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPicked((p) => p.slice(0, -1))}
              disabled={picked.length === 0 || checked !== null}
              className="mx-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-100 disabled:opacity-40 dark:text-ink-400 dark:hover:bg-white/10"
            >
              <Delete size={14} /> Oxirgi harfni o'chirish
            </button>
          </>
        )}

        {kind === "type" && (
          <div className="flex flex-col gap-3">
            <p className="font-display text-center text-3xl font-bold text-ink-950 dark:text-ink-50">
              {question.prompt} <span className="text-ink-300 dark:text-ink-600">→ ?</span>
            </p>
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (checked === null ? check : next)();
              }}
              disabled={checked !== null}
              lang="ru"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Javobni ruscha yozing"
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center text-lg font-semibold text-ink-900 outline-none transition-colors placeholder:text-sm placeholder:font-normal placeholder:text-ink-300 dark:bg-white/5 dark:text-ink-50 ${
                checked === true
                  ? "border-mint-500"
                  : checked === false
                  ? "border-rose-400"
                  : "border-ink-200 focus:border-azure-500 dark:border-white/10"
              }`}
            />
            <RussianKeyboard
              disabled={checked !== null}
              onKey={(ch) => setTyped((t) => t + ch)}
              onBackspace={() => setTyped((t) => t.slice(0, -1))}
            />
          </div>
        )}

        {checked !== null && (
          <div
            className={`animate-fade-up rounded-2xl px-4 py-3 text-sm ${
              checked
                ? "bg-mint-50 text-mint-900 dark:bg-mint-950/40 dark:text-mint-100"
                : "bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-100"
            }`}
          >
            <p className="font-bold">{checked ? "To'g'ri!" : `To'g'ri javob: ${correctAnswerText}`}</p>
            {question.explanation && <p className="mt-1 opacity-90">{question.explanation}</p>}
          </div>
        )}

        <button
          onClick={checked === null ? check : next}
          disabled={checked === null && !canCheck}
          className="btn-press mt-1 rounded-full bg-azure-600 py-3 text-sm font-bold text-white hover:bg-azure-500 disabled:opacity-40"
        >
          {checked === null ? "Tekshirish" : qIndex + 1 < total ? "Keyingisi" : "Natijani ko'rish"}
        </button>
      </div>
    </div>
  );
}
