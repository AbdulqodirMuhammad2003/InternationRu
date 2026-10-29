"use client";

/** O'quvchini rag'batlantiradigan kichik effektlar (kutubxonasiz, yengil):
 *  - spark(): to'g'ri javobda oxirgi bosilgan joydan uchqunlar sachraydi
 *    (React Bits «Click Spark» g'oyasi);
 *  - confetti(): dars/imtihon yakunida ekran bo'ylab konfetti.
 *  Tizimda «harakatni kamaytirish» yoqilgan bo'lsa, hech narsa chizilmaydi. */

const COLORS = ["#6366f1", "#a855f7", "#fbbf24", "#10b981", "#f472b6", "#38bdf8"];

let lastPoint: { x: number; y: number } | null = null;
let tracking = false;

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Oxirgi bosilgan nuqtani eslab qoladi — uchqun aynan o'sha yerdan chiqadi. */
function track() {
  if (tracking || typeof window === "undefined") return;
  tracking = true;
  window.addEventListener(
    "pointerdown",
    (e) => {
      lastPoint = { x: e.clientX, y: e.clientY };
    },
    { capture: true, passive: true }
  );
}
if (typeof window !== "undefined") track();

function overlay() {
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "9999",
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return { canvas, ctx };
}

/** To'g'ri javob: bosilgan joydan 10 ta uchqun nuri sachraydi. */
export function spark(color = "#fbbf24") {
  if (typeof window === "undefined" || reducedMotion()) return;
  const el = document.activeElement as HTMLElement | null;
  const rect = el && el !== document.body ? el.getBoundingClientRect() : null;
  const origin = lastPoint ?? (rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null);
  if (!origin) return;
  const { canvas, ctx } = overlay();
  const rays = 10;
  const start = performance.now();
  const duration = 450;
  function frame(now: number) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    for (let i = 0; i < rays; i++) {
      const angle = (i / rays) * Math.PI * 2;
      const r1 = 10 + ease * 28;
      const len = 12 * (1 - ease);
      ctx.beginPath();
      ctx.moveTo(origin!.x + Math.cos(angle) * r1, origin!.y + Math.sin(angle) * r1);
      ctx.lineTo(origin!.x + Math.cos(angle) * (r1 + len), origin!.y + Math.sin(angle) * (r1 + len));
      ctx.stroke();
    }
    if (t < 1) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}

/** Katta yutuq: ikki chetdan yuqoriga otilib, sekin tushadigan konfetti. */
export function confetti() {
  if (typeof window === "undefined" || reducedMotion()) return;
  const { canvas, ctx } = overlay();
  const W = window.innerWidth;
  const H = window.innerHeight;
  const pieces = Array.from({ length: 140 }, (_, i) => {
    const fromLeft = i % 2 === 0;
    const angle = (fromLeft ? -60 : -120) * (Math.PI / 180) + (Math.random() - 0.5) * 0.9;
    const speed = 9 + Math.random() * 9;
    return {
      x: fromLeft ? 0 : W,
      y: H * 0.75,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[i % COLORS.length],
    };
  });
  const start = performance.now();
  function frame(now: number) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, elapsed - 1800) / 900);
    for (const p of pieces) {
      p.vy += 0.32;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot * 2)));
      ctx.restore();
    }
    if (elapsed < 2700) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}

/** Telefonda yengil tebranish (qo'llanmasa — jim). */
export function buzz(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {}
}
