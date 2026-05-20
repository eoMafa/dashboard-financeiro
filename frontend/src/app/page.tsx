"use client";
import { Sidebar } from "@/components/layout/sidebar";
import { FinancialCard } from "@/components/dashboard/financial-card";
import { BalanceChart } from "@/components/charts/balance-chart";
import { TransactionTable } from "@/components/dashboard/transaction-table";
import { Topbar } from "@/components/layout/topbar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { CategoryChart } from "@/components/charts/category-chart";

export default function Home() {
  useAuth();
  const [transactions, setTransactions] =
  useState([]);
  async function loadTransactions() {
    try {
      const response =
        await api.get("/transactions");

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadTransactions();
  }, []);

  const income = transactions
  .filter((t: any) => t.type === "income")
  .reduce(
    (acc: number, item: any) =>
      acc + item.amount,
    0
  );

const expense = transactions
  .filter((t: any) => t.type === "expense")
  .reduce(
    (acc: number, item: any) =>
      acc + item.amount,
    0
  );

const balance = income - expense;
  return (
    <main className="flex flex-col md:flex-row bg-black min-h-screen items-stretch text-white">
      <Sidebar />

      <section className="flex-1">
        <Topbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Bem-vindo ao sistema financeiro.
          </p>

          <div className="flex justify-between items-center mt-8">
            <div />

            <NewTransactionModal
              onCreated={loadTransactions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            <FinancialCard
              title="Saldo Total"
              value={`R$ ${balance.toFixed(2)}`}
              growth={income > expense ? "+12.5%" : "-12.5%"}
            />

            <FinancialCard
              title="Receitas"
              value={`R$ ${income.toFixed(2)}`}
              growth="+8.2%"
            />

            <FinancialCard
              title="Despesas"
              value={`R$ ${expense.toFixed(2)}`}
              growth="-2.4%"
            />

            <FinancialCard
              title="Investimentos"
              value="$ 67,900.00"
              growth="+15.1%"
            />
          </div>

          <BalanceChart
            transactions={transactions}
          />

          <CategoryChart
            transactions={transactions}
          />

          <div className="mt-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">
              Últimas transações
            </h2>

            <div className="space-y-4">
              {transactions.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-zinc-900 rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.title}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {transaction.type}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    R$ {transaction.amount}
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