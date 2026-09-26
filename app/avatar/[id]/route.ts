import { sql } from "@/lib/db";
import { getSession } from "@/lib/auth";

/** Profil rasmi. Rasm bazada data-URL sifatida saqlanadi; uni sahifaga
 *  to'g'ridan-to'g'ri qo'yish har sahifani megabaytlab og'irlashtiradi
 *  (Vercel javob chegarasi 4,5 MB), shuning uchun sahifalar bu manzilga
 *  havola beradi, brauzer esa rasmni bir marta yuklab keshlaydi. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getSession())) return new Response(null, { status: 401 });
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) return new Response(null, { status: 404 });

  const [row] = await sql<{ avatar_url: string | null }[]>`SELECT avatar_url FROM users WHERE id = ${userId}`;
  const match = row?.avatar_url?.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return new Response(null, { status: 404 });

  return new Response(Buffer.from(match[2], "base64"), {
    headers: {
      "Content-Type": match[1],
      // Havolada ?v=… bor — rasm o'zgarsa, havola ham o'zgaradi.
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
