import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* header */}
      <div className="glass p-6">
        <h1 className="text-4xl font-semibold">
          FlashCard Live
        </h1>
        <p className="text-white/60 mt-2">
          Learn faster with spaced repetition + live rooms
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/decks/new" className="glass p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-medium">Create Deck</h2>
          <p className="text-white/60 text-sm mt-1">
            Build flashcards
          </p>
        </Link>

        <Link href="/decks" className="glass p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-medium">My Decks</h2>
          <p className="text-white/60 text-sm mt-1">
            View saved decks
          </p>
        </Link>

        <Link href="/rooms/create" className="glass p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-medium">Live Room</h2>
          <p className="text-white/60 text-sm mt-1">
            1v1 flashcard battle
          </p>
        </Link>

        <Link href="/public-decks" className="glass p-6 hover:scale-[1.02] transition">
          <h2 className="text-xl font-medium">Explore</h2>
          <p className="text-white/60 text-sm mt-1">
            Public decks library
          </p>
        </Link>
      </div>
    </div>
  );
}