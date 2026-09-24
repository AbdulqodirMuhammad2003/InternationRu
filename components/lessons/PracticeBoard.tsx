"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Mic } from "lucide-react";
import type { UnitDetail } from "@/lib/data";
import { submitExerciseResult } from "@/app/actions";
import { ExerciseRun } from "./LessonsBoard";

interface FlatExercise {
  unitTitle: string;
  exercise: UnitDetail["exercises"][number];
}

export function PracticeBoard({ units }: { units: UnitDetail[] }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [active, setActive] = useState<FlatExercise | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const flat: FlatExercise[] = units.flatMap((u) =>
    u.exercises.map((exercise) => ({ unitTitle: u.subtitle, exercise }))
  );

  function start(item: FlatExercise) {
    setActive(item);
    setQIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setResult(null);
  }

  function close() {
    setActive(null);
  }

  function next() {
    if (!active || selectedAnswer === null) return;
    const question = active.exercise.questions[qIndex];
    const isCorrect = selectedAnswer === question.correct_index;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);

    if (qIndex + 1 < active.exercise.questions.length) {
      setCorrectCount(newCorrect);
      setQIndex(qIndex + 1);
      setSelectedAnswer(null);
    } else {
      const pct = Math.round((newCorrect / active.exercise.questions.length) * 100);
      setCorrectCount(newCorrect);
      setResult(pct);
      startTransition(async () => {
        await submitExerciseResult(active.exercise.id, pct);
        router.refresh();
      });
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {flat.length === 0 && (
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">Hozircha mashq qilish uchun topshiriqlar yo'q.</p>
      )}
      {flat.map(({ unitTitle, exercise }, i) => (
        <button
          key={exercise.id}
          onClick={() => start({ unitTitle, exercise })}
          style={{ animationDelay: `${i * 50}ms` }}
          className="animate-fade-up rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-[#161b26] dark:shadow-none dark:ring-white/10"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 text-ink-600 dark:bg-white/10 dark:text-ink-300">
            <Mic size={18} />
          </div>
          <p className="mb-1 text-xs text-ink-500 line-clamp-1 dark:text-ink-400">{unitTitle}</p>
          <p className="mb-2 font-semibold text-ink-950 dark:text-ink-50">{exercise.title}</p>
          <p className="mb-3 text-xs text-ink-700/60 dark:text-ink-300/60">{exercise.question_count} ta savol</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gold-500 transition-[width] duration-500"
              style={{ width: `${exercise.score_pct}%` }}
            />
          </div>
        </button>
      ))}

      {active && (
        <>
          <div className="fixed inset-0 z-40 animate-fade-in bg-ink-950/30 backdrop-blur-[2px]" onClick={close} />
          <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl dark:bg-[#121620]">
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4 dark:border-white/10">
              <h2 className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">{active.exercise.title}</h2>
              <button onClick={close} className="rounded-full p-1.5 text-ink-500 transition-colors hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-5">
              <div className="mx-auto w-full max-w-xl py-4">
                <ExerciseRun
                  exercise={active.exercise}
                  qIndex={qIndex}
                  selectedAnswer={selectedAnswer}
                  correctCount={correctCount}
                  exerciseResult={result}
                  onSelect={setSelectedAnswer}
                  onNext={next}
                  onDone={close}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
