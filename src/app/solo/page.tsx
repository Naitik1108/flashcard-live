"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";

export default function SoloPage() {
  const { user, loading } = useUser();

  const [decks, setDecks] = useState<any[]>([]);
  const [currentDeckId, setCurrentDeckId] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    async function loadDecks() {
      if (!user) return;

      const { data } = await getMyDecks(user.id);
      setDecks(data || []);
    }

    loadDecks();
  }, [user]);

  function startDeck(deck: any) {
    setCurrentDeckId(deck.id);
    setCards(deck.cards || []);
    setIndex(0);
    setShowAnswer(false);
  }

  function nextCard() {
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  }

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
        Solo Practice
      </h1>

      {!currentDeckId ? (
        <div className="space-y-3">
          {decks.map((deck) => (
            <button
              key={deck.id}
              onClick={() => startDeck(deck)}
              className="w-full text-left p-4 border border-zinc-800 rounded-xl"
            >
              <h2 className="font-bold">{deck.title}</h2>
              <p className="text-zinc-500 text-sm">
                {deck.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="border border-zinc-800 p-6 rounded-xl">
          {cards.length > 0 && index < cards.length ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                {cards[index].question}
              </h2>

              {showAnswer && (
                <p className="text-zinc-300 mb-4">
                  {cards[index].answer}
                </p>
              )}

              <div className="flex gap-3">
                {!showAnswer ? (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    Show Answer
                  </button>
                ) : (
                  <button
                    onClick={nextCard}
                    className="bg-green-600 px-4 py-2 rounded"
                  >
                    Next Card
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>Deck Completed 🎉</p>
          )}
        </div>
      )}
    </main>
  );
}