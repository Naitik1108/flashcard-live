import { supabase } from "../supabase";

export async function signUp(
  email: string,
  password: string,
  fullName: string
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

  if (error || !data.user) {
    return { data, error };
  }

  // IMPORTANT: create profile row
  await supabase.from("profiles").insert({
    id: data.user.id,
    email: email,
    full_name: fullName,
    created_at: new Date().toISOString(),
  });

  return { data, error: null };
}

export async function signIn(
  email: string,
  password: string
) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}