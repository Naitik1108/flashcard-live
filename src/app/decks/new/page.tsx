"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { createDeck } from "@/lib/decks";
import { createCard } from "@/lib/cards";

export default function NewDeckPage() {
  const user = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [cards, setCards] = useState<
    {
      question: string;
      answer: string;
    }[]
  >([]);

  function addCard() {
    if (!question.trim()) return;
    if (!answer.trim()) return;

    setCards((prev) => [
      ...prev,
      {
        question,
        answer,
      },
    ]);

    setQuestion("");
    setAnswer("");
  }

  async function saveDeck() {
    if (!user) {
      alert("Login required");
      return;
    }

    if (!title.trim()) {
      alert("Deck title required");
      return;
    }

    const { data, error } =
      await createDeck(
        title,
        description,
        user.id
      );

    if (error || !data) {
      alert(
        error?.message ||
          "Failed to create deck"
      );
      return;
    }

    for (const card of cards) {
      await createCard(
        data.id,
        card.question,
        card.answer
      );
    }

    alert("Deck created successfully");

    setTitle("");
    setDescription("");
    setCards([]);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Create Deck
        </h1>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Deck Name"
            className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="w-full rounded-xl border border-zinc-800 bg-black p-3"
          />
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Add Flashcard
          </h2>

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Question"
            className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
          />

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Answer"
            className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
          />

          <button
            onClick={addCard}
            className="rounded-xl border border-zinc-800 px-4 py-3"
          >
            Add Card
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Cards ({cards.length})
          </h2>

          {cards.length === 0 ? (
            <p className="text-zinc-500">
              No cards added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 p-4"
                >
                  <h3 className="font-semibold mb-2">
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

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Import (Coming Soon)
          </h2>

          <p className="text-zinc-500">
            CSV and XLSX import will be
            enabled in the next update.
          </p>
        </div>

        <button
          onClick={saveDeck}
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 font-medium"
        >
          Save Deck
        </button>
      </div>
    </main>
  );
}