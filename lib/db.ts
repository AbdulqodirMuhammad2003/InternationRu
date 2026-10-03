import postgres from "postgres";

// Supabase (PostgreSQL) bilan yagona ulanish — butun server umri davomida
// bitta connection pool ishlatiladi (Next.js dev rejimidagi Fast Refresh
// paytida qayta-qayta ulanish ochib yubormaslik uchun global o'zgaruvchida
// saqlanadi, xuddi avvalgi SQLite versiyasidagi kabi).
//
// Diqqat: `postgres(...)` chaqiruvi o'zi hech qanday tarmoq ulanishini
// darhol ochmaydi — ulanish faqat birinchi haqiqiy so'rov bajarilganda
// "erinchoq" (lazy) tarzda o'rnatiladi. Shu sababli bu faylni modul
// darajasida import qilish (masalan, `next build` paytida) DATABASE_URL
// hali sozlanmagan bo'lsa ham xatoga olib kelmaydi — xato faqat haqiqatda
// so'rov yuborilganda (ya'ni sahifa so'rovi vaqtida) chiqadi.

declare global {
  // eslint-disable-next-line no-var
  var __avangardSql: ReturnType<typeof postgres> | undefined;
}

/**
 * Supabase transaction pooler (*.pooler.supabase.com:6543) katta javobli
 * so'rovlarda (masalan, «Darslar» sahifasidagi ~2400 so'zli lug'at) ulanishni
 * qotirib qo'yadi: baza javobni yuborib bo'ladi, lekin u ilovaga yetib
 * kelmaydi va server nusxasining keyingi so'rovlari cheksiz kutib qoladi
 * (2026-10-03 da sahifa ochilmay qolgan). Xuddi shu xostdagi session pooler
 * (5432-port) bunday qilmaydi — shu sababli 6543 avtomatik 5432 ga
 * almashtiriladi. Boshqa ulanish satrlari (to'g'ridan-to'g'ri, lokal)
 * o'zgarmaydi.
 */
function toSessionPooler(url: string) {
  return url.replace(/(\.pooler\.supabase\.com):6543\b/, "$1:5432");
}

function createConnection() {
  if (!process.env.DATABASE_URL) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { loadEnvConfig } = require("@next/env");
      loadEnvConfig(process.cwd());
    } catch {
      // ignore
    }
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(
      "[avangard] DATABASE_URL topilmadi. .env.local fayliga Supabase Postgres " +
        "ulanish satrini qo'shing (Supabase dashboard → Project Settings → Database → " +
        "Connection string). Baza so'rovlari xato beradi."
    );
  }

  return postgres(toSessionPooler(connectionString ?? ""), {
    // Supabase'ning "Transaction" pooler (pgbouncer, 6543-port) bilan ishlatilsa,
    // prepared statement'lar qo'llab-quvvatlanmaydi — shu sababli o'chirib qo'yilgan.
    // To'g'ridan-to'g'ri ulanish (5432-port) yoki "Session" pooler bilan ham xavfsiz.
    prepare: false,
    ssl: "require",
    // Session pooler'da har bir ochiq ulanish serverdagi bitta ulanishni band
    // qiladi: bitta server nusxasi ko'pi bilan 5 tasini ochadi (qolgan
    // so'rovlar navbatda kutadi) va bo'sh ulanishlarni 20 soniyada yopadi —
    // Vercel'ning bir nechta nusxasi pooler limitini to'ldirib qo'ymasligi uchun.
    max: 5,
    idle_timeout: 20,
  });
}

export function getDb() {
  if (!global.__avangardSql) {
    global.__avangardSql = createConnection();
  }
  return global.__avangardSql;
}

// Loyihaning qolgan qismi shu nomdan foydalanadi: `import { sql } from "@/lib/db"`
// va so'rovlarni `sql\`SELECT ... WHERE id = ${id}\`` shaklida yozadi.
export const sql = getDb();
