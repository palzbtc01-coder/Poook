import { PageHeader } from "@/components/dashboard/page-header";
import { TicketForm } from "@/components/dashboard/ticket-form";

export const metadata = {
  title: "Tiket Baru",
};

export default function NewTicketPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support", href: "/dashboard/support" },
          { label: "Tiket Baru" },
        ]}
        title="Buat Tiket Baru"
        description="Tim kami akan merespon dalam waktu maksimal 1 jam pada jam kerja."
      />
      <div className="rounded-2xl border border-border bg-surface/70 p-6">
        <TicketForm />
      </div>
    </div>
  );
}
