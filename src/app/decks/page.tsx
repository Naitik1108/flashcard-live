"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";

export default function DecksPage() {
  const { user, loading } = useUser();

  const [decks, setDecks] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      if (!user) return;

      const { data } = await getMyDecks(user.id);

      setDecks(data || []);
      setPageLoading(false);
    }

    loadDecks();
  }, [user]);

  if (loading || pageLoading) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Loading decks...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Decks
        </h1>

        <Link
          href="/decks/new"
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          + New Deck
        </Link>
      </div>

      {decks.length === 0 ? (
        <p className="text-zinc-500">
          No decks found
        </p>
      ) : (
        <div className="space-y-4">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/decks/${deck.id}`}
              className="block border border-zinc-800 p-4 rounded-xl hover:border-blue-500"
            >
              <h2 className="font-bold text-lg">
                {deck.title}
              </h2>

              <p className="text-zinc-400 text-sm">
                {deck.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}