"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRoomByCode, joinRoom } from "@/lib/rooms";
import { useUser } from "@/hooks/useUser";

export default function JoinRoomPage() {
  const router = useRouter();
  const { user } = useUser();

  const [code, setCode] = useState("");

  async function handleJoin() {
    if (!user) return;

    if (!code) {
      alert("Enter room code");
      return;
    }

    const { data: room, error } =
      await getRoomByCode(code);

    if (error || !room) {
      alert("Room not found");
      return;
    }

    await joinRoom(room.id, user.id);

    router.push(`/rooms/${room.code}`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Join Room
      </h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Room Code"
        className="w-full p-3 rounded bg-zinc-900 mb-4"
      />

      <button
        onClick={handleJoin}
        className="w-full bg-green-600 p-3 rounded"
      >
        Join
      </button>
    </main>
  );
}