import { MainPage } from "../pages/MainPage";
import type { TRoute } from "../types";

export enum EAdminRoutes {
  MAIN = "main",
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.MAIN]: "/",
};

export const AdminRoutes: Record<EAdminRoutes, TRoute> = {
  [EAdminRoutes.MAIN]: {
    path: AdminPaths[EAdminRoutes.MAIN],
    component: <MainPage />,
  },
};
