import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold mb-4">
          FlashCard Live
        </h1>

        <p className="text-zinc-500 mb-10">
          Real-time flashcard learning for focused 1-on-1 study sessions.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="rounded-2xl border border-zinc-800 bg-zinc-900 py-4 font-medium transition hover:border-zinc-700"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-2xl border border-zinc-800 py-4 font-medium transition hover:border-zinc-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}