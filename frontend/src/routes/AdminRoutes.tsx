import { MyEventsPage } from "@/pages/MyEventsPage";
import { MainPage } from "../pages/MainPage";
import type { TRoute } from "../types";

export enum EAdminRoutes {
  MAIN = "main",
  MY_EVENTS = "my_events",
  SETTINGS = "settings",
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.MAIN]: "/",
  [EAdminRoutes.MY_EVENTS]: "/my-events",
  [EAdminRoutes.SETTINGS]: "/settings",
};

export const AdminRoutes: Record<EAdminRoutes, TRoute> = {
  [EAdminRoutes.MAIN]: {
    path: AdminPaths[EAdminRoutes.MAIN],
    component: <MainPage />,
  },
  [EAdminRoutes.MY_EVENTS]: {
    path: AdminPaths[EAdminRoutes.MY_EVENTS],
    component: <MyEventsPage />,
  },
  [EAdminRoutes.SETTINGS]: {
    path: AdminPaths[EAdminRoutes.SETTINGS],
    component: <div>Settings Page</div>,
  },
};
