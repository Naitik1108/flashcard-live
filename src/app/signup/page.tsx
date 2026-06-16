"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name.trim()) {
      alert("Full name required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { error } = await signUp(
        email,
        password,
        name
      );

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // small delay so Supabase session settles
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: any) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 rounded-xl border border-zinc-800 bg-black p-3"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 font-medium disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div className="mt-6 text-center text-sm text-zinc-500">
          <Link href="/login" className="hover:text-white">
            Already have an account?
          </Link>
        </div>
      </div>
    </main>
  );
}