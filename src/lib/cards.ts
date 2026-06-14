import { supabase } from "./supabase";

export async function createCard(
  deckId: string,
  question: string,
  answer: string
) {
  return supabase
    .from("cards")
    .insert({
      deck_id: deckId,
      question,
      answer,
    })
    .select()
    .single();
}

export async function getDeckCards(
  deckId: string
) {
  return supabase
    .from("cards")
    .select("*")
    .eq("deck_id", deckId);
}