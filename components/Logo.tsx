/**
 * Avangard logotipi — "Seal" (muhr-nishon) konsepti: doiraviy medal
 * shaklida, zaytun (olive) va oltin rang birikmasida "A" monogrammasi.
 * O'zi mustaqil ramka bo'lgani uchun tashqi konteynerga muhtoj emas —
 * to'g'ridan-to'g'ri istalgan fonda (och yoki to'q) ishlatiladi.
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Avangard logotipi"
    >
      <circle cx="20" cy="20" r="18" fill="#1e2012" stroke="#cfa249" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="#cfa24966" strokeWidth="0.6" />
      <path
        d="M20 10.5 L27.5 29.5 L23.8 29.5 L22.2 25.3 L17.8 25.3 L16.2 29.5 L12.5 29.5 Z M18.6 22.2 L21.4 22.2 L20 17.9 Z"
        fill="#dfbd6c"
      />
      <circle cx="20" cy="6.5" r="1.2" fill="#dfbd6c" />
    </svg>
  );
}

export function Logo({
  size = 40,
  showText = true,
  subtitle = "Rus tili maktabi",
}: {
  size?: number;
  showText?: boolean;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={size} className="shrink-0 drop-shadow-[0_2px_6px_rgba(30,32,18,0.35)]" />
      {showText && (
        <div>
          <p className="font-display text-sm font-bold leading-tight tracking-wide">Avangard</p>
          <p className="text-[11px] text-ink-700/70">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
