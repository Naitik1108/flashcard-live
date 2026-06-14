import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid gap-4">
        <Link
          href="/decks/new"
          className="p-4 rounded-xl border border-zinc-800 hover:border-blue-500"
        >
          Create Deck
        </Link>

        <Link
          href="/decks"
          className="p-4 rounded-xl border border-zinc-800 hover:border-blue-500"
        >
          My Decks
        </Link>

        <Link
          href="/public-decks"
          className="p-4 rounded-xl border border-zinc-800 hover:border-blue-500"
        >
          Public Decks
        </Link>

        <Link
          href="/history"
          className="p-4 rounded-xl border border-zinc-800 hover:border-blue-500"
        >
          Study History
        </Link>
      </div>
    </main>
  );
}