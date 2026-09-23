"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lock,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import type { LevelRecord, UnitDetail } from "@/lib/data";
import { submitExerciseResult } from "@/app/actions";
import { UNIT_GRADIENTS, UNIT_ICONS } from "./unit-style";
import { VocabRoundFlow } from "./VocabRoundFlow";

type View = "main" | "vocab-rounds" | "exercises" | "exercise-run";

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

  function scrollCarousel(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

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
                  ? "bg-gradient-to-br from-olive-700 to-olive-950 text-white shadow-sm shadow-olive-900/30"
                  : level.locked
                  ? "bg-white text-olive-300 hover:bg-olive-50 dark:bg-[#1f2115] dark:text-olive-700 dark:hover:bg-white/10"
                  : "bg-white text-olive-700 shadow-sm hover:-translate-y-0.5 hover:bg-olive-50 dark:bg-[#1f2115] dark:text-olive-200 dark:hover:bg-white/10"
              }`}
            >
              {level.locked ? <Lock size={13} /> : null}
              {level.code}
            </button>
          );
        })}
      </div>

      {selectedLevel && (
        <p className="mb-4 text-sm text-olive-700/60 dark:text-olive-300/60">{selectedLevel.description}</p>
      )}

      {visibleUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-[#1f2115] dark:shadow-none">
          <Lock size={28} className="text-olive-200 dark:text-olive-700" />
          <p className="font-semibold text-olive-700 dark:text-olive-200">Bu daraja hali ochilmagan</p>
          <p className="text-sm text-olive-400 dark:text-olive-500">
            {selectedLevel?.code} darajasi avvalgi darajani tugatgach ochiladi.
          </p>
        </div>
      ) : (
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => scrollCarousel(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-olive-700 shadow transition-colors hover:bg-olive-50 dark:bg-[#1f2115] dark:text-olive-200 dark:hover:bg-white/10"
            aria-label="Chapga aylantirish"
          >
            <ChevronLeft size={18} />
          </button>
          <div
            ref={scrollerRef}
            className="no-scrollbar flex min-w-0 flex-1 gap-4 overflow-x-auto scroll-smooth py-2"
          >
            {visibleUnits.map((unit, i) => {
              const Icon = UNIT_ICONS[unit.icon] || UNIT_ICONS.book;
              const gradient = UNIT_GRADIENTS[unit.color] || UNIT_GRADIENTS.green;
              return (
                <button
                  key={unit.id}
                  onClick={() => openUnitPanel(unit)}
                  disabled={!!unit.locked}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={`relative flex h-64 w-56 shrink-0 animate-fade-up flex-col justify-between rounded-3xl bg-gradient-to-br p-5 text-left text-white shadow-md transition-all duration-300 ${gradient} ${
                    unit.locked ? "cursor-not-allowed opacity-70" : "hover:-translate-y-1.5 hover:shadow-xl"
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-bold">{unit.title}</p>
                    <p className="mt-1 text-sm leading-snug text-white/85 line-clamp-4">
                      {unit.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Icon size={34} className="text-white/80" />
                    {unit.locked ? (
                      <span className="flex items-center gap-1 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold">
                        <Lock size={12} /> Yopiq
                      </span>
                    ) : (
                      <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-olive-950">
                        {unit.percent}%
                      </span>
                    )}
                  </div>
                  {unit.date_label && (
                    <span className="absolute bottom-3 right-5 text-[11px] text-white/70">
                      {unit.date_label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => scrollCarousel(1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-olive-700 shadow transition-colors hover:bg-olive-50 dark:bg-[#1f2115] dark:text-olive-200 dark:hover:bg-white/10"
            aria-label="O’ngga aylantirish"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Fon qorong’ulashuvi */}
      {openUnit && <div className="fixed inset-0 z-40 bg-black/30" onClick={closePanel} />}

      {/* Dars yon paneli (mashq bajarilayotganda butun ekranga kengayadi) */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full flex-col bg-white shadow-2xl transition-all duration-300 dark:bg-[#1a1c11] ${
          openUnit ? "translate-x-0" : "translate-x-full"
        } ${view === "exercise-run" ? "w-full" : "w-full max-w-md"}`}
      >
        {openUnit && (
          <>
            <div className="flex items-center justify-between border-b border-olive-100 px-6 py-4 dark:border-white/10">
              <h2 className="font-display text-lg font-bold text-olive-950 dark:text-olive-50">
                {view !== "main" ? (
                  <button
                    onClick={() => setView("main")}
                    className="mr-2 inline-flex items-center text-olive-400 hover:text-olive-700 dark:text-olive-500 dark:hover:text-olive-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                ) : null}
                {openUnit.title}
              </h2>
              <button onClick={closePanel} className="rounded-full p-1.5 text-olive-500 transition-colors hover:bg-olive-50 dark:text-olive-300 dark:hover:bg-white/10">
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
                    className="animate-fade-up rounded-2xl bg-gradient-to-br from-olive-700 to-olive-950 p-5 text-left text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
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

                  <button
                    onClick={() => setVideoNotice(true)}
                    style={{ animationDelay: "60ms" }}
                    className="flex animate-fade-up items-center gap-4 rounded-2xl bg-olive-50 p-4 text-left transition-colors hover:bg-olive-100/70 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-olive-200 text-olive-600 dark:bg-white/10 dark:text-olive-300">
                      <Lock size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-olive-800 dark:text-olive-100">Video dars</p>
                      <p className="text-xs text-olive-600/70 dark:text-olive-300/60">Nazariya + test</p>
                    </div>
                    <span className="rounded-full bg-olive-200/70 px-2.5 py-1 text-xs font-semibold text-olive-600 dark:bg-white/10 dark:text-olive-300">
                      Yopiq
                    </span>
                  </button>
                  {videoNotice && (
                    <p className="-mt-2 animate-fade-up rounded-xl bg-gold-50 px-3 py-2 text-xs text-gold-700 dark:bg-gold-950/40 dark:text-gold-300">
                      Video dars lug'at va mashqlarni tugatgach ochiladi.
                    </p>
                  )}

                  <button
                    onClick={() => setView("exercises")}
                    disabled={openUnit.exercises.length === 0}
                    style={{ animationDelay: "120ms" }}
                    className="animate-fade-up rounded-2xl bg-gradient-to-br from-wine-700 to-wine-950 p-5 text-left text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
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
                        className="animate-fade-up rounded-2xl border border-olive-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              pct === 100
                                ? "bg-olive-100 text-olive-700 dark:bg-white/10 dark:text-olive-200"
                                : "bg-olive-50 text-olive-600 dark:bg-white/5 dark:text-olive-300"
                            }`}
                          >
                            {pct === 100 ? "Tugallangan" : "Faol"}
                          </span>
                          {pct === 100 && <CheckCircle2 size={18} className="text-olive-600 dark:text-olive-300" />}
                        </div>
                        <p className="font-semibold text-olive-950 dark:text-olive-50">{round.title}</p>
                        <p className="mb-2 text-xs text-olive-700/60 dark:text-olive-300/60">{round.words.length} ta so’z</p>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-olive-100 dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-olive-500 transition-[width] duration-500"
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
                      className="animate-fade-up rounded-2xl border border-olive-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                      <span className="mb-2 inline-block rounded-full bg-wine-50 px-2 py-0.5 text-[10px] font-bold uppercase text-wine-600 dark:bg-wine-950/40 dark:text-wine-300">
                        {ex.skill_label}
                      </span>
                      <p className="font-semibold text-olive-950 dark:text-olive-50">{ex.title}</p>
                      <p className="mb-2 text-xs text-olive-700/60 dark:text-olive-300/60">{ex.question_count} ta savol</p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-olive-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-wine-500 transition-[width] duration-500"
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
        <p className="font-display text-2xl font-bold text-olive-950 dark:text-olive-50">{exerciseResult}%</p>
        <p className="text-sm text-olive-700/60 dark:text-olive-300/60">
          To'g'ri javoblar: {correctCount} / {exercise.questions.length}
        </p>
        <button
          onClick={onDone}
          className="btn-press mt-2 rounded-full bg-olive-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-olive-500"
        >
          Tayyor
        </button>
      </div>
    );
  }

  const question = exercise.questions[qIndex];

  return (
    <div key={qIndex} className="flex animate-fade-up flex-col gap-4">
      <p className="text-xs font-semibold text-olive-500 dark:text-olive-400">
        Savol {qIndex + 1} / {exercise.questions.length}
      </p>
      <p className="text-base font-semibold leading-snug text-olive-950 dark:text-olive-50">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition-all duration-150 ${
              selectedAnswer === i
                ? "border-olive-500 bg-olive-50 font-semibold text-olive-900 dark:bg-olive-900/40 dark:text-olive-50"
                : "border-olive-100 bg-white hover:bg-olive-50/60 dark:border-white/10 dark:bg-white/5 dark:text-olive-200 dark:hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={selectedAnswer === null}
        className="btn-press mt-2 rounded-full bg-olive-600 py-2.5 text-sm font-bold text-white hover:bg-olive-500 disabled:opacity-40"
      >
        {qIndex + 1 < exercise.questions.length ? "Keyingisi" : "Yakunlash"}
      </button>
    </div>
  );
}
