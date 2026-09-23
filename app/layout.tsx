import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avangard | Rus tili kursi",
  description: "O'zbek o'quvchilari uchun rus tilini o'rgatuvchi platforma — darslar, mashqlar, baholar va reyting.",
};

const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem('avangard-theme');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`h-full antialiased ${lora.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* next/script'ning "beforeInteractive" strategiyasi o'rniga oddiy
            inline <script> ishlatilmoqda — u HTML parse qilinayotganda,
            React hidratsiyadan OLDIN sinxron ishlaydi, shu bilan sahifa
            "yaltirashi" (avval yorug', keyin qorong'u tema) oldini oladi.
            (next/script komponenti bu loyihadagi Next.js versiyasida
            React'ning "script tegi bevosita render qilinmaydi" ogohlantirishini
            keltirib chiqargani uchun undan voz kechildi.) */}
        <script
          id="avangard-theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
