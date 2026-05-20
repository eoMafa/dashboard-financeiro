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

export function NewTransactionModal({
  onCreated,
}: {
  onCreated: () => void;
}) {
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
        <button className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-zinc-200 transition">
          + Nova Transação
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>
            Nova Transação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <input
            placeholder="Valor"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          >
            <option value="income">
              Receita
            </option>

            <option value="expense">
              Despesa
            </option>
          </select>

          <select
            value={category}
            onChange={(e) =>
                setCategory(e.target.value)
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
            >
            <option value="Salary">
                Salário
            </option>

            <option value="Food">
                Alimentação
            </option>

            <option value="Transport">
                Transporte
            </option>

            <option value="Investment">
                Investimento
            </option>

            <option value="Pix">
                Pix
            </option>

            <option value="Credit Card">
                Cartão
            </option>
          </select>

          <button
            onClick={handleCreateTransaction}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl transition"
          >
            Salvar Transação
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}