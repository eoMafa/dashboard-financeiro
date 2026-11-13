"use client";

import { useState } from "react";

import { api } from "@/services/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CATEGORIAS } from "@/lib/categorias";

export function NewTransactionModal({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Salary");

  async function handleCreateTransaction() {
    try {
      await api.post("/transactions", {
        title,
        amount: Number(amount),
        type,
        category,
      });

      setTitle("");
      setAmount("");

      onCreated();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary text-primary-foreground rounded-xl px-4 py-2 font-medium transition hover:opacity-90">
          + Nova Transação
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-muted w-full rounded-xl border px-4 py-3"
          />

          <input
            placeholder="Valor"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-muted w-full rounded-xl border px-4 py-3"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-muted w-full rounded-xl border px-4 py-3"
          >
            <option value="income">Receita</option>

            <option value="expense">Despesa</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-muted w-full rounded-xl border px-4 py-3"
          >
            {CATEGORIAS.map((categoria) => (
              <option key={categoria.valor} value={categoria.valor}>
                {categoria.rotulo}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateTransaction}
            className="bg-primary text-primary-foreground w-full rounded-xl py-3 font-semibold transition hover:opacity-90"
          >
            Salvar Transação
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
