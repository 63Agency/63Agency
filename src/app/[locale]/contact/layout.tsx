import type { Metadata } from "next";

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
  const baseUrl = "https://63agency.ma";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contact`,
      siteName: "63 Agency",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        fr: `${baseUrl}/fr/contact`,
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
