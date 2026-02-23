// Root layout - must be empty for next-intl
// The actual layout with html/body is in [locale]/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
