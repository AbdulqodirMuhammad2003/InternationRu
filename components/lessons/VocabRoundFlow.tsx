"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Volume2,
  Mic,
  Check,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  Eraser,
} from "lucide-react";
import type { VocabRound, VocabWord } from "@/lib/data";
import { setWordStagePassed, type VocabStage } from "@/app/actions";
import { matchesPronunciation, pronunciationTargets, SPEECH_ERRORS } from "@/lib/russian-speech";

// ---------- Yordamchi funksiyalar ----------

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string) {
  return s.toLowerCase().trim().replace(/[^a-zа-яё\s-]/gi, "");
}

function stagePassed(word: VocabWord, stage: VocabStage): boolean {
  switch (stage) {
    case "spelling":
      return !!word.stage_spelling;
    case "definition":
      return !!word.stage_definition;
    case "pronunciation":
      return !!word.stage_pronunciation;
    case "sentence":
      return !!word.stage_sentence;
  }
}

function splitSentenceOnWord(sentence: string, word: string) {
  if (!sentence) return { before: "", after: "", found: false };
  const idx = sentence.toLowerCase().indexOf(word.toLowerCase());
  if (idx === -1) return { before: sentence, after: "", found: false };
  return {
    before: sentence.slice(0, idx),
    after: sentence.slice(idx + word.length),
    found: true,
  };
}

const STAGES: { key: VocabStage; label: string; hint: string }[] = [
  { key: "spelling", label: "Imlo", hint: "So'zni harflardan tering" },
  { key: "definition", label: "Ta'rif", hint: "Ta'rifga mos so'zni tanlang" },
  { key: "pronunciation", label: "Talaffuz", hint: "So'zni talaffuz qiling" },
  { key: "sentence", label: "Gap", hint: "Bo'sh joyni to'ldiring" },
];

type QueueItem = { word: VocabWord; attempt: number };
type MistakeItem = { word: VocabWord; stage: VocabStage };
type Phase =
  | "learn"
  | "learn-summary"
  | "check"
  | "round-summary"
  | "mistakes-review"
  | "mistakes-done";

// ---------- Asosiy komponent ----------

export function VocabRoundFlow({
  round,
  allWords,
  onClose,
}: {
  round: VocabRound;
  allWords: VocabWord[];
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  const [phase, setPhase] = useState<Phase>("learn");
  const [learnIndex, setLearnIndex] = useState(0);

  // Bosqich qisman o'tilgan bo'lsa (masalan 80%), boshidan boshlamasdan faqat
  // hali o'rganilmagan so'zlar qayta ko'rsatiladi; tekshiruv ham faqat ularning
  // o'tilmagan bosqichlarini so'raydi (buildQueueForStage). Bosqich ochilgandagi
  // ro'yxat saqlab qolinadi — tekshiruv paytida progress yangilansa ham o'zgarmaydi.
  const [learnWords] = useState(() => {
    const pending = round.words.filter((w) => !w.learned);
    return pending.length > 0 ? pending : round.words;
  });
  const resuming = learnWords.length < round.words.length;

  const [stageIdx, setStageIdx] = useState(0);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [score, setScore] = useState({ correctFirst: 0, totalFirst: 0 });
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [mistakeIdx, setMistakeIdx] = useState(0);
  const [fixedMistakes, setFixedMistakes] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistStage(wordId: number, stage: VocabStage, passed: boolean) {
    startTransition(async () => {
      try {
        await setWordStagePassed(wordId, stage, passed);
      } catch {
        // Tarmoq/server xatosi bo'lsa ham UI o'z holicha davom etadi —
        // foydalanuvchi roundni yakunlaganda umumiy progress qayta yuklanadi.
      }
    });
  }

  function buildQueueForStage(stage: VocabStage): QueueItem[] {
    return round.words
      .filter((w) => !stagePassed(w, stage))
      .map((w) => ({ word: w, attempt: 0 }));
  }

  function startChecking() {
    for (let idx = 0; idx < STAGES.length; idx++) {
      const q = buildQueueForStage(STAGES[idx].key);
      if (q.length > 0) {
        setStageIdx(idx);
        setQueue(q);
        setPhase("check");
        return;
      }
    }
    // Barcha bosqichlar avval o'tilgan
    setPhase("round-summary");
  }

  function advanceStage(fromIdx: number) {
    for (let idx = fromIdx + 1; idx < STAGES.length; idx++) {
      const q = buildQueueForStage(STAGES[idx].key);
      if (q.length > 0) {
        setStageIdx(idx);
        setQueue(q);
        return;
      }
    }
    setPhase("round-summary");
  }

  function handleStageAnswer(correct: boolean) {
    const stage = STAGES[stageIdx].key;
    const item = queue[0];
    if (!item) return;
    const rest = queue.slice(1);

    if (item.attempt === 0) {
      setScore((s) => ({
        totalFirst: s.totalFirst + 1,
        correctFirst: s.correctFirst + (correct ? 1 : 0),
      }));
    }

    if (correct) {
      persistStage(item.word.id, stage, true);
      setQueue(rest);
      if (rest.length === 0) advanceStage(stageIdx);
    } else if (item.attempt === 0) {
      // Birinchi xato — savol shu bosqich navbatining oxiriga qo'shiladi
      setQueue([...rest, { word: item.word, attempt: 1 }]);
    } else {
      // Ikkinchi marta xato — round yakunlangach qayta ko'rib chiqiladi
      setMistakes((m) => [...m, { word: item.word, stage }]);
      setQueue(rest);
      if (rest.length === 0) advanceStage(stageIdx);
    }
  }

  function handleMistakeAnswer(correct: boolean) {
    const item = mistakes[mistakeIdx];
    if (correct) {
      persistStage(item.word.id, item.stage, true);
      setFixedMistakes((n) => n + 1);
    }
    if (mistakeIdx + 1 < mistakes.length) {
      setMistakeIdx(mistakeIdx + 1);
    } else {
      setPhase("mistakes-done");
    }
  }

  const percent =
    score.totalFirst > 0
      ? Math.round((score.correctFirst / score.totalFirst) * 100)
      : 100;

  if (round.words.length === 0) return null;

  const content = (
    <div className="fixed inset-0 z-[200] flex animate-fade-in flex-col bg-gradient-to-br from-[#f5f7fb] to-[#e9edf6] dark:from-[#0d1017] dark:to-[#121620]">
      {/* Tepa panel */}
      <div className="flex items-center justify-between border-b border-ink-900/10 px-5 py-4 dark:border-white/10 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-400">
            {round.title}
          </p>
          <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
            {phase === "learn" || phase === "learn-summary"
              ? resuming
                ? `Qolgan so'zlar (${learnWords.length} ta)`
                : "So'zlarni o'rganish"
              : phase === "check"
              ? STAGES[stageIdx].label + " bosqichi"
              : "Natija"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-ink-600 shadow-sm transition-colors hover:bg-white dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/15"
          aria-label="Yopish"
        >
          <X size={20} />
        </button>
      </div>

      {/* Bosqich indikatorlari (faqat tekshiruv paytida) */}
      {phase === "check" && (
        <div className="flex items-center justify-center gap-2 px-5 pt-4">
          {STAGES.map((s, i) => (
            <div
              key={s.key}
              className={`h-1.5 flex-1 max-w-[6rem] rounded-full transition-colors duration-300 ${
                i < stageIdx
                  ? "bg-mint-500"
                  : i === stageIdx
                  ? "bg-gold-500"
                  : "bg-ink-900/10 dark:bg-white/10"
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-6 sm:px-8">
        {phase === "learn" && (
          <LearnCard
            word={learnWords[learnIndex]}
            index={learnIndex}
            total={learnWords.length}
            onNext={() => {
              if (learnIndex + 1 < learnWords.length) {
                setLearnIndex(learnIndex + 1);
              } else {
                setPhase("learn-summary");
              }
            }}
          />
        )}

        {phase === "learn-summary" && (
          <div className="flex animate-pop-in flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-600/30">
              <Sparkles size={34} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">
                Ajoyib!
              </p>
              <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-300/60">
                {resuming
                  ? `Siz hali o'rganilmagan ${learnWords.length} ta so'zni qayta ko'rib chiqdingiz. Endi faqat shularni tekshiramiz.`
                  : `Siz ${learnWords.length} ta so'zni ko'rib chiqdingiz. Endi bilimingizni tekshirib ko'ramizmi?`}
              </p>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => {
                  setLearnIndex(0);
                  setPhase("learn");
                }}
                className="btn-press flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
              >
                <RotateCcw size={16} /> Qayta o'rganish
              </button>
              <button
                onClick={startChecking}
                className="btn-press flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-azure-600 to-azure-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-azure-900/30 hover:from-azure-500 hover:to-azure-600"
              >
                Tekshiruvni boshlash <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {phase === "check" && queue.length > 0 && (
          <StageQuestion
            key={`${STAGES[stageIdx].key}-${queue[0].word.id}-${queue[0].attempt}`}
            stage={STAGES[stageIdx].key}
            word={queue[0].word}
            allWords={allWords}
            remaining={queue.length}
            onResult={handleStageAnswer}
          />
        )}

        {phase === "round-summary" && (
          <RoundSummary
            percent={percent}
            mistakeCount={mistakes.length}
            onReview={() => {
              setMistakeIdx(0);
              setPhase("mistakes-review");
            }}
            onFinish={onClose}
          />
        )}

        {phase === "mistakes-review" && mistakes[mistakeIdx] && (
          <div className="flex w-full flex-col items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">
              Oxirgi imkoniyat · {mistakeIdx + 1} / {mistakes.length}
            </p>
            <StageQuestion
              key={`mistake-${mistakes[mistakeIdx].word.id}-${mistakes[mistakeIdx].stage}-${mistakeIdx}`}
              stage={mistakes[mistakeIdx].stage}
              word={mistakes[mistakeIdx].word}
              allWords={allWords}
              remaining={mistakes.length - mistakeIdx}
              onResult={handleMistakeAnswer}
            />
          </div>
        )}

        {phase === "mistakes-done" && (
          <div className="flex animate-pop-in flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-mint-600 to-mint-800 text-white shadow-lg shadow-mint-900/30">
              <Trophy size={34} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">
                Round yakunlandi
              </p>
              <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-300/60">
                {fixedMistakes} ta xato tuzatildi
                {mistakes.length - fixedMistakes > 0
                  ? `, ${mistakes.length - fixedMistakes} tasi keyingi safar takrorlanadi.`
                  : "."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn-press rounded-full bg-gradient-to-b from-azure-600 to-azure-700 px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-azure-900/30 hover:from-azure-500 hover:to-azure-600"
            >
              Tugatish
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}

// ---------- O'rganish kartasi ----------

function LearnCard({
  word,
  index,
  total,
  onNext,
}: {
  word: VocabWord;
  index: number;
  total: number;
  onNext: () => void;
}) {
  if (!word) return null;
  return (
    <div
      key={word.id}
      className="flex w-full max-w-md animate-pop-in flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-ink-900/5 dark:bg-[#161b26] dark:shadow-none"
    >
      <p className="text-center text-xs font-semibold text-ink-500 dark:text-ink-400">
        So'z {index + 1} / {total}
      </p>
      <div className="flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-50 to-gold-50 text-6xl dark:from-white/5 dark:to-gold-950/30">
        {word.emoji}
      </div>
      <div className="flex items-center gap-3 rounded-2xl bg-ink-50/70 p-4 dark:bg-white/5">
        <button
          onClick={() => speak(word.word)}
          className="btn-press flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white shadow-sm shadow-gold-700/30 hover:bg-gold-400"
          aria-label="Talaffuzni eshitish"
        >
          <Volume2 size={18} />
        </button>
        <div>
          <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">
            {word.word}
          </p>
          <p className="text-sm text-ink-700/60 dark:text-ink-300/60">
            [{word.transcription}]
          </p>
        </div>
      </div>
      <div className="rounded-2xl bg-ink-50/70 p-4 dark:bg-white/5">
        <p className="mb-1 text-xs text-ink-500 dark:text-ink-400">{word.part_of_speech}</p>
        <p className="mb-3 text-base font-bold text-ink-900 dark:text-ink-50">
          {word.translation_uz}
        </p>
        <p className="mb-1 text-xs text-ink-500 dark:text-ink-400">Izoh:</p>
        <p className="mb-3 text-sm text-ink-700 dark:text-ink-200/80">{word.definition}</p>
        {word.example_sentence && (
          <>
            <p className="mb-1 text-xs text-ink-500 dark:text-ink-400">Misol:</p>
            <p className="text-sm italic text-ink-700 dark:text-ink-200/80">
              {word.example_sentence}
            </p>
            {word.example_translation && (
              <p className="mt-1 text-sm text-ink-600/80 dark:text-ink-300/70">
                {word.example_translation}
              </p>
            )}
          </>
        )}
      </div>
      <button
        onClick={onNext}
        className="btn-press flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-azure-600 to-azure-700 py-2.5 text-sm font-bold text-white shadow-sm shadow-azure-900/30 hover:from-azure-500 hover:to-azure-600"
      >
        {index + 1 < total ? "Keyingisi" : "Tayyor"} <ArrowRight size={16} />
      </button>
    </div>
  );
}

// ---------- Round yakuni ----------

function RoundSummary({
  percent,
  mistakeCount,
  onReview,
  onFinish,
}: {
  percent: number;
  mistakeCount: number;
  onReview: () => void;
  onFinish: () => void;
}) {
  return (
    <div className="flex animate-pop-in flex-col items-center gap-4 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-mint-600 to-mint-900 text-white shadow-lg shadow-mint-900/30">
        <span className="font-display text-3xl font-bold">{percent}%</span>
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">
          Round yakunlandi!
        </p>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-300/60">
          {mistakeCount > 0
            ? `${mistakeCount} ta savolda ikkinchi marta xato qildingiz — ularni qayta ko'rib chiqishingiz mumkin.`
            : "Barcha savollarga muvaffaqiyatli javob berdingiz."}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        {mistakeCount > 0 && (
          <button
            onClick={onReview}
            className="btn-press flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-rose-600 to-rose-800 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-rose-900/30 hover:from-rose-500 hover:to-rose-700"
          >
            Xatolarni qayta ko'rish
          </button>
        )}
        <button
          onClick={onFinish}
          className="btn-press rounded-full border border-ink-200 bg-white px-6 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
        >
          Yakunlash
        </button>
      </div>
    </div>
  );
}

// ---------- Bosqich savoli (router) ----------

function StageQuestion({
  stage,
  word,
  allWords,
  remaining,
  onResult,
}: {
  stage: VocabStage;
  word: VocabWord;
  allWords: VocabWord[];
  remaining: number;
  onResult: (correct: boolean) => void;
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="text-center text-xs font-semibold text-ink-500 dark:text-ink-400">
        Qolgan savollar: {remaining}
      </p>
      {stage === "spelling" && <SpellingStage word={word} onResult={onResult} />}
      {stage === "definition" && (
        <DefinitionStage word={word} allWords={allWords} onResult={onResult} />
      )}
      {stage === "pronunciation" && <PronunciationStage word={word} onResult={onResult} />}
      {stage === "sentence" && <SentenceStage word={word} onResult={onResult} />}
    </div>
  );
}

// ---------- 1-bosqich: Imlo (harflardan terish) ----------

function SpellingStage({
  word,
  onResult,
}: {
  word: VocabWord;
  onResult: (correct: boolean) => void;
}) {
  const target = word.word;
  const letterSlots = useMemo(() => target.split(""), [target]);
  // Harflar savol ochilganda bir marta aralashtiriladi (qayta render'da
  // joyidan sakramasligi uchun).
  const [tileLetters] = useState(() =>
    shuffle(
      target
        .split("")
        .map((ch, i) => ({ id: i, ch }))
        .filter((t) => t.ch !== " ")
    )
  );

  const [filledIds, setFilledIds] = useState<(number | "space" | null)[]>(() =>
    letterSlots.map((ch) => (ch === " " ? "space" : null))
  );
  const [usedTileIds, setUsedTileIds] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState<boolean | null>(null);

  const isComplete = filledIds.every((f) => f !== null);

  useEffect(() => {
    if (isComplete && checked === null) {
      const typed = filledIds
        .map((f, i) =>
          f === "space" ? " " : tileLetters.find((t) => t.id === f)?.ch ?? ""
        )
        .join("");
      const correct = typed.toLowerCase() === target.toLowerCase();
      setChecked(correct);
      const t = setTimeout(() => onResult(correct), 900);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  function placeTile(tile: { id: number; ch: string }) {
    if (checked !== null || usedTileIds.has(tile.id)) return;
    const idx = filledIds.findIndex((f) => f === null);
    if (idx === -1) return;
    const next = [...filledIds];
    next[idx] = tile.id;
    setFilledIds(next);
    setUsedTileIds((s) => new Set(s).add(tile.id));
  }

  function removeSlot(idx: number) {
    if (checked !== null) return;
    const val = filledIds[idx];
    if (val === null || val === "space") return;
    const next = [...filledIds];
    next[idx] = null;
    setFilledIds(next);
    setUsedTileIds((s) => {
      const copy = new Set(s);
      copy.delete(val as number);
      return copy;
    });
  }

  function clearAll() {
    if (checked !== null) return;
    setFilledIds(letterSlots.map((ch) => (ch === " " ? "space" : null)));
    setUsedTileIds(new Set());
  }

  const availableTiles = tileLetters.filter((t) => !usedTileIds.has(t.id));

  return (
    <div className="flex animate-pop-in flex-col gap-5 rounded-3xl bg-white p-6 shadow-xl shadow-ink-900/5 dark:bg-[#161b26] dark:shadow-none">
      <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-50 to-gold-50 text-5xl dark:from-white/5 dark:to-gold-950/30">
        {word.emoji}
      </div>
      <p className="text-center text-base font-bold text-ink-900 dark:text-ink-50">
        {word.translation_uz}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {letterSlots.map((ch, i) => {
          const val = filledIds[i];
          const letter = val === "space" ? " " : val === null ? "" : tileLetters.find((t) => t.id === val)?.ch;
          return ch === " " ? (
            <span key={i} className="w-3" />
          ) : (
            <button
              key={i}
              onClick={() => removeSlot(i)}
              disabled={checked !== null}
              className={`flex h-11 w-9 items-center justify-center rounded-xl border-2 text-lg font-bold uppercase transition-colors ${
                checked === true
                  ? "border-mint-500 bg-mint-50 text-mint-800 dark:bg-mint-950/40 dark:text-mint-200"
                  : checked === false
                  ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                  : letter
                  ? "border-ink-300 bg-ink-50 text-ink-900 dark:border-white/20 dark:bg-white/10 dark:text-ink-50"
                  : "border-dashed border-ink-200 bg-white dark:border-white/15 dark:bg-white/5"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {availableTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => placeTile(tile)}
            disabled={checked !== null}
            className="btn-press flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-base font-bold uppercase text-ink-800 shadow-sm transition-colors hover:bg-ink-200 dark:bg-white/10 dark:text-ink-100 dark:hover:bg-white/20"
          >
            {tile.ch}
          </button>
        ))}
      </div>

      <button
        onClick={clearAll}
        disabled={checked !== null}
        className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-700 disabled:opacity-40 dark:text-ink-400 dark:hover:text-ink-200"
      >
        <Eraser size={14} /> Tozalash
      </button>
    </div>
  );
}

// ---------- 2-bosqich: Ta'rif bo'yicha tanlash ----------

function DefinitionStage({
  word,
  allWords,
  onResult,
}: {
  word: VocabWord;
  allWords: VocabWord[];
  onResult: (correct: boolean) => void;
}) {
  // Variantlar savol ochilganda bir marta aralashtiriladi. useMemo emas:
  // javob saqlangach sahifa ma'lumoti yangilanadi (revalidatePath) va
  // `allWords` yangi massiv bo'lib keladi — bu variantlarni savol ustida
  // turgan paytda qayta aralashtirib yuborardi.
  const [options] = useState(() => {
    const pool = shuffle(
      allWords.filter((w) => w.id !== word.id && w.word !== word.word)
    );
    const seen = new Set<string>();
    const distractors: string[] = [];
    for (const w of pool) {
      if (distractors.length >= 3) break;
      if (seen.has(w.word)) continue;
      seen.add(w.word);
      distractors.push(w.word);
    }
    return shuffle([word.word, ...distractors]);
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean | null>(null);

  function choose(opt: string) {
    if (checked !== null) return;
    setSelected(opt);
    const correct = opt === word.word;
    setChecked(correct);
    setTimeout(() => onResult(correct), 900);
  }

  return (
    <div className="flex animate-pop-in flex-col gap-5 rounded-3xl bg-white p-6 shadow-xl shadow-ink-900/5 dark:bg-[#161b26] dark:shadow-none">
      <p className="text-center text-xs font-semibold text-ink-500 dark:text-ink-400">
        Ta'rifga mos so'zni tanlang
      </p>
      <p className="rounded-2xl bg-ink-50/70 p-4 text-center text-base font-semibold text-ink-900 dark:bg-white/5 dark:text-ink-50">
        {word.definition}
      </p>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrectOpt = opt === word.word;
          const showState = checked !== null && (isSelected || isCorrectOpt);
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              disabled={checked !== null}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-150 ${
                showState && isCorrectOpt
                  ? "border-mint-500 bg-mint-50 text-mint-900 dark:bg-mint-950/40 dark:text-mint-100"
                  : showState && isSelected
                  ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                  : "border-ink-100 bg-white hover:bg-ink-50/60 dark:border-white/10 dark:bg-white/5 dark:text-ink-200 dark:hover:bg-white/10"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- 3-bosqich: Talaffuz ----------

const MAX_PRONUNCIATION_ATTEMPTS = 3;

function PronunciationStage({
  word,
  onResult,
}: {
  word: VocabWord;
  onResult: (correct: boolean) => void;
}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);
  const [unsupported, setUnsupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const gotResultRef = useRef(false);
  const targets = useMemo(() => pronunciationTargets(word.word), [word.word]);

  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) setUnsupported(true);
    return () => {
      recognitionRef.current?.abort?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish(correct: boolean) {
    setChecked(correct);
    setTimeout(() => onResult(correct), 1000);
  }

  function startListening() {
    if (checked !== null) return;
    if (listening) {
      // Ikkinchi bosish — yozishni to'xtatib, eshitilganini tekshirish.
      recognitionRef.current?.stop?.();
      return;
    }
    const SR =
      (window as unknown as { SpeechRecognition?: new () => any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SR) {
      setUnsupported(true);
      return;
    }
    // Namuna ovozi hali yangrayotgan bo'lsa, mikrofon uni ham eshitib qoladi.
    window.speechSynthesis?.cancel();

    const recog = new SR();
    recog.lang = "ru-RU";
    recog.interimResults = false;
    recog.continuous = false;
    recog.maxAlternatives = 5;
    gotResultRef.current = false;
    setError(null);
    setTranscript("");

    recog.onresult = (e: any) => {
      gotResultRef.current = true;
      const alts: string[] = Array.from(e.results[0]).map((r: any) => String(r.transcript));
      setTranscript(alts[0]?.trim() || "");
      setListening(false);
      if (alts.some((a) => matchesPronunciation(a, targets))) {
        finish(true);
        return;
      }
      const used = attempts + 1;
      setAttempts(used);
      if (used >= MAX_PRONUNCIATION_ATTEMPTS) finish(false);
    };
    recog.onerror = (e: any) => {
      setListening(false);
      if (e.error === "aborted") return;
      setError(SPEECH_ERRORS[e.error] ?? "Ovozni tanib bo'lmadi. Qayta urinib ko'ring.");
    };
    recog.onend = () => {
      setListening(false);
      if (!gotResultRef.current) {
        setError((prev) => prev ?? SPEECH_ERRORS["no-speech"]);
      }
    };
    recognitionRef.current = recog;
    setListening(true);
    try {
      recog.start();
    } catch {
      setListening(false);
      setError("Mikrofonni ishga tushirib bo'lmadi. Sahifani yangilab, qayta urinib ko'ring.");
    }
  }

  const retriesLeft = MAX_PRONUNCIATION_ATTEMPTS - attempts;
  // Texnik xato (ruxsat, tarmoq, brauzer) bo'lsa, o'quvchi to'xtab qolmasligi
  // uchun natijani o'zi belgilash imkoni ham beriladi.
  const showManual = unsupported || (error !== null && !error.startsWith("Ovoz eshitilmadi"));

  return (
    <div className="flex animate-pop-in flex-col items-center gap-5 rounded-3xl bg-white p-6 text-center shadow-xl shadow-ink-900/5 dark:bg-[#161b26] dark:shadow-none">
      <p className="text-xs font-semibold text-ink-500 dark:text-ink-400">
        So'zni to'g'ri talaffuz qiling
      </p>

      <button
        onClick={() => speak(targets[0] ?? word.word)}
        className="btn-press flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-white shadow-sm shadow-gold-700/30 hover:bg-gold-400"
        aria-label="Namunani eshitish"
      >
        <Volume2 size={20} />
      </button>

      <div>
        <p className="font-display text-2xl font-bold text-ink-950 dark:text-ink-50">
          {word.word}
        </p>
        <p className="text-sm text-ink-700/60 dark:text-ink-300/60">[{word.transcription}]</p>
      </div>

      {!unsupported && (
        <>
          <button
            onClick={startListening}
            disabled={checked !== null}
            className={`btn-press flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${
              checked === true
                ? "bg-mint-600 shadow-mint-700/30"
                : checked === false
                ? "bg-rose-600 shadow-rose-700/30"
                : listening
                ? "animate-pulse bg-gold-500 shadow-gold-600/40"
                : "bg-gradient-to-b from-azure-600 to-azure-800 shadow-azure-900/30 hover:from-azure-500 hover:to-azure-700"
            }`}
            aria-label={listening ? "Yozishni to'xtatish" : "Yozib olish"}
          >
            {checked === true ? <Check size={30} /> : <Mic size={30} />}
          </button>
          <p className="min-h-[2.5rem] max-w-xs text-xs text-ink-500 dark:text-ink-400">
            {listening
              ? "Tinglanmoqda… Gapirib bo'lgach, tugmani yana bossangiz ham bo'ladi."
              : checked === true
              ? `To'g'ri! ${transcript ? `Eshitildi: “${transcript}”` : ""}`
              : checked === false
              ? `Keyingi safar albatta chiqadi. Eshitildi: “${transcript}”`
              : error
              ? error
              : transcript
              ? `Eshitildi: “${transcript}”. Yana urinib ko'ring (${retriesLeft} ta imkoniyat qoldi).`
              : "Mikrofon tugmasini bosib, so'zni aniq ayting"}
          </p>
        </>
      )}

      {showManual && (
        <div className="flex flex-col items-center gap-2">
          <p className="max-w-xs text-xs text-ink-500 dark:text-ink-400">
            {unsupported
              ? "Brauzeringiz ovozni tanib olishni qo'llab-quvvatlamaydi (Chrome yoki Edge tavsiya etiladi). "
              : ""}
            So'zni ovoz chiqarib ayting, so'ng natijani o'zingiz belgilang.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => finish(true)}
              disabled={checked !== null}
              className="btn-press rounded-full bg-azure-600 px-4 py-2 text-xs font-bold text-white hover:bg-azure-500"
            >
              To'g'ri aytdim
            </button>
            <button
              onClick={() => finish(false)}
              disabled={checked !== null}
              className="btn-press rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
            >
              Xato qildim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- 4-bosqich: Gapni to'ldirish ----------

function SentenceStage({
  word,
  onResult,
}: {
  word: VocabWord;
  onResult: (correct: boolean) => void;
}) {
  const { before, after, found } = useMemo(
    () => splitSentenceOnWord(word.example_sentence, word.word),
    [word.example_sentence, word.word]
  );
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<boolean | null>(null);

  function submit() {
    if (checked !== null || !value.trim()) return;
    const correct = normalize(value) === normalize(word.word);
    setChecked(correct);
    setTimeout(() => onResult(correct), 900);
  }

  return (
    <div className="flex animate-pop-in flex-col gap-5 rounded-3xl bg-white p-6 shadow-xl shadow-ink-900/5 dark:bg-[#161b26] dark:shadow-none">
      <p className="text-center text-xs font-semibold text-ink-500 dark:text-ink-400">
        Bo'sh joyga mos so'zni yozing
      </p>
      <p className="rounded-2xl bg-ink-50/70 p-4 text-center text-base leading-relaxed text-ink-900 dark:bg-white/5 dark:text-ink-50">
        {found ? (
          <>
            {before}
            <span className="mx-1 inline-block min-w-[4rem] border-b-2 border-dashed border-ink-400 align-bottom">
              &nbsp;
            </span>
            {after}
          </>
        ) : (
          word.example_sentence || word.definition
        )}
      </p>
      {checked !== null && word.example_translation && (
        <p className="-mt-2 text-center text-sm text-ink-600/80 dark:text-ink-300/70">
          {word.example_translation}
        </p>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={checked !== null}
        placeholder="So'zni yozing…"
        className={`w-full rounded-xl border-2 px-4 py-2.5 text-center text-sm font-semibold outline-none transition-colors ${
          checked === true
            ? "border-mint-500 bg-mint-50 text-mint-800 dark:bg-mint-950/40 dark:text-mint-200"
            : checked === false
            ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
            : "border-ink-200 bg-white text-ink-900 focus:border-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-50"
        }`}
      />
      <button
        onClick={submit}
        disabled={checked !== null || !value.trim()}
        className="btn-press rounded-full bg-gradient-to-b from-azure-600 to-azure-700 py-2.5 text-sm font-bold text-white shadow-sm shadow-azure-900/30 hover:from-azure-500 hover:to-azure-600 disabled:opacity-40"
      >
        Tekshirish
      </button>
    </div>
  );
}
