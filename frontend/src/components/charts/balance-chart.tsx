"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BalanceChart({
  transactions,
}: any) {
  const grouped = transactions.reduce(
    (acc: any, transaction: any) => {
      const date = new Date(
        transaction.createdAt,
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      const existing =
        acc.find((item: any) =>
          item.date === date
        );

      const value =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;

      if (existing) {
        existing.balance += value;
      } else {
        acc.push({
          date,
          balance: value,
        });
      }

      return acc;
    },
    []
  );

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mt-8 transition-colors">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Fluxo Financeiro
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Evolução das movimentações
        </p>
      </div>

      <div className="w-full h-[350px] min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={grouped}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#22c55e"
              fill="#22c55e"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}