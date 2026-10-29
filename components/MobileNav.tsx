"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, TEACHER_NAV_ITEM } from "./Sidebar";

/** Telefon va planshet uchun pastki «dock» (katta ekranda uning o'rnini chap
 *  yon panel — Sidebar egallaydi). Faol bo'lim ostidagi yorqin «tabletka»
 *  bo'limlar orasida prujina bilan siljiydi. */
export function MobileNav({ isTeacher = false }: { isTeacher?: boolean }) {
  const pathname = usePathname();
  const items = isTeacher ? [...NAV_ITEMS, TEACHER_NAV_ITEM] : NAV_ITEMS;
  const activeIndex = items.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(env(safe-area-inset-bottom)+0.6rem)] lg:hidden">
      <div className="relative mx-auto flex max-w-md items-stretch rounded-[1.75rem] border border-ink-950/5 bg-white/80 p-1.5 shadow-[0_12px_40px_-12px_rgba(15,19,36,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#121729]/80 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)]">
        {activeIndex >= 0 && (
          <span
            aria-hidden
            className="absolute inset-y-1.5 left-1.5 rounded-[1.35rem] bg-gradient-to-br from-azure-500 to-purple-600 shadow-[0_8px_20px_-6px_rgba(124,92,250,0.75)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              width: `calc((100% - 0.75rem) / ${items.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        )}
        {items.map((item, i) => {
          const active = i === activeIndex;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative z-10 flex flex-1 flex-col items-center gap-0.5 rounded-[1.35rem] py-2 text-[11px] font-semibold transition-colors duration-300 active:scale-95 ${
                active ? "text-white" : "text-ink-500 dark:text-ink-400"
              }`}
            >
              <Icon
                size={21}
                className={`transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  active ? "-translate-y-px scale-110" : ""
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
