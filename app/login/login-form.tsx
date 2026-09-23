"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-olive-800">
          Elektron pochta
        </label>
        <input
          type="email"
          name="email"
          required
          defaultValue="demo@avangard.uz"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-olive-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-olive-500 focus:ring-2 focus:ring-olive-100"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-olive-800">
          Parol
        </label>
        <input
          type="password"
          name="password"
          required
          defaultValue="demo1234"
          placeholder="••••••••"
          className="w-full rounded-xl border border-olive-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-olive-500 focus:ring-2 focus:ring-olive-100"
        />
      </div>

      {state.error && (
        <p className="animate-fade-up rounded-lg bg-wine-50 px-3 py-2 text-sm text-wine-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-press mt-2 w-full rounded-xl bg-gradient-to-b from-olive-600 to-olive-700 py-2.5 text-sm font-semibold text-white shadow-sm shadow-olive-900/30 transition-colors hover:from-olive-500 hover:to-olive-600 disabled:opacity-60"
      >
        {pending ? "Kirilmoqda..." : "Kirish"}
      </button>
    </form>
  );
}
