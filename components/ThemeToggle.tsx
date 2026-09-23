"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "avangard-theme";

// Kichik shahar siluetti — tungi rejimda derazalar oltin rangda "yonadi".
const BUILDINGS = [
  { x: 4, w: 5, h: 5, lit: [0] },
  { x: 10, w: 6, h: 8, lit: [0, 1] },
  { x: 17, w: 5, h: 4, lit: [] },
  { x: 23, w: 6, h: 9, lit: [1, 2] },
  { x: 30, w: 5, h: 5, lit: [0] },
  { x: 36, w: 6, h: 7, lit: [1] },
  { x: 43, w: 5, h: 4, lit: [] },
  { x: 49, w: 6, h: 6, lit: [0, 1] },
  { x: 56, w: 5, h: 8, lit: [2] },
];

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
      title={dark ? "Kunduzgi rejim" : "Tungi rejim"}
      className={`relative h-8 w-16 shrink-0 overflow-hidden rounded-full border shadow-inner transition-colors duration-500 ${
        dark
          ? "border-white/10 bg-gradient-to-b from-[#151829] via-[#10121f] to-[#0a0b13]"
          : "border-gold-200 bg-gradient-to-b from-sky-100 via-[#fdf3e0] to-gold-100"
      } ${mounted ? "" : "opacity-0"}`}
    >
      {/* Yulduzlar — faqat tungi rejimda */}
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${dark ? "opacity-100" : "opacity-0"}`}
      >
        {[
          [8, 6], [14, 12], [22, 5], [30, 14], [38, 7], [46, 11], [52, 5],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="animate-twinkle absolute block h-[2.5px] w-[2.5px] rounded-full bg-gold-200"
            style={{ left: x, top: y, animationDelay: `${i * 300}ms` }}
          />
        ))}
      </span>

      {/* Kunduzgi bulutchalar — faqat kunduzgi rejimda */}
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${dark ? "opacity-0" : "opacity-90"}`}
      >
        <span className="absolute left-[6px] top-[6px] h-1.5 w-3.5 rounded-full bg-white/70" />
        <span className="absolute left-[40px] top-[10px] h-1.5 w-4 rounded-full bg-white/60" />
      </span>

      {/* Shahar siluetti — pastki chiziq, tunda derazalar yonadi */}
      <svg
        className="absolute bottom-0 left-0 h-3.5 w-full"
        viewBox="0 0 64 10"
        preserveAspectRatio="none"
      >
        {BUILDINGS.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={10 - b.h}
              width={b.w}
              height={b.h}
              className={dark ? "fill-[#05060a]" : "fill-olive-800/25"}
            />
            {dark &&
              b.lit.map((row) => (
                <rect
                  key={row}
                  x={b.x + 1}
                  y={10 - b.h + 1.5 + row * 2.2}
                  width={1.1}
                  height={1.1}
                  className="fill-gold-300"
                  style={{ opacity: 0.9 }}
                />
              ))}
          </g>
        ))}
      </svg>

      {/* Suzuvchi quyosh/oy tugmasi */}
      <span
        className={`absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          dark
            ? "translate-x-8 bg-gradient-to-br from-slate-100 via-slate-300 to-slate-400 shadow-slate-900/40"
            : "translate-x-0 bg-gradient-to-br from-gold-200 via-gold-400 to-gold-500 shadow-gold-800/40"
        }`}
      >
        <Sun
          size={13}
          className={`absolute text-gold-900 transition-all duration-500 ${
            dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          size={12}
          className={`absolute fill-slate-600 text-slate-600 transition-all duration-500 ${
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
