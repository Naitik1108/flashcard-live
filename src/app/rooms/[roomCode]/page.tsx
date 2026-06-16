"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";

import {
  revealCard,
  nextCard,
  isSessionComplete,
  completeSession,
} from "@/lib/sessionEngine";

import {
  getRoomByCode,
  setGuestReady,
  revealAnswer,
  updateCurrentCard,
} from "@/lib/rooms";

import { getDeckCards } from "@/lib/cards";

export default function RoomPage() {
  const { roomCode } = useParams();
  const { user } = useUser();

  const [room, setRoom] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [isHost, setIsHost] = useState(false);

  const [loading, setLoading] = useState(true);

  // ---------- LOAD ROOM ----------
  async function loadRoom() {
    const { data: roomData } = await getRoomByCode(
      roomCode as string
    );

    setRoom(roomData);

    if (!roomData) return;

    const { data: deckCards } = await getDeckCards(
      roomData.deck_id
    );

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
    await revealAnswer(room.id, true);
  }

  async function handleNext() {
    await updateCurrentCard(
      room.id,
      room.current_card_index + 1
    );
  }

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

          <button
            onClick={() => setIsHost(!isHost)}
            className="border border-zinc-700 px-3 py-1 rounded"
          >
            {isHost ? "Host" : "Student"}
          </button>
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

            {room.guest_ready && !room.revealed && (
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