import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { Loader } from "./components/Loader";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./layouts/Sidebar";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/auth.store";

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
        <Toaster position="top-right" />
      </main>

      <Loader isVisible={isLoading} />
    </div>
  );
}

export default App;
