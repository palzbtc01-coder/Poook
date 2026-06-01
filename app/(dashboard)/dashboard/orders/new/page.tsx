import * as React from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { OrderForm } from "@/components/dashboard/order-form";

export const metadata = {
  title: "Buat Order Baru",
};

export default function NewOrderPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Order", href: "/dashboard/orders" },
          { label: "Buat Baru" },
        ]}
        title="Buat Order Baru"
        description="Pilih layanan, masukkan target, lalu konfirmasi. Saldo otomatis dipotong."
      />

      {/* useSearchParams in OrderForm is wrapped in Suspense so the page
          stays statically renderable when no query params are present. */}
      <React.Suspense
        fallback={
          <div className="rounded-2xl border border-border bg-surface/60 p-8 text-center text-sm text-muted">
            Memuat form…
          </div>
        }
      >
        <OrderForm />
      </React.Suspense>
    </div>
  );
}
