"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const params = useParams();

  const roomCode =
    params.roomCode as string;

  const [isHost, setIsHost] =
    useState(true);

  const [ready, setReady] =
    useState(false);

  const [revealed, setRevealed] =
    useState(false);

  const [correct, setCorrect] =
    useState(0);

  const [wrong, setWrong] =
    useState(0);

  const sampleCard = {
    question:
      "What is the Capital of India?",
    answer: "New Delhi",
  };

  function markCorrect() {
    setCorrect((prev) => prev + 1);

    setReady(false);
    setRevealed(false);
  }

  function markWrong() {
    setWrong((prev) => prev + 1);

    setReady(false);
    setRevealed(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Room {roomCode}
            </h1>

            <p className="text-zinc-500 mt-2">
              FlashCard Live Session
            </p>
          </div>

          <button
            onClick={() =>
              setIsHost(!isHost)
            }
            className="rounded-xl border border-zinc-800 px-4 py-2"
          >
            {isHost
              ? "Host View"
              : "Student View"}
          </button>
        </div>

        {/* Score */}

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-green-900 bg-zinc-950 p-6">
            <p className="text-zinc-500">
              Correct
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {correct}
            </h2>
          </div>

          <div className="rounded-2xl border border-red-900 bg-zinc-950 p-6">
            <p className="text-zinc-500">
              Wrong
            </p>

            <h2 className="text-3xl font-bold text-red-400">
              {wrong}
            </h2>
          </div>
        </div>

        {/* Card */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <div className="text-sm text-zinc-500 mb-4">
            Question
          </div>

          <h2 className="text-3xl font-semibold mb-8">
            {sampleCard.question}
          </h2>

          {/* Student */}

          {!isHost && (
            <>
              {!ready && (
                <button
                  onClick={() =>
                    setReady(true)
                  }
                  className="w-full rounded-xl border border-zinc-800 p-4"
                >
                  I'm Ready
                </button>
              )}

              {ready && !revealed && (
                <div className="rounded-xl border border-zinc-800 p-4 text-center text-zinc-400">
                  Waiting for host to reveal
                  answer...
                </div>
              )}

              {revealed && (
                <div className="rounded-xl border border-zinc-800 p-6 mt-4">
                  <p className="text-zinc-500 mb-2">
                    Correct Answer
                  </p>

                  <h3 className="text-2xl font-bold">
                    {sampleCard.answer}
                  </h3>
                </div>
              )}
            </>
          )}

          {/* Host */}

          {isHost && (
            <>
              <div className="rounded-xl border border-zinc-800 p-4 mb-4">
                Student Status:{" "}
                <span className="font-medium">
                  {ready
                    ? "Ready"
                    : "Thinking"}
                </span>
              </div>

              {!revealed && (
                <button
                  onClick={() =>
                    setRevealed(true)
                  }
                  className="w-full rounded-xl border border-zinc-800 p-4 mb-4"
                >
                  Reveal Answer
                </button>
              )}

              {revealed && (
                <>
                  <div className="rounded-xl border border-zinc-800 p-6 mb-4">
                    <p className="text-zinc-500 mb-2">
                      Answer
                    </p>

                    <h3 className="text-2xl font-bold">
                      {sampleCard.answer}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={
                        markCorrect
                      }
                      className="rounded-xl border border-green-900 p-4 text-green-400"
                    >
                      Correct
                    </button>

                    <button
                      onClick={markWrong}
                      className="rounded-xl border border-red-900 p-4 text-red-400"
                    >
                      Wrong
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}