import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { PaymentInstructions } from "@/components/dashboard/payment-instructions";
import { getDeposit } from "@/lib/store/deposits";

// Reads from the in-memory deposit store, which is request-scoped state — a
// build-time prerender would always be empty, so we opt out of caching.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { ref: string } }) {
  return { title: `Pembayaran ${params.ref}` };
}

export default function DepositDetailPage({
  params,
}: {
  params: { ref: string };
}) {
  const deposit = getDeposit(params.ref);
  if (!deposit) notFound();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Isi Saldo", href: "/dashboard/deposit" },
          { label: params.ref },
        ]}
        title="Pembayaran"
        description="Selesaikan pembayaran sebelum waktu habis. Status diperbarui otomatis."
      />
      <PaymentInstructions deposit={deposit} />
    </div>
  );
}
