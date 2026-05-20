import { Card, CardContent } from "@/components/ui/card";

interface FinancialCardProps {
  title: string;
  value: string;
  growth: string;
}

export function FinancialCard({
  title,
  value,
  growth,
}: FinancialCardProps) {
  return (
    <Card className="bg-zinc-950 border-zinc-800 text-white">
      <CardContent className="p-6">
        <p className="text-zinc-400 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <span className="text-emerald-500 text-sm mt-3 block">
          {growth}
        </span>
      </CardContent>
    </Card>
  );
}