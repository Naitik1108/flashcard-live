export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-4">
        FlashCard Live
      </h1>

      <p className="text-center text-zinc-400 max-w-md mb-8">
        Realtime flashcards for CA students.
      </p>

      <div className="flex gap-4">
        <button className="bg-blue-500 px-6 py-3 rounded-xl">
          Login
        </button>

        <button className="border border-white px-6 py-3 rounded-xl">
          Sign Up
        </button>
      </div>
    </main>
  );
}