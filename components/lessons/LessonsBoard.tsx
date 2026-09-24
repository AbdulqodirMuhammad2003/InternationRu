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
  PlayCircle,
} from "lucide-react";
import type { LevelRecord, UnitDetail } from "@/lib/data";
import { submitExerciseResult } from "@/app/actions";
import { UNIT_GRADIENTS } from "./unit-style";
import { VocabRoundFlow } from "./VocabRoundFlow";

type View = "main" | "vocab-rounds" | "exercises" | "exercise-run" | "video";

/** Turli YouTube havola shakllarini (watch?v=, youtu.be/, shorts/) o'rnatib
 *  ko'rsatish uchun `/embed/VIDEO_ID` ko'rinishiga o'giradi. Havola
 *  tushunarsiz bo'lsa `null` qaytaradi (bunday holatda video ko'rsatilmaydi). */
function toYouTubeEmbedUrl(url: string): string | null {
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
    return id ? `https://www.youtube.com/embed/${id}` : null;
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
  const [qIndex, setQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [exerciseResult, setExerciseResult] = useState<number | null>(null);
  const [videoNotice, setVideoNotice] = useState(false);

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
    setVideoNotice(false);
  }

  function openUnitPanel(unit: UnitDetail) {
    if (unit.locked) return;
    setOpenUnitId(unit.id);
    setView("main");
    setVideoNotice(false);
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

  /** Video dars faqat shu darsdagi barcha mashqlar kamida bir marta
   *  yakunlangach (ball qanday bo'lishidan qat'iy nazar) ochiladi. */
  function unitVideoUnlocked(unit: UnitDetail) {
    return unit.exercises.length > 0 && unit.exercises.every((e) => e.attempted);
  }

  function selectAnswer(index: number) {
    setSelectedAnswer(index);
  }

  function nextQuestion() {
    if (!activeExercise || selectedAnswer === null) return;
    const question = activeExercise.questions[qIndex];
    const isCorrect = selectedAnswer === question.correct_index;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);

    if (qIndex + 1 < activeExercise.questions.length) {
      setCorrectCount(newCorrect);
      setQIndex(qIndex + 1);
      setSelectedAnswer(null);
    } else {
      const pct = Math.round((newCorrect / activeExercise.questions.length) * 100);
      setCorrectCount(newCorrect);
      setExerciseResult(pct);
      startTransition(async () => {
        await submitExerciseResult(activeExercise.id, pct);
        router.refresh();
      });
    }
  }

  function startExercise(exerciseId: number) {
    setActiveExerciseId(exerciseId);
    setQIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setExerciseResult(null);
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

                  {openUnit.video_url && (
                    <>
                      <button
                        onClick={() =>
                          unitVideoUnlocked(openUnit) ? setView("video") : setVideoNotice(true)
                        }
                        style={{ animationDelay: "60ms" }}
                        className="flex animate-fade-up items-center gap-4 rounded-2xl bg-ink-50 p-4 text-left transition-colors hover:bg-ink-100/70 dark:bg-white/5 dark:hover:bg-white/10"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-200 text-ink-600 dark:bg-white/10 dark:text-ink-300">
                          {unitVideoUnlocked(openUnit) ? <PlayCircle size={20} /> : <Lock size={20} />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-ink-800 dark:text-ink-100">Video dars</p>
                          <p className="text-xs text-ink-600/70 dark:text-ink-300/60">
                            Ruscha qisqa video (5-10 daqiqa)
                          </p>
                        </div>
                        <span className="rounded-full bg-ink-200/70 px-2.5 py-1 text-xs font-semibold text-ink-600 dark:bg-white/10 dark:text-ink-300">
                          {unitVideoUnlocked(openUnit) ? "Ochiq" : "Yopiq"}
                        </span>
                      </button>
                      {videoNotice && !unitVideoUnlocked(openUnit) && (
                        <p className="-mt-2 animate-fade-up rounded-xl bg-gold-50 px-3 py-2 text-xs text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                          Video dars mashqlarni bajarib tugatgach ochiladi.
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
                <div className="flex flex-col gap-3">
                  {openUnit.exercises.map((ex, i) => (
                    <button
                      key={ex.id}
                      onClick={() => startExercise(ex.id)}
                      style={{ animationDelay: `${i * 50}ms` }}
                      className="animate-fade-up rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                      <span className="mb-2 inline-block rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-600 dark:bg-rose-950/40 dark:text-rose-300">
                        {ex.skill_label}
                      </span>
                      <p className="font-semibold text-ink-950 dark:text-ink-50">{ex.title}</p>
                      <p className="mb-2 text-xs text-ink-700/60 dark:text-ink-300/60">{ex.question_count} ta savol</p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-rose-500 transition-[width] duration-500"
                          style={{ width: `${ex.score_pct}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {view === "exercise-run" && activeExercise && (
                <div className="mx-auto w-full max-w-xl py-4">
                  <ExerciseRun
                    exercise={activeExercise}
                    qIndex={qIndex}
                    selectedAnswer={selectedAnswer}
                    correctCount={correctCount}
                    exerciseResult={exerciseResult}
                    onSelect={selectAnswer}
                    onNext={nextQuestion}
                    onDone={() => setView("exercises")}
                  />
                </div>
              )}

              {view === "video" && openUnit.video_url && (
                <div className="flex flex-col gap-3">
                  {(() => {
                    const embedUrl = toYouTubeEmbedUrl(openUnit.video_url!);
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
                          title={`${openUnit.title} — video dars`}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    );
                  })()}
                  <p className="text-xs text-ink-600/70 dark:text-ink-300/60">
                    Bu darsda o'rgangan so'zlaringizni ruscha nutqda tanib olishga harakat qiling.
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

export function ExerciseRun({
  exercise,
  qIndex,
  selectedAnswer,
  correctCount,
  exerciseResult,
  onSelect,
  onNext,
  onDone,
}: {
  exercise: UnitDetail["exercises"][number];
  qIndex: number;
  selectedAnswer: number | null;
  correctCount: number;
  exerciseResult: number | null;
  onSelect: (i: number) => void;
  onNext: () => void;
  onDone: () => void;
}) {
  if (exerciseResult !== null) {
    return (
      <div className="flex animate-pop-in flex-col items-center gap-4 py-10 text-center">
        <PlayCircle size={48} className="text-gold-500" />
        <p className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">{exerciseResult}%</p>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
          To'g'ri javoblar: {correctCount} / {exercise.questions.length}
        </p>
        <button
          onClick={onDone}
          className="btn-press mt-2 rounded-full bg-azure-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-azure-500"
        >
          Tayyor
        </button>
      </div>
    );
  }

  const question = exercise.questions[qIndex];

  return (
    <div key={qIndex} className="flex animate-fade-up flex-col gap-4">
      <p className="text-xs font-semibold text-ink-500 dark:text-ink-400">
        Savol {qIndex + 1} / {exercise.questions.length}
      </p>
      <p className="text-base font-semibold leading-snug text-ink-950 dark:text-ink-50">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150 ${
              selectedAnswer === i
                ? "border-ink-500 bg-ink-50 font-semibold text-ink-900 dark:bg-ink-900/40 dark:text-ink-50"
                : "border-ink-100 bg-white hover:bg-ink-50/60 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={selectedAnswer === null}
        className="btn-press mt-2 rounded-full bg-azure-600 py-2.5 text-sm font-bold text-white hover:bg-azure-500 disabled:opacity-40"
      >
        {qIndex + 1 < exercise.questions.length ? "Keyingisi" : "Yakunlash"}
      </button>
    </div>
  );
}
