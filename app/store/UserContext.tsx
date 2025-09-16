"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserProfile = {
  display_name: string;
  email: string;
  id: string;
  images: { url: string }[];
};

type UserState = UserProfile | null | "loading";

const UserContext = createContext<UserState>("loading");

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>("loading");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
