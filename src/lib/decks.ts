import { supabase } from "./supabase";

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
      is_public: true,
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