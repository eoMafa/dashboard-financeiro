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

type Transacao = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  createdAt: string;
};

export default function Home() {
  useAuth();
  const [transactions, setTransactions] =
  useState<Transacao[]>([]);
  async function loadTransactions() {
    try {
      const response =
        await api.get<Transacao[]>("/transactions");

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
  .reduce(
    (acc: number, item) =>
      acc + item.amount,
    0
  );

const expense = transacoesDoMes
  .filter((t) => t.type === "expense")
  .reduce(
    (acc: number, item) =>
      acc + item.amount,
    0
  );

const balance = income - expense;
  return (
    <main className="flex flex-col md:flex-row bg-background min-h-screen items-stretch text-foreground">
      <Sidebar />

      <section className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground mt-2">
            Bem-vindo ao sistema financeiro.
          </p>

          <div className="flex justify-between items-center mt-8">
            <div />

            <NewTransactionModal
              onCreated={loadTransactions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
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

          <BalanceChart
            transactions={transactions}
          />

          <CategoryChart
            transactions={transactions}
          />

          <div className="mt-8 bg-card border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Últimas transações
            </h2>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-muted rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
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