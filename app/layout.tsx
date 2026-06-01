import type { Metadata, Viewport } from "next";
// Self-hosted fonts (Fontsource) — no external network needed at build/runtime.
import "@fontsource-variable/syne";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const SITE_NAME = "SuntikSocial";
const SITE_DESCRIPTION =
  "Panel SMM terpercaya #1 di Indonesia. Suntik followers, likes, views & engagement real untuk Instagram, TikTok, YouTube, dan 10+ platform. Proses otomatis 24/7, garansi refill, harga mulai Rp 50.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Jasa Suntik Sosial Media Terpercaya #1 di Indonesia`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "smm panel",
    "jasa followers",
    "suntik followers",
    "jasa like instagram",
    "panel smm indonesia",
    "tambah followers tiktok",
    "jasa view youtube",
  ],
  openGraph: {
    title: `${SITE_NAME} — Jasa Suntik Sosial Media Terpercaya`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Jasa Suntik Sosial Media Terpercaya`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
