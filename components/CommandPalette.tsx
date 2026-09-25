"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  GraduationCap,
  ListChecks,
  Trophy,
  CornerDownLeft,
} from "lucide-react";

const COMMANDS = [
  { href: "/", label: "Bosh sahifa", icon: Home, keywords: "home dashboard bosh" },
  { href: "/lessons", label: "Darslar", icon: GraduationCap, keywords: "lessons darslar lugat" },
  { href: "/marks", label: "Baholar", icon: ListChecks, keywords: "marks baho natija" },
  { href: "/ranking", label: "Reyting", icon: Trophy, keywords: "ranking reyting" },
  { href: "/exam", label: "Daraja imtihoni", icon: GraduationCap, keywords: "imtihon exam test" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q)
    );
  }, [query]);

  function go(href: string) {
    router.push(href);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      go(filtered[activeIndex].href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-ink-300 hover:bg-ink-50 dark:border-white/10 dark:bg-white/5 dark:text-ink-200/70 dark:hover:bg-white/10"
        aria-label="Tezkor qidiruv (Cmd+K)"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Qidirish</span>
        <kbd className="hidden rounded border border-ink-200 bg-ink-50 px-1 text-[10px] font-semibold text-ink-500 sm:inline dark:border-white/10 dark:bg-white/10 dark:text-ink-200/70">
          ⌘K
        </kbd>
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="animate-fade-in fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-ink-950/50 p-4 pt-[14vh] backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <div
                className="animate-pop-in w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-[#161b26]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3 dark:border-white/10">
                  <Search size={16} className="text-ink-400" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Sahifa qidirish..."
                    className="flex-1 bg-transparent text-sm text-ink-950 outline-none placeholder:text-ink-300 dark:text-ink-50 dark:placeholder:text-ink-500"
                  />
                  <kbd className="rounded border border-ink-200 px-1.5 py-0.5 text-[10px] text-ink-400 dark:border-white/10 dark:text-ink-300/60">
                    esc
                  </kbd>
                </div>
                <div className="max-h-72 overflow-y-auto p-2">
                  {filtered.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-ink-400">Hech narsa topilmadi.</p>
                  )}
                  {filtered.map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.href}
                        onClick={() => go(c.href)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          i === activeIndex
                            ? "bg-ink-50 text-ink-950 dark:bg-white/10 dark:text-ink-50"
                            : "text-ink-700 dark:text-ink-200/70"
                        }`}
                      >
                        <Icon size={16} className="text-ink-500 dark:text-gold-300" />
                        {c.label}
                        {i === activeIndex && <CornerDownLeft size={13} className="ml-auto text-ink-300" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
