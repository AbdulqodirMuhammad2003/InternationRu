"use client";

import { useEffect, useState } from "react";
import { BookOpen, Delete, Info, MapPin, Mic, PlayCircle, Trophy, Volume2 } from "lucide-react";
import type { UnitDetail } from "@/lib/data";
import { matchesPronunciation, speechNorm, SPEECH_ERRORS } from "@/lib/russian-speech";

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

/** Har bir savol uchun bir xil tartibda aralashtiradi (sahifa yangilansa ham
 *  plitkalar/juftlar joyidan sakramaydi). */
function seededShuffle<T>(items: T[], seed: number): T[] {
  const a = [...items];
  let x = (seed * 7 + 3) % 9973;
  for (let i = a.length - 1; i > 0; i--) {
    x = (x * 31 + 11) % 9973;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  // Juftlik: ulangan juftlar, tanlangan chap so'z va xato bo'lganmi.
  const [matched, setMatched] = useState<number[]>([]);
  const [matchLeft, setMatchLeft] = useState<number | null>(null);
  const [matchMistake, setMatchMistake] = useState(false);
  const [matchFlash, setMatchFlash] = useState(false);
  // Talaffuz: eshitilgan matn va holat.
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
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
  const orderTiles =
    kind === "order"
      ? seededShuffle(normalizeAnswer(question.answer_text ?? "").split(" ").filter(Boolean), question.id)
      : [];
  const matchPairs = kind === "match" ? question.options.map((o) => o.split("|")) : [];
  const matchRight =
    kind === "match" ? seededShuffle(matchPairs.map((_, i) => i), question.id) : [];
  const answerValue =
    kind === "anagram"
      ? picked.map((i) => letters[i]).join("")
      : kind === "order"
      ? picked.map((i) => orderTiles[i]).join(" ")
      : kind === "speak"
      ? heard
      : typed;
  const isWritten = kind === "anagram" || kind === "order" || !!question.answer_text;
  const acceptedAnswers = (question.answer_text ?? "").split("|").map(normalizeAnswer);
  const canCheck = isWritten ? answerValue.trim() !== "" : selected !== null;
  const ending = kind === "ending" ? parseEnding(question.prompt) : null;

  function record(ok: boolean) {
    setChecked(ok);
    setAnswers((a) => [...a, { questionId: question.id, correct: ok }]);
  }

  function check() {
    if (!canCheck || checked !== null) return;
    if (kind === "speak") {
      record(matchesPronunciation(heard, [speechNorm(question.answer_text ?? question.prompt)]));
      return;
    }
    record(
      isWritten
        ? acceptedAnswers.includes(normalizeAnswer(answerValue))
        : selected === question.correct_index
    );
    if (kind === "number" && question.audio_text) speakRu(question.audio_text);
  }

  function pickMatchRight(pairIndex: number) {
    if (matchLeft === null || checked !== null) return;
    if (pairIndex === matchLeft) {
      const done = [...matched, pairIndex];
      setMatched(done);
      setMatchFlash(false);
      if (done.length === matchPairs.length) record(!matchMistake);
    } else {
      setMatchMistake(true);
      setMatchFlash(true);
    }
    setMatchLeft(null);
  }

  function listen() {
    if (checked !== null) return;
    const SR =
      (window as unknown as { SpeechRecognition?: new () => any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;
    if (!SR) {
      setSpeechError("Brauzeringiz ovozni tanimaydi (Chrome yoki Edge tavsiya etiladi).");
      return;
    }
    window.speechSynthesis?.cancel();
    const recog = new SR();
    recog.lang = "ru-RU";
    recog.maxAlternatives = 5;
    recog.onresult = (e: any) => {
      const alts: string[] = Array.from(e.results[0]).map((r: any) => String(r.transcript));
      const target = [speechNorm(question.answer_text ?? question.prompt)];
      setHeard(alts.find((a) => matchesPronunciation(a, target)) ?? alts[0] ?? "");
      setListening(false);
    };
    recog.onerror = (e: any) => {
      setListening(false);
      if (e.error !== "aborted") setSpeechError(SPEECH_ERRORS[e.error] ?? "Ovozni tanib bo'lmadi.");
    };
    recog.onend = () => setListening(false);
    setSpeechError(null);
    setHeard("");
    setListening(true);
    try {
      recog.start();
    } catch {
      setListening(false);
    }
  }

  function next() {
    if (qIndex + 1 < total) {
      setQIndex(qIndex + 1);
      setSelected(null);
      setTyped("");
      setPicked([]);
      setChecked(null);
      setMatched([]);
      setMatchLeft(null);
      setMatchMistake(false);
      setMatchFlash(false);
      setHeard("");
      setSpeechError(null);
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
            ? question.options.length === 2
              ? "grid-cols-2"
              : question.options.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
          : kind === "truefalse"
          ? "grid-cols-2"
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
  const correctAnswerText = kind === "stress"
    ? question.options.map((o, i) => (i === question.correct_index ? o.toUpperCase() : o)).join("-")
    : kind === "match"
    ? matchPairs.map((p) => `${p[0]} — ${p[1]}`).join(", ")
    : isWritten
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

        {kind === "picture" && (
          <>
            <p className="py-2 text-center text-7xl" aria-hidden="true">
              {question.prompt}
            </p>
            {optionGrid()}
          </>
        )}

        {kind === "truefalse" && (
          <>
            <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3 text-base leading-relaxed text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-50">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-400">
                <BookOpen size={14} /> Matn
              </p>
              <p lang="ru">{question.prompt.split("||")[0]}</p>
            </div>
            <p lang="ru" className="text-center text-xl font-semibold text-ink-950 dark:text-ink-50">
              {question.prompt.split("||")[1]}
            </p>
            {optionGrid()}
          </>
        )}

        {kind === "situation" && (
          <>
            <div className="flex gap-2.5 rounded-2xl border border-ink-100 bg-white px-4 py-3 text-base text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-50">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-500" />
              <p>{question.prompt}</p>
            </div>
            {optionGrid()}
          </>
        )}

        {(kind === "stress" || kind === "number" || kind === "dictation") && (
          <button
            onClick={() => question.audio_text && speakRu(question.audio_text)}
            className="btn-press mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg shadow-gold-700/30 hover:bg-gold-400"
            aria-label="Eshitish"
          >
            <Volume2 size={28} />
          </button>
        )}

        {kind === "stress" && (
          <div className="flex flex-wrap justify-center gap-2">
            {question.options.map((syllable, i) => (
              <button
                key={i}
                onClick={() => checked === null && setSelected(i)}
                className={`min-w-16 rounded-xl border-2 px-4 py-3 text-2xl font-bold transition-all duration-150 ${
                  OPTION_STATE_CLASSES[optionState(i)]
                }`}
              >
                {syllable}
              </button>
            ))}
          </div>
        )}

        {kind === "number" && (
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") (checked === null ? check : next)();
            }}
            disabled={checked !== null}
            inputMode="numeric"
            placeholder="?"
            aria-label="Raqam"
            className={`mx-auto w-36 rounded-2xl border-2 bg-white py-3 text-center text-4xl font-bold text-ink-900 outline-none dark:bg-white/5 dark:text-ink-50 ${
              checked === true
                ? "border-mint-500"
                : checked === false
                ? "border-rose-400"
                : "border-ink-200 focus:border-azure-500 dark:border-white/10"
            }`}
          />
        )}

        {kind === "dictation" && (
          <div className="flex flex-col gap-3">
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
              placeholder="Eshitgan so'zingizni yozing"
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center text-xl font-semibold text-ink-900 outline-none transition-colors placeholder:text-sm placeholder:font-normal placeholder:text-ink-300 dark:bg-white/5 dark:text-ink-50 ${
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

        {kind === "match" && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                {matchPairs.map((pair, i) => (
                  <button
                    key={i}
                    disabled={matched.includes(i) || checked !== null}
                    onClick={() => {
                      setMatchLeft(i);
                      setMatchFlash(false);
                    }}
                    className={`rounded-xl border-2 px-3 py-3 text-base transition-all duration-150 ${
                      matched.includes(i)
                        ? OPTION_STATE_CLASSES.right
                        : matchLeft === i
                        ? OPTION_STATE_CLASSES.selected
                        : OPTION_STATE_CLASSES.idle
                    }`}
                  >
                    {pair[0]}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {matchRight.map((pairIndex) => (
                  <button
                    key={pairIndex}
                    disabled={matched.includes(pairIndex) || checked !== null}
                    onClick={() => pickMatchRight(pairIndex)}
                    className={`rounded-xl border-2 px-3 py-3 text-base transition-all duration-150 ${
                      matched.includes(pairIndex) ? OPTION_STATE_CLASSES.right : OPTION_STATE_CLASSES.idle
                    }`}
                  >
                    {matchPairs[pairIndex][1]}
                  </button>
                ))}
              </div>
            </div>
            {matchFlash && (
              <p className="text-center text-sm font-semibold text-rose-500">Bu juft emas — yana urinib ko'ring</p>
            )}
          </>
        )}

        {kind === "order" && (
          <>
            <div
              className={`flex min-h-14 flex-wrap items-center gap-2 border-b-2 py-2 ${
                checked === null
                  ? "border-ink-300 dark:border-white/30"
                  : checked
                  ? "border-mint-500"
                  : "border-rose-400"
              }`}
            >
              {picked.map((i, k) => (
                <span
                  key={k}
                  className="rounded-xl bg-white px-3 py-2 text-base font-semibold text-ink-900 shadow-sm ring-1 ring-ink-950/10 dark:bg-white/10 dark:text-ink-50"
                >
                  {orderTiles[i]}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {orderTiles.map((tile, i) => (
                <button
                  key={i}
                  disabled={picked.includes(i) || checked !== null}
                  onClick={() => setPicked((p) => [...p, i])}
                  className="btn-press rounded-xl bg-azure-50 px-3 py-2 text-base font-semibold text-azure-900 ring-1 ring-azure-200 transition-opacity hover:bg-azure-100 disabled:opacity-25 dark:bg-azure-950/40 dark:text-azure-100 dark:ring-azure-900"
                >
                  {tile}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPicked((p) => p.slice(0, -1))}
              disabled={picked.length === 0 || checked !== null}
              className="mx-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-100 disabled:opacity-40 dark:text-ink-400 dark:hover:bg-white/10"
            >
              <Delete size={14} /> Oxirgi so'zni o'chirish
            </button>
          </>
        )}

        {kind === "fill" && (
          <div className="flex flex-col gap-3">
            <p className="text-center text-2xl font-semibold leading-relaxed text-ink-950 dark:text-ink-50">
              {question.prompt.split("___")[0]}
              <span className={`inline-block min-w-16 border-b-2 border-current px-1 ${resultTone}`}>
                {typed || "\u00a0"}
              </span>
              {question.prompt.split("___")[1]}
            </p>
            <RussianKeyboard
              disabled={checked !== null}
              onKey={(ch) => setTyped((t) => t + ch)}
              onBackspace={() => setTyped((t) => t.slice(0, -1))}
            />
          </div>
        )}

        {kind === "speak" && (
          <div className="flex flex-col items-center gap-3">
            <p className="font-display text-center text-3xl font-bold text-ink-950 dark:text-ink-50">
              {question.prompt}
            </p>
            <button
              onClick={() => speakRu(question.prompt)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500"
            >
              <Volume2 size={16} /> Namunani eshitish
            </button>
            <button
              onClick={listen}
              disabled={checked !== null}
              aria-label="Yozib olish"
              className={`btn-press flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all ${
                listening
                  ? "animate-pulse bg-gold-500"
                  : "bg-gradient-to-b from-azure-600 to-azure-800 hover:from-azure-500 hover:to-azure-700"
              }`}
            >
              <Mic size={30} />
            </button>
            <p className="min-h-5 text-center text-sm text-ink-500 dark:text-ink-400">
              {listening
                ? "Tinglanmoqda…"
                : speechError
                ? speechError
                : heard
                ? `Eshitildi: «${heard}»`
                : "Mikrofonni bosib, iborani ayting"}
            </p>
            {speechError && checked === null && (
              <div className="flex gap-2">
                <button
                  onClick={() => record(true)}
                  className="btn-press rounded-full bg-azure-600 px-4 py-2 text-xs font-bold text-white hover:bg-azure-500"
                >
                  To'g'ri aytdim
                </button>
                <button
                  onClick={() => record(false)}
                  className="btn-press rounded-full bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500"
                >
                  Xato qildim
                </button>
              </div>
            )}
          </div>
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

        {/* Juftlikda "Tekshirish" kerak emas — hamma juft ulanganda o'zi tekshiriladi. */}
        {!(kind === "match" && checked === null) && (
          <button
            onClick={checked === null ? check : next}
            disabled={checked === null && !canCheck}
            className="btn-press mt-1 rounded-full bg-azure-600 py-3 text-sm font-bold text-white hover:bg-azure-500 disabled:opacity-40"
          >
            {checked === null ? "Tekshirish" : qIndex + 1 < total ? "Keyingisi" : "Natijani ko'rish"}
          </button>
        )}
      </div>
    </div>
  );
}
