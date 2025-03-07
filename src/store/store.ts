import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: any | undefined;
  token: string | undefined;
  setUser: (_user: any | undefined) => void;
  setToken: (_token: string) => void;
}

const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      user: undefined,
      token: undefined,
      setUser: (user) => {
        set({ user: user });
      },
      setToken: (token) => {
        set({ token: token });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;
