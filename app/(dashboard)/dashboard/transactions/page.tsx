import { Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { TransactionsList } from "@/components/dashboard/transactions-list";
import { Button } from "@/components/ui/button";
import { listAllTransactions } from "@/lib/mock-transactions";
import { MOCK_USER } from "@/lib/mock-dashboard";

// Combines mock historical entries with the live in-memory deposits, so the
// page must always render at request time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Riwayat Transaksi",
};

export default function TransactionsPage() {
  const transactions = listAllTransactions(MOCK_USER.id);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Riwayat Transaksi" },
        ]}
        title="Riwayat Transaksi"
        description="Semua mutasi saldo: deposit, order, refund, bonus, dan komisi."
        actions={
          <Button href="/dashboard/deposit" variant="primary" size="md">
            <Wallet className="h-4 w-4" /> Isi Saldo
          </Button>
        }
      />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
