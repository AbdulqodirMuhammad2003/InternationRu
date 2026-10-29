"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  ListChecks,
  Trophy,
  LogOut,
  Presentation,
} from "lucide-react";
import { logoutAction } from "@/app/actions";
import { LogoMark } from "./Logo";

export const NAV_ITEMS = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/lessons", label: "Darslar", icon: GraduationCap },
  { href: "/marks", label: "Baholar", icon: ListChecks },
  { href: "/ranking", label: "Reyting", icon: Trophy },
];

/** O'qituvchi uchun qo'shimcha bo'lim. */
export const TEACHER_NAV_ITEM = { href: "/teacher", label: "O'qituvchi", icon: Presentation };

export function Sidebar({ isTeacher = false }: { isTeacher?: boolean }) {
  const pathname = usePathname();
  const items = isTeacher ? [...NAV_ITEMS, TEACHER_NAV_ITEM] : NAV_ITEMS;

  return (
    <aside
      className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col lg:flex overflow-hidden border-r border-white/[0.06] bg-[#0b0f1a]/85 px-4 py-6 text-white backdrop-blur-xl"
    >
      {/* Nozik oltin nur — orqa fonda */}
      <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-azure-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="relative mb-8 flex items-center gap-3 px-2">
        <LogoMark size={42} className="shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" />
        <div>
          <p className="font-display text-sm font-bold leading-tight tracking-wide">Avangard</p>
          <p className="text-xs text-ink-300">Rus tili maktabi</p>
        </div>
      </div>

      <nav className="relative flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                active
                  ? "bg-gradient-to-r from-azure-500 to-purple-600 font-semibold text-white shadow-[0_8px_24px_-8px_rgba(124,92,250,0.7)] ring-1 ring-inset ring-white/15"
                  : "text-ink-300 hover:translate-x-1 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={active ? "text-white" : "transition-transform duration-300 group-hover:scale-110 group-hover:text-azure-300"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="relative">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-200/70 transition-colors duration-200 hover:bg-white/5 hover:text-rose-300"
        >
          <LogOut size={18} />
          Chiqish
        </button>
      </form>
    </aside>
  );
}
