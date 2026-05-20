"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", balance: 4000 },
  { name: "Feb", balance: 3000 },
  { name: "Mar", balance: 5000 },
  { name: "Apr", balance: 4780 },
  { name: "May", balance: 5890 },
  { name: "Jun", balance: 6390 },
  { name: "Jul", balance: 7490 },
];

export function BalanceChart() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Financial Overview
        </h2>

        <p className="text-zinc-400 text-sm">
          Monthly balance evolution
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#71717a"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#f97316"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}