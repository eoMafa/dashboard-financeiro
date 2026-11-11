import { Card, CardContent } from "@/components/ui/card";

interface FinancialCardProps {
  title: string;
  value: string;
  variant?: "income" | "expense";
}

export function FinancialCard({ title, value, variant }: FinancialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">{title}</p>

        <h2
          className={`mt-2 text-3xl font-bold ${variant === "income" ? "text-income" : variant === "expense" ? "text-expense" : ""}`}
        >
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}
