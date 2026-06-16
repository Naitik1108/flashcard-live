"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getMyDecks } from "@/lib/decks";
import { getDeckCards } from "@/lib/cards";

export default function SoloPage() {
  const user = useUser();

  const [decks, setDecks] = useState<any[]>([]);
  const [selectedDeck, setSelectedDeck] =
    useState<string>("");

  const [cards, setCards] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
  });

  // load decks
  useEffect(() => {
    if (!user) return;

    getMyDecks(user.id).then(({ data }) => {
      setDecks(data || []);
    });
  }, [user]);

  // load cards when deck selected
  async function loadCards(deckId: string) {
    const { data } = await getDeckCards(deckId);

    setCards(data || []);
    setIndex(0);
    setStats({ correct: 0, wrong: 0 });
    setShowAnswer(false);
  }

  function handleSelectDeck(id: string) {
    setSelectedDeck(id);
    loadCards(id);
  }

  function markCorrect() {
    setStats((prev) => ({
      ...prev,
      correct: prev.correct + 1,
    }));

    nextCard();
  }

  function markWrong() {
    setStats((prev) => ({
      ...prev,
      wrong: prev.wrong + 1,
    }));

    nextCard();
  }

  function nextCard() {
    setShowAnswer(false);
    setIndex((prev) => prev + 1);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Login required
      </main>
    );
  }

  const card = cards[index];

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto space-y-6">

      {/* SELECT DECK */}
      {!selectedDeck && (
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Solo Practice
          </h1>

          <div className="space-y-3">
            {decks.map((d) => (
              <div
                key={d.id}
                onClick={() =>
                  handleSelectDeck(d.id)
                }
                className="p-4 border border-zinc-800 rounded-xl cursor-pointer hover:border-blue-500"
              >
                {d.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRACTICE MODE */}
      {selectedDeck && card && (
        <div className="space-y-6">

          <div className="text-zinc-400">
            Card {index + 1} / {cards.length}
          </div>

          {/* QUESTION */}
          <div className="border border-zinc-800 p-6 rounded-xl">
            <p className="text-zinc-400 mb-2">
              Question
            </p>
            <h2 className="text-xl font-bold">
              {card.question}
            </h2>
          </div>

          {/* ANSWER */}
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full bg-blue-600 p-3 rounded"
            >
              Show Answer
            </button>
          )}

          {showAnswer && (
            <div className="space-y-4">
              <div className="border border-zinc-800 p-4 rounded">
                <p className="text-zinc-400">
                  Answer
                </p>
                <p className="font-bold">
                  {card.answer}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={markCorrect}
                  className="bg-green-600 p-3 rounded"
                >
                  I Knew It
                </button>

                <button
                  onClick={markWrong}
                  className="bg-red-600 p-3 rounded"
                >
                  I Didn't Know
                </button>
              </div>
            </div>
          )}

          {/* STATS */}
          <div className="text-zinc-400 text-sm">
            Correct: {stats.correct} | Wrong:{" "}
            {stats.wrong}
          </div>
        </div>
      )}

      {/* END */}
      {selectedDeck &&
        index >= cards.length && (
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold">
              Session Complete 🎉
            </h2>

            <p className="text-zinc-400">
              Score: {stats.correct} /{" "}
              {stats.correct + stats.wrong}
            </p>

            <button
              onClick={() => {
                setSelectedDeck("");
                setCards([]);
                setIndex(0);
              }}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Back to Decks
            </button>
          </div>
        )}
    </main>
  );
}