"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Pause, Play, RotateCcw } from "lucide-react";

const SPEEDS = [0.75, 1, 1.25];
const BARS = 44;

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Fayl manzilidan doim bir xil chiqadigan «to'lqin» ustunlari balandligi
 *  (haqiqiy tahlil emas — ko'rinish uchun). */
function waveform(src: string) {
  let h = 2166136261;
  for (let i = 0; i < src.length; i++) h = Math.imul(h ^ src.charCodeAt(i), 16777619);
  return Array.from({ length: BARS }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 2246822507) ^ i;
    const r = ((h >>> 0) % 1000) / 1000;
    return 0.38 + r * 0.62;
  });
}

/** Darslik audiosi: katta play/pause, bosib o'tsa bo'ladigan to'lqin,
 *  vaqt, «5 soniya orqaga» va tezlik (0.75× / 1× / 1.25×). Uzun sahifada
 *  yuqorida yopishib turadi — savollarni o'qiyotganda ham boshqarish mumkin. */
export function AudioCard({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const bars = useMemo(() => waveform(src), [src]);
  const progress = duration > 0 ? time / duration : 0;

  useEffect(() => {
    const a = audio.current;
    return () => a?.pause();
  }, []);

  function toggle() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      window.speechSynthesis?.cancel();
      a.play().catch(() => setPlaying(false));
    } else a.pause();
  }

  function seek(fraction: number) {
    const a = audio.current;
    if (!a || !duration) return;
    a.currentTime = Math.max(0, Math.min(duration, fraction * duration));
    setTime(a.currentTime);
  }

  function back5() {
    const a = audio.current;
    if (!a) return;
    a.currentTime = Math.max(0, a.currentTime - 5);
    setTime(a.currentTime);
  }

  function changeRate(r: number) {
    setRate(r);
    if (audio.current) audio.current.playbackRate = r;
  }

  return (
    <div className="sticky top-0 z-20 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-azure-500 via-azure-700 to-purple-700 p-4 text-white shadow-[0_18px_40px_-18px_rgba(99,102,241,0.9)] ring-1 ring-inset ring-white/15 sm:p-5">
      <span className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-purple-400/30 blur-3xl" />
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
      />
      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "To'xtatish" : "Tinglash"}
          className="btn-press flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-azure-700 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] sm:h-20 sm:w-20"
        >
          {playing ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" className="ml-1" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
            <Headphones size={14} />
            {playing ? "Tinglanmoqda" : "Audio"}
          </p>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Audio joyi"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time)}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              seek((e.clientX - r.left) / r.width);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek(progress + 0.05);
              if (e.key === "ArrowLeft") seek(progress - 0.05);
            }}
            className="flex h-12 cursor-pointer items-center gap-[3px]"
          >
            {bars.map((h, i) => (
              <span
                key={i}
                style={{ height: `${h * 100}%` }}
                className={`flex-1 rounded-full transition-colors duration-200 ${
                  i / BARS < progress ? "bg-gold-300" : "bg-white/35"
                } ${playing && Math.abs(i / BARS - progress) < 1 / BARS ? "animate-pulse" : ""}`}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs font-semibold tabular-nums text-white/80">
            <span>{fmt(time)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>
      <div className="relative mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={back5}
          className="btn-press flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold ring-1 ring-inset ring-white/20 hover:bg-white/25"
        >
          <RotateCcw size={15} /> 5s
        </button>
        <div className="flex rounded-full bg-black/20 p-1 ring-1 ring-inset ring-white/15">
          {SPEEDS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => changeRate(r)}
              aria-pressed={rate === r}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                rate === r ? "bg-white text-azure-700 shadow" : "text-white/80 hover:text-white"
              }`}
            >
              {r}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
