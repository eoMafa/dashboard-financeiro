"use client";

import { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { api } from "@/services/api";

import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function handleCadastro() {
    setErro(null);

    try {
      await api.post("/auth/register", {
        name: nome,
        email,
        password,
      });

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      router.push("/");
    } catch (error) {
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;

      if (status === 400) {
        setErro(
          "Preencha o nome, um e-mail válido e uma senha com pelo menos 6 caracteres.",
        );
      } else if (status === 409) {
        setErro("Este e-mail já está cadastrado.");
      } else {
        setErro("Não foi possível conectar ao servidor. Tente novamente.");
      }
    }
  }

  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-2xl border p-8">
        <h1 className="text-foreground mb-6 text-3xl font-bold">Criar conta</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            className="bg-muted text-foreground h-12 w-full rounded-xl border px-4"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            className="bg-muted text-foreground h-12 w-full rounded-xl border px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-muted text-foreground h-12 w-full rounded-xl border px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleCadastro}
            className="bg-primary text-primary-foreground h-12 w-full rounded-xl font-semibold transition hover:opacity-90"
          >
            Criar conta
          </button>
          {erro && <p className="text-destructive text-sm">{erro}</p>}

          <p className="text-muted-foreground text-center text-sm">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
