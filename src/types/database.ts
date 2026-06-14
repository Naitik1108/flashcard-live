export interface Deck {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  is_public: boolean;
}

export interface Card {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
}

export interface Room {
  id: string;
  room_code: string;
  deck_id: string;
  host_id: string;
  guest_id: string | null;
  revealed: boolean;
}