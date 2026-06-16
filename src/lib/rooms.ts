import { supabase } from "./supabase";

export async function createRoom(
  deckId: string,
  hostId: string,
  code: string
) {
  return supabase
    .from("rooms")
    .insert({
      deck_id: deckId,
      host_id: hostId,
      code,
      status: "waiting",
      current_card_index: 0,
      guest_ready: false,
      revealed: false,
    })
    .select()
    .single();
}

export async function getRoomByCode(
  code: string
) {
  return supabase
    .from("rooms")
    .select("*")
    .eq("code", code)
    .single();
}

export async function joinRoom(
  roomId: string,
  guestId: string
) {
  return supabase
    .from("rooms")
    .update({
      guest_id: guestId,
      status: "active",
    })
    .eq("id", roomId);
}

export async function setGuestReady(
  roomId: string,
  ready: boolean
) {
  return supabase
    .from("rooms")
    .update({
      guest_ready: ready,
    })
    .eq("id", roomId);
}

export async function revealAnswer(
  roomId: string,
  revealed: boolean
) {
  return supabase
    .from("rooms")
    .update({
      revealed,
    })
    .eq("id", roomId);
}

export async function updateCurrentCard(
  roomId: string,
  index: number
) {
  return supabase
    .from("rooms")
    .update({
      current_card_index: index,
      revealed: false,
      guest_ready: false,
    })
    .eq("id", roomId);
}

export async function finishRoom(
  roomId: string
) {
  return supabase
    .from("rooms")
    .update({
      status: "completed",
    })
    .eq("id", roomId);
}