/**
 * Har bir daraja uchun «Avangard qo'llanmasi» PDF faylini yasaydi — faqat
 * saytdagi o'zimizning materiallardan (lug'at, misollar, qoidalar, testlar).
 *
 *   npx tsx scripts/build-handbooks.ts            → HTML + PDF (public/handbooks/)
 *
 * PDF Chrome/Edge'ning headless rejimida chop etiladi; brauzer yo'li
 * CHROME_PATH bilan berilishi mumkin.
 */
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { LESSON_CONTENT } from "../lib/seed-lessons";
import { UNITS } from "../lib/seed-data";

const OUT_DIR = path.join(process.cwd(), "public", "handbooks");
const LEVEL_NAMES: Record<string, { uz: string; ru: string }> = {
  A1: { uz: "Boshlang'ich daraja", ru: "Элементарный уровень" },
  A2: { uz: "Asosiy daraja", ru: "Базовый уровень" },
  B1: { uz: "O'rta daraja", ru: "Первый сертификационный уровень" },
  B2: { uz: "Yuqori o'rta daraja", ru: "Второй сертификационный уровень" },
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bold = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

/** Qoida matni: «## » sarlavha, «• » ro'yxat, «→ » misol, qolgani — paragraf. */
function ruleHtml(text: string) {
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) out.push(`<ul>${list.join("")}</ul>`);
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("• ")) {
      list.push(`<li>${bold(line.slice(2))}</li>`);
      continue;
    }
    flush();
    if (line.startsWith("## ")) out.push(`<h4>${bold(line.slice(3))}</h4>`);
    else if (line.startsWith("→ ")) out.push(`<p class="ex" lang="ru">${bold(line.slice(2))}</p>`);
    else out.push(`<p>${bold(line)}</p>`);
  }
  flush();
  return out.join("\n");
}

const LETTERS = ["A", "B", "C", "D", "E"];

function lessonHtml(code: string, index: number) {
  const unit = UNITS.find((u) => u.code === code)!;
  const lesson = LESSON_CONTENT.find((l) => l.code === code)!;
  const rule = lesson.exercises.find((e) => e.kind === "rule");
  const parts: string[] = [];

  parts.push(`<section class="lesson" id="l${index}">
  <div class="lesson-head"><span class="num">${esc(unit.title)}</span><h2>${esc(unit.subtitle)}</h2></div>`);

  if (lesson.rounds.length) {
    parts.push(`<h3>Lug'at</h3>`);
    for (const round of lesson.rounds) {
      parts.push(`<p class="round">${esc(round.title)}</p>
<table class="vocab"><thead><tr><th>So'z</th><th>Tarjima</th><th>Misol</th></tr></thead><tbody>
${round.words
  .map(
    // Rangli emoji PDF'ga katta rasm bo'lib kiradi (~30 MB) — qo'llanmada yo'q.
    (w) => `<tr><td class="word"><span lang="ru">${esc(w.word)}</span>${w.transcription ? `<span class="tr">[${esc(w.transcription)}]</span>` : ""}</td>
<td>${esc(w.uz)}</td>
<td><span lang="ru">${esc(w.ex)}</span><br><span class="exuz">${esc(w.exUz)}</span></td></tr>`
  )
  .join("\n")}
</tbody></table>`);
    }
  }

  if (rule) {
    parts.push(`<h3 class="break-before">Qoida: ${esc(rule.title.replace(/^Qoida:\s*/, ""))}</h3>
<div class="rule">${ruleHtml(rule.instructions)}</div>
<h3>O'zingizni tekshiring</h3>
<ol class="test">
${rule.questions
  .map(
    (q) => `<li><p lang="ru">${esc(q.prompt)}</p><div class="opts">${(q.options ?? [])
      .map((o, i) => `<span><b>${LETTERS[i]})</b> <span lang="ru">${esc(o)}</span></span>`)
      .join("")}</div></li>`
  )
  .join("\n")}
</ol>
<p class="answers"><b>Javoblar:</b> ${rule.questions
      .map((q, i) => `${i + 1}–${LETTERS[q.correct ?? 0]}`)
      .join(", ")}</p>`);
  }

  parts.push(`</section>`);
  return parts.join("\n");
}

function levelHtml(level: string) {
  const codes = UNITS.filter((u) => u.level === level && LESSON_CONTENT.some((l) => l.code === u.code)).map(
    (u) => u.code
  );
  const name = LEVEL_NAMES[level];
  const toc = codes
    .map((c, i) => {
      const u = UNITS.find((x) => x.code === c)!;
      return `<li><a href="#l${i}"><span>${esc(u.title)}</span> ${esc(u.subtitle)}</a></li>`;
    })
    .join("\n");

  return `<!doctype html><html lang="uz"><head><meta charset="utf-8"><title>Avangard — ${level} qo'llanma</title>
<style>
@page { size: A4; margin: 16mm 14mm 18mm; }
* { box-sizing: border-box; }
body { font-family: "Segoe UI", Arial, sans-serif; color: #1b2230; font-size: 10.5pt; line-height: 1.45; margin: 0; }
.cover { height: 260mm; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
  background: linear-gradient(160deg, #1a2030, #0f131c); color: #fff; border-radius: 6mm; page-break-after: always; }
.cover .seal { width: 46mm; height: 46mm; }
.cover h1 { font-size: 30pt; margin: 10mm 0 2mm; letter-spacing: .5px; }
.cover .lvl { font-size: 60pt; font-weight: 800; color: #dfbd6c; margin: 4mm 0; }
.cover .sub { font-size: 14pt; opacity: .85; }
.cover .note { margin-top: 18mm; font-size: 9.5pt; opacity: .6; max-width: 120mm; }
.toc { page-break-after: always; }
.toc h2 { font-size: 18pt; margin-bottom: 4mm; }
.toc ol { list-style: none; padding: 0; columns: 1; }
.toc li { padding: 2.2mm 0; border-bottom: 1px dotted #cdd3dd; }
.toc a { color: inherit; text-decoration: none; }
.toc span { display: inline-block; width: 26mm; font-weight: 700; color: #3552d6; }
.lesson { page-break-before: always; }
.lesson-head { border-left: 3mm solid #cfa249; padding: 2mm 0 2mm 4mm; margin-bottom: 4mm; }
.lesson-head .num { font-size: 10pt; font-weight: 700; color: #3552d6; text-transform: uppercase; letter-spacing: 1px; }
.lesson-head h2 { margin: 1mm 0 0; font-size: 17pt; }
h3 { font-size: 13pt; margin: 6mm 0 2mm; color: #0f131c; }
.break-before { page-break-before: always; }
.round { font-weight: 700; color: #8a6a1f; margin: 4mm 0 1.5mm; }
table.vocab { width: 100%; border-collapse: collapse; font-size: 9.5pt; page-break-inside: auto; }
table.vocab th { text-align: left; font-size: 8.5pt; color: #6b7487; border-bottom: 1.2px solid #cdd3dd; padding: 1.5mm; }
table.vocab td { border-bottom: 1px solid #e6e9ef; padding: 1.6mm; vertical-align: top; }
table.vocab tr { page-break-inside: avoid; }
td.emoji { width: 8mm; font-size: 12pt; }
td.word { width: 42mm; font-weight: 700; }
td.word .tr { display: block; font-weight: 400; color: #6b7487; font-size: 8.5pt; }
.exuz { color: #6b7487; font-size: 8.5pt; }
.rule { background: #f6f7fb; border-radius: 3mm; padding: 3mm 5mm; }
.rule h4 { margin: 3mm 0 1mm; font-size: 11pt; color: #3552d6; }
.rule p { margin: 1mm 0; }
.rule p.ex { background: #e8f7f0; border-left: 1mm solid #2fb47c; padding: 1mm 3mm; border-radius: 1mm; }
.rule ul { margin: 1mm 0; padding-left: 5mm; }
ol.test { padding-left: 6mm; }
ol.test li { margin-bottom: 2.5mm; page-break-inside: avoid; }
ol.test p { margin: 0 0 1mm; }
.opts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1mm 4mm; font-size: 9.5pt; }
.answers { margin-top: 4mm; font-size: 9pt; color: #6b7487; border-top: 1px dashed #cdd3dd; padding-top: 2mm; }
</style></head><body>
<div class="cover">
  <svg class="seal" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#1e2012" stroke="#cfa249" stroke-width="1.4"/><circle cx="20" cy="20" r="14" fill="none" stroke="#cfa249" stroke-opacity=".4" stroke-width=".6"/><path d="M20 10.5 L27.5 29.5 L23.8 29.5 L22.2 25.3 L17.8 25.3 L16.2 29.5 L12.5 29.5 Z M18.6 22.2 L21.4 22.2 L20 17.9 Z" fill="#dfbd6c"/><circle cx="20" cy="6.5" r="1.2" fill="#dfbd6c"/></svg>
  <h1>Avangard — Rus tili maktabi</h1>
  <div class="lvl">${level}</div>
  <div class="sub">${esc(name.uz)} · <span lang="ru">${esc(name.ru)}</span></div>
  <div class="sub" style="margin-top:3mm">O'quvchi qo'llanmasi: lug'at, qoidalar va testlar</div>
  <div class="note">Qo'llanma Avangard saytidagi darslar asosida tuzilgan. internation-ru.vercel.app</div>
</div>
<div class="toc"><h2>Mundarija</h2><ol>${toc}</ol></div>
${codes.map((c, i) => lessonHtml(c, i)).join("\n")}
</body></html>`;
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean) as string[];
  return candidates.find((p) => fs.existsSync(p));
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = findBrowser();
const levels = [...new Set(UNITS.map((u) => u.level))].filter(
  (l) => !process.env.LEVELS || process.env.LEVELS.split(",").includes(l)
);
for (const level of levels) {
  const htmlPath = path.join(OUT_DIR, `${level}.html`);
  fs.writeFileSync(htmlPath, levelHtml(level));
  if (!browser) {
    console.log(`${level}: HTML yozildi (brauzer topilmadi — PDF yo'q)`);
    continue;
  }
  const pdfPath = path.join(OUT_DIR, `Avangard-${level}-qollanma.pdf`);
  // Alohida vaqtinchalik profil — foydalanuvchining Chrome profiliga tegilmaydi.
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "avangard-pdf-"));
  execFileSync(browser, [
    "--headless=new",
    `--user-data-dir=${profile}`,
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file:///${htmlPath.replace(/\\/g, "/")}`,
  ], { stdio: "ignore" });
  fs.rmSync(profile, { recursive: true, force: true });
  if (!process.env.KEEP_HTML) fs.unlinkSync(htmlPath);
  console.log(`${level}: ${pdfPath} (${Math.round(fs.statSync(pdfPath).size / 1024)} KB)`);
}
