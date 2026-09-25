import type { Certificate } from "./exam";

/** Sertifikatdagi daraja nomlari (o'zbekcha va ruscha rasmiy — ТРКИ shkalasi). */
const LEVEL_NAMES: Record<string, { uz: string; ru: string }> = {
  A1: { uz: "Elementar daraja", ru: "Элементарный уровень" },
  A2: { uz: "Asosiy daraja", ru: "Базовый уровень" },
  B1: { uz: "O'rta daraja", ru: "Первый сертификационный уровень" },
  B2: { uz: "Yuqori o'rta daraja", ru: "Второй сертификационный уровень" },
};

const W = 2339; // A4 landshaft, ~200 dpi
const H = 1654;

function centered(ctx: CanvasRenderingContext2D, text: string, y: number, font: string, color: string) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, W / 2, y);
}

/** Sertifikatni brauzerda chizadi (sahifadagi shriftlar bilan — ism
 *  kirill yoki lotin bo'lishidan qat'iy nazar to'g'ri chiqadi) va PDF
 *  qilib yuklab beradi. */
export async function downloadCertificate(cert: Certificate, studentName: string) {
  await document.fonts.ready;
  const family = getComputedStyle(document.body).fontFamily || "sans-serif";
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Fon va ikki qavatli oltin hoshiya
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#c9a227";
  ctx.lineWidth = 14;
  ctx.strokeRect(60, 60, W - 120, H - 120);
  ctx.lineWidth = 4;
  ctx.strokeRect(96, 96, W - 192, H - 192);

  // Burchak bezaklari
  ctx.fillStyle = "#1e3a8a";
  for (const [x, y] of [
    [96, 96],
    [W - 96, 96],
    [96, H - 96],
    [W - 96, H - 96],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  // Logotip: oltin doira ichida «A»
  ctx.beginPath();
  ctx.arc(W / 2, 270, 78, 0, Math.PI * 2);
  ctx.fillStyle = "#1e293b";
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#c9a227";
  ctx.stroke();
  centered(ctx, "A", 305, `700 100px ${family}`, "#e3c15a");
  centered(ctx, "AVANGARD · RUS TILI MAKTABI", 410, `600 38px ${family}`, "#475569");

  centered(ctx, "SERTIFIKAT", 560, `800 130px ${family}`, "#1e3a8a");
  centered(ctx, "СЕРТИФИКАТ", 630, `600 46px ${family}`, "#c9a227");

  centered(ctx, "Ushbu sertifikat", 760, `400 44px ${family}`, "#475569");
  centered(ctx, studentName, 880, `700 104px ${family}`, "#0f172a");
  ctx.beginPath();
  ctx.moveTo(W / 2 - 620, 915);
  ctx.lineTo(W / 2 + 620, 915);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 3;
  ctx.stroke();

  const level = LEVEL_NAMES[cert.level] ?? { uz: cert.level, ru: cert.level };
  centered(ctx, `rus tilining ${level.uz} (${cert.level}) yakuniy imtihonini`, 1010, `400 48px ${family}`, "#334155");
  centered(ctx, `${cert.pct}% natija bilan muvaffaqiyatli topshirgani uchun berildi.`, 1080, `400 48px ${family}`, "#334155");
  centered(ctx, `${level.ru} (${cert.level})`, 1170, `italic 400 40px ${family}`, "#64748b");

  // Pastki qator: sana, raqam, imzo
  const date = new Date(cert.date).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long", year: "numeric" });
  ctx.textAlign = "left";
  ctx.font = `400 34px ${family}`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("Berilgan sana", 260, 1390);
  ctx.fillText("Sertifikat raqami", 260, 1470);
  ctx.font = `700 38px ${family}`;
  ctx.fillStyle = "#0f172a";
  ctx.fillText(date, 260, 1430);
  ctx.fillText(cert.number, 260, 1510);

  ctx.textAlign = "center";
  ctx.beginPath();
  ctx.moveTo(W - 700, 1440);
  ctx.lineTo(W - 260, 1440);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.font = `400 34px ${family}`;
  ctx.fillStyle = "#64748b";
  ctx.fillText("Avangard ma'muriyati", W - 480, 1490);

  // Muhr
  ctx.beginPath();
  ctx.arc(W - 480, 1330, 70, 0, Math.PI * 2);
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.font = `800 40px ${family}`;
  ctx.fillStyle = "#1e3a8a";
  ctx.fillText(cert.level, W - 480, 1345);

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
  pdf.save(`Avangard-sertifikat-${cert.level}.pdf`);
}
