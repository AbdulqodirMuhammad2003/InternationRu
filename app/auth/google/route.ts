import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { GOOGLE_STATE_COOKIE, googleAuthUrl, googleConfigured } from "@/lib/google-auth";

/** «Google orqali kirish» tugmasi — foydalanuvchini Google'ning kirish
 *  sahifasiga yuboradi. `state` qaytib kelganda so'rov shu brauzerdan
 *  boshlanganini tekshirish uchun cookie'da saqlanadi. */
export async function GET(request: NextRequest) {
  if (!googleConfigured()) redirect("/login?error=google_config");

  const state = randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/auth/google",
    maxAge: 10 * 60,
  });
  redirect(googleAuthUrl(request.nextUrl.origin, state));
}
