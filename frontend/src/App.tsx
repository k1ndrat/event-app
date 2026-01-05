import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/auth.store";
import { Loader } from "./components/Loader/Loader";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./layouts/Sidebar";

function App() {
  const { isLoading, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="App">
      <main>
        {isAuthenticated ? (
          <SidebarProvider>
            <AppSidebar />
            <AppRouter />
          </SidebarProvider>
        ) : (
          <AppRouter />
        )}
      </main>

      <Loader isVisible={isLoading} />
    </div>
  );
}

export default App;
