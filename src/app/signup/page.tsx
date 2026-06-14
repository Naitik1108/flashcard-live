"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await signUp(
      email,
      password
    );

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold mb-6">
          Sign Up
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
          onClick={handleSignup}
          className="w-full bg-blue-500 p-3 rounded"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}