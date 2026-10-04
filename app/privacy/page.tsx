import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati | Avangard",
  description: "Avangard rus tili platformasi qanday ma'lumot to'playdi va undan qanday foydalanadi.",
};

/** Ochiq sahifa (kirish talab qilinmaydi) — Google OAuth ilovasi uchun
 *  talab qilinadigan maxfiylik siyosati. */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-ink-900 dark:bg-[#0d1017] dark:text-ink-100">
      <article className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm sm:p-10 dark:bg-white/5">
        <div className="mb-6 flex items-center gap-3">
          <LogoMark size={40} />
          <div>
            <p className="font-display text-lg font-bold leading-tight">Avangard</p>
            <p className="text-xs text-ink-500">Rus tili maktabi</p>
          </div>
        </div>

        <h1 className="font-display mb-2 text-2xl font-bold">Maxfiylik siyosati</h1>
        <p className="mb-6 text-sm text-ink-500">Oxirgi yangilanish: 2026-yil 4-oktabr</p>

        <div className="space-y-5 text-sm leading-relaxed">
          <section>
            <h2 className="mb-1 font-semibold">Qanday ma&apos;lumot to&apos;playmiz</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Google orqali kirganingizda: ismingiz, elektron pochta manzilingiz va profil rasmingiz
                (faqat shular — Google hisobingizdagi boshqa ma&apos;lumotlarga kirmaymiz).
              </li>
              <li>
                O&apos;qish natijalaringiz: darajangiz, o&apos;rgangan so&apos;zlaringiz, mashq va imtihon natijalari.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-1 font-semibold">Nima uchun foydalanamiz</h2>
            <p>
              Faqat sizga shaxsiy kabinet ochish, darajangiz va o&apos;qish progressingizni saqlash hamda
              sertifikat berish uchun. Ma&apos;lumotlaringizni sotmaymiz, reklama uchun ishlatmaymiz va
              uchinchi shaxslarga bermaymiz.
            </p>
          </section>

          <section>
            <h2 className="mb-1 font-semibold">Qayerda saqlanadi</h2>
            <p>
              Ma&apos;lumotlar himoyalangan ma&apos;lumotlar bazasida (Supabase) saqlanadi, sayt esa Vercel
              serverlarida ishlaydi. Ulanish HTTPS orqali shifrlanadi.
            </p>
          </section>

          <section>
            <h2 className="mb-1 font-semibold">Ma&apos;lumotlarni o&apos;chirish</h2>
            <p>
              Hisobingiz va unga bog&apos;liq barcha ma&apos;lumotlarni o&apos;chirishni so&apos;rash uchun{" "}
              <a className="text-azure-600 underline" href="mailto:abdulqodirmuhammad03@gmail.com">
                abdulqodirmuhammad03@gmail.com
              </a>{" "}
              manziliga yozing.
            </p>
          </section>
        </div>

        <Link href="/login" className="mt-8 inline-block text-sm font-semibold text-azure-600 hover:underline">
          ← Kirish sahifasiga qaytish
        </Link>
      </article>
    </div>
  );
}
