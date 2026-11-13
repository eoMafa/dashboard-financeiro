"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Transacao } from "@/types/transacao";
import { formatarMoeda } from "@/lib/format";
import { nomeDaCategoria } from "@/lib/categorias";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function CategoryChart({ transactions }: { transactions: Transacao[] }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const grouped = expenses.reduce<{ name: string; value: number }[]>(
    (acc, transaction) => {
      const nome = nomeDaCategoria(transaction.category);
      const existing = acc.find((item) => item.name === nome);

      if (existing) {
        existing.value += transaction.amount;
      } else {
        acc.push({
          name: nome,
          value: transaction.amount,
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
          Gastos por Categoria
        </h2>

        <p className="text-muted-foreground text-sm">
          Distribuição das despesas
        </p>
      </div>

      <div className="h-[350px] min-h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={grouped}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label={({ name, value }) =>
                `${name}: ${formatarMoeda(Number(value))}`
              }
            >
              {grouped.map((_, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                color: "var(--popover-foreground)",
              }}
              formatter={(valor) => formatarMoeda(Number(valor))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
