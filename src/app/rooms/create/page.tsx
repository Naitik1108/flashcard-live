"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";
import { supabase } from "@/lib/supabase";

export default function CreateRoomPage() {
  const { user } = useUser();

  const [decks, setDecks] = useState<any[]>([]);
  const [selectedDeck, setSelectedDeck] =
    useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadDecks() {
      const { data } = await getMyDecks(user.id);
      setDecks(data || []);
    }

    loadDecks();
  }, [user]);

  async function createRoom() {
    if (!selectedDeck) return;

    const code = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const { error } = await supabase.from("rooms").insert({
      deck_id: selectedDeck,
      code,
      host_id: user.id,
      status: "waiting",
      current_card_index: 0,
      revealed: false,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(`Room created: ${code}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Room
      </h1>

      <div className="space-y-4">
        {decks.map((d) => (
          <div
            key={d.id}
            onClick={() => setSelectedDeck(d.id)}
            className={`p-4 border rounded-xl cursor-pointer ${
              selectedDeck === d.id
                ? "border-blue-500"
                : "border-zinc-800"
            }`}
          >
            {d.title}
          </div>
        ))}
      </div>

      <button
        onClick={createRoom}
        className="mt-6 bg-blue-600 px-4 py-2 rounded"
      >
        Generate Room
      </button>
    </main>
  );
}