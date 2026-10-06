"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

/** Ilova o'rnatilgan — taklif boshqa ko'rsatilmaydi. */
const INSTALLED_KEY = "avangard-app-installed";
/** × bosilgan — faqat shu tashrif davomida yashiriladi (keyingi kirishda yana chiqadi). */
const SESSION_HIDE_KEY = "avangard-install-hidden";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Telefonda saytni ilova sifatida o'rnatish taklifi: Android/Chrome'da
 *  «O'rnatish» tugmasi (brauzerning o'rnatish oynasini ochadi), iPhone
 *  Safari'da — «Ulashish → Bosh ekranga» ko'rsatmasi. Faqat ilovani
 *  o'rnatganlarga ko'rinmaydi; × bilan yopilsa, keyingi kirishda yana chiqadi. */
export function InstallAppBanner() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let installed = false;
    let hiddenThisVisit = false;
    try {
      // O'rnatilgan ilova ichida ochilgan bo'lsa — eslab qolinadi (Android'da
      // ilova va brauzer bir xil xotiradan foydalanadi).
      if (standalone) localStorage.setItem(INSTALLED_KEY, "1");
      installed = localStorage.getItem(INSTALLED_KEY) === "1";
      hiddenThisVisit = sessionStorage.getItem(SESSION_HIDE_KEY) === "1";
    } catch {}
    if (standalone || installed || hiddenThisVisit) return;

    const ua = navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);
    const timer = isIos
      ? setTimeout(() => {
          setShowIosHint(true);
          setHidden(false);
        }, 0)
      : undefined;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      setHidden(false);
    };
    const onInstalled = () => markInstalled();
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function markInstalled() {
    setHidden(true);
    try {
      localStorage.setItem(INSTALLED_KEY, "1");
    } catch {}
  }

  /** × — faqat shu tashrifga yashirish. */
  function dismiss() {
    setHidden(true);
    try {
      sessionStorage.setItem(SESSION_HIDE_KEY, "1");
    } catch {}
  }

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    setPromptEvent(null);
    // «Отмена» bosilsa — shu safar yashiriladi, keyingi kirishda yana chiqadi.
    if (outcome === "accepted") markInstalled();
    else dismiss();
  }

  if (hidden || (!promptEvent && !showIosHint)) return null;

  return (
    <div className="mb-4 flex animate-fade-up items-center gap-3 rounded-2xl bg-gradient-to-br from-[#1a2030] to-[#0f131c] p-3 text-white shadow-md lg:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon-192.png" alt="" className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">Avangard ilovasi</p>
        {showIosHint ? (
          <p className="text-xs text-white/75">
            <Share size={12} className="inline align-[-1px]" /> «Ulashish» → «На экран Домой / Add to Home Screen»
          </p>
        ) : (
          <p className="text-xs text-white/75">Telefoningizga o&apos;rnating — bir bosishda ochiladi</p>
        )}
      </div>
      {promptEvent && (
        <button
          onClick={install}
          className="btn-press flex shrink-0 items-center gap-1.5 rounded-full bg-gold-400 px-3 py-2 text-xs font-bold text-ink-950"
        >
          <Download size={14} /> O&apos;rnatish
        </button>
      )}
      <button onClick={dismiss} aria-label="Yopish" className="shrink-0 rounded-full p-1 text-white/60 hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
}
