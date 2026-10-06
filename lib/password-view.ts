import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

/** O'qituvchi o'quvchi parolini qayta ko'ra olishi uchun parolning shifrlangan
 *  nusxasi (kirish baribir bcrypt xeshi bilan tekshiriladi). AES-256-GCM,
 *  kalit JWT_SECRET dan olinadi — u o'zgarsa, eski nusxalar o'qilmaydi va
 *  o'qituvchi yangi parol beradi. */
function key() {
  const secret = process.env.JWT_SECRET || "dev-secret-change-me-inter-nation";
  return createHash("sha256").update(`${secret}:password-view`).digest();
}

export function encryptPasswordView(password: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64")).join(".");
}

export function decryptPasswordView(value: string | null): string | null {
  if (!value) return null;
  try {
    const [iv, tag, data] = value.split(".").map((p) => Buffer.from(p, "base64"));
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}
