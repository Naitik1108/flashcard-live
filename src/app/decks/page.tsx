"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";

type Deck = {
  id: string;
  title: string;
  description: string;
  share_code?: string;
};

export default function DecksPage() {
  const { user, loading } =
  useUser();

  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      if (!user) return;

      const { data } = await getMyDecks(user.id);

      setDecks((data as Deck[]) || []);
      setLoading(false);
    }

    loadDecks();
  }, [user]);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Created Decks
        </h1>

        <Link
          href="/decks/new"
          className="rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3 transition hover:border-zinc-700"
        >
          Create Deck
        </Link>
      </div>

      {loading ? (
        <div className="text-zinc-500">
          Loading decks...
        </div>
      ) : decks.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            No Decks Yet
          </h2>

          <p className="text-zinc-500 mb-6">
            Create your first flashcard deck to start learning.
          </p>

          <Link
            href="/decks/new"
            className="inline-block rounded-xl border border-zinc-800 px-5 py-3"
          >
            Create First Deck
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {deck.title}
                  </h2>

                  <p className="text-zinc-500 mt-1">
                    {deck.description ||
                      "No description"}
                  </p>

                  {deck.share_code && (
                    <p className="text-sm text-zinc-600 mt-3">
                      Share Code: {deck.share_code}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/decks/${deck.id}`}
                    className="rounded-xl border border-zinc-800 px-4 py-2"
                  >
                    Open
                  </Link>

                  <button
                    className="rounded-xl border border-zinc-800 px-4 py-2"
                  >
                    Share
                  </button>

                  <button
                    className="rounded-xl border border-red-900 px-4 py-2 text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}