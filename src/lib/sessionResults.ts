import { supabase } from "./supabase";

export async function createSessionResult(
  roomId: string,
  deckId: string,
  hostId: string,
  guestId: string,
  correctCount: number,
  totalCards: number
) {
  const accuracy =
    totalCards === 0
      ? 0
      : Math.round(
          (correctCount / totalCards) * 100
        );

  return supabase
    .from("session_results")
    .insert({
      room_id: roomId,
      deck_id: deckId,
      host_id: hostId,
      guest_id: guestId,
      correct_count: correctCount,
      total_cards: totalCards,
      accuracy,
    })
    .select()
    .single();
}

export async function getUserSessions(
  userId: string
) {
  return supabase
    .from("session_results")
    .select("*")
    .or(
      `host_id.eq.${userId},guest_id.eq.${userId}`
    )
    .order("completed_at", {
      ascending: false,
    });
}

export async function getHostedSessions(
  userId: string
) {
  return supabase
    .from("session_results")
    .select("*")
    .eq("host_id", userId)
    .order("completed_at", {
      ascending: false,
    });
}

export async function getGuestSessions(
  userId: string
) {
  return supabase
    .from("session_results")
    .select("*")
    .eq("guest_id", userId)
    .order("completed_at", {
      ascending: false,
    });
}

export async function getSessionByRoom(
  roomId: string
) {
  return supabase
    .from("session_results")
    .select("*")
    .eq("room_id", roomId)
    .single();
}