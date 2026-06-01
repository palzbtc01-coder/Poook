"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCw, XCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type MockOrder } from "@/lib/mock-orders";

interface Props {
  order: MockOrder;
}

type ActionType = "refill" | "cancel" | null;

export function OrderActions({ order }: Props) {
  const router = useRouter();
  const [pending, setPending] = React.useState<ActionType>(null);
  const [confirming, setConfirming] = React.useState<ActionType>(null);

  const canRefill = order.isRefillEligible && order.status === "completed";
  const canCancel = order.status === "pending";

  if (!canRefill && !canCancel) {
    return (
      <div className="rounded-2xl border border-border bg-surface/70 p-5 text-sm text-muted">
        Order ini tidak memiliki aksi yang tersedia. Order yang sudah masuk
        status <span className="font-semibold text-foreground">processing</span>{" "}
        atau lebih lanjut tidak bisa dibatalkan.
      </div>
    );
  }

  const performAction = (type: ActionType) => {
    if (!type) return;
    setPending(type);
    setConfirming(null);
    // TODO: integrate with /orders/:id/refill or /orders/:id/cancel in Fase 1f
    setTimeout(() => {
      setPending(null);
      router.refresh();
    }, 900);
  };

  return (
    <>
      <div className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/70 p-5">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
          Aksi
        </h3>
        {canRefill ? (
          <Button
            variant="outline"
            size="md"
            onClick={() => setConfirming("refill")}
            disabled={pending !== null}
          >
            {pending === "refill" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RotateCw className="h-4 w-4" />
            )}
            Request Refill
          </Button>
        ) : null}
        {canCancel ? (
          <Button
            variant="outline"
            size="md"
            onClick={() => setConfirming("cancel")}
            disabled={pending !== null}
            className="border-danger/40 text-danger hover:border-danger hover:bg-danger/10"
          >
            {pending === "cancel" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            Batalkan Order
          </Button>
        ) : null}
      </div>

      {confirming ? (
        <ConfirmActionDialog
          type={confirming}
          orderId={order.id}
          onCancel={() => setConfirming(null)}
          onConfirm={() => performAction(confirming)}
        />
      ) : null}
    </>
  );
}

function ConfirmActionDialog({
  type,
  orderId,
  onCancel,
  onConfirm,
}: {
  type: ActionType;
  orderId: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isCancel = type === "cancel";
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-card">
        <h3 className="font-display text-lg font-bold tracking-tight">
          {isCancel ? "Batalkan order ini?" : "Request refill?"}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {isCancel
            ? "Order akan dibatalkan dan saldo dikembalikan otomatis ke akunmu."
            : "Sistem akan mengirim ulang order ke provider untuk mengisi kembali jumlah yang berkurang."}
        </p>
        <p className="mt-3 rounded-lg bg-background/40 px-3 py-2 font-mono text-xs">
          {orderId}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
          <Button
            variant={isCancel ? "outline" : "primary"}
            size="md"
            onClick={onConfirm}
            className={
              isCancel
                ? "flex-1 border-danger/40 text-danger hover:border-danger hover:bg-danger/10"
                : "flex-1"
            }
          >
            <Check className="h-4 w-4" />
            Ya, Lanjutkan
          </Button>
          <Button variant="outline" size="md" onClick={onCancel} className="flex-1">
            <X className="h-4 w-4" /> Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
