"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { createDeck } from "@/lib/decks";

export default function NewDeckPage() {
  const user = useUser();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  async function saveDeck() {
    if (!user) {
      alert("Login required");
      return;
    }

    const { error } =
      await createDeck(
        title,
        description,
        user.id
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deck created");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Create Deck
      </h1>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Deck Title"
        className="w-full p-3 mb-4 rounded bg-zinc-900"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        placeholder="Description"
        className="w-full p-3 mb-4 rounded bg-zinc-900"
      />

      <button
        onClick={saveDeck}
        className="bg-blue-500 px-4 py-2 rounded-lg"
      >
        Save Deck
      </button>
    </main>
  );
}