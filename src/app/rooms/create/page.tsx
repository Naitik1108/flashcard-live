"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";

export default function CreateRoomPage() {
  const user = useUser();

  const [decks, setDecks] =
    useState<any[]>([]);

  const [selectedDeck, setSelectedDeck] =
    useState("");

  const [roomCode, setRoomCode] =
    useState("");

  useEffect(() => {
    async function loadDecks() {
      if (!user) return;

      const { data } =
        await getMyDecks(user.id);

      setDecks(data || []);
    }

    loadDecks();
  }, [user]);

  function generateRoom() {
    const code = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    setRoomCode(code);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Create Room
        </h1>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <label className="block mb-3 text-zinc-400">
            Select Deck
          </label>

          <select
            value={selectedDeck}
            onChange={(e) =>
              setSelectedDeck(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-800 bg-black p-3 mb-6"
          >
            <option value="">
              Choose a deck
            </option>

            {decks.map((deck) => (
              <option
                key={deck.id}
                value={deck.id}
              >
                {deck.title}
              </option>
            ))}
          </select>

          <button
            onClick={generateRoom}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3"
          >
            Generate Room
          </button>

          {roomCode && (
            <div className="mt-8 rounded-xl border border-zinc-800 p-5">
              <p className="text-zinc-500 mb-2">
                Room Code
              </p>

              <div className="text-3xl font-bold">
                {roomCode}
              </div>

              <p className="text-zinc-500 mt-4">
                Share this code with the
                student.
              </p>

              <Link
                href={`/rooms/${roomCode}`}
                className="block mt-6 rounded-xl border border-zinc-800 p-3 text-center"
              >
                Enter Room
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}