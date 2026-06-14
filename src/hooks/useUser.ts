"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth/auth";

export function useUser() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return user;
}