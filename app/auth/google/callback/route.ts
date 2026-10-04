import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import {
  GOOGLE_STATE_COOKIE,
  fetchGoogleProfile,
  findOrCreateGoogleUser,
  googleConfigured,
  setSessionCookie,
} from "@/lib/google-auth";

/** Google kirishdan keyin shu yerga qaytaradi: `state` tekshiriladi,
 *  `code` profilga almashtiriladi, o'quvchi topiladi yoki yaratiladi va
 *  sessiya cookie'si o'rnatiladi. */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(GOOGLE_STATE_COOKIE)?.value;
  cookieStore.delete({ name: GOOGLE_STATE_COOKIE, path: "/auth/google" });

  const code = params.get("code");
  if (!googleConfigured() || !code || !expectedState || params.get("state") !== expectedState) {
    redirect(params.get("error") === "access_denied" ? "/login" : "/login?error=google");
  }

  // redirect() xato tashlab ishlaydi — shu sababli u try ichida chaqirilmaydi.
  let profile: Awaited<ReturnType<typeof fetchGoogleProfile>>;
  try {
    profile = await fetchGoogleProfile(code, request.nextUrl.origin);
  } catch (err) {
    console.error("[google-auth]", err);
    redirect("/login?error=google");
  }
  if (!profile.email || !profile.email_verified) redirect("/login?error=google_email");

  const user = await findOrCreateGoogleUser(profile);

  await setSessionCookie(user);
  redirect("/lessons");
}
