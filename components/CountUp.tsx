"use client";

import { useEffect, useState } from "react";
import { confetti } from "@/lib/celebrate";

/** Son 0 dan berilgan qiymatgacha «sanab» chiqadi (natija foizlari uchun). */
export function CountUp({ value, duration = 900, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <span className="tabular-nums">
      {shown}
      {suffix}
    </span>
  );
}

/** Sahifa/oyna ochilganda bir marta konfetti otadi (`when` rost bo'lsa). */
export function Celebrate({ when = true }: { when?: boolean }) {
  useEffect(() => {
    if (when) confetti();
  }, [when]);
  return null;
}
