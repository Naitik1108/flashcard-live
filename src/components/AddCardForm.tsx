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

  async function saveCard() {
    const { error } =
      await createCard(
        deckId,
        question,
        answer
      );

    if (error) {
      alert(error.message);
      return;
    }

    setQuestion("");
    setAnswer("");

    onCreated?.();
  }

  return (
    <div className="space-y-3">
      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Question"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Answer"
        className="w-full p-3 rounded bg-zinc-900"
      />

      <button
        onClick={saveCard}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Add Card
      </button>
    </div>
  );
}