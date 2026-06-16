"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

export default function ImportDeckPage() {
  const router = useRouter();
  const user = useUser();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleImport() {
    if (!user) {
      alert("Login required");
      return;
    }

    if (!code) {
      alert("Enter deck code");
      return;
    }

    setLoading(true);

    // 1. find deck by code
    const { data: deck, error } = await supabase
      .from("decks")
      .select("*")
      .eq("share_code", code)
      .single();

    if (error || !deck) {
      setLoading(false);
      alert("Invalid deck code");
      return;
    }

    // 2. clone deck for user (new ownership)
    const { data: newDeck, error: insertError } =
      await supabase
        .from("decks")
        .insert({
          title: deck.title,
          description: deck.description,
          owner_id: user.id,
          is_public: false,
        })
        .select()
        .single();

    if (insertError || !newDeck) {
      setLoading(false);
      alert("Failed to import deck");
      return;
    }

    // 3. copy cards
    const { data: cards } = await supabase
      .from("cards")
      .select("*")
      .eq("deck_id", deck.id);

    if (cards?.length) {
      await supabase.from("cards").insert(
        cards.map((c) => ({
          deck_id: newDeck.id,
          question: c.question,
          answer: c.answer,
          card_order: c.card_order,
        }))
      );
    }

    setLoading(false);

    alert("Deck imported successfully");

    router.push(`/decks/${newDeck.id}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 border border-zinc-800 p-6 rounded-xl">
        <h1 className="text-2xl font-bold">
          Import Deck
        </h1>

        <p className="text-zinc-400 text-sm">
          Enter shared deck code
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="DECK CODE"
          className="w-full p-3 bg-zinc-900 rounded"
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className="w-full bg-blue-600 p-3 rounded"
        >
          {loading ? "Importing..." : "Import Deck"}
        </button>
      </div>
    </main>
  );
}