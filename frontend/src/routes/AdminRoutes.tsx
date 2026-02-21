import { CreateEventPage } from "@/pages/CreateEventPage";
import { EditEventPage } from "@/pages/EditEventPage";
import { EventDetailsPage } from "@/pages/EventDetailsPage";
import { MyEventsPage } from "@/pages/MyEventsPage";
import { RegisteredEventsPage } from "@/pages/RegisteredEventsPage";
import { MainPage } from "../pages/MainPage";
import type { TRoute } from "../types";

export enum EAdminRoutes {
  MAIN = "main",
  MY_EVENTS = "my_events",
  REGISTERED_EVENTS = "registered_events",
  EVENT_DETAILS = "event_details",
  CREATE_EVENT = "create_event",
  EDIT_EVENT = "edit_event",
  SETTINGS = "settings",
}

export const AdminPaths: Record<EAdminRoutes, string> = {
  [EAdminRoutes.MAIN]: "/",
  [EAdminRoutes.MY_EVENTS]: "/my-events",
  [EAdminRoutes.REGISTERED_EVENTS]: "/registered-events",
  [EAdminRoutes.EVENT_DETAILS]: "/event/:id",
  [EAdminRoutes.CREATE_EVENT]: "/event/create",
  [EAdminRoutes.EDIT_EVENT]: "/event/:id/edit",
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
  [EAdminRoutes.CREATE_EVENT]: {
    path: AdminPaths[EAdminRoutes.CREATE_EVENT],
    component: <CreateEventPage />,
  },
  [EAdminRoutes.EDIT_EVENT]: {
    path: AdminPaths[EAdminRoutes.EDIT_EVENT],
    component: <EditEventPage />,
  },
  [EAdminRoutes.SETTINGS]: {
    path: AdminPaths[EAdminRoutes.SETTINGS],
    component: <div>Settings Page</div>,
  },
};
