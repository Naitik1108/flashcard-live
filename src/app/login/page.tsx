"use client";

import { useState } from "react";
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
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-zinc-900"
        />

        <input
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-900"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-3 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}