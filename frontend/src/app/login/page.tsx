"use client";

import { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      router.push("/");
    } catch (error) {
      console.log(error);

      alert("Invalid credentials");
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 text-white"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 rounded-xl bg-zinc-900 border border-zinc-800 px-4 text-white"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-xl bg-orange-500 text-black font-semibold hover:opacity-90 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}