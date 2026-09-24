"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Camera, X, Loader2 } from "lucide-react";
import { Avatar } from "./Avatar";
import { updateProfileAction, type ProfileState } from "@/app/actions";

const initialState: ProfileState = {};

export function EditableAvatar({
  name,
  avatarUrl,
  size = 44,
  children,
  triggerClassName = "",
}: {
  name: string;
  avatarUrl?: string | null;
  size?: number;
  /** Ixtiyoriy qo'shimcha kontent (masalan, ism/daraja matni) — mavjud
   *  bo'lsa, u ham rasm bilan birga bosilganda tahrirlash oynasini ochadi. */
  children?: React.ReactNode;
  /** Trigger tugmasining joylashuvini moslashtirish uchun (masalan,
   *  header'da qator, profil kartasida ustun ko'rinishida). */
  triggerClassName?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && state.ok) {
      setOpen(false);
      setPreview(null);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  const modal = open && (
    <div
      className="fixed inset-0 z-[100] flex animate-fade-in items-start justify-center overflow-y-auto bg-olive-950/40 p-4 py-10 backdrop-blur-sm sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="my-auto max-h-[85vh] w-full max-w-sm animate-pop-in overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1f2115]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-olive-950 dark:text-olive-50">Profilni tahrirlash</h3>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-olive-500 transition-colors hover:bg-olive-50 dark:text-olive-300 dark:hover:bg-white/10"
            aria-label="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative overflow-hidden rounded-full"
              aria-label="Rasm tanlash"
            >
              <Avatar name={name} size={88} photoUrl={preview || avatarUrl} />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-olive-950/0 text-transparent transition-colors duration-200 group-hover:bg-olive-950/45 group-hover:text-white">
                <Camera size={22} />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-olive-600 transition-colors hover:text-olive-800 dark:text-olive-300 dark:hover:text-olive-100"
            >
              Rasm tanlash
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-olive-800 dark:text-olive-200">Ism</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              required
              maxLength={60}
              className="w-full rounded-xl border border-olive-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-olive-500 focus:ring-2 focus:ring-olive-100 dark:border-white/10 dark:bg-white/5 dark:text-olive-50 dark:focus:border-olive-400 dark:focus:ring-white/10"
            />
          </div>

          {state.error && (
            <p className="animate-fade-up rounded-lg bg-wine-50 px-3 py-2 text-sm text-wine-700 dark:bg-wine-950/40 dark:text-wine-300">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-press mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-azure-600 to-azure-700 py-2.5 text-sm font-semibold text-white shadow-sm shadow-azure-900/30 transition-colors hover:from-azure-500 hover:to-azure-600 disabled:opacity-60"
          >
            {pending && <Loader2 size={16} className="animate-spin" />}
            {pending ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group flex items-center rounded-xl transition-opacity duration-150 hover:opacity-90 ${triggerClassName}`}
        aria-label="Profilni tahrirlash"
      >
        <span
          className="relative shrink-0 overflow-hidden rounded-full transition-transform group-hover:scale-[1.04]"
          style={{ width: size, height: size }}
        >
          <Avatar name={name} size={size} photoUrl={avatarUrl} />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-olive-950/0 text-transparent transition-colors duration-200 group-hover:bg-olive-950/45 group-hover:text-white">
            <Camera size={Math.max(13, Math.round(size * 0.32))} />
          </span>
        </span>
        {children}
      </button>

      {/* Modal document.body'ga portal orqali chiqariladi — shunda u
          header kabi backdrop-blur ishlatuvchi ota elementning ichiga
          "qisilib" qolmaydi (backdrop-filter fixed elementlar uchun yangi
          containing block yaratadi, shu sabab modal ekranga emas, o'sha
          ota elementga nisbatan joylashib qolar edi). */}
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
