import { MyEventsPage } from "@/pages/MyEventsPage";
import { MainPage } from "../pages/MainPage";
import type { TRoute } from "../types";
import { RegisteredEventsPage } from "@/pages/RegisteredEventsPage";
import { EventDetailsPage } from "@/pages/EventDetailsPage";

export enum EAdminRoutes {
  MAIN = "main",
  MY_EVENTS = "my_events",
  REGISTERED_EVENTS = "registered_events",
  EVENT_DETAILS = "event_details",
  SETTINGS = "settings",
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.MAIN]: "/",
  [EAdminRoutes.MY_EVENTS]: "/my-events",
  [EAdminRoutes.REGISTERED_EVENTS]: "/registered-events",
  [EAdminRoutes.EVENT_DETAILS]: "/event/:id",
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
  [EAdminRoutes.REGISTERED_EVENTS]: {
    path: AdminPaths[EAdminRoutes.REGISTERED_EVENTS],
    component: <RegisteredEventsPage />,
  },
  [EAdminRoutes.EVENT_DETAILS]: {
    path: AdminPaths[EAdminRoutes.EVENT_DETAILS],
    component: <EventDetailsPage />,
  },
  [EAdminRoutes.SETTINGS]: {
    path: AdminPaths[EAdminRoutes.SETTINGS],
    component: <div>Settings Page</div>,
  },
};
