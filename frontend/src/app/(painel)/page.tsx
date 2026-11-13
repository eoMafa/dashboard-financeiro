"use client";
import { FinancialCard } from "@/components/dashboard/financial-card";
import { BalanceChart } from "@/components/charts/balance-chart";
import { NewTransactionModal } from "@/components/dashboard/new-transaction-modal";
import { CategoryChart } from "@/components/charts/category-chart";
import { formatarData, formatarMoeda } from "@/lib/format";
import { useTransacoes } from "@/hooks/useTransacoes";
import { nomeDaCategoria } from "@/lib/categorias";

export default function Home() {
  const { transacoes: transactions, recarregar } = useTransacoes();
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
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-muted-foreground mt-2">
        Bem-vindo ao sistema financeiro.
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div />

        <NewTransactionModal onCreated={recarregar} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <FinancialCard title="Saldo do mês" value={formatarMoeda(balance)} />

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
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="bg-muted flex items-center justify-between rounded-xl p-4"
            >
              <div>
                <p className="font-medium">{transaction.title}</p>

                <p className="text-muted-foreground text-sm">
                  {nomeDaCategoria(transaction.category)} ·{" "}
                  {formatarData(transaction.createdAt)}
                </p>
              </div>

              <p
                className={`font-semibold ${
                  transaction.type === "income" ? "text-income" : "text-expense"
                }`}
              >
                {formatarMoeda(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
