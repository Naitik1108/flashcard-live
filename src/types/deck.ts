export interface Deck {
  id: string;
  title: string;
  description: string;
  owner_id: string;
  share_code: string | null;
  created_at: string;
}