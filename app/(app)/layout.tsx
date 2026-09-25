import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserStats } from "@/lib/data";
import { getCertificates } from "@/lib/exam";
import { Sidebar } from "@/components/Sidebar";
import { EditableAvatar } from "@/components/EditableAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileNav } from "@/components/MobileNav";
import { LogoMark } from "@/components/Logo";
import { logoutAction } from "@/app/actions";
import { LogOut } from "lucide-react";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user, certificates] = await Promise.all([
    getUserStats(session.userId),
    getCertificates(session.userId),
  ]);
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f7fb] dark:bg-[#0d1017]">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-ink-100 bg-white/80 px-4 py-2.5 backdrop-blur-sm sm:px-6 lg:static lg:px-8 lg:py-3 dark:border-white/10 dark:bg-[#121620]/80">
          <div className="flex items-center gap-3">
            <LogoMark size={34} className="shrink-0 lg:hidden" />
            <CommandPalette />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <div className="mx-1 hidden h-6 w-px bg-ink-100 sm:block dark:bg-white/10" />

            <EditableAvatar
              name={user.name}
              avatarUrl={user.avatar_url}
              size={38}
              triggerClassName="gap-3"
              certificates={certificates}
            >
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-ink-950 dark:text-ink-50">{user.name}</p>
                <p className="text-xs text-ink-600/70 dark:text-ink-300/60">{user.level}</p>
              </div>
            </EditableAvatar>

            {/* Katta ekranda "Chiqish" yon panelda turadi. */}
            <form action={logoutAction} className="lg:hidden">
              <button
                type="submit"
                aria-label="Chiqish"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-50 hover:text-rose-500 dark:text-ink-400 dark:hover:bg-white/10"
              >
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-8 lg:pt-6">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
