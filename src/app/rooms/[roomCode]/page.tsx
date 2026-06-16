"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

import {
  getRoomByCode,
  setGuestReady,
} from "@/lib/rooms";

import { getDeckCards } from "@/lib/cards";

import {
  revealCard,
  nextCard,
  isSessionComplete,
  completeSession,
} from "@/lib/sessionEngine";

export default function RoomPage() {
  const { roomCode } = useParams();
  const { user } = useUser();

  const [room, setRoom] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [isHost, setIsHost] = useState(false);

  const [loading, setLoading] = useState(true);

  const [session, setSession] = useState({
    correct_count: 0,
    total_cards: 0,
  });

  // ---------- LOAD ROOM ----------
  async function loadRoom() {
    const { data: roomData } =
      await getRoomByCode(roomCode as string);

    if (!roomData) return;

    setRoom(roomData);

    const { data: deckCards } =
      await getDeckCards(roomData.deck_id);

    setCards(deckCards || []);

    setIsHost(roomData.host_id === user?.id);

    setLoading(false);
  }

  useEffect(() => {
    if (!roomCode || !user) return;

    loadRoom();
  }, [roomCode, user]);

  // ---------- REALTIME ----------
  useEffect(() => {
    if (!room?.id) return;

    const channel = supabase
      .channel(`room-${room.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${room.id}`,
        },
        (payload) => {
          setRoom(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [room?.id]);

  // ---------- ACTIONS ----------
  async function handleReady() {
    await setGuestReady(room.id, true);
  }

  async function handleReveal() {
    await revealCard(room.id);
  }

  async function handleNext() {
    const complete = isSessionComplete(
      room,
      cards
    );

    if (complete) {
      const result = await completeSession(
        room,
        session
      );

      alert(
        `Session Complete! Accuracy: ${result.accuracy}%`
      );

      return;
    }

    await nextCard(room, cards);
  }

  function markCorrect() {
    setSession((prev) => ({
      ...prev,
      correct_count: prev.correct_count + 1,
      total_cards: prev.total_cards + 1,
    }));
  }

  function markWrong() {
    setSession((prev) => ({
      ...prev,
      total_cards: prev.total_cards + 1,
    }));
  }

  // ---------- UI STATES ----------
  if (loading || !room) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Loading room...
      </main>
    );
  }

  const currentCard =
    cards[room.current_card_index];

  if (!currentCard) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        Session Completed 🎉
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Room: {room.code}
          </h1>

          <div className="text-zinc-400">
            {isHost ? "Host" : "Student"}
          </div>
        </div>

        {/* QUESTION */}
        <div className="border border-zinc-800 p-6 rounded-xl">
          <p className="text-zinc-400 mb-2">
            Question
          </p>

          <h2 className="text-2xl font-bold">
            {currentCard.question}
          </h2>
        </div>

        {/* STUDENT VIEW */}
        {!isHost && (
          <div className="space-y-4">
            {!room.guest_ready && (
              <button
                onClick={handleReady}
                className="w-full bg-blue-600 p-3 rounded"
              >
                I'm Ready
              </button>
            )}

            {room.guest_ready &&
              !room.revealed && (
                <div className="text-zinc-400 text-center">
                  Waiting for host to reveal...
                </div>
              )}

            {room.revealed && (
              <div className="border border-zinc-800 p-4 rounded">
                <p className="text-zinc-400">
                  Answer
                </p>
                <h3 className="text-xl font-bold">
                  {currentCard.answer}
                </h3>
              </div>
            )}
          </div>
        )}

        {/* HOST VIEW */}
        {isHost && (
          <div className="space-y-4">

            <div className="text-zinc-400">
              Student Ready:{" "}
              {room.guest_ready ? "Yes" : "No"}
            </div>

            {!room.revealed && (
              <button
                onClick={handleReveal}
                className="w-full bg-green-600 p-3 rounded"
              >
                Reveal Answer
              </button>
            )}

            {room.revealed && (
              <>
                <div className="border border-zinc-800 p-4 rounded">
                  <p className="text-zinc-400">
                    Answer
                  </p>
                  <h3 className="text-xl font-bold">
                    {currentCard.answer}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={markCorrect}
                    className="bg-green-600 p-3 rounded"
                  >
                    Correct
                  </button>

                  <button
                    onClick={markWrong}
                    className="bg-red-600 p-3 rounded"
                  >
                    Wrong
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-blue-600 p-3 rounded"
                >
                  Next Card
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}