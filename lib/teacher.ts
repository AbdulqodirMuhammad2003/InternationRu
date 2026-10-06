import "server-only";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { UNLOCK_THRESHOLD } from "@/lib/data";

/** Faqat o'qituvchi (users.role = 'teacher') uchun; boshqalarga 404. */
export async function requireTeacher(): Promise<number> {
  const session = await getSession();
  if (!session) notFound();
  const [me] = await sql<{ role: string }[]>`SELECT role FROM users WHERE id = ${session.userId}`;
  if (me?.role !== "teacher") notFound();
  return session.userId;
}

export interface PlacementLevel {
  code: string;
  title: string;
  units: { id: number; title: string; subtitle: string; order_index: number }[];
}

export interface TeacherStudent {
  id: number;
  name: string;
  username: string | null;
  email: string | null;
  hasPassword: boolean;
  /** Parolning o'qituvchi ko'ra oladigan nusxasi saqlanganmi. */
  passwordViewable: boolean;
  googleLinked: boolean;
  level: string;
  startUnitId: number | null;
  createdAt: string;
  lastActive: string | null;
  /** Joriy darajadagi darslar: nechtasi 80 %+ va o'rtacha foiz. */
  done: number;
  total: number;
  average: number;
  /** Joriy darajada eng oxirgi boshlangan dars nomi. */
  currentUnit: string | null;
}

/** Joylashtirish uchun: darajalar va ularning mazmuni bor darslari. */
export async function getPlacementLevels(): Promise<PlacementLevel[]> {
  const rows = await sql<{ level: string; level_title: string; id: number; title: string; subtitle: string; order_index: number }[]>`
    SELECT l.code AS level, l.title AS level_title, u.id, u.title, u.subtitle, u.order_index
    FROM units u JOIN levels l ON l.id = u.level_id
    WHERE EXISTS (SELECT 1 FROM exercises e WHERE e.unit_id = u.id)
       OR EXISTS (SELECT 1 FROM vocabulary_rounds r WHERE r.unit_id = u.id)
    ORDER BY l.order_index, u.order_index
  `;
  const levels: PlacementLevel[] = [];
  for (const r of rows) {
    let level = levels.find((l) => l.code === r.level);
    if (!level) levels.push((level = { code: r.level, title: r.level_title, units: [] }));
    level.units.push({ id: r.id, title: r.title, subtitle: r.subtitle, order_index: r.order_index });
  }
  return levels;
}

/** O'qituvchi panelidagi o'quvchilar ro'yxati — har biri joriy darajasidagi
 *  natijasi bilan (dars foizi «Darslar» sahifasidagi kabi: lug'at va mashqlar
 *  foizining o'rtachasi). */
export async function getTeacherStudents(): Promise<TeacherStudent[]> {
  const [users, units, learned, exercised, activity] = await Promise.all([
    sql<{
      id: number; name: string; username: string | null; email: string | null; has_password: boolean;
      google_linked: boolean; password_viewable: boolean; level: string; start_unit_id: number | null; created_at: Date;
    }[]>`
      SELECT id, name, username, email, password_hash IS NOT NULL AS has_password,
             password_view IS NOT NULL AS password_viewable,
             google_sub IS NOT NULL AS google_linked, level, start_unit_id, created_at
      FROM users WHERE role = 'student' ORDER BY created_at DESC
    `,
    sql<{ id: number; level: string; title: string; words: number; exercises: number }[]>`
      SELECT u.id, l.code AS level, u.title,
             (SELECT count(*)::int FROM vocabulary_words w JOIN vocabulary_rounds r ON r.id = w.round_id WHERE r.unit_id = u.id) AS words,
             (SELECT count(*)::int FROM exercises e WHERE e.unit_id = u.id) AS exercises
      FROM units u JOIN levels l ON l.id = u.level_id
      ORDER BY l.order_index, u.order_index
    `,
    sql<{ user_id: number; unit_id: number; n: number }[]>`
      SELECT p.user_id, r.unit_id, count(*)::int AS n
      FROM user_word_progress p
      JOIN vocabulary_words w ON w.id = p.word_id
      JOIN vocabulary_rounds r ON r.id = w.round_id
      JOIN users us ON us.id = p.user_id AND us.role = 'student'
      WHERE p.learned = 1
      GROUP BY p.user_id, r.unit_id
    `,
    sql<{ user_id: number; unit_id: number; total: number }[]>`
      SELECT p.user_id, e.unit_id, sum(p.score_pct)::int AS total
      FROM user_exercise_progress p
      JOIN exercises e ON e.id = p.exercise_id
      JOIN users us ON us.id = p.user_id AND us.role = 'student'
      GROUP BY p.user_id, e.unit_id
    `,
    sql<{ user_id: number; last_day: string }[]>`
      SELECT user_id, to_char(max(day), 'YYYY-MM-DD') AS last_day FROM user_daily_activity GROUP BY user_id
    `,
  ]);
  const learnedMap = new Map(learned.map((r) => [`${r.user_id}:${r.unit_id}`, r.n]));
  const exMap = new Map(exercised.map((r) => [`${r.user_id}:${r.unit_id}`, r.total]));
  const lastActive = new Map(activity.map((r) => [r.user_id, r.last_day]));

  return users.map((u) => {
    const levelUnits = units.filter((x) => x.level === u.level && (x.words > 0 || x.exercises > 0));
    let done = 0;
    let sum = 0;
    let currentUnit: string | null = null;
    for (const unit of levelUnits) {
      const key = `${u.id}:${unit.id}`;
      const words = learnedMap.get(key);
      const ex = exMap.get(key);
      if (words === undefined && ex === undefined) continue;
      const parts: number[] = [];
      if (unit.words > 0) parts.push(((words ?? 0) / unit.words) * 100);
      if (unit.exercises > 0) parts.push((ex ?? 0) / unit.exercises);
      const pct = parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0;
      sum += pct;
      if (pct >= UNLOCK_THRESHOLD) done++;
      currentUnit = unit.title;
    }
    return {
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      hasPassword: u.has_password,
      passwordViewable: u.password_viewable,
      googleLinked: u.google_linked,
      level: u.level,
      startUnitId: u.start_unit_id,
      createdAt: u.created_at.toISOString().slice(0, 10),
      lastActive: lastActive.get(u.id) ?? null,
      done,
      total: levelUnits.length,
      average: levelUnits.length ? Math.round(sum / levelUnits.length) : 0,
      currentUnit,
    };
  });
}
