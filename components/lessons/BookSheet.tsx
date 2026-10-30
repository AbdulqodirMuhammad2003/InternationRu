"use client";

import { useState } from "react";
import { Check, ChevronDown, Volume2, X } from "lucide-react";
import type { ExerciseKind, ExerciseQuestion } from "@/lib/data";
import { isAcceptedAnswer } from "@/lib/answer";
import { buzz, spark } from "@/lib/celebrate";

/** Bitta sahifada ko'rsatiladigan (audio ostida) topshiriq turlari. */
export const SHEET_KINDS = new Set<ExerciseKind>(["choice", "dialog", "fill", "type", "number", "stress", "truefalse"]);

function speakRu(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ru-RU";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

type Value = string | number | null;

function isWritten(kind: ExerciseKind, q: ExerciseQuestion) {
  return kind === "fill" || kind === "type" || kind === "number" || (!!q.answer_text && q.options.length === 0);
}

function correctText(kind: ExerciseKind, q: ExerciseQuestion) {
  return isWritten(kind, q) ? (q.answer_text ?? "").split("|")[0] : q.options[q.correct_index];
}

/** Darslik topshirig'i — kitobdagidek: bitta audio, uning ostida barcha
 *  savollar kartalarda. Hammasi to'ldirilgach bir marta tekshiriladi:
 *  har karta yashil/qizil bo'ladi, xatolarda to'g'ri javob ko'rinadi. */
export function BookSheet({
  kind,
  questions,
  onComplete,
}: {
  kind: ExerciseKind;
  questions: ExerciseQuestion[];
  onComplete: (answers: { questionId: number; correct: boolean }[]) => void;
}) {
  const [values, setValues] = useState<Record<number, Value>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(questions[0]?.id ?? null);

  const set = (id: number, v: Value) => setValues((s) => ({ ...s, [id]: v }));
  const answered = questions.filter((q) => {
    const v = values[q.id];
    return typeof v === "number" || (typeof v === "string" && v.trim() !== "");
  }).length;

  const results = questions.map((q) => {
    const v = values[q.id];
    const ok = isWritten(kind, q) ? typeof v === "string" && isAcceptedAnswer(v, q.answer_text) : v === q.correct_index;
    return { questionId: q.id, correct: ok };
  });
  const correct = results.filter((r) => r.correct).length;

  function check() {
    setChecked(true);
    if (correct === questions.length) {
      spark();
      buzz(15);
    } else buzz([25, 40, 25]);
  }

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, i) => {
        const r = results[i];
        const tone = !checked
          ? active === q.id
            ? "ring-2 ring-azure-400/70 bg-white dark:bg-white/[0.07]"
            : "ring-1 ring-ink-950/5 bg-white dark:bg-white/[0.045] dark:ring-white/10"
          : r.correct
            ? "ring-2 ring-mint-400/80 bg-mint-50 dark:bg-mint-950/30"
            : "ring-2 ring-rose-400/80 bg-rose-50 dark:bg-rose-950/30";
        return (
          <div
            key={q.id}
            onFocusCapture={() => setActive(q.id)}
            onClick={() => setActive(q.id)}
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            className={`animate-fade-up rounded-2xl p-3.5 shadow-sm transition-all duration-200 sm:p-4 ${tone}`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                  !checked
                    ? "bg-gold-400 text-ink-950"
                    : r.correct
                      ? "bg-mint-500 text-white"
                      : "bg-rose-500 text-white"
                }`}
              >
                {checked ? r.correct ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} /> : i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <QuestionBody kind={kind} q={q} value={values[q.id] ?? null} onChange={(v) => set(q.id, v)} disabled={checked} />
                {checked && !r.correct && (
                  <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">
                    To'g'ri javob: <b>{correctText(kind, q)}</b>
                  </p>
                )}
                {checked && q.explanation && (
                  <p className="mt-1 text-xs text-ink-600 dark:text-ink-300">{q.explanation}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="sticky bottom-0 z-10 -mx-1 mt-1 flex items-center gap-3 rounded-2xl bg-white/85 p-2 backdrop-blur-xl dark:bg-[#0f1424]/85">
        {!checked ? (
          <>
            <span className="pl-2 text-xs font-semibold text-ink-500 dark:text-ink-400">
              {answered} / {questions.length}
            </span>
            <button
              onClick={check}
              disabled={answered === 0}
              className="btn-press btn-3d flex-1 rounded-2xl bg-azure-600 py-3.5 text-base font-bold text-white hover:bg-azure-500 disabled:opacity-40"
            >
              Tekshirish
            </button>
          </>
        ) : (
          <>
            <span className="pl-2 text-sm font-bold text-ink-900 dark:text-ink-50">
              {correct} / {questions.length}
            </span>
            <button
              onClick={() => onComplete(results)}
              className="btn-press btn-3d [--btn-glow:rgba(16,185,129,0.5)] flex-1 rounded-2xl bg-mint-600 py-3.5 text-base font-bold text-white hover:bg-mint-500"
            >
              Natijani ko'rish
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const INPUT =
  "rounded-xl border-2 border-ink-200 bg-white px-3 py-2 text-base font-semibold text-ink-950 outline-none transition-colors focus:border-azure-500 disabled:opacity-90 dark:border-white/10 dark:bg-[#0b0f1a] dark:text-ink-50 dark:focus:border-azure-400";

function TextInput({ value, onChange, disabled, inline, numeric }: { value: Value; onChange: (v: string) => void; disabled: boolean; inline?: boolean; numeric?: boolean }) {
  return (
    <input
      value={typeof value === "string" ? value : ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      lang="ru"
      inputMode={numeric ? "numeric" : "text"}
      autoComplete="off"
      autoCapitalize="off"
      spellCheck={false}
      className={`${INPUT} ${inline ? "mx-1 inline-block w-36 py-1 align-baseline" : "mt-2 w-full"}`}
    />
  );
}

function InlineSelect({ q, value, onChange, disabled }: { q: ExerciseQuestion; value: Value; onChange: (v: number) => void; disabled: boolean }) {
  return (
    <span className="relative mx-1 inline-flex align-baseline">
      <select
        value={typeof value === "number" ? value : ""}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className={`${INPUT} appearance-none py-1 pr-8`}
      >
        <option value="" disabled>
          …
        </option>
        {q.options.map((o, i) => (
          <option key={i} value={i}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-400" />
    </span>
  );
}

function Pills({ q, value, onChange, disabled }: { q: ExerciseQuestion; value: Value; onChange: (v: number) => void; disabled: boolean }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {q.options.map((o, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onChange(i)}
          className={`btn-press rounded-xl border-2 px-3.5 py-2 text-[15px] font-semibold transition-colors ${
            value === i
              ? "border-azure-500 bg-azure-50 text-azure-800 dark:bg-azure-950/50 dark:text-azure-100"
              : "border-ink-200 bg-white text-ink-800 hover:border-azure-300 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Speak({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={() => speakRu(text)}
      aria-label="Eshitish"
      className="btn-press mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 align-middle text-ink-950 hover:bg-gold-300"
    >
      <Volume2 size={16} />
    </button>
  );
}

function QuestionBody({ kind, q, value, onChange, disabled }: { kind: ExerciseKind; q: ExerciseQuestion; value: Value; onChange: (v: Value) => void; disabled: boolean }) {
  const text = "text-[15px] font-semibold leading-relaxed text-ink-900 dark:text-ink-50";
  const gap = q.prompt.includes("___");

  if (kind === "number") {
    return (
      <div className="flex items-center">
        {q.audio_text && <Speak text={q.audio_text} />}
        <TextInput value={value} onChange={onChange} disabled={disabled} inline numeric />
      </div>
    );
  }
  if (kind === "stress") {
    return (
      <div>
        <p className={text}>
          {q.audio_text && <Speak text={q.audio_text} />}
          {q.audio_text ?? q.prompt}
        </p>
        <Pills q={q} value={value} onChange={onChange} disabled={disabled} />
      </div>
    );
  }
  if (kind === "fill" || (isWritten(kind, q) && gap)) {
    const [before, after] = q.prompt.split("___");
    return (
      <p className={text}>
        {before}
        <TextInput value={value} onChange={onChange} disabled={disabled} inline />
        {after ?? ""}
      </p>
    );
  }
  if (isWritten(kind, q)) {
    return (
      <div>
        <p className={`${text} whitespace-pre-line`}>{q.prompt}</p>
        <TextInput value={value} onChange={onChange} disabled={disabled} />
      </div>
    );
  }
  if (gap) {
    const [before, after] = q.prompt.split("___");
    return (
      <p className={text}>
        {before}
        <InlineSelect q={q} value={value} onChange={onChange} disabled={disabled} />
        {after ?? ""}
      </p>
    );
  }
  return (
    <div>
      <p className={`${text} whitespace-pre-line`}>{kind === "dialog" ? `— ${q.prompt}` : q.prompt}</p>
      <Pills q={q} value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}
