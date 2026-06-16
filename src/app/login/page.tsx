"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleLogin() {
    const { error } = await signIn(
      email,
      password
    );

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href =
      "/dashboard";
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
        />

        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          type="password"
          placeholder="Password"
          className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 font-medium"
        >
          Login
        </button>

        <div className="mt-6 flex justify-between text-sm text-zinc-500">
          <Link href="/signup">
            Create Account
          </Link>

          <Link href="/forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </main>
  );
}