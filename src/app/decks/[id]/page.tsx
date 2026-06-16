"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getDeckCards } from "@/lib/cards";
import { getDeckById } from "@/lib/decks";

import AddCardForm from "@/components/AddCardForm";

type Card = {
  id: string;
  question: string;
  answer: string;
};

type Deck = {
  id: string;
  title: string;
  description: string;
  share_code?: string;
};

export default function DeckDetailsPage() {
  const params = useParams();

  const deckId = params.id as string;

  const [deck, setDeck] =
    useState<Deck | null>(null);

  const [cards, setCards] =
    useState<Card[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    setLoading(true);

    const [deckResult, cardsResult] =
      await Promise.all([
        getDeckById(deckId),
        getDeckCards(deckId),
      ]);

    if (deckResult.data) {
      setDeck(deckResult.data);
    }

    setCards(
      (cardsResult.data as Card[]) || []
    );

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [deckId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Deck Header */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h1 className="text-4xl font-bold mb-3">
            {deck?.title}
          </h1>

          <p className="text-zinc-500">
            {deck?.description ||
              "No description"}
          </p>

          {deck?.share_code && (
            <div className="mt-4 text-sm text-zinc-400">
              Share Code:{" "}
              <span className="font-medium text-white">
                {deck.share_code}
              </span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/rooms/create"
              className="rounded-xl border border-zinc-800 px-4 py-2"
            >
              Start Live Session
            </Link>

            <Link
              href="/solo"
              className="rounded-xl border border-zinc-800 px-4 py-2"
            >
              Solo Practice
            </Link>
          </div>
        </div>

        {/* Statistics */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Deck Statistics
          </h2>

          <p className="text-zinc-400">
            Total Cards:{" "}
            <span className="text-white font-medium">
              {cards.length}
            </span>
          </p>
        </div>

        {/* Add Card */}

        <div className="mb-8">
          <AddCardForm
            deckId={deckId}
            onCreated={loadData}
          />
        </div>

        {/* Cards */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Cards ({cards.length})
          </h2>

          {cards.length === 0 ? (
            <div className="text-zinc-500">
              No cards in this deck yet.
            </div>
          ) : (
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="rounded-xl border border-zinc-800 p-5"
                >
                  <div className="text-xs text-zinc-600 mb-2">
                    Card {index + 1}
                  </div>

                  <h3 className="font-semibold mb-3">
                    {card.question}
                  </h3>

                  <p className="text-zinc-400">
                    {card.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}