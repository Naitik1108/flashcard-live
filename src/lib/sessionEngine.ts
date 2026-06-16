import { supabase } from "./supabase";

/**
 * Reveal answer
 */
export async function revealCard(roomId: string) {
  return supabase
    .from("rooms")
    .update({ revealed: true })
    .eq("id", roomId);
}

/**
 * Move to next card + reset state
 */
export async function nextCard(
  room: any,
  cards: any[]
) {
  const nextIndex =
    room.current_card_index + 1;

  return supabase
    .from("rooms")
    .update({
      current_card_index: nextIndex,
      revealed: false,
      guest_ready: false,
    })
    .eq("id", room.id);
}

/**
 * Check if session is finished
 */
export function isSessionComplete(
  room: any,
  cards: any[]
) {
  return (
    room.current_card_index >=
    cards.length - 1
  );
}

/**
 * Save final session result
 */
export async function completeSession(
  room: any,
  session: any
) {
  const correct = session.correct_count;
  const total = session.total_cards;

  const accuracy =
    total === 0
      ? 0
      : Math.round((correct / total) * 100);

  const { data } = await supabase
    .from("session_results")
    .insert({
      room_id: room.id,
      deck_id: room.deck_id,
      host_id: room.host_id,
      guest_id: room.guest_id,
      correct_count: correct,
      total_cards: total,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  // mark room finished
  await supabase
    .from("rooms")
    .update({ status: "completed" })
    .eq("id", room.id);

  return {
    accuracy,
    data,
  };
}