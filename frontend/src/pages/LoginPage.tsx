import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";

export const LoginPage = () => {
  const [email, setEmail] = useState("haker0@ukr.net");
  const [password, setPassword] = useState("Qwerty321!");

  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>

      {isError && (
        <div style={{ color: "red" }}>{error.response?.data.message}</div>
      )}
    </form>
  );
};
