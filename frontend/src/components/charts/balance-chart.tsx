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
import type { Transacao } from "@/types/transacao";

export function BalanceChart({ transactions }: { transactions: Transacao[] }) {
  const grouped = transactions.reduce<{ date: string; balance: number }[]>(
    (acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      const existing = acc.find((item) => item.date === date);

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
    [],
  );

  return (
    <div className="bg-card mt-8 rounded-2xl border p-6 transition-colors">
      <div className="mb-6">
        <h2 className="text-foreground text-xl font-semibold">
          Fluxo Financeiro
        </h2>

        <p className="text-muted-foreground text-sm">
          Evolução das movimentações
        </p>
      </div>

      <div className="h-[350px] min-h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={grouped}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

            <XAxis dataKey="date" stroke="var(--muted-foreground)" />

            <YAxis stroke="var(--muted-foreground)" />

            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                color: "var(--popover-foreground)",
              }}
            />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-income)"
              fill="var(--color-income)"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
