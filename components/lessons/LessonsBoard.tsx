"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  LockKeyhole,
  CheckCircle2,
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

type View = "main" | "vocab-rounds" | "exercises" | "exercise-run" | "clip";

const EXERCISE_KIND_ICONS: Record<ExerciseKind, LucideIcon> = {
  listen: Headphones,
  choice: Shapes,
  dialog: MessagesSquare,
  ending: UserRound,
  anagram: Puzzle,
  type: PenLine,
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

  const firstAvailable = levels.find((l) => !l.locked) || levels[0];
  const [selectedLevelCode, setSelectedLevelCode] = useState<string>(
    linkedUnit?.level_code || firstAvailable?.code || "A1"
  );

  const [openUnitId, setOpenUnitId] = useState<number | null>(linkedUnit?.id ?? null);
  const [view, setView] = useState<View>("main");
  const [flowRoundId, setFlowRoundId] = useState<number | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null);
  // Har bir boshlashda oshadi — shu bilan bir xil mashqni qayta boshlaganda
  // ExerciseRun o'z holatini noldan boshlaydi.
  const [runKey, setRunKey] = useState(0);
  const [clipNotice, setClipNotice] = useState(false);

  const visibleUnits = units.filter((u) => u.level_code === selectedLevelCode);
  const selectedLevel = levels.find((l) => l.code === selectedLevelCode);

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

  function finishExercise(exerciseId: number, pct: number) {
    startTransition(async () => {
      await submitExerciseResult(exerciseId, pct);
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

  // Daraja almashganda (yoki birinchi ochilganda) o'quvchining joriy
  // darsini — oxirgi ochiq darsni — markazga olib kelamiz.
  useEffect(() => {
    let current = 0;
    visibleUnits.forEach((u, i) => {
      if (!u.locked) current = i;
    });
    setActiveCard(current);
    scrollToCard(current, "instant");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevelCode]);

  return (
    <div className="relative">
      {/* Daraja tanlash (A1, A2, B1, B2) */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {levels.map((level) => {
          const active = level.code === selectedLevelCode;
          return (
            <button
              key={level.code}
              onClick={() => setSelectedLevelCode(level.code)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-gradient-to-br from-azure-700 to-azure-950 text-white shadow-sm shadow-azure-900/30"
                  : level.locked
                  ? "bg-white text-ink-300 hover:bg-ink-50 dark:bg-[#161b26] dark:text-ink-700 dark:hover:bg-white/10"
                  : "bg-white text-ink-700 shadow-sm hover:-translate-y-0.5 hover:bg-ink-50 dark:bg-[#161b26] dark:text-ink-200 dark:hover:bg-white/10"
              }`}
            >
              {level.locked ? <Lock size={13} /> : null}
              {level.code}
            </button>
          );
        })}
      </div>

      {selectedLevel && (
        <p className="mb-4 text-sm text-ink-700/60 dark:text-ink-300/60">{selectedLevel.description}</p>
      )}

      {visibleUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#161b26] dark:shadow-none">
          <Lock size={28} className="text-ink-200 dark:text-ink-700" />
          <p className="font-semibold text-ink-700 dark:text-ink-200">Bu daraja hali ochilmagan</p>
          <p className="text-sm text-ink-400 dark:text-ink-500">
            {selectedLevel?.code} darajasi avvalgi darajani tugatgach ochiladi.
          </p>
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
                  <button
                    onClick={() => setView("vocab-rounds")}
                    disabled={openUnit.totalWords === 0}
                    className="animate-fade-up rounded-2xl bg-gradient-to-br from-azure-600 to-azure-900 p-5 text-left text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <p className="text-sm text-white/60">Lug'at</p>
                    <p className="font-display mb-3 text-xl font-bold">{openUnit.totalWords} ta so'z</p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-gold-400 transition-[width] duration-500"
                        style={{ width: `${unitVocabPercent(openUnit)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs text-white/70">
                      {unitVocabPercent(openUnit)}%
                    </p>
                  </button>

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

                  <button
                    onClick={() => setView("exercises")}
                    disabled={openUnit.exercises.length === 0}
                    style={{ animationDelay: "120ms" }}
                    className="animate-fade-up rounded-2xl bg-gradient-to-br from-mint-600 to-mint-900 p-5 text-left text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <p className="text-sm text-white/60">Mashqlar</p>
                    <p className="font-display mb-3 text-xl font-bold">
                      {openUnit.exercises.length} ta mashq
                    </p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-gold-400 transition-[width] duration-500"
                        style={{ width: `${unitExercisePercent(openUnit)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs text-white/70">
                      {unitExercisePercent(openUnit)}%
                    </p>
                  </button>
                </div>
              )}

              {view === "vocab-rounds" && (
                <div className="flex flex-col gap-3">
                  {openUnit.rounds.map((round, i) => {
                    const pct = roundPercent(round);
                    return (
                      <button
                        key={round.id}
                        onClick={() => setFlowRoundId(round.id)}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className="animate-fade-up rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              pct === 100
                                ? "bg-ink-100 text-ink-700 dark:bg-white/10 dark:text-ink-200"
                                : "bg-ink-50 text-ink-600 dark:bg-white/5 dark:text-ink-300"
                            }`}
                          >
                            {pct === 100 ? "Tugallangan" : "Faol"}
                          </span>
                          {pct === 100 && <CheckCircle2 size={18} className="text-ink-600 dark:text-ink-300" />}
                        </div>
                        <p className="font-semibold text-ink-950 dark:text-ink-50">{round.title}</p>
                        <p className="mb-2 text-xs text-ink-700/60 dark:text-ink-300/60">{round.words.length} ta so’z</p>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-mint-500 transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {view === "exercises" && (
                <div className="grid grid-cols-2 gap-3">
                  {openUnit.exercises.map((ex, i) => {
                    const KindIcon = EXERCISE_KIND_ICONS[ex.kind] ?? ListChecks;
                    return (
                      <button
                        key={ex.id}
                        onClick={() => startExercise(ex.id)}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className="relative flex animate-fade-up flex-col rounded-2xl bg-white px-3.5 pb-3.5 pt-9 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5 dark:shadow-none dark:ring-white/10"
                      >
                        <span className="absolute left-0 top-0 rounded-br-xl rounded-tl-2xl bg-mint-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                          {ex.skill_label}
                        </span>
                        <KindIcon size={22} className="absolute right-3 top-2.5 text-ink-400 dark:text-ink-500" />
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
                </div>
              )}

              {view === "exercise-run" && activeExercise && (
                <div className="mx-auto w-full max-w-xl py-4">
                  <ExerciseRun
                    key={runKey}
                    exercise={activeExercise}
                    onFinish={(pct) => finishExercise(activeExercise.id, pct)}
                    onRetry={() => startExercise(activeExercise.id)}
                    onDone={() => setView("exercises")}
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
    <div className="flex flex-col items-center gap-1">
      {RU_KEYBOARD.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.split("").map((ch) => (
            <button
              key={ch}
              type="button"
              disabled={disabled}
              onClick={() => onKey(ch)}
              className="h-9 w-7 rounded-lg bg-ink-100 text-sm font-semibold text-ink-800 transition-colors hover:bg-azure-100 active:bg-azure-200 disabled:opacity-40 sm:w-8 dark:bg-white/10 dark:text-ink-100 dark:hover:bg-azure-900/50"
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
              className="flex h-9 w-12 items-center justify-center rounded-lg bg-ink-200 text-ink-700 hover:bg-ink-300 disabled:opacity-40 dark:bg-white/15 dark:text-ink-100"
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
  /** Oxirgi savoldan keyin natija foizi bilan bir marta chaqiriladi. */
  onFinish: (pct: number) => void;
  onRetry: () => void;
  onDone: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  // Anagramma: bosilgan harflarning (aralash qatordagi) indekslari.
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const question = exercise.questions[qIndex];
  const kind = exercise.kind;
  const total = exercise.questions.length;

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
          {great ? "Ajoyib natija!" : "Yaxshi urinish! Yana bir marta ishlab ko'ring."}{" "}
          To'g'ri javoblar: {correctCount} / {total}
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
    if (ok) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setTyped("");
      setPicked([]);
      setChecked(null);
    } else {
      const pct = Math.round((correctCount / total) * 100);
      setResult(pct);
      onFinish(pct);
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
