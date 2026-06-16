export interface Room {
  id: string;
  deck_id: string;

  code: string;

  status: string;

  current_card_index: number;

  host_id: string;

  guest_id: string | null;

  guest_ready: boolean;

  revealed: boolean;

  created_at: string;
}