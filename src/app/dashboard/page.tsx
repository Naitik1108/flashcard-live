"use client";

import Link from "next/link";
import { Page, Header, Card, CardTitle, CardDesc } from "@/components/ui";

export default function DashboardPage() {
  return (
    <Page>
      <Header
        title="FlashCard Live"
        subtitle="1-on-1 real-time learning system"
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Link href="/decks/new">
          <Card>
            <CardTitle>Create Deck</CardTitle>
            <CardDesc>Build flashcard sets instantly</CardDesc>
          </Card>
        </Link>

        <Link href="/decks">
          <Card>
            <CardTitle>My Decks</CardTitle>
            <CardDesc>Manage your learning content</CardDesc>
          </Card>
        </Link>

        <Link href="/rooms/create">
          <Card>
            <CardTitle>Live Room</CardTitle>
            <CardDesc>1-on-1 real-time sessions</CardDesc>
          </Card>
        </Link>

        <Link href="/solo">
          <Card>
            <CardTitle>Solo Practice</CardTitle>
            <CardDesc>Self-paced learning mode</CardDesc>
          </Card>
        </Link>
      </div>
    </Page>
  );
}