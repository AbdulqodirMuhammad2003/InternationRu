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

  return postgres(connectionString ?? "", {
    // Supabase'ning "Transaction" pooler (pgbouncer, 6543-port) bilan ishlatilsa,
    // prepared statement'lar qo'llab-quvvatlanmaydi — shu sababli o'chirib qo'yilgan.
    // To'g'ridan-to'g'ri ulanish (5432-port) yoki "Session" pooler bilan ham xavfsiz.
    prepare: false,
    ssl: "require",
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
