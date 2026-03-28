import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import type { TRoute } from "../types";

export enum EGuestRoutes {
  SIGNUP = "Signup",
  LOGIN = "Login",
}

export const GuestPaths: Record<EGuestRoutes, string> = {
  [EGuestRoutes.SIGNUP]: "/signup",
  [EGuestRoutes.LOGIN]: "/login",
};

export const GuestRoutes: Record<EGuestRoutes, TRoute> = {
  [EGuestRoutes.SIGNUP]: {
    path: GuestPaths[EGuestRoutes.SIGNUP],
    component: <SignupPage />,
  },
  [EGuestRoutes.LOGIN]: {
    path: GuestPaths[EGuestRoutes.LOGIN],
    component: <LoginPage />,
  },
};
