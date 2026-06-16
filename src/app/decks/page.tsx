"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";

export default function DecksPage() {
  const user = useUser();

  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;

      const { data } = await getMyDecks(user.id);

      setDecks(data || []);
      setLoading(false);
    }

    load();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Decks
      </h1>

      <div className="space-y-4">
        {decks.map((d) => (
          <Link
            key={d.id}
            href={`/decks/${d.id}`}
            className="block border border-zinc-800 p-4 rounded-xl"
          >
            <div className="font-bold">
              {d.title || "Untitled Deck"}
            </div>

            <div className="text-zinc-400 text-sm">
              {d.description}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}