"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  ListChecks,
  Trophy,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/app/actions";
import { LogoMark } from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Bosh sahifa", icon: Home },
  { href: "/lessons", label: "Darslar", icon: GraduationCap },
  { href: "/marks", label: "Baholar", icon: ListChecks },
  { href: "/ranking", label: "Reyting", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="relative flex h-screen w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#282c1a] via-[#20230f] to-[#191b0c] px-4 py-6 text-white"
      style={{ backgroundColor: "#1a1c10" }}
    >
      {/* Nozik oltin nur — orqa fonda */}
      <div className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-olive-400/10 blur-3xl" />

      <div className="relative mb-8 flex items-center gap-3 px-2">
        <LogoMark size={42} className="shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" />
        <div>
          <p className="font-display text-sm font-bold leading-tight tracking-wide">Avangard</p>
          <p className="text-[11px] text-olive-200/70">Rus tili maktabi</p>
        </div>
      </div>

      <nav className="relative flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-olive-600/90 to-olive-700/60 font-semibold text-white shadow-inner shadow-black/20"
                  : "text-olive-200/70 hover:translate-x-0.5 hover:bg-white/5 hover:text-gold-200"
              }`}
            >
              <Icon
                size={18}
                className={active ? "text-gold-300" : "transition-colors group-hover:text-gold-300"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="relative">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-olive-200/70 transition-colors duration-200 hover:bg-white/5 hover:text-wine-300"
        >
          <LogOut size={18} />
          Chiqish
        </button>
      </form>
    </aside>
  );
}
