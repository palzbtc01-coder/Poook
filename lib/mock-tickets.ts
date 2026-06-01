/**
 * Mock support tickets for `/dashboard/support` and `/dashboard/support/[id]`.
 * Mirrors the `support_tickets` + `ticket_messages` ERD tables in the PRD so
 * the swap to Prisma in Fase 1f is mostly mechanical.
 */

const NOW_MS = new Date("2026-06-01T10:30:00Z").getTime();
const minAgo = (m: number) => new Date(NOW_MS - m * 60_000).toISOString();
const hrAgo = (h: number) => minAgo(h * 60);
const dayAgo = (d: number) => hrAgo(d * 24);

export type TicketStatus = "open" | "pending" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketCategory =
  | "general"
  | "order"
  | "deposit"
  | "reseller"
  | "api"
  | "billing"
  | "other";

export interface TicketMessage {
  id: string;
  fromAdmin: boolean;
  authorName: string;
  authorInitials: string;
  message: string;
  createdAt: string;
  attachments?: { name: string; size: string }[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  relatedOrderId?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: TicketMessage[];
}

const userMsg = (
  id: string,
  message: string,
  createdAt: string,
  attachments?: TicketMessage["attachments"],
): TicketMessage => ({
  id,
  fromAdmin: false,
  authorName: "Budi Santoso",
  authorInitials: "BS",
  message,
  createdAt,
  attachments,
});

const adminMsg = (
  id: string,
  authorName: string,
  message: string,
  createdAt: string,
): TicketMessage => ({
  id,
  fromAdmin: true,
  authorName,
  authorInitials: authorName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2),
  message,
  createdAt,
});

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "TKT-2024-0142",
    subject: "Order TikTok Views stuck di status processing 3 jam",
    priority: "high",
    status: "open",
    category: "order",
    relatedOrderId: "ORD-2087342",
    createdAt: hrAgo(3),
    updatedAt: hrAgo(2),
    assignedTo: "Aldi (Support)",
    messages: [
      userMsg(
        "msg_001",
        "Halo, order saya ORD-2087342 sudah 3 jam status-nya processing tapi belum ada progress sama sekali. Biasanya YouTube subscribers itu mulai dalam 1 jam. Tolong dicek ya. Terima kasih.",
        hrAgo(3),
      ),
      adminMsg(
        "msg_002",
        "Aldi Support",
        "Halo Pak Budi, terima kasih sudah lapor. Saya cek dulu ke provider, mohon ditunggu 5-10 menit ya.",
        hrAgo(2),
      ),
    ],
  },
  {
    id: "TKT-2024-0138",
    subject: "Deposit BCA VA tidak masuk meskipun sudah transfer",
    priority: "urgent",
    status: "pending",
    category: "deposit",
    createdAt: dayAgo(1),
    updatedAt: hrAgo(20),
    assignedTo: "Sari (Finance)",
    messages: [
      userMsg(
        "msg_010",
        "Saya transfer Rp 500.000 ke VA BCA jam 14:30 tadi, tapi sampai sekarang saldo belum masuk. Bukti transfer terlampir.",
        dayAgo(1),
        [{ name: "bukti-transfer-bca.jpg", size: "234 KB" }],
      ),
      adminMsg(
        "msg_011",
        "Sari Finance",
        "Halo Pak, mohon maaf atas kendalanya. Sudah saya forward ke tim payment gateway untuk dicek. Biasanya selesai dalam 2-4 jam kerja. Kami update kembali ya.",
        hrAgo(22),
      ),
      userMsg(
        "msg_012",
        "Baik Mbak, ditunggu update-nya.",
        hrAgo(20),
      ),
    ],
  },
  {
    id: "TKT-2024-0125",
    subject: "Cara aktivasi panel reseller?",
    priority: "low",
    status: "resolved",
    category: "reseller",
    createdAt: dayAgo(3),
    updatedAt: dayAgo(2),
    assignedTo: "Rico (Sales)",
    messages: [
      userMsg(
        "msg_020",
        "Halo, saya tertarik untuk jadi reseller. Apa syaratnya dan bagaimana caranya?",
        dayAgo(3),
      ),
      adminMsg(
        "msg_021",
        "Rico Sales",
        "Halo Pak Budi, untuk jadi reseller minimal sudah deposit Rp 1.000.000 (sudah terpenuhi). Silakan klik menu \"Upgrade ke Reseller\" di sidebar dashboard kamu, lalu isi form aplikasi. Tim kami akan review dalam 1x24 jam.",
        dayAgo(3),
      ),
      userMsg("msg_022", "Sip, sudah saya apply. Terima kasih!", dayAgo(2)),
      adminMsg(
        "msg_023",
        "Rico Sales",
        "Aplikasi kamu sudah disetujui ya, panel reseller aktif. Kalau ada pertanyaan lain feel free hubungi kami. Tiket saya tutup ya.",
        dayAgo(2),
      ),
    ],
  },
  {
    id: "TKT-2024-0098",
    subject: "Bug: Tombol cancel order tidak berfungsi di mobile",
    priority: "medium",
    status: "resolved",
    category: "general",
    createdAt: dayAgo(8),
    updatedAt: dayAgo(7),
    assignedTo: "Iqbal (Tech)",
    messages: [
      userMsg(
        "msg_030",
        "Saya pakai HP Android, browser Chrome, mau cancel order yang masih pending tapi tombolnya tidak respon saat di-tap.",
        dayAgo(8),
      ),
      adminMsg(
        "msg_031",
        "Iqbal Tech",
        "Halo Pak, terima kasih atas laporan bug-nya. Sudah kami fix di update terbaru, silakan refresh app/browser ya.",
        dayAgo(7),
      ),
    ],
  },
  {
    id: "TKT-2024-0042",
    subject: "Permintaan invoice deposit untuk laporan pajak",
    priority: "low",
    status: "closed",
    category: "billing",
    createdAt: dayAgo(15),
    updatedAt: dayAgo(14),
    assignedTo: "Sari (Finance)",
    messages: [
      userMsg(
        "msg_040",
        "Bisa minta invoice resmi untuk deposit bulan April 2026?",
        dayAgo(15),
      ),
      adminMsg(
        "msg_041",
        "Sari Finance",
        "Halo Pak, invoice sudah dikirim ke email budi@email.com. Mohon dicek ya. Kalau ada koreksi data, balas tiket ini.",
        dayAgo(14),
      ),
    ],
  },
];

export function findTicket(id: string): SupportTicket | undefined {
  return MOCK_TICKETS.find((t) => t.id === id);
}

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  open: "Open",
  pending: "Pending",
  resolved: "Selesai",
  closed: "Ditutup",
};

export const TICKET_STATUS_STYLE: Record<TicketStatus, string> = {
  open: "bg-warning/15 text-warning border-warning/30",
  pending: "bg-secondary/15 text-secondary border-secondary/30",
  resolved: "bg-success/15 text-success border-success/30",
  closed: "bg-muted/15 text-muted border-border",
};

export const TICKET_PRIORITY_LABEL: Record<TicketPriority, string> = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
  urgent: "Urgent",
};

export const TICKET_PRIORITY_STYLE: Record<TicketPriority, string> = {
  low: "bg-muted/15 text-muted border-border",
  medium: "bg-secondary/15 text-secondary border-secondary/30",
  high: "bg-warning/15 text-warning border-warning/30",
  urgent: "bg-danger/15 text-danger border-danger/30",
};

export const TICKET_CATEGORY_LABEL: Record<TicketCategory, string> = {
  general: "Umum",
  order: "Order",
  deposit: "Deposit",
  reseller: "Reseller",
  api: "API",
  billing: "Billing / Invoice",
  other: "Lainnya",
};
