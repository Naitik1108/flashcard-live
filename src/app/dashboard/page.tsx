import Link from "next/link";

export default function DashboardPage() {
  const items = [
    {
      title: "Create Deck",
      href: "/decks/new",
    },
    {
      title: "Created Decks",
      href: "/decks",
    },
    {
      title: "Room",
      href: "/rooms/create",
    },
    {
      title: "Solo Practice",
      href: "/solo",
    },
    {
      title: "Profile",
      href: "/profile",
    },
    {
      title: "History",
      href: "/history",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </main>
  );
}