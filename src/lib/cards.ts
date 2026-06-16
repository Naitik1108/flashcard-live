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

export async function createManyCards(
  cards: {
    deck_id: string;
    question: string;
    answer: string;
  }[]
) {
  return supabase
    .from("cards")
    .insert(cards);
}

export async function getDeckCards(
  deckId: string
) {
  return supabase
    .from("cards")
    .select("*")
    .eq("deck_id", deckId)
    .order("created_at", {
      ascending: true,
    });
}

export async function updateCard(
  cardId: string,
  question: string,
  answer: string
) {
  return supabase
    .from("cards")
    .update({
      question,
      answer,
    })
    .eq("id", cardId);
}

export async function deleteCard(
  cardId: string
) {
  return supabase
    .from("cards")
    .delete()
    .eq("id", cardId);
}