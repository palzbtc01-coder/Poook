import { PageHeader } from "@/components/dashboard/page-header";
import { DepositForm } from "@/components/dashboard/deposit-form";
import { isVioletConfigured } from "@/lib/violet/config";

export const metadata = {
  title: "Isi Saldo",
};

// The form posts to /api/violet/create which writes to the in-memory store;
// no need for force-dynamic here because nothing on this page depends on
// per-request state — only the configuration check, which is read at request
// time anyway since it's a server component.
export default function DepositPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Isi Saldo" },
        ]}
        title="Isi Saldo"
        description="Top up saldo melalui 13 metode pembayaran. Diproses oleh VioletMediaPay."
      />
      <DepositForm isConfigured={isVioletConfigured()} />
    </div>
  );
}
