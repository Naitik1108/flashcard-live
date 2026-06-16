"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { getCurrentUser } from "@/lib/auth/auth";

export function useUser() {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      setLoading(false);
    }

    loadUser();
  }, []);

  return {
    user,
    loading,
  };
}