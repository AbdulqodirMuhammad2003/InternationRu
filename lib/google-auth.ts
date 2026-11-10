import "server-only";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { AUTH_COOKIE, createSessionToken } from "@/lib/auth";

/**
 * Google orqali kirish (OAuth 2.0 / OpenID Connect, "authorization code"
 * oqimi). Kerakli muhit o'zgaruvchilari: GOOGLE_CLIENT_ID va
 * GOOGLE_CLIENT_SECRET (Google Cloud Console → APIs & Services →
 * Credentials → OAuth client ID, turi "Web application"). Ruxsat etilgan
 * redirect URI: <sayt manzili>/auth/google/callback.
 */

export const GOOGLE_STATE_COOKIE = "avangard_google_state";

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleRedirectUri(origin: string) {
  return `${process.env.APP_URL?.replace(/\/$/, "") || origin}/auth/google/callback`;
}

export function googleAuthUrl(origin: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: googleRedirectUri(origin),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export interface GoogleProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
}

/** Google qaytargan `code`ni tokenga almashtiradi va foydalanuvchi
 *  ma'lumotlarini oladi (to'g'ridan-to'g'ri Google serverlaridan, HTTPS
 *  orqali — shu sababli id_token imzosini alohida tekshirish shart emas). */
export async function fetchGoogleProfile(code: string, origin: string): Promise<GoogleProfile> {
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: googleRedirectUri(origin),
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) throw new Error(`Google token: ${tokenRes.status}`);
  const { access_token } = (await tokenRes.json()) as { access_token: string };

  const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${access_token}` },
  });
  if (!infoRes.ok) throw new Error(`Google userinfo: ${infoRes.status}`);
  return (await infoRes.json()) as GoogleProfile;
}

/** Google hisobiga mos foydalanuvchini topadi (GOOGLE_OPEN_SIGNUP o'chiq
 *  bo'lsa yangi hisob yaratmaydi — hisoblarni faqat o'qituvchi ochadi):
 *  1) avval shu Google hisobi bilan kirgan bo'lsa — o'sha hisob;
 *  2) o'qituvchi shu emailni o'quvchiga yozib qo'ygan bo'lsa — unga
 *     bog'lanadi, darajasi va progressi saqlanib qoladi;
 *  3) GOOGLE_OPEN_SIGNUP yoqilgan bo'lsa — yangi o'quvchi (A1), aks holda
 *     null — kirish rad etiladi. */
export async function findGoogleUser(profile: GoogleProfile) {
  const email = profile.email.trim().toLowerCase();

  const [bySub] = await sql<{ id: number; name: string; email: string }[]>`
    SELECT id, name, email FROM users WHERE google_sub = ${profile.sub}
  `;
  if (bySub) return bySub;

  const [byEmail] = await sql<{ id: number; name: string; email: string }[]>`
    UPDATE users SET google_sub = ${profile.sub},
                     avatar_url = COALESCE(avatar_url, ${profile.picture ?? null})
    WHERE lower(email) = ${email} AND google_sub IS NULL
    RETURNING id, name, email
  `;
  if (byEmail) return byEmail;
  if (!GOOGLE_OPEN_SIGNUP || !profile.email_verified) return null;

  // Vaqtincha ochiq ro'yxatdan o'tish: yangi o'quvchi A1 dan boshlaydi.
  const name = profile.name?.trim() || email.split("@")[0];
  const [created] = await sql<{ id: number; name: string; email: string }[]>`
    INSERT INTO users (name, email, password_hash, google_sub, avatar_url, role, level)
    VALUES (${name}, ${email}, NULL, ${profile.sub}, ${profile.picture ?? null}, 'student', 'A1')
    RETURNING id, name, email
  `;
  return created;
}

/** Vaqtincha (o'qituvchi so'rovi bilan, 2026-11): login-parol berilmagan
 *  o'quvchi ham Google orqali kirib, yangi hisob ochishi mumkin. Yana faqat
 *  o'qituvchi qo'shgan o'quvchilarga ruxsat berish uchun — `false`. */
export const GOOGLE_OPEN_SIGNUP = true;

export async function setSessionCookie(user: { id: number; name: string; email: string | null }) {
  const token = createSessionToken({ userId: user.id, email: user.email ?? "", name: user.name });
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
