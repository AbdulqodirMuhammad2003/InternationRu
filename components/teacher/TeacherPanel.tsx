"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import type { PlacementLevel, TeacherStudent } from "@/lib/teacher";
import {
  createStudentAction,
  deleteStudentAction,
  resetPasswordAction,
  revealCredentialsAction,
  updatePlacementAction,
  updateStudentInfoAction,
  type TeacherActionResult,
} from "@/app/teacher-actions";

type Mode = "placement" | "password" | "info" | "delete";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-base sm:text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-azure-500 focus:ring-2 focus:ring-azure-100 dark:border-white/10 dark:bg-white/5 dark:text-ink-50 dark:focus:ring-azure-900/40";
const labelClass = "mb-1 block text-xs font-semibold text-ink-600 dark:text-ink-300";

/** Chalkashtiriladigan belgilarsiz (0/O, 1/l) tasodifiy parol. */
function generatePassword() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

function formatDay(iso: string | null) {
  if (!iso) return "hali kirmagan";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("uz-UZ", { day: "numeric", month: "long" });
}

/** Daraja va boshlanadigan dars tanlovi (dars ro'yxati darajaga qarab o'zgaradi). */
function PlacementFields({
  levels,
  level,
  startUnitId,
  onChange,
}: {
  levels: PlacementLevel[];
  level: string;
  startUnitId: number | null;
  onChange: (level: string, startUnitId: number | null) => void;
}) {
  const units = levels.find((l) => l.code === level)?.units ?? [];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-3">
      <div className="min-w-0">
        <label className={labelClass}>Daraja</label>
        <select
          name="level"
          value={level}
          onChange={(e) => onChange(e.target.value, null)}
          className={inputClass}
        >
          {levels.map((l) => (
            <option key={l.code} value={l.code}>
              {l.code}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-0">
        <label className={labelClass}>Qaysi darsdan</label>
        <select
          name="startUnitId"
          value={startUnitId ?? ""}
          onChange={(e) => onChange(level, e.target.value ? Number(e.target.value) : null)}
          className={inputClass}
        >
          <option value="">1-darsdan (boshidan)</option>
          {units.slice(1).map((u) => (
            <option key={u.id} value={u.id}>
              {u.title} — {u.subtitle}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PasswordField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelClass}>Parol</label>
      <div className="flex gap-2">
        <input
          name="password"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          placeholder="kamida 6 belgi"
          className={`${inputClass} font-mono`}
        />
        <button
          type="button"
          onClick={() => onChange(generatePassword())}
          className="btn-press shrink-0 rounded-xl bg-ink-100 px-3 text-xs font-bold text-ink-700 hover:bg-ink-200 dark:bg-white/10 dark:text-ink-200"
        >
          Yaratish
        </button>
      </div>
    </div>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">{error}</p>;
}

/** Yangi o'quvchi formasi. Saqlangach login va parol ko'rsatiladi — o'qituvchi
 *  ularni o'quvchiga beradi (parol keyin hech qayerda ko'rinmaydi). */
function NewStudentForm({ levels, onClose }: { levels: PlacementLevel[]; onClose: () => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [created, setCreated] = useState<{ username: string; password: string } | null>(null);
  const [level, setLevel] = useState(levels[0]?.code ?? "A1");
  const [startUnitId, setStartUnitId] = useState<number | null>(null);
  const [password, setPassword] = useState(generatePassword);

  if (created) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl bg-mint-50 p-5 dark:bg-mint-950/30">
        <p className="flex items-center gap-2 font-bold text-mint-800 dark:text-mint-200">
          <Check size={18} /> O'quvchi qo'shildi
        </p>
        <p className="text-sm text-ink-700 dark:text-ink-200">Quyidagilarni o'quvchiga bering (keyin ham o'quvchi kartasidan ko'rish mumkin):</p>
        <div className="grid gap-2 rounded-xl bg-white p-3 font-mono text-sm dark:bg-white/5">
          <span>Sayt: internation-ru.vercel.app</span>
          <span>Login: {created.username}</span>
          <span>Parol: {created.password}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              navigator.clipboard?.writeText(
                `Sayt: https://internation-ru.vercel.app\nLogin: ${created.username}\nParol: ${created.password}`
              )
            }
            className="btn-press rounded-full bg-mint-600 px-4 py-2 text-sm font-bold text-white hover:bg-mint-500"
          >
            Nusxa olish
          </button>
          <button onClick={onClose} className="btn-press rounded-full bg-ink-100 px-4 py-2 text-sm font-bold text-ink-700 dark:bg-white/10 dark:text-ink-200">
            Yopish
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={(fd) =>
        startTransition(async () => {
          const res = await createStudentAction(fd);
          if (res.ok) setCreated({ username: String(fd.get("username")).trim().toLowerCase(), password });
          else setError(res.error);
        })
      }
      className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:ring-white/10"
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-ink-950 dark:text-ink-50">Yangi o'quvchi</p>
        <button type="button" onClick={onClose} className="rounded-full p-1.5 text-ink-500 hover:bg-ink-50 dark:hover:bg-white/10">
          <X size={18} />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
        <div>
          <label className={labelClass}>Ism familiya</label>
          <input name="name" required className={inputClass} placeholder="Ali Valiyev" />
        </div>
        <div>
          <label className={labelClass}>Login</label>
          <input
            name="username"
            required
            autoCapitalize="none"
            autoCorrect="off"
            className={inputClass}
            placeholder="ali.valiyev"
          />
        </div>
        <PasswordField value={password} onChange={setPassword} />
        <div>
          <label className={labelClass}>Email (ixtiyoriy — Google bilan kirish uchun)</label>
          <input name="email" type="email" className={inputClass} placeholder="ali@gmail.com" />
        </div>
      </div>
      <PlacementFields
        levels={levels}
        level={level}
        startUnitId={startUnitId}
        onChange={(l, u) => {
          setLevel(l);
          setStartUnitId(u);
        }}
      />
      <ErrorText error={error} />
      <button
        disabled={pending}
        className="btn-press rounded-full bg-gradient-to-b from-azure-600 to-azure-700 py-2.5 text-sm font-bold text-white hover:from-azure-500 hover:to-azure-600 disabled:opacity-60"
      >
        {pending ? "Saqlanmoqda…" : "O'quvchini qo'shish"}
      </button>
    </form>
  );
}

/** O'quvchi kartasidagi tahrir qismlari (joylashtirish, parol, ma'lumot, o'chirish). */
function StudentEditor({
  student,
  mode,
  levels,
  onDone,
}: {
  student: TeacherStudent;
  mode: Mode;
  levels: PlacementLevel[];
  onDone: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const [level, setLevel] = useState(student.level);
  const [startUnitId, setStartUnitId] = useState(student.startUnitId);
  const [password, setPassword] = useState(generatePassword);

  function run(action: (fd: FormData) => Promise<TeacherActionResult>, keepOpen = false) {
    return (fd: FormData) =>
      startTransition(async () => {
        fd.set("id", String(student.id));
        const res = await action(fd);
        if (!res.ok) return setError(res.error);
        if (keepOpen) setSaved(true);
        else onDone();
      });
  }

  const box = "mt-3 flex flex-col gap-3 rounded-xl bg-ink-50/70 p-3 dark:bg-white/5";
  const saveBtn =
    "btn-press rounded-full bg-azure-600 px-4 py-2 text-sm font-bold text-white hover:bg-azure-500 disabled:opacity-60";

  if (mode === "placement") {
    return (
      <form action={run(updatePlacementAction)} className={box}>
        <PlacementFields
          levels={levels}
          level={level}
          startUnitId={startUnitId}
          onChange={(l, u) => {
            setLevel(l);
            setStartUnitId(u);
          }}
        />
        <p className="text-xs text-ink-500 dark:text-ink-400">
          Oldingi darajalar va tanlangan darsgacha bo'lgan darslar ochiladi; natijalar o'chmaydi.
        </p>
        <ErrorText error={error} />
        <button disabled={pending} className={saveBtn}>{pending ? "Saqlanmoqda…" : "Saqlash"}</button>
      </form>
    );
  }
  if (mode === "password") {
    return saved ? (
      <div className={box}>
        <p className="text-sm font-semibold text-mint-700 dark:text-mint-300">Yangi parol saqlandi:</p>
        <p className="font-mono text-sm">
          Login: {student.username ?? student.email} · Parol: {password}
        </p>
        <button type="button" onClick={onDone} className={saveBtn}>Yopish</button>
      </div>
    ) : (
      <form action={run(resetPasswordAction, true)} className={box}>
        <PasswordField value={password} onChange={setPassword} />
        <ErrorText error={error} />
        <button disabled={pending} className={saveBtn}>{pending ? "Saqlanmoqda…" : "Parolni almashtirish"}</button>
      </form>
    );
  }
  if (mode === "info") {
    return (
      <form action={run(updateStudentInfoAction)} className={box}>
        <div>
          <label className={labelClass}>Ism familiya</label>
          <input name="name" defaultValue={student.name} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email (Google bilan kirish uchun)</label>
          <input name="email" type="email" defaultValue={student.email ?? ""} className={inputClass} />
        </div>
        <ErrorText error={error} />
        <button disabled={pending} className={saveBtn}>{pending ? "Saqlanmoqda…" : "Saqlash"}</button>
      </form>
    );
  }
  return (
    <form action={run(deleteStudentAction)} className={`${box} bg-rose-50 dark:bg-rose-950/30`}>
      <p className="text-sm text-rose-800 dark:text-rose-200">
        <b>{student.name}</b> va uning barcha natijalari butunlay o'chiriladi. Buni qaytarib bo'lmaydi.
      </p>
      <ErrorText error={error} />
      <button disabled={pending} className="btn-press rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-500 disabled:opacity-60">
        {pending ? "O'chirilmoqda…" : "Ha, o'chirish"}
      </button>
    </form>
  );
}

/** «Login va parol» qatori: parol faqat «Ko'rsatish» bosilganda serverdan olinadi. */
function Credentials({ student }: { student: TeacherStudent }) {
  const [shown, setShown] = useState<{ username: string | null; password: string | null } | null>(null);
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  function toggle() {
    if (shown) return setShown(null);
    startTransition(async () => {
      const res = await revealCredentialsAction(student.id);
      if (res.ok) setShown({ username: res.username ?? null, password: res.password ?? null });
    });
  }

  function copy() {
    if (!shown?.password) return;
    navigator.clipboard?.writeText(
      `Sayt: https://internation-ru.vercel.app\nLogin: ${shown.username ?? ""}\nParol: ${shown.password}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl bg-ink-50/70 px-3 py-2 text-xs dark:bg-white/5">
      <KeyRound size={14} className="shrink-0 text-ink-400" />
      <div className="min-w-0 flex-1 font-mono text-ink-800 dark:text-ink-100">
        <span>{student.username ?? student.email ?? "—"}</span>
        <span className="mx-1.5 text-ink-300">·</span>
        {shown ? (
          shown.password ? (
            <span className="font-bold">{shown.password}</span>
          ) : (
            <span className="font-sans text-ink-500">parol saqlanmagan — «Parol» orqali yangisini bering</span>
          )
        ) : (
          <span className="tracking-widest text-ink-400">••••••</span>
        )}
      </div>
      {shown?.password && (
        <button onClick={copy} aria-label="Nusxa olish" className="shrink-0 rounded-full p-1 text-ink-500 hover:text-ink-800 dark:hover:text-ink-100">
          {copied ? <Check size={15} className="text-mint-600" /> : <Copy size={15} />}
        </button>
      )}
      <button
        onClick={toggle}
        disabled={pending || (!student.passwordViewable && !shown)}
        aria-label={shown ? "Yashirish" : "Parolni ko'rsatish"}
        title={student.passwordViewable ? undefined : "Bu o'quvchining paroli saqlanmagan — yangi parol bering"}
        className="shrink-0 rounded-full p-1 text-ink-500 hover:text-ink-800 disabled:opacity-40 dark:hover:text-ink-100"
      >
        {shown ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
}

function StudentCard({ student, levels }: { student: TeacherStudent; levels: PlacementLevel[] }) {
  const [mode, setMode] = useState<Mode | null>(null);
  const startUnit = levels.flatMap((l) => l.units).find((u) => u.id === student.startUnitId);
  const pct = student.total ? Math.round((student.done / student.total) * 100) : 0;
  const actions: { mode: Mode; label: string; icon: typeof MapPin }[] = [
    { mode: "placement", label: "Joylashtirish", icon: MapPin },
    { mode: "password", label: "Parol", icon: KeyRound },
    { mode: "info", label: "Tahrirlash", icon: Pencil },
    { mode: "delete", label: "O'chirish", icon: Trash2 },
  ];

  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:ring-white/10">
      <div className="flex items-start gap-3">
        <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-azure-600 to-azure-900 text-sm font-bold text-white">
          {student.level}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-ink-950 dark:text-ink-50">{student.name}</p>
          <p className="truncate text-xs text-ink-500 dark:text-ink-400">
            {student.username ? `login: ${student.username}` : "login yo'q"}
            {student.email ? ` · ${student.email}` : ""}
            {student.googleLinked ? " · Google ✓" : ""}
          </p>
        </div>
      </div>

      <Credentials student={student} />

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-ink-50/70 px-3 py-2 dark:bg-white/5">
          <p className="text-ink-500 dark:text-ink-400">Boshlash joyi</p>
          <p className="font-semibold text-ink-900 dark:text-ink-100">
            {student.level}, {startUnit ? startUnit.title : "1-dars"}
          </p>
        </div>
        <div className="rounded-xl bg-ink-50/70 px-3 py-2 dark:bg-white/5">
          <p className="text-ink-500 dark:text-ink-400">Oxirgi faollik</p>
          <p className="font-semibold text-ink-900 dark:text-ink-100">{formatDay(student.lastActive)}</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-ink-500 dark:text-ink-400">
            {student.level}: {student.done}/{student.total} dars 80%+
            {student.currentUnit ? ` · hozir: ${student.currentUnit}` : ""}
          </span>
          <span className="font-bold text-ink-800 dark:text-ink-100">{student.average}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-mint-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {actions.map((a) => {
          const Icon = a.icon;
          const active = mode === a.mode;
          return (
            <button
              key={a.mode}
              onClick={() => setMode(active ? null : a.mode)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? a.mode === "delete"
                    ? "bg-rose-600 text-white"
                    : "bg-azure-600 text-white"
                  : a.mode === "delete"
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-300"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200 dark:bg-white/10 dark:text-ink-200"
              }`}
            >
              <Icon size={13} /> {a.label}
            </button>
          );
        })}
      </div>

      {mode && <StudentEditor key={mode} student={student} mode={mode} levels={levels} onDone={() => setMode(null)} />}
    </li>
  );
}

export function TeacherPanel({ students, levels }: { students: TeacherStudent[]; levels: PlacementLevel[] }) {
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.name, s.username ?? "", s.email ?? ""].some((v) => v.toLowerCase().includes(q))
    );
  }, [students, query]);

  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);
  const activeWeek = students.filter((s) => s.lastActive && s.lastActive >= weekAgo).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:ring-white/10">
          <p className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400"><Users size={14} /> O'quvchilar</p>
          <p className="font-display mt-1 text-2xl font-bold text-ink-950 dark:text-ink-50">{students.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink-950/5 dark:bg-[#161b26] dark:ring-white/10">
          <p className="text-xs text-ink-500 dark:text-ink-400">Shu hafta faol</p>
          <p className="font-display mt-1 text-2xl font-bold text-ink-950 dark:text-ink-50">{activeWeek}</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="btn-press col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-azure-600 to-azure-800 p-4 text-sm font-bold text-white shadow-sm sm:col-span-1"
        >
          <UserPlus size={18} /> Yangi o'quvchi
        </button>
      </div>

      {adding && <NewStudentForm levels={levels} onClose={() => setAdding(false)} />}

      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ism, login yoki email bo'yicha qidirish"
          className={`${inputClass} pl-9`}
        />
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {filtered.map((s) => (
            <StudentCard key={s.id} student={s} levels={levels} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-10 text-center text-sm text-ink-500 dark:bg-[#161b26] dark:text-ink-400">
          {students.length === 0 ? (
            <>
              <p>Hali o'quvchi yo'q.</p>
              <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 font-semibold text-azure-600">
                <Plus size={16} /> Birinchi o'quvchini qo'shing
              </button>
            </>
          ) : (
            <p>Hech kim topilmadi.</p>
          )}
        </div>
      )}
    </div>
  );
}
