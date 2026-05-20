import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  {
    id: 1,
    type: "Bitcoin Buy",
    amount: "$ 4,250.00",
    status: "Completed",
  },
  {
    id: 2,
    type: "PIX Received",
    amount: "$ 1,200.00",
    status: "Completed",
  },
  {
    id: 3,
    type: "Card Payment",
    amount: "$ 320.00",
    status: "Pending",
  },
  {
    id: 4,
    type: "Investment",
    amount: "$ 12,500.00",
    status: "Completed",
  },
];

export function TransactionTable() {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Transactions
        </h2>

        <p className="text-zinc-400 text-sm">
          Latest financial operations
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              className="border-zinc-800"
            >
              <TableCell>{transaction.type}</TableCell>

              <TableCell>{transaction.amount}</TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    transaction.status === "Completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}