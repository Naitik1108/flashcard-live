"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HistoryDetailPage() {
  const { id } = useParams();

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadResult() {
    const { data, error } = await supabase
      .from("session_results")
      .select(
        `
        *,
        decks (title, description),
        profiles (email)
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setResult(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!id) return;
    loadResult();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Loading session...
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Session not found
      </main>
    );
  }

  const accuracy =
    result.total_cards === 0
      ? 0
      : Math.round(
          (result.correct_count /
            result.total_cards) *
            100
        );

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Session Report
          </h1>

          <p className="text-zinc-400">
            Deck: {result.decks?.title}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-400">
              Total Cards
            </p>
            <p className="text-2xl font-bold">
              {result.total_cards}
            </p>
          </div>

          <div className="border border-zinc-800 p-4 rounded-xl">
            <p className="text-zinc-400">
              Correct
            </p>
            <p className="text-2xl font-bold text-green-500">
              {result.correct_count}
            </p>
          </div>

          <div className="border border-zinc-800 p-4 rounded-xl col-span-2">
            <p className="text-zinc-400">
              Accuracy
            </p>
            <p className="text-3xl font-bold text-blue-500">
              {accuracy}%
            </p>
          </div>
        </div>

        {/* INFO */}
        <div className="border border-zinc-800 p-4 rounded-xl space-y-2">
          <p className="text-zinc-400">
            Host
          </p>
          <p>{result.host_id}</p>

          <p className="text-zinc-400 mt-4">
            Guest
          </p>
          <p>{result.guest_id}</p>
        </div>

        {/* DATE */}
        <div className="text-zinc-500 text-sm">
          Completed at:{" "}
          {new Date(
            result.completed_at
          ).toLocaleString()}
        </div>
      </div>
    </main>
  );
}