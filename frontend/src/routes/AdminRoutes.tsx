import { MainPage } from "../pages/MainPage";
import type { TRoute } from "../types";

export enum EAdminRoutes {
  MAIN = "main",
  SETTINGS = "settings",
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.MAIN]: "/",
  [EAdminRoutes.SETTINGS]: "/settings",
};

export const AdminRoutes: Record<EAdminRoutes, TRoute> = {
  [EAdminRoutes.MAIN]: {
    path: AdminPaths[EAdminRoutes.MAIN],
    component: <MainPage />,
  },
  [EAdminRoutes.SETTINGS]: {
    path: AdminPaths[EAdminRoutes.SETTINGS],
    component: <div>Settings Page</div>,
  },
};
