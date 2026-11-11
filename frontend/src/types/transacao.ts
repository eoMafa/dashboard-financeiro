export type Transacao = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  createdAt: string;
};