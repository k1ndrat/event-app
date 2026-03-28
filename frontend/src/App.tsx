import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/auth.store";
import { Loader } from "./components/Loader/Loader";

function App() {
  const { isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="App">
      <main>
        <AppRouter />
      </main>

      <Loader isVisible={isLoading} />
    </div>
  );
}

export default App;
