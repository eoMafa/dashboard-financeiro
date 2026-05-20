"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function CategoryChart({
  transactions,
}: any) {
  const expenses = transactions.filter(
    (t: any) => t.type === "expense"
  );

  const grouped = expenses.reduce(
    (acc: any, transaction: any) => {
      const existing = acc.find(
        (item: any) =>
          item.name === transaction.category
      );

      if (existing) {
        existing.value +=
          transaction.amount;
      } else {
        acc.push({
          name: transaction.category,
          value: transaction.amount,
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
            Gastos por Categoria
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Distribuição das despesas
        </p>
        </div>

        <div className="w-full h-[350px] min-h-[350px]">
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <PieChart>
            <Pie
                data={grouped}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
            >
                {grouped.map(
                (_: any, index: number) => (
                    <Cell
                    key={index}
                    fill={
                        COLORS[
                        index % COLORS.length
                        ]
                    }
                    />
                )
                )}
            </Pie>

            <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        </div>
    </div>
    );
}