import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { OrdersList } from "@/components/dashboard/orders-list";
import { Button } from "@/components/ui/button";
import { MOCK_ORDERS } from "@/lib/mock-orders";

export const metadata = {
  title: "Riwayat Order",
};

export default function OrdersHistoryPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Riwayat Order" },
        ]}
        title="Riwayat Order"
        description="Pantau status semua order kamu, filter berdasarkan status, dan ekspor laporan."
        actions={
          <Button href="/dashboard/orders/new" variant="primary" size="md">
            <PlusCircle className="h-4 w-4" /> Order Baru
          </Button>
        }
      />
      <OrdersList orders={MOCK_ORDERS} />
    </div>
  );
}
