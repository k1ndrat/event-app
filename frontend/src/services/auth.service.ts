import { api } from "../lib/api";
import type { TAuthResponse, TLoginPayload, TUser } from "../types";

export const authService = {
  login: async (data: TLoginPayload): Promise<TAuthResponse> => {
    const response = await api.post<TAuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: TLoginPayload): Promise<TAuthResponse> => {
    const response = await api.post<TAuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  refresh: async (): Promise<TAuthResponse> => {
    const response = await api.post<TAuthResponse>("/auth/refresh");
    return response.data;
  },

  getMe: async (): Promise<TUser> => {
    const response = await api.get<TUser>("/auth/me");
    return response.data;
  },
};
