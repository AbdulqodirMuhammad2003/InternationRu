"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./Sidebar";

/** Telefon va planshet uchun pastki navigatsiya paneli (katta ekranlarda
 *  uning o'rnini chap yon panel — Sidebar egallaydi). */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden dark:border-white/10 dark:bg-[#121620]/95">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                active ? "text-azure-600 dark:text-azure-300" : "text-ink-400 dark:text-ink-500"
              }`}
            >
              <span
                className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-azure-50 dark:bg-azure-950/50" : ""
                }`}
              >
                <Icon size={20} />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
