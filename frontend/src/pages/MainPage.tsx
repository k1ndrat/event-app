import { useAuthStore } from "../store/auth.store";
import { useLogout } from "../hooks/useAuth";

export const MainPage = () => {
  const { user } = useAuthStore();

  const { mutate: logout, isPending } = useLogout();

  if (!user) {
    return null;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Main page</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "1.5rem",
          maxWidth: "400px",
          marginBottom: "1.5rem",
        }}
      >
        <h2>Hello, {user.name}! 👋</h2>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>ID:</strong>{" "}
          <code style={{ background: "#000", padding: "2px 4px" }}>
            {user._id}
          </code>
        </p>
        <p>
          <strong>CreatedAt:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => logout()}
        disabled={isPending}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          backgroundColor: isPending ? "#ccc" : "#ff4d4f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      >
        {isPending ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
};
