import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";

type Props = { params: { locale: string }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isEn = locale === "en";
  const title = isEn
    ? "Book a Free Strategy Call | 63 Agency"
    : "Réservez un Appel Gratuit | 63 Agency";
  const description = isEn
    ? "Ready to grow? Book a free 30-min strategy call with 63 Agency today."
    : "Prêt à développer votre business ? Réservez un appel stratégique de 30 minutes.";
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/${locale}/contact`,
      siteName: "63 Agency",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        fr: `${SITE_URL}/fr/contact`,
        "x-default": `${SITE_URL}/fr/contact`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ContactLayout({ children }: Props) {
  return children;
}
