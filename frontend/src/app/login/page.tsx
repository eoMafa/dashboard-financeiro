"use client";

import { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      router.push("/");
    } catch (error) {
      console.log(error);

      alert("Invalid credentials");
    }
  }

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-2xl border p-8">
        <h1 className="text-foreground mb-6 text-3xl font-bold">Login</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-muted text-foreground h-12 w-full rounded-xl border px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-muted text-foreground h-12 w-full rounded-xl border px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-primary text-primary-foreground h-12 w-full rounded-xl font-semibold transition hover:opacity-90"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
