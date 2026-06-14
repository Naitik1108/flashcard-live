export default function JoinRoomPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Join Room
      </h1>

      <input
        placeholder="Room Code"
        className="w-full p-3 rounded bg-zinc-900"
      />
    </main>
  );
}