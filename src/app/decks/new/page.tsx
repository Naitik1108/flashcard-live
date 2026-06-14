export default function NewDeckPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Create Deck
      </h1>

      <input
        placeholder="Deck Title"
        className="w-full p-3 mb-4 rounded bg-zinc-900"
      />

      <textarea
        placeholder="Description"
        className="w-full p-3 mb-4 rounded bg-zinc-900"
      />

      <button className="bg-blue-500 px-4 py-2 rounded-lg">
        Save Deck
      </button>
    </main>
  );
}