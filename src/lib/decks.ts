import { supabase } from "./supabase";

function generateShareCode() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

export async function createDeck(
  title: string,
  description: string,
  ownerId: string
) {
  return supabase
    .from("decks")
    .insert({
      title,
      description,
      owner_id: ownerId,
      share_code: generateShareCode(),
    })
    .select()
    .single();
}

export async function getMyDecks(
  ownerId: string
) {
  return supabase
    .from("decks")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", {
      ascending: false,
    });
}

export async function getDeckById(
  deckId: string
) {
  return supabase
    .from("decks")
    .select("*")
    .eq("id", deckId)
    .single();
}

export async function getDeckByCode(
  shareCode: string
) {
  return supabase
    .from("decks")
    .select("*")
    .eq("share_code", shareCode)
    .single();
}

export async function deleteDeck(
  deckId: string
) {
  return supabase
    .from("decks")
    .delete()
    .eq("id", deckId);
}