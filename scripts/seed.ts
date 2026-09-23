/**
 * Baza ma'lumotlarini namunaviy kontent bilan qo'lda to'ldirish skripti.
 * Ishga tushirish: npm run db:seed
 *
 * Supabase (Postgres) bazasiga ulanadi (.env.local ichidagi DATABASE_URL
 * orqali) va mavjud ma'lumotlarni o'chirib, demo kontent bilan qaytadan
 * to'ldiradi. Haqiqiy seed mantiqi lib/seed-data.ts ichida.
 */
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { resetDatabase, seedDatabase } from "../lib/seed-data";
import { getDb } from "../lib/db";

async function main() {
  await resetDatabase();
  await seedDatabase();

  console.log("Baza demo ma'lumotlar bilan muvaffaqiyatli to'ldirildi.");
  console.log("Demo login: demo@avangard.uz / demo1234");

  // postgres.js ulanishini yopamiz, aks holda skript osilib qoladi.
  await getDb().end();
}

main().catch((err) => {
  console.error("Seed jarayonida xatolik:", err);
  process.exit(1);
});
