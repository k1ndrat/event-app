import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import type {
  TAuthResponse,
  TBackendErrorResponse,
  TLoginPayload,
  TRegisterPayload,
} from "../types";
import { useAuthStore } from "../store/auth.store";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const { loginSuccess } = useAuthStore();

  return useMutation<
    TAuthResponse,
    AxiosError<TBackendErrorResponse>,
    TLoginPayload
  >({
    mutationFn: (data: TLoginPayload) => authService.login(data),
    onSuccess: async (data: TAuthResponse) => {
      const user = await authService.getMe();
      loginSuccess(data.accessToken, user);
    },
  });
};

export const useRegister = () => {
  const { loginSuccess } = useAuthStore();

  return useMutation<
    TAuthResponse,
    AxiosError<TBackendErrorResponse>,
    TRegisterPayload
  >({
    mutationFn: (data: TRegisterPayload) => authService.register(data),
    onSuccess: async (data) => {
      const user = await authService.getMe();
      loginSuccess(data.accessToken, user);
    },
  });
};

export const useLogout = () => {
  const { logoutSuccess } = useAuthStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutSuccess();
    },
    onSettled: () => {
      logoutSuccess();
    },
  });
};
