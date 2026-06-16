"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createRoom } from "@/lib/rooms";
import { getMyDecks } from "@/lib/decks";

export default function CreateRoomPage() {
  const router = useRouter();
  const { user, loading } = useUser();

user?.id

  const [decks, setDecks] = useState<any[]>([]);
  const [selectedDeck, setSelectedDeck] =
    useState<string>("");

  const [loading, setLoading] = useState(false);

  // load decks
  async function loadDecks() {
    if (!user) return;
    const { data } = await getMyDecks(user.id);
    setDecks(data || []);
  }

  useState(() => {
    loadDecks();
  }, [user]);

  function generateCode() {
    return Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
  }

  async function handleCreateRoom() {
    if (!user) return;

    if (!selectedDeck) {
      alert("Select a deck");
      return;
    }

    const code = generateCode();

    setLoading(true);

    const { data, error } = await createRoom(
      selectedDeck,
      user.id,
      code
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/rooms/${data.code}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Room
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-400 mb-2">
            Select Deck
          </p>

          <select
            value={selectedDeck}
            onChange={(e) =>
              setSelectedDeck(e.target.value)
            }
            className="w-full p-3 bg-zinc-900 rounded"
          >
            <option value="">Choose deck</option>

            {decks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title || "Untitled Deck"}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="w-full bg-blue-600 p-3 rounded"
        >
          {loading
            ? "Creating..."
            : "Generate Room"}
        </button>
      </div>
    </main>
  );
}