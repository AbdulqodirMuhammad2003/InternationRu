import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserStats } from "@/lib/data";
import { Sidebar } from "@/components/Sidebar";
import { EditableAvatar } from "@/components/EditableAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getUserStats(session.userId);
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f6ef] dark:bg-[#15160d]">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-olive-100 bg-white/80 px-8 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-[#1a1c11]/80">
          <CommandPalette />

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="mx-1 h-6 w-px bg-olive-100 dark:bg-white/10" />

            <EditableAvatar
              name={user.name}
              avatarUrl={user.avatar_url}
              size={38}
              triggerClassName="gap-3"
            >
              <div className="leading-tight">
                <p className="text-sm font-semibold text-olive-950 dark:text-olive-50">{user.name}</p>
                <p className="text-xs text-olive-600/70 dark:text-olive-300/60">{user.level}</p>
              </div>
            </EditableAvatar>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
