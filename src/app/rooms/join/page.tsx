"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinRoomPage() {
  const router = useRouter();

  const [roomCode, setRoomCode] =
    useState("");

  const [name, setName] =
    useState("");

  function joinRoom() {
    if (!roomCode.trim()) {
      alert("Enter room code");
      return;
    }

    if (!name.trim()) {
      alert("Enter your name");
      return;
    }

    router.push(
      `/rooms/${roomCode.toUpperCase()}`
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Join Room
        </h1>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Your Name"
            className="w-full mb-4 rounded-xl border border-zinc-800 bg-black p-3"
          />

          <input
            value={roomCode}
            onChange={(e) =>
              setRoomCode(e.target.value)
            }
            placeholder="Room Code"
            className="w-full mb-6 rounded-xl border border-zinc-800 bg-black p-3"
          />

          <button
            onClick={joinRoom}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3"
          >
            Join Room
          </button>
        </div>
      </div>
    </main>
  );
}