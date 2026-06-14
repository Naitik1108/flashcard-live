"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDeckCards } from "@/lib/cards";
import AddCardForm from "@/components/AddCardForm";

export default function DeckDetailsPage() {
  const params = useParams();

  const [cards, setCards] =
    useState<any[]>([]);

  async function loadCards() {
    const { data } =
      await getDeckCards(
        params.id as string
      );

    setCards(data || []);
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Deck Cards
      </h1>

      <AddCardForm
        deckId={params.id as string}
        onCreated={loadCards}
      />

      <div className="mt-8 space-y-4">
        {cards.map((card) => (
  <div
    key={card.id}
    className="border border-zinc-800 p-4 rounded-xl"
  >
    <h3 className="font-bold">
      {card.question}
    </h3>

    <p>{card.answer}</p>
  </div>
))}
      </div>
    </main>
  );
}