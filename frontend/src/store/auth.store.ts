import { create } from "zustand";
import { authService } from "../services/auth.service";
import { setAccessToken } from "../lib/api";
import { devtools } from "zustand/middleware";
import type { TUser } from "../types";

type TAuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TUser | null;

  loginSuccess: (token: string, user: TUser) => void;
  logoutSuccess: () => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<TAuthState>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,

      loginSuccess: (token: string, user: TUser) => {
        setAccessToken(token);
        set({ isAuthenticated: true, user });
      },

      logoutSuccess: () => {
        setAccessToken(null);
        set({ isAuthenticated: false, user: null });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { accessToken } = await authService.refresh();
          setAccessToken(accessToken);

          const user = await authService.getMe();

          set({ isAuthenticated: true, user });
        } catch {
          setAccessToken(null);
          set({ isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "AuthStore" }
  )
);
