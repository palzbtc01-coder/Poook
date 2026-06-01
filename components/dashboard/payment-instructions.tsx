"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  Loader2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "./countdown-timer";
import { CopyButton } from "./copy-button";
import { PaymentLogo } from "./payment-logo";
import { findChannel } from "@/lib/violet/channels";
import type { DepositRecord, DepositStatus } from "@/lib/store/deposits";
import { formatIDR, formatDateTime, cn } from "@/lib/utils";

interface Props {
  deposit: DepositRecord;
}

export function PaymentInstructions({ deposit }: Props) {
  const router = useRouter();

  // Live status mirrors the server record but updates via polling.
  const [status, setStatus] = React.useState<DepositStatus>(deposit.status);
  const [completedAt, setCompletedAt] = React.useState<string | null>(
    deposit.completedAt ?? null,
  );

  // Poll the status endpoint while the deposit is pending so the page reflects
  // webhook updates (or the simulation timer) without a manual refresh.
  React.useEffect(() => {
    if (status !== "pending") return;
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/violet/status/${deposit.ref}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          status: DepositStatus;
          completedAt: string | null;
        };
        if (cancelled) return;
        if (data.status !== status) {
          setStatus(data.status);
          setCompletedAt(data.completedAt);
          // Re-fetch the page so server-rendered details reflect the change.
          router.refresh();
        }
      } catch {
        // ignore — keep polling
      }
    };
    const id = setInterval(tick, 4_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [status, deposit.ref, router]);

  // ─── Terminal states ───────────────────────────────────────────────
  if (status === "success") {
    return (
      <SuccessCard deposit={deposit} completedAt={completedAt ?? undefined} />
    );
  }
  if (status === "expired" || status === "failed" || status === "cancelled") {
    return <FailureCard deposit={deposit} status={status} />;
  }

  // ─── Pending state ─────────────────────────────────────────────────
  const channel = findChannel(deposit.channel);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* LEFT: instructions */}
      <div className="flex flex-col gap-5">
        {/* Status banner */}
        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/15 text-warning">
                <Loader2 className="h-6 w-6 animate-spin" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">
                  Menunggu Pembayaran
                </p>
                <p className="font-display text-lg font-bold">
                  {formatIDR(deposit.totalToPay)}
                </p>
              </div>
            </div>
            <CountdownTimer
              expiresAt={deposit.expiresAt}
              onExpire={() => router.refresh()}
            />
          </div>
        </div>

        {deposit.isSimulated ? (
          <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Mode Demo</p>
              <p className="mt-0.5 text-warning/80">
                Invoice ini tidak terhubung ke VioletMediaPay. Status akan
                otomatis berubah ke <strong>Sukses</strong> dalam ~30 detik.
              </p>
            </div>
          </div>
        ) : null}

        {/* Channel-specific instructions */}
        <div className="rounded-2xl border border-border bg-surface/70 p-5">
          <div className="mb-4 flex items-center gap-3">
            <PaymentLogo code={deposit.channel} size="lg" />
            <div>
              <p className="font-display text-base font-bold tracking-tight">
                {deposit.channelName}
              </p>
              {channel ? (
                <Badge variant="default">
                  {channel.type === "qris"
                    ? "QRIS"
                    : channel.type === "ewallet"
                      ? "E-Wallet"
                      : channel.type === "va"
                        ? "Virtual Account"
                        : "Gerai Toko"}
                </Badge>
              ) : null}
            </div>
          </div>

          {channel?.type === "qris" ? (
            <QrInstructions deposit={deposit} />
          ) : channel?.type === "va" ? (
            <VaInstructions deposit={deposit} />
          ) : channel?.type === "counter" ? (
            <CounterInstructions deposit={deposit} />
          ) : (
            <EwalletInstructions deposit={deposit} />
          )}
        </div>
      </div>

      {/* RIGHT: order summary */}
      <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface/70 p-5">
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted">
            Detail Deposit
          </h3>
          <dl className="space-y-3 text-sm">
            <Row label="ID Deposit" value={deposit.ref} mono />
            <Row label="Nominal" value={formatIDR(deposit.amount)} mono />
            {deposit.bonusAmount > 0 ? (
              <Row
                label="Bonus"
                value={`+${formatIDR(deposit.bonusAmount)}`}
                tone="success"
              />
            ) : null}
            <Row label="Fee" value={`+${formatIDR(deposit.fee)}`} mono />
            <hr className="border-border" />
            <Row
              label="Total bayar"
              value={formatIDR(deposit.totalToPay)}
              emphasis
            />
            <Row
              label="Saldo masuk"
              value={formatIDR(deposit.netCredit)}
              tone="success"
              mono
            />
            <hr className="border-border" />
            <Row label="Dibuat" value={formatDateTime(deposit.createdAt)} small />
            <Row label="Berakhir" value={formatDateTime(deposit.expiresAt)} small />
          </dl>
        </div>

        <Link
          href="/dashboard/transactions"
          className="text-center text-xs text-muted hover:text-foreground"
        >
          ← Kembali ke Riwayat Transaksi
        </Link>
      </aside>
    </div>
  );
}

/* ─────────────────────────── instructions per channel type ──────────────────────────── */

function VaInstructions({ deposit }: { deposit: DepositRecord }) {
  return (
    <>
      <p className="mb-3 text-sm text-muted">
        Transfer ke nomor Virtual Account berikut. Total transfer sudah include
        kode unik — jangan ubah nominal.
      </p>
      <div className="mb-4 rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          Nomor VA {deposit.vaBank ?? deposit.channelName}
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="break-all font-mono text-xl font-bold tracking-wider">
            {deposit.vaNumber ?? "—"}
          </p>
          {deposit.vaNumber ? (
            <CopyButton value={deposit.vaNumber} />
          ) : null}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          Total Transfer
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold text-gradient">
            {formatIDR(deposit.totalToPay)}
          </p>
          <CopyButton value={String(deposit.totalToPay)} />
        </div>
      </div>
      <ol className="mt-5 space-y-2 text-sm text-muted">
        <Step n={1}>Buka aplikasi mobile banking / ATM bank kamu</Step>
        <Step n={2}>Pilih menu transfer ke Virtual Account</Step>
        <Step n={3}>Masukkan nomor VA di atas</Step>
        <Step n={4}>Pastikan total transfer persis {formatIDR(deposit.totalToPay)}</Step>
        <Step n={5}>Konfirmasi & selesaikan pembayaran</Step>
      </ol>
    </>
  );
}

function QrInstructions({ deposit }: { deposit: DepositRecord }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-2xl bg-white p-3">
        {deposit.qrUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deposit.qrUrl}
            alt={`QR Code untuk ${deposit.ref}`}
            className="h-full w-full object-contain"
          />
        ) : (
          <FakeQrPattern />
        )}
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
          QRIS · {deposit.ref}
        </span>
      </div>
      <div className="w-full rounded-xl border border-border bg-background/40 p-4 text-center">
        <p className="text-xs uppercase tracking-wider text-muted">
          Total Bayar
        </p>
        <p className="font-display text-2xl font-bold text-gradient">
          {formatIDR(deposit.totalToPay)}
        </p>
      </div>
      <ol className="space-y-2 text-sm text-muted">
        <Step n={1}>Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay, dll.)</Step>
        <Step n={2}>Scan kode QRIS di atas</Step>
        <Step n={3}>Pastikan nominal {formatIDR(deposit.totalToPay)}</Step>
        <Step n={4}>Konfirmasi pembayaran</Step>
      </ol>
    </div>
  );
}

function EwalletInstructions({ deposit }: { deposit: DepositRecord }) {
  return (
    <>
      <p className="mb-3 text-sm text-muted">
        Klik tombol di bawah untuk membuka aplikasi e-wallet kamu dan
        menyelesaikan pembayaran.
      </p>
      <div className="mb-4 rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          Total Bayar
        </p>
        <p className="font-display text-2xl font-bold text-gradient">
          {formatIDR(deposit.totalToPay)}
        </p>
      </div>
      {deposit.payUrl ? (
        <Button
          href={deposit.payUrl}
          variant="primary"
          size="lg"
          className="w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bayar di {deposit.channelName}
          <ExternalLink className="h-4 w-4" />
        </Button>
      ) : (
        <p className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
          Link pembayaran sedang disiapkan…
        </p>
      )}
    </>
  );
}

function CounterInstructions({ deposit }: { deposit: DepositRecord }) {
  return (
    <>
      <p className="mb-3 text-sm text-muted">
        Kunjungi gerai {deposit.channelName} terdekat dan tunjukkan nomor
        pembayaran berikut ke kasir.
      </p>
      <div className="mb-4 rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          Kode Pembayaran
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="break-all font-mono text-xl font-bold">
            {deposit.vaNumber ?? deposit.ref}
          </p>
          <CopyButton value={deposit.vaNumber ?? deposit.ref} />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs uppercase tracking-wider text-muted">
          Total Bayar
        </p>
        <p className="font-display text-2xl font-bold text-gradient">
          {formatIDR(deposit.totalToPay)}
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────── terminal cards ─────────────────────────── */

function SuccessCard({
  deposit,
  completedAt,
}: {
  deposit: DepositRecord;
  completedAt?: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl border border-success/30 bg-surface/70 p-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Pembayaran Berhasil!
        </h2>
        <p className="mt-1 text-sm text-muted">
          Saldo {formatIDR(deposit.netCredit)} sudah masuk ke akun kamu.
        </p>
      </div>
      <dl className="grid w-full grid-cols-2 gap-2 rounded-2xl border border-border bg-background/40 p-4 text-left text-sm">
        <Row label="ID Deposit" value={deposit.ref} mono small />
        <Row label="Channel" value={deposit.channelName} small />
        <Row label="Nominal" value={formatIDR(deposit.amount)} mono small />
        {deposit.bonusAmount > 0 ? (
          <Row
            label="Bonus"
            value={formatIDR(deposit.bonusAmount)}
            tone="success"
            small
          />
        ) : null}
        {completedAt ? (
          <Row label="Waktu" value={formatDateTime(completedAt)} small />
        ) : null}
      </dl>
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Button
          href="/dashboard"
          variant="primary"
          size="md"
          className="flex-1"
        >
          Ke Dashboard <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          href="/dashboard/orders/new"
          variant="outline"
          size="md"
          className="flex-1"
        >
          Buat Order
        </Button>
      </div>
    </div>
  );
}

function FailureCard({
  deposit,
  status,
}: {
  deposit: DepositRecord;
  status: DepositStatus;
}) {
  const label =
    status === "expired"
      ? "Pembayaran Kadaluarsa"
      : status === "cancelled"
        ? "Pembayaran Dibatalkan"
        : "Pembayaran Gagal";
  const Icon = status === "expired" ? AlertCircle : XCircle;
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl border border-danger/30 bg-surface/70 p-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/15 text-danger">
        <Icon className="h-8 w-8" />
      </span>
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">
          {label}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {status === "expired"
            ? `Invoice ${deposit.ref} sudah melewati batas waktu pembayaran.`
            : "Silakan coba buat deposit baru."}
        </p>
        {deposit.error ? (
          <p className="mt-2 break-words text-xs text-danger">{deposit.error}</p>
        ) : null}
      </div>
      <Button href="/dashboard/deposit" variant="primary" size="md">
        Coba Lagi <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

/* ─────────────────────────── tiny helpers ─────────────────────────── */

function Row({
  label,
  value,
  mono,
  emphasis,
  tone = "default",
  small,
}: {
  label: React.ReactNode;
  value: string;
  mono?: boolean;
  emphasis?: boolean;
  tone?: "default" | "success" | "danger";
  small?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className={cn("text-muted", small && "text-xs")}>{label}</dt>
      <dd
        className={cn(
          "text-right",
          mono && "font-mono",
          small && "text-xs",
          emphasis && "font-display text-lg font-bold text-gradient",
          !emphasis && tone === "success" && "font-semibold text-success",
          !emphasis && tone === "danger" && "font-semibold text-danger",
          !emphasis && tone === "default" && "font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-[11px] font-bold text-secondary">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

/** Decorative QR-style grid that does not encode anything; for demo only. */
function FakeQrPattern() {
  // Generate a 21x21 grid of pseudo-random cells that looks QR-ish.
  // Using a fixed pattern based on index so it's deterministic.
  const size = 21;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    cells.push(((i * 2654435761) >>> 0) % 3 !== 0);
  }
  // Force the three positioning markers.
  const markers: [number, number][] = [
    [0, 0],
    [0, 14],
    [14, 0],
  ];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      {cells.map((on, idx) => {
        if (!on) return null;
        const x = idx % size;
        const y = Math.floor(idx / size);
        return <rect key={idx} x={x} y={y} width="1" height="1" fill="black" />;
      })}
      {markers.map(([mx, my]) => (
        <g key={`${mx}-${my}`}>
          <rect x={mx} y={my} width="7" height="7" fill="black" />
          <rect x={mx + 1} y={my + 1} width="5" height="5" fill="white" />
          <rect x={mx + 2} y={my + 2} width="3" height="3" fill="black" />
        </g>
      ))}
    </svg>
  );
}
