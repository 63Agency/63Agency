// Root layout - must be empty for next-intl
// The actual layout with html/body is in [locale]/layout.tsx
import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
