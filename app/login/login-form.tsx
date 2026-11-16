"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label htmlFor="login-id" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Login yoki email
        </label>
        <input
          type="text"
          id="login-id"
          name="login"
          required
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="username"
          placeholder="O'qituvchi bergan login"
          className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-azure-500 focus:ring-4 focus:ring-azure-100"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Parol
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="min-h-12 w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-base text-ink-900 outline-none transition-colors placeholder:text-ink-400 focus:border-azure-500 focus:ring-4 focus:ring-azure-100"
        />
      </div>

      {state.error && (
        <p role="alert" className="animate-fade-up rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-rose-200">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-press btn-3d mt-2 min-h-12 w-full rounded-xl bg-gradient-to-b from-azure-600 to-azure-700 py-2.5 text-base font-semibold text-white shadow-sm shadow-azure-900/30 transition-colors hover:from-azure-500 hover:to-azure-600 disabled:opacity-60"
      >
        {pending ? "Kirilmoqda..." : "Kirish"}
      </button>
    </form>
  );
}
