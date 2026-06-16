"use client";

import { useState } from "react";
import { createCard } from "@/lib/cards";

interface Props {
  deckId: string;
  onCreated?: () => void;
}

export default function AddCardForm({
  deckId,
  onCreated,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function saveCard() {
    if (!question.trim()) {
      alert("Question is required");
      return;
    }

    if (!answer.trim()) {
      alert("Answer is required");
      return;
    }

    setLoading(true);

    const { error } =
      await createCard(
        deckId,
        question,
        answer
      );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setQuestion("");
    setAnswer("");

    onCreated?.();
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-xl font-semibold mb-4">
        Add Card
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
        rows={4}
      />

      <button
        onClick={saveCard}
        disabled={loading}
        className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 disabled:opacity-50"
      >
        {loading
          ? "Adding..."
          : "Add Card"}
      </button>
    </div>
  );
}