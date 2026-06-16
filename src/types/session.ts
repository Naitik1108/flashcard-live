export interface SessionResult {
  id: string;

  room_id: string;

  deck_id: string;

  host_id: string;

  guest_id: string;

  correct_count: number;

  total_cards: number;

  accuracy: number;

  completed_at: string;
}