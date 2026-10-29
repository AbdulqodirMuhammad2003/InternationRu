import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";

// Ikkalasi ham kirill va lotin harflarini to'liq qo'llaydi. Onest — rus
// tili uchun yaratilgan matn shrifti: kirillda ravon, ko'zni charchatmaydi.
// Unbounded — sarlavhalar uchun zamonaviy, ifodali (reklamalar bilan bir xil).
const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avangard | Rus tili kursi",
  description: "O'zbek o'quvchilari uchun rus tilini o'rgatuvchi platforma — darslar, mashqlar, baholar va reyting.",
  applicationName: "Avangard",
  // iPhone: «Bosh ekranga qo'shish» dan keyin ilova kabi ochiladi.
  appleWebApp: { capable: true, title: "Avangard", statusBarStyle: "black" },
  icons: { apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  viewportFit: "cover",
};

const THEME_INIT_SCRIPT = `
  try {
    var stored = localStorage.getItem('avangard-theme');
    // «Premium tungi» — asosiy rejim; kunduzgi rejim faqat o'quvchi tanlasa.
    var isDark = stored ? stored === 'dark' : true;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`h-full antialiased ${onest.variable} ${unbounded.variable}`} suppressHydrationWarning>
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
