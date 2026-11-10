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
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <span className="text-income text-sm mt-3 block">
          {growth}
        </span>
      </CardContent>
    </Card>
  );
}