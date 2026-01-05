import React, { useState } from "react";
import { useRegister } from "../hooks/useAuth";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: register, isPending, isError, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Sign Up"}
      </button>

      {isError && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {error.response?.data.message}
        </div>
      )}
    </form>
  );
};
