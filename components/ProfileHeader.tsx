import { Award, Sparkles } from "lucide-react";
import type { UserRecord } from "@/lib/data";
import { EditableAvatar } from "./EditableAvatar";

function SkillBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-olive-700/70 dark:text-olive-300/70">{label}</span>
        <span className="font-semibold text-olive-950 dark:text-olive-50">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-olive-100 dark:bg-white/10">
        <div
          className="h-full origin-left animate-fade-up rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
          style={{ width: `${value}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-olive-50/70 px-4 py-3 transition-colors duration-200 hover:bg-olive-50 dark:bg-white/5 dark:hover:bg-white/10">
      {icon}
      <div>
        <p className="text-base font-bold leading-tight text-olive-950 dark:text-olive-50">{value}</p>
        <p className="text-xs text-olive-700/60 dark:text-olive-300/60">{label}</p>
      </div>
    </div>
  );
}

export function ProfileHeader({ user }: { user: UserRecord }) {
  return (
    <div className="animate-fade-up rounded-3xl bg-white p-6 shadow-sm shadow-olive-950/5 ring-1 ring-olive-950/5 dark:bg-[#1f2115] dark:shadow-none dark:ring-white/10">
      <div className="mb-6 flex justify-center">
        <EditableAvatar
          name={user.name}
          avatarUrl={user.avatar_url}
          size={84}
          triggerClassName="flex-col items-center gap-2 text-center"
        >
          <div>
            <p className="font-display text-lg font-bold text-olive-950 dark:text-olive-50">{user.name}</p>
            <p className="text-sm text-olive-700/60 dark:text-olive-300/60">{user.course}</p>
          </div>
        </EditableAvatar>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile
          icon={<Award className="text-gold-600" size={22} />}
          value={`${user.branch_rank}-o'rin`}
          label="Filial reytingi"
        />
        <StatTile
          icon={<Sparkles className="text-olive-600" size={22} />}
          value={user.level}
          label="Daraja"
        />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-olive-50/70 px-4 py-3 dark:bg-white/5">
        <span className="text-sm text-olive-700/60 dark:text-olive-300/60">Avgust oyi uchun o'rtacha ball</span>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-olive-950 dark:text-olive-50">{user.august_average}%</span>
          <span className="rounded-full bg-olive-100 px-2 py-0.5 text-xs font-semibold text-olive-700 dark:bg-white/10 dark:text-olive-200">
            ↗ 100%
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
        <SkillBar label="O'qish" value={user.reading_pct} delay={0} />
        <SkillBar label="Yozish" value={user.writing_pct} delay={80} />
        <SkillBar label="Tinglash" value={user.listening_pct} delay={160} />
        <SkillBar label="Gapirish" value={user.speaking_pct} delay={240} />
      </div>
    </div>
  );
}
