"use client";

import { useState } from "react";

import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { useTransacoes } from "@/hooks/useTransacoes";
import { formatarData, formatarMoeda } from "@/lib/format";

type Filtro = "todas" | "income" | "expense";

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "income", rotulo: "Receitas" },
  { valor: "expense", rotulo: "Despesas" },
];

export default function TransacoesPage() {
  const { transacoes, recarregar } = useTransacoes();
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const visiveis =
    filtro === "todas"
      ? transacoes
      : transacoes.filter((t) => t.type === filtro);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transações</h1>

        <NewTransactionModal onCreated={recarregar} />
      </div>

      <div className="mt-8 flex gap-2">
        {filtros.map((f) => (
          <button
            key={f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium ${
              filtro === f.valor
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      <div className="bg-card mt-6 rounded-2xl border">
        {visiveis.length === 0 ? (
          <p className="text-muted-foreground p-6 text-center">
            Nenhuma transação encontrada.
          </p>
        ) : (
          visiveis.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between border-b p-4 last:border-b-0"
            >
              <div>
                <p className="font-medium">{t.title}</p>
                <p className="text-muted-foreground text-sm">
                  {t.category} · {formatarData(t.createdAt)}
                </p>
              </div>

              <p
                className={`font-semibold ${
                  t.type === "income" ? "text-income" : "text-expense"
                }`}
              >
                {t.type === "income" ? "+ " : "− "}
                {formatarMoeda(t.amount)}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
