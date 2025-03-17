import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: any | null; // Use null instead of undefined
  token: string | null; // Specify that token is a string
  setUser: (user: any | null) => void;
  setToken: (token: string | null) => void;
}

const useAuth = create<AuthStore, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => {
        set({ user });
      },
      setToken: (token) => {
        set({ token });
      },
      removeToken: () => {
        set({ token: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : sessionStorage
      ),
    }
  )
);

export default useAuth;
