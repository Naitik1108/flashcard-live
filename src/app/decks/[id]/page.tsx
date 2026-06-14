"use client";

import { useParams } from "next/navigation";

export default function DeckDetailsPage() {
  const params = useParams();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Deck
      </h1>

      <p>Deck ID: {params.id}</p>
    </main>
  );
}