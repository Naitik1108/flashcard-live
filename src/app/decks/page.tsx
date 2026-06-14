"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { getMyDecks } from "../../lib/decks";

export default function DecksPage() {
  const user = useUser();

  const [decks, setDecks] =
    useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    getMyDecks(user.id).then(
      ({ data }) => {
        setDecks(data || []);
      }
    );
  }, [user]);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        My Decks
      </h1>

      <div className="space-y-4">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="border border-zinc-800 p-4 rounded-xl"
          >
            <h2 className="font-bold">
              {deck.title}
            </h2>

            <p>
              {deck.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}