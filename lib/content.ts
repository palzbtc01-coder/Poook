import type { IconType } from "react-icons";
import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiFacebook,
  SiX,
  SiTelegram,
  SiSpotify,
  SiLinkedin,
  SiPinterest,
  SiThreads,
} from "react-icons/si";

/* ---------------------------------- Brand --------------------------------- */

export const SITE = {
  name: "SuntikSocial",
  tagline: "Panel SMM Terpercaya #1 di Indonesia",
  whatsapp: "+62 812-0000-0000",
  email: "halo@suntiksocial.id",
  telegram: "@suntiksocial",
};

/* -------------------------------- Platforms ------------------------------- */

export interface Platform {
  name: string;
  icon: IconType;
  color: string;
}

export const PLATFORMS: Platform[] = [
  { name: "Instagram", icon: SiInstagram, color: "#E1306C" },
  { name: "TikTok", icon: SiTiktok, color: "#FFFFFF" },
  { name: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { name: "Facebook", icon: SiFacebook, color: "#1877F2" },
  { name: "Twitter / X", icon: SiX, color: "#FFFFFF" },
  { name: "Telegram", icon: SiTelegram, color: "#26A5E4" },
  { name: "Spotify", icon: SiSpotify, color: "#1DB954" },
  { name: "LinkedIn", icon: SiLinkedin, color: "#0A66C2" },
  { name: "Pinterest", icon: SiPinterest, color: "#BD081C" },
  { name: "Threads", icon: SiThreads, color: "#FFFFFF" },
];

/* ------------------------------- Statistics ------------------------------- */

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const HERO_STATS: Stat[] = [
  { label: "Total Order Selesai", value: 2_000_000, suffix: "+" },
  { label: "Pengguna Aktif", value: 12_500, suffix: "+" },
  { label: "Platform Didukung", value: 10, suffix: "+" },
  { label: "Layanan Tersedia", value: 500, suffix: "+" },
];

/* ------------------------------- How it works ----------------------------- */

export interface Step {
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    title: "Daftar & Isi Saldo",
    description:
      "Buat akun gratis dalam hitungan detik, lalu deposit lewat transfer bank, e-wallet, atau QRIS.",
  },
  {
    title: "Pilih Layanan",
    description:
      "Pilih platform, jenis boost, dan jumlah. Tempel URL target — harga terhitung otomatis.",
  },
  {
    title: "Pantau & Nikmati",
    description:
      "Order diproses otomatis 24/7. Pantau progres real-time di dashboard sampai selesai.",
  },
];

/* -------------------------------- Features -------------------------------- */

export interface Feature {
  title: string;
  description: string;
  /** lucide-react icon name */
  icon: string;
  highlight?: boolean;
}

export const FEATURES: Feature[] = [
  {
    icon: "Zap",
    title: "Proses Otomatis 24/7",
    description:
      "Order langsung diproses sistem tanpa menunggu operator. Kapan pun, di mana pun.",
    highlight: true,
  },
  {
    icon: "ShieldCheck",
    title: "Garansi Refill 30 Hari",
    description: "Jika followers drop, kami isi ulang gratis selama masa garansi.",
  },
  {
    icon: "Wallet",
    title: "Harga Mulai Rp 50",
    description: "Layanan terjangkau mulai dari nominal terkecil untuk semua kalangan.",
  },
  {
    icon: "LineChart",
    title: "Dashboard Real-Time",
    description: "Pantau status setiap order langsung dari panel dengan grafik interaktif.",
  },
  {
    icon: "Lock",
    title: "Aman & Anti-Banned",
    description: "Metode white-hat yang aman dan tidak melanggar kebijakan platform.",
  },
  {
    icon: "Handshake",
    title: "Panel Reseller",
    description: "Jual ulang dengan harga custom dan sub-panel white-label milikmu sendiri.",
  },
  {
    icon: "CreditCard",
    title: "10+ Metode Bayar",
    description: "Transfer bank, e-wallet, QRIS, hingga crypto — semua tersedia.",
  },
  {
    icon: "Headset",
    title: "Support 24/7",
    description: "Live chat & WhatsApp siap membantu kapan saja kamu butuh.",
  },
];

/* ------------------------------ Testimonials ------------------------------ */

export interface Testimonial {
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rizky Pratama",
    role: "Content Creator",
    initials: "RP",
    rating: 5,
    quote:
      "Prosesnya cepet banget, followers langsung naik dalam beberapa menit. Dashboard-nya juga gampang dipakai. Recommended!",
  },
  {
    name: "Sarah Amelia",
    role: "Owner Brand Fashion",
    initials: "SA",
    rating: 5,
    quote:
      "Sebagai UMKM, social proof itu penting. SuntikSocial bantu engagement produk kami naik signifikan. Harganya masuk akal.",
  },
  {
    name: "Dimas Reseller",
    role: "Reseller SMM",
    initials: "DR",
    rating: 5,
    quote:
      "Panel reseller-nya lengkap, bisa set harga sendiri dan ada API. Margin keuntungan jelas. Sudah 8 bulan langganan.",
  },
  {
    name: "Putri Lestari",
    role: "Digital Agency",
    initials: "PL",
    rating: 5,
    quote:
      "Kelola banyak akun klien jadi gampang. Order massal lewat CSV menghemat waktu kami berjam-jam tiap minggu.",
  },
  {
    name: "Andre Wijaya",
    role: "Influencer TikTok",
    initials: "AW",
    rating: 5,
    quote:
      "Garansi refill-nya beneran jalan. Pernah ada drop, langsung diisi ulang tanpa ribet. Trust banget sama layanan ini.",
  },
  {
    name: "Maya Anggraini",
    role: "Selebgram",
    initials: "MA",
    rating: 5,
    quote:
      "Customer service-nya fast response 24 jam. Setiap kendala selalu dibantu sampai beres. Mantap!",
  },
];

/* -------------------------------- Pricing --------------------------------- */

export interface ServicePrice {
  name: string;
  platform: string;
  pricePer1000: number;
  speed: string;
  quality: string;
  badge?: "Terlaris" | "Termurah" | "Tercepat";
}

export const SERVICES: ServicePrice[] = [
  // Instagram
  { name: "Instagram Followers Real", platform: "Instagram", pricePer1000: 15000, speed: "1K-5K/hari", quality: "High Retention", badge: "Terlaris" },
  { name: "Instagram Likes Indo", platform: "Instagram", pricePer1000: 8000, speed: "Instan", quality: "Premium" },
  { name: "Instagram Views Reels", platform: "Instagram", pricePer1000: 2000, speed: "Cepat", quality: "Standar", badge: "Termurah" },
  // TikTok
  { name: "TikTok Followers", platform: "TikTok", pricePer1000: 18000, speed: "2K-10K/hari", quality: "Premium", badge: "Terlaris" },
  { name: "TikTok Likes", platform: "TikTok", pricePer1000: 6000, speed: "Instan", quality: "Standar", badge: "Tercepat" },
  { name: "TikTok Views", platform: "TikTok", pricePer1000: 1500, speed: "Super Cepat", quality: "Standar", badge: "Termurah" },
  // YouTube
  { name: "YouTube Subscribers", platform: "YouTube", pricePer1000: 95000, speed: "500/hari", quality: "High Retention", badge: "Terlaris" },
  { name: "YouTube Views", platform: "YouTube", pricePer1000: 25000, speed: "1K-3K/hari", quality: "Premium" },
  { name: "YouTube Watch Hours", platform: "YouTube", pricePer1000: 120000, speed: "Bertahap", quality: "High Retention" },
  // Facebook
  { name: "Facebook Page Likes", platform: "Facebook", pricePer1000: 22000, speed: "1K/hari", quality: "Premium", badge: "Terlaris" },
  { name: "Facebook Followers", platform: "Facebook", pricePer1000: 20000, speed: "1K-2K/hari", quality: "Standar" },
  { name: "Facebook Post Likes", platform: "Facebook", pricePer1000: 9000, speed: "Cepat", quality: "Standar", badge: "Termurah" },
];

export const PRICING_TABS = ["Instagram", "TikTok", "YouTube", "Facebook"] as const;

/* ---------------------------------- FAQ ----------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Apakah layanan ini aman untuk akun saya?",
    answer:
      "Ya. Kami menggunakan metode white-hat yang aman dan tidak melanggar kebijakan platform. Kami tidak pernah meminta password akun kamu — cukup URL profil atau konten saja.",
  },
  {
    question: "Berapa lama proses order selesai?",
    answer:
      "Sebagian besar order mulai diproses dalam hitungan detik hingga menit. Estimasi kecepatan ditampilkan di setiap layanan, mulai dari instan hingga bertahap (drip-feed) agar terlihat natural.",
  },
  {
    question: "Apakah ada garansi jika followers berkurang?",
    answer:
      "Layanan dengan label 'Garansi Refill' dilindungi garansi hingga 30 hari. Jika jumlah berkurang dalam masa garansi, kamu bisa request refill gratis langsung dari panel.",
  },
  {
    question: "Apakah saya butuh memberikan password?",
    answer:
      "Tidak sama sekali. Kami hanya membutuhkan URL publik dari akun atau konten kamu. Jangan pernah memberikan password ke pihak mana pun.",
  },
  {
    question: "Bagaimana cara melakukan deposit saldo?",
    answer:
      "Setelah daftar, masuk ke menu Deposit, pilih nominal dan metode pembayaran (transfer bank, GoPay, OVO, DANA, ShopeePay, atau QRIS). Saldo masuk otomatis setelah pembayaran terkonfirmasi.",
  },
  {
    question: "Apakah saldo bisa di-refund?",
    answer:
      "Saldo yang sudah masuk digunakan untuk order layanan. Jika order gagal diproses, dana otomatis dikembalikan ke saldo panel kamu. Refund ke rekening tersedia untuk kasus tertentu.",
  },
  {
    question: "Apakah pesanan akan terlihat natural?",
    answer:
      "Ya. Kami menyediakan opsi drip-feed yang mengirim order secara bertahap, serta layanan high-retention agar pertumbuhan terlihat organik dan bertahan lama.",
  },
  {
    question: "Bagaimana cara menjadi reseller?",
    answer:
      "Daftar akun biasa terlebih dahulu, lalu ajukan upgrade ke reseller. Kamu akan mendapatkan harga khusus, sub-panel white-label, dan akses API untuk automasi.",
  },
];

/* ------------------------------ Reseller perks ---------------------------- */

export const RESELLER_PERKS: string[] = [
  "Harga khusus reseller, margin keuntungan lebih besar",
  "Sub-panel white-label dengan domain & logo sendiri",
  "Akses API penuh untuk automasi order",
  "Manajemen klien & laporan revenue terpisah",
];

/* ------------------------------- Navigation ------------------------------- */

export const NAV_LINKS = [
  { label: "Beranda", href: "#hero" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "#faq" },
];

export const FOOTER_LINKS = {
  produk: [
    { label: "Layanan", href: "#harga" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Reseller", href: "#reseller" },
    { label: "API Docs", href: "#" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kontak", href: "#" },
    { label: "Status Layanan", href: "#" },
  ],
  legal: [
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};
