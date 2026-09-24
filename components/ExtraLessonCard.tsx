"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Clock, User, CheckCircle2 } from "lucide-react";
import type { ExtraLessonRecord } from "@/lib/data";
import { bookExtraLesson } from "@/app/actions";

export function ExtraLessonCard({ lesson }: { lesson: ExtraLessonRecord }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const full = lesson.seats_taken >= lesson.seats_total;

  function book() {
    startTransition(async () => {
      await bookExtraLesson(lesson.id);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
        <CalendarClock size={14} /> {lesson.date_label}
        <Clock size={14} className="ml-2" /> {lesson.time_label}
      </div>
      <p className="font-display text-lg font-bold text-ink-950">{lesson.title}</p>
      <p className="text-sm text-ink-700/60">{lesson.description}</p>
      <div className="flex items-center gap-2 text-xs text-ink-400">
        <User size={14} /> {lesson.teacher}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-ink-700/60">
          {lesson.seats_taken}/{lesson.seats_total} o'rin band
        </span>
        {lesson.booked_by_user ? (
          <span className="flex items-center gap-1 rounded-full bg-ink-50 px-3 py-1.5 text-xs font-semibold text-ink-700">
            <CheckCircle2 size={14} /> Siz yozildingiz
          </span>
        ) : (
          <button
            onClick={book}
            disabled={full || isPending}
            className="btn-press rounded-full bg-azure-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-azure-500 disabled:opacity-40"
          >
            {full ? "O'rin yo'q" : isPending ? "Yozilmoqda..." : "Yozilish"}
          </button>
        )}
      </div>
    </div>
  );
}
