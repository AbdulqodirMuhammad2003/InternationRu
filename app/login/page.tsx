import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserStats } from "@/lib/data";
import { LoginForm } from "./login-form";
import { LogoMark } from "@/components/Logo";

export default async function LoginPage() {
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1b1e10] via-[#20230f] to-[#2b2013] px-4">
      {/* Premium fon bezaklari */}
      <div className="pointer-events-none absolute -left-24 top-[-10%] h-80 w-80 animate-float-slow rounded-full bg-gold-500/15 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-20 bottom-[-10%] h-96 w-96 animate-float-slow rounded-full bg-olive-400/15 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,162,73,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-md animate-fade-up rounded-3xl bg-white/95 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <div className="mb-8 flex items-center gap-3">
          <LogoMark size={46} className="shrink-0 drop-shadow-[0_2px_8px_rgba(30,32,18,0.35)]" />
          <div>
            <p className="font-display text-lg font-bold leading-tight">Avangard</p>
            <p className="text-xs text-olive-700/60">Rus tili maktabi</p>
          </div>
        </div>

        <h1 className="font-display mb-1 text-2xl font-bold text-olive-950">Shaxsiy kabinetga kirish</h1>
        <p className="mb-6 text-sm text-olive-700/60">
          Rus tilini o'rganishda to'xtagan joyingizdan davom eting.
        </p>

        <LoginForm />

        <div className="mt-6 rounded-xl bg-olive-50 p-3 text-xs text-olive-700/70">
          Demo kirish: <b className="text-olive-900">demo@avangard.uz</b> / <b className="text-olive-900">demo1234</b>
        </div>
      </div>
    </div>
  );
}
