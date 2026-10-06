"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { requireTeacher } from "@/lib/teacher";

export interface TeacherActionResult {
  ok: boolean;
  error?: string;
}

const USERNAME_RE = /^[a-z0-9._-]{3,32}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: FormDataEntryValue | null) {
  return String(v ?? "").trim();
}

/** Daraja va boshlanadigan dars mosligini tekshiradi (dars shu darajaniki bo'lsin). */
async function checkPlacement(level: string, startUnitId: number | null): Promise<string | null> {
  const [lv] = await sql<{ id: number }[]>`SELECT id FROM levels WHERE code = ${level}`;
  if (!lv) return "Daraja noto'g'ri tanlangan.";
  if (startUnitId !== null) {
    const [u] = await sql<{ id: number }[]>`SELECT id FROM units WHERE id = ${startUnitId} AND level_id = ${lv.id}`;
    if (!u) return "Dars tanlangan darajaga tegishli emas.";
  }
  return null;
}

function parseUnit(v: FormDataEntryValue | null) {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** Yangi o'quvchi: ism, login, parol, ixtiyoriy email (Google bilan kirish
 *  uchun), daraja va boshlanadigan dars. */
export async function createStudentAction(formData: FormData): Promise<TeacherActionResult> {
  await requireTeacher();
  const name = clean(formData.get("name"));
  const username = clean(formData.get("username")).toLowerCase();
  const password = String(formData.get("password") ?? "");
  const email = clean(formData.get("email")).toLowerCase() || null;
  const level = clean(formData.get("level"));
  const startUnitId = parseUnit(formData.get("startUnitId"));

  if (name.length < 2) return { ok: false, error: "Ismni kiriting." };
  if (!USERNAME_RE.test(username))
    return { ok: false, error: "Login 3–32 belgi: lotin harflari, raqamlar, nuqta, chiziqcha." };
  if (password.length < 6) return { ok: false, error: "Parol kamida 6 belgidan iborat bo'lsin." };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "Email noto'g'ri." };
  const placementError = await checkPlacement(level, startUnitId);
  if (placementError) return { ok: false, error: placementError };

  const [taken] = await sql<{ id: number }[]>`
    SELECT id FROM users WHERE lower(username) = ${username} OR lower(email) = ${username}
       OR (${email}::text IS NOT NULL AND (lower(email) = ${email} OR lower(username) = ${email}))
  `;
  if (taken) return { ok: false, error: "Bu login yoki email band." };

  await sql`
    INSERT INTO users (name, username, email, password_hash, level, start_unit_id, role)
    VALUES (${name}, ${username}, ${email}, ${await hashPassword(password)}, ${level}, ${startUnitId}, 'student')
  `;
  revalidatePath("/teacher");
  return { ok: true };
}

/** O'quvchini suhbatdan keyin joylashtirish: daraja va boshlanadigan dars. */
export async function updatePlacementAction(formData: FormData): Promise<TeacherActionResult> {
  await requireTeacher();
  const id = Number(formData.get("id"));
  const level = clean(formData.get("level"));
  const startUnitId = parseUnit(formData.get("startUnitId"));
  const placementError = await checkPlacement(level, startUnitId);
  if (placementError) return { ok: false, error: placementError };
  await sql`UPDATE users SET level = ${level}, start_unit_id = ${startUnitId} WHERE id = ${id} AND role = 'student'`;
  revalidatePath("/teacher");
  return { ok: true };
}

/** Ism va emailni o'zgartirish. */
export async function updateStudentInfoAction(formData: FormData): Promise<TeacherActionResult> {
  await requireTeacher();
  const id = Number(formData.get("id"));
  const name = clean(formData.get("name"));
  const email = clean(formData.get("email")).toLowerCase() || null;
  if (name.length < 2) return { ok: false, error: "Ismni kiriting." };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "Email noto'g'ri." };
  if (email) {
    const [taken] = await sql<{ id: number }[]>`
      SELECT id FROM users WHERE (lower(email) = ${email} OR lower(username) = ${email}) AND id <> ${id}
    `;
    if (taken) return { ok: false, error: "Bu email boshqa hisobda bor." };
  }
  // Email o'zgarsa, eski Google bog'lanishi bekor qilinadi.
  await sql`
    UPDATE users SET name = ${name},
      google_sub = CASE WHEN email IS DISTINCT FROM ${email} THEN NULL ELSE google_sub END,
      email = ${email}
    WHERE id = ${id} AND role = 'student'
  `;
  revalidatePath("/teacher");
  return { ok: true };
}

/** Yangi parol berish. */
export async function resetPasswordAction(formData: FormData): Promise<TeacherActionResult> {
  await requireTeacher();
  const id = Number(formData.get("id"));
  const password = String(formData.get("password") ?? "");
  if (password.length < 6) return { ok: false, error: "Parol kamida 6 belgidan iborat bo'lsin." };
  await sql`UPDATE users SET password_hash = ${await hashPassword(password)} WHERE id = ${id} AND role = 'student'`;
  return { ok: true };
}

/** O'quvchini va uning barcha natijalarini o'chirish. */
export async function deleteStudentAction(formData: FormData): Promise<TeacherActionResult> {
  await requireTeacher();
  const id = Number(formData.get("id"));
  await sql`DELETE FROM users WHERE id = ${id} AND role = 'student'`;
  revalidatePath("/teacher");
  return { ok: true };
}
