/**
 * Darslik audiolarini Supabase Storage'ga yuklaydi (ochiq «book-audio» papkasi).
 *
 *   npm run book:upload-audio -- <papka>
 *
 * <papka> ichidagi barcha .mp3 fayllar shu nisbiy yo'l bilan yuklanadi
 * (masalan <papka>/A1/lesson1/1.1.1.mp3 → book-audio/A1/lesson1/1.1.1.mp3).
 * Allaqachon yuklanganlari (hajmi bir xil bo'lsa) o'tkazib yuboriladi.
 *
 * .env.local'da kerak: SUPABASE_SERVICE_ROLE_KEY — yangi «secret» kalit
 * (sb_secret_…) yoki eski «service_role» kaliti (Supabase → Project Settings
 * → API Keys). SUPABASE_URL ixtiyoriy: bo'lmasa DATABASE_URL'dan aniqlanadi.
 * Kalit faqat shu skriptda, sayt ishlashi uchun kerak emas — audio ochiq
 * havola orqali o'ynatiladi.
 */
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { toStorageKey } from "../lib/seed-book/storage-key";

const BUCKET = "book-audio";
const root = process.argv[2];
const projectRef = process.env.DATABASE_URL?.match(/postgres\.([a-z0-9]+)[:@]/)?.[1];
const url = (process.env.SUPABASE_URL ?? (projectRef ? `https://${projectRef}.supabase.co` : undefined))?.replace(/\/$/, "");
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.toLowerCase().endsWith(".mp3") ? [p] : [];
  });
}

/** Tarmoq uzilsa (ECONNRESET va h.k.) yoki server 5xx qaytarsa — 5 martagacha qayta urinadi. */
async function retry(make: () => Promise<Response>): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await make();
      if (res.status < 500 || attempt >= 5) return res;
    } catch (e) {
      if (attempt >= 5) throw e;
    }
    await new Promise((r) => setTimeout(r, attempt * 2000));
  }
}

function api(path: string, init: RequestInit = {}) {
  return retry(() => rawApi(path, init));
}

async function rawApi(path: string, init: RequestInit = {}) {
  return fetch(`${url}/storage/v1/${path}`, {
    ...init,
    // Yangi «sb_secret_…» kalit faqat apikey sarlavhasida yuboriladi; eski
    // service_role (JWT) — Authorization'da ham.
    headers: {
      apikey: key!,
      ...(key!.startsWith("sb_") ? {} : { Authorization: `Bearer ${key}` }),
      ...(init.headers ?? {}),
    },
  });
}

async function main() {
  if (!root) throw new Error("Audio papkasini bering: npm run book:upload-audio -- C:\\...\\lidenz-audio");
  if (!url || !key) throw new Error(".env.local'da SUPABASE_SERVICE_ROLE_KEY bo'lishi kerak (Supabase → Project Settings → API Keys).");

  // Ochiq papka (bo'lmasa — yaratiladi).
  const bucket = await api(`bucket/${BUCKET}`);
  if (bucket.status !== 200) {
    const created = await api("bucket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, allowed_mime_types: ["audio/mpeg"] }),
    });
    if (!created.ok) throw new Error(`Papka yaratilmadi: ${created.status} ${await created.text()}`);
    console.log(`«${BUCKET}» papkasi yaratildi.`);
  }

  const files = walk(root);
  let uploaded = 0;
  let skipped = 0;
  for (const file of files) {
    const path = toStorageKey(relative(root, file).split(sep).join("/"));
    const encoded = path;
    const size = statSync(file).size;
    const head = await retry(() => fetch(`${url}/storage/v1/object/public/${BUCKET}/${encoded}`, { method: "HEAD" }));
    if (head.ok && Number(head.headers.get("content-length")) === size) {
      skipped++;
      continue;
    }
    const res = await api(`object/${BUCKET}/${encoded}`, {
      method: "POST",
      headers: { "Content-Type": "audio/mpeg", "x-upsert": "true", "Cache-Control": "max-age=31536000" },
      body: readFileSync(file),
    });
    if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
    uploaded++;
    console.log(`↑ ${path} (${Math.round(size / 1024)} KB)`);
  }
  console.log(`\nTayyor: ${uploaded} ta yuklandi, ${skipped} tasi avval yuklangan edi (jami ${files.length}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
