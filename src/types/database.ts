export interface Deck {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  is_public: boolean;
  created_at?: string;
}

export interface Card {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
}