import { Navigate, Route, Routes } from "react-router-dom";
import { AdminPaths, AdminRoutes, EAdminRoutes } from "./AdminRoutes.tsx";
import { EGuestRoutes, GuestPaths, GuestRoutes } from "./GuestRoutes.tsx";
import { useAuthStore } from "../store/auth.store.ts";

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      {isAuthenticated
        ? Object.entries(AdminRoutes).map(([key, route]) => (
            <Route
              key={`route-${key}`}
              path={route.path}
              element={route.component}
            />
          ))
        : Object.entries(GuestRoutes).map(([key, route]) => (
            <Route
              key={`route-${key}`}
              path={route.path}
              element={route.component}
            />
          ))}

      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? AdminPaths[EAdminRoutes.MAIN]
                : GuestPaths[EGuestRoutes.LOGIN]
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
