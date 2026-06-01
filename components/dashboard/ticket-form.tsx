"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  TICKET_PRIORITY_LABEL,
  TICKET_CATEGORY_LABEL,
  type TicketPriority,
  type TicketCategory,
} from "@/lib/mock-tickets";
import { MOCK_ORDERS } from "@/lib/mock-orders";

const PRIORITIES: TicketPriority[] = ["low", "medium", "high", "urgent"];
const CATEGORIES: TicketCategory[] = [
  "general",
  "order",
  "deposit",
  "reseller",
  "api",
  "billing",
  "other",
];

export function TicketForm() {
  const router = useRouter();
  const [subject, setSubject] = React.useState("");
  const [priority, setPriority] = React.useState<TicketPriority>("medium");
  const [category, setCategory] = React.useState<TicketCategory>("general");
  const [orderId, setOrderId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<{
    subject?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!subject.trim()) errs.subject = "Subjek wajib diisi";
    else if (subject.length < 5) errs.subject = "Minimal 5 karakter";
    if (!message.trim()) errs.message = "Pesan wajib diisi";
    else if (message.length < 20) errs.message = "Minimal 20 karakter";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    // TODO: POST /support/tickets in Fase 1f.
    setTimeout(() => {
      // For demo we just bounce back to the list — mock ticket isn't persisted.
      router.push("/dashboard/support");
    }, 800);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input
        label="Subjek"
        placeholder="Ringkasan singkat masalahmu"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        error={errors.subject}
        maxLength={200}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Prioritas"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {TICKET_PRIORITY_LABEL[p]}
            </option>
          ))}
        </Select>
        <Select
          label="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value as TicketCategory)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {TICKET_CATEGORY_LABEL[c]}
            </option>
          ))}
        </Select>
      </div>

      <Select
        label="Terkait Order (opsional)"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        hint="Pilih order yang relevan agar tim support bisa langsung cek detailnya."
      >
        <option value="">Tidak terkait order</option>
        {MOCK_ORDERS.slice(0, 8).map((o) => (
          <option key={o.id} value={o.id}>
            {o.id} — {o.serviceName}
          </option>
        ))}
      </Select>

      <Textarea
        label="Pesan"
        placeholder="Jelaskan masalah kamu sedetail mungkin. Sertakan langkah-langkah untuk mereproduksi (jika bug) atau detail transaksi (jika order/deposit)."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={8}
        error={errors.message}
        hint={errors.message ? undefined : `${message.length} karakter`}
      />

      <div className="flex items-center justify-between rounded-xl border border-dashed border-border bg-background/40 p-4">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Paperclip className="h-4 w-4" />
          <span>Lampirkan screenshot atau file (opsional, max 5 MB)</span>
        </div>
        <Button type="button" variant="outline" size="sm">
          Pilih File
        </Button>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.push("/dashboard/support")}
        >
          Batal
        </Button>
        <Button type="submit" variant="primary" size="md" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Mengirim...
            </>
          ) : (
            <>
              Kirim Tiket <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
