import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | 63 Agency",
  description: "We have received your message.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
