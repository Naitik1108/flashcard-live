export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid gap-4">
        <div className="p-4 rounded-xl border border-zinc-800">
          Create Deck
        </div>

        <div className="p-4 rounded-xl border border-zinc-800">
          My Decks
        </div>

        <div className="p-4 rounded-xl border border-zinc-800">
          Public Decks
        </div>

        <div className="p-4 rounded-xl border border-zinc-800">
          Study History
        </div>
      </div>
    </main>
  );
}