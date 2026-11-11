"use client";
import { Sidebar } from "@/components/layout/sidebar";
import { FinancialCard } from "@/components/dashboard/financial-card";
import { BalanceChart } from "@/components/charts/balance-chart";
import { Topbar } from "@/components/layout/topbar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { CategoryChart } from "@/components/charts/category-chart";
import { formatarMoeda } from "@/lib/format";
import type { Transacao } from "@/types/transacao";

export default function Home() {
  useAuth();
  const [transactions, setTransactions] = useState<Transacao[]>([]);
  async function loadTransactions() {
    try {
      const response = await api.get<Transacao[]>("/transactions");

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api
      .get<Transacao[]>("/transactions")
      .then((resposta) => setTransactions(resposta.data))
      .catch((erro) => console.log(erro));
  }, []);

  const hoje = new Date();

  const transacoesDoMes = transactions.filter((t) => {
    const data = new Date(t.createdAt);
    return (
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  });

  const income = transacoesDoMes
    .filter((t) => t.type === "income")
    .reduce((acc: number, item) => acc + item.amount, 0);

  const expense = transacoesDoMes
    .filter((t) => t.type === "expense")
    .reduce((acc: number, item) => acc + item.amount, 0);

  const balance = income - expense;
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-stretch md:flex-row">
      <Sidebar />

      <section className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground mt-2">
            Bem-vindo ao sistema financeiro.
          </p>

          <div className="mt-8 flex items-center justify-between">
            <div />

            <NewTransactionModal onCreated={loadTransactions} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <FinancialCard
              title="Saldo do mês"
              value={formatarMoeda(balance)}
            />

            <FinancialCard
              title="Receitas"
              value={formatarMoeda(income)}
              variant="income"
            />

            <FinancialCard
              title="Despesas"
              value={formatarMoeda(expense)}
              variant="expense"
            />
          </div>

          <BalanceChart transactions={transactions} />

          <CategoryChart transactions={transactions} />

          <div className="bg-card mt-8 rounded-2xl border p-6">
            <h2 className="mb-6 text-xl font-semibold">Últimas transações</h2>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-muted flex items-center justify-between rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">{transaction.title}</p>

                    <p className="text-muted-foreground text-sm">
                      {transaction.type}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-income"
                        : "text-expense"
                    }`}
                  >
                    {formatarMoeda(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
