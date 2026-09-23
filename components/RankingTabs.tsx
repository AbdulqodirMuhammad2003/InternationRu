"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import type { RankingRow } from "@/lib/data";

export function RankingTabs({
  branch,
  group,
}: {
  branch: RankingRow[];
  group: RankingRow[];
}) {
  const [tab, setTab] = useState<"branch" | "group">("branch");
  const rows = tab === "branch" ? branch : group;

  return (
    <div className="animate-fade-up rounded-2xl bg-white p-4 shadow-sm ring-1 ring-olive-950/5 dark:bg-[#1f2115] dark:shadow-none dark:ring-white/10">
      <div className="mb-4 inline-flex rounded-xl bg-olive-50 p-1 dark:bg-white/5">
        <button
          onClick={() => setTab("branch")}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
            tab === "branch" ? "bg-white text-olive-950 shadow dark:bg-white/10 dark:text-olive-50" : "text-olive-500 dark:text-olive-400"
          }`}
        >
          Filial bo'yicha
        </button>
        <button
          onClick={() => setTab("group")}
          className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
            tab === "group" ? "bg-white text-olive-950 shadow dark:bg-white/10 dark:text-olive-50" : "text-olive-500 dark:text-olive-400"
          }`}
        >
          Guruh bo'yicha
        </button>
      </div>

      <div className="flex flex-col divide-y divide-olive-50 dark:divide-white/5">
        {rows.map((row, i) => (
          <div
            key={row.id}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`flex animate-fade-up items-center justify-between px-3 py-3 transition-colors ${
              row.is_current_user ? "rounded-xl bg-gold-50 dark:bg-gold-950/30" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  row.place === 1
                    ? "bg-gold-400 text-olive-950"
                    : row.place === 2
                    ? "bg-olive-200 text-olive-800 dark:bg-white/10 dark:text-olive-200"
                    : row.place === 3
                    ? "bg-gold-200 text-gold-900 dark:bg-gold-900/40 dark:text-gold-200"
                    : "bg-olive-50 text-olive-500 dark:bg-white/5 dark:text-olive-400"
                }`}
              >
                {row.place}
              </span>
              <span className={`text-sm ${row.is_current_user ? "font-bold text-olive-950 dark:text-olive-50" : "font-medium text-olive-800 dark:text-olive-200"}`}>
                {row.display_name}
                {!!row.is_current_user && " (siz)"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-olive-700/70 dark:text-olive-300/70">
              <Trophy size={14} className="text-gold-500" />
              {row.points.toLocaleString("ru-RU")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
