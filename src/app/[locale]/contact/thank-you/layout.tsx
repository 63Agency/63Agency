import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Thank You | 63 Agency",
  description: "We have received your message.",
  alternates: {
    canonical: `${SITE_URL}/en/contact/thank-you`,
    languages: {
      en: `${SITE_URL}/en/contact/thank-you`,
      fr: `${SITE_URL}/fr/contact/thank-you`,
      "x-default": `${SITE_URL}/en/contact/thank-you`,
    },
  },
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
