import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserStats } from "@/lib/data";
import { LoginForm } from "./login-form";
import { LogoMark } from "@/components/Logo";

const GOOGLE_ERRORS: Record<string, string> = {
  google: "Google orqali kirib bo'lmadi. Qaytadan urinib ko'ring.",
  google_email: "Google hisobingizning emaili tasdiqlanmagan.",
  google_config: "Google orqali kirish hali sozlanmagan.",
  google_unknown:
    "Bu Google hisobi ro'yxatda yo'q. Login va parolni o'qituvchingizdan oling (yoki o'qituvchi emailingizni qo'shsin).",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const googleError = error ? GOOGLE_ERRORS[error] : undefined;
  const session = await getSession();
  // Cookie mavjudligi hali foydalanuvchi bazada borligini bildirmaydi —
  // masalan, `npm run db:seed` qayta ishga tushirilsa, eski cookie'dagi
  // ID endi bazada mavjud bo'lmasligi mumkin. Shu holatda "/lessons"ga
  // yubormaymiz (aks holda u yerdan yana "/login"ga qaytarib, cheksiz
  // aylanish - ERR_TOO_MANY_REDIRECTS - yuzaga keladi), balki login
  // formasini ko'rsatamiz.
  if (session) {
    const user = await getUserStats(session.userId);
    if (user) redirect("/lessons");
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0f1a] px-4 py-10">
      {/* Premium fon bezaklari */}
      <div className="pointer-events-none absolute -left-24 top-[-10%] h-80 w-80 animate-float-slow rounded-full bg-azure-500/25 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-20 bottom-[-10%] h-96 w-96 animate-float-slow rounded-full bg-purple-500/20 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:22px_22px]" />

      <div className="relative w-full max-w-md animate-fade-up rounded-3xl bg-white p-6 text-ink-950 shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:p-8">
        <div className="mb-8 flex items-center gap-3">
          <LogoMark size={46} className="shrink-0 drop-shadow-[0_2px_8px_rgba(30,27,75,0.35)]" />
          <div>
            <p className="font-display text-lg font-bold leading-tight">Avangard</p>
            <p className="text-xs text-ink-600">Rus tili maktabi</p>
          </div>
        </div>

        <h1 className="font-display mb-1.5 text-[1.375rem] font-bold leading-tight text-ink-950 sm:text-2xl">Shaxsiy kabinetga kirish</h1>
        <p className="mb-6 text-sm text-ink-600">
          Rus tilini o'rganishda to'xtagan joyingizdan davom eting.
        </p>

        <a
          href="/auth/google"
          className="btn-press flex w-full items-center justify-center gap-3 min-h-12 rounded-xl border border-ink-200 bg-white py-2.5 text-[15px] font-semibold text-ink-900 shadow-sm transition-colors hover:border-ink-300 hover:bg-ink-50"
        >
          <GoogleIcon />
          Google orqali kirish
        </a>
        {googleError && (
          <p role="alert" className="mt-3 animate-fade-up rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-rose-200">{googleError}</p>
        )}

        <div className="my-5 flex items-center gap-3 text-xs text-ink-500">
          <span className="h-px flex-1 bg-ink-200" />
          yoki email bilan
          <span className="h-px flex-1 bg-ink-200" />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
