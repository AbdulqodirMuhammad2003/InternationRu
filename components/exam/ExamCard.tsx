import Link from "next/link";
import { ArrowRight, GraduationCap, Trophy } from "lucide-react";
import type { ExamStatus } from "@/lib/exam";

/** «Darslar» sahifasidagi daraja imtihoni kartasi. */
export function ExamCard({ status }: { status: ExamStatus }) {
  const note = status.passed
    ? `O'tilgan${status.lastResult ? ` — ${status.lastResult.pct}%` : ""}`
    : status.active
    ? "Imtihon davom etyapti — davom ettiring"
    : status.canStart
    ? `${status.attemptsLeft} ta urinish qoldi`
    : status.blockReason ?? "";

  return (
    <Link
      href="/exam"
      className="group flex animate-fade-up items-center gap-4 rounded-3xl bg-gradient-to-br from-azure-600 to-azure-900 p-5 text-white shadow-sm shadow-azure-900/30 transition-transform hover:-translate-y-0.5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
        {status.passed ? <Trophy size={24} /> : <GraduationCap size={24} />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg font-bold">{status.title}</p>
        <p className="text-sm text-white/80">40 savol · 40 daqiqa · o'tish bali 80%</p>
        <p className="mt-1 text-xs font-semibold text-gold-200">{note}</p>
      </div>
      <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
