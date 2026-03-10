import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import CardNavHeader from "@/components/CardNavHeader";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";

const SITE_URL = "https://63agency.ma";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "63 Agency",
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero/63.png`,
  description: "Agence spécialisée en génération de leads et marketing performance au Maroc et en Europe.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["French", "English"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "63 Agency",
  url: SITE_URL,
  description: "Lead generation & performance marketing agency in Morocco & Europe.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/fr#contact`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "63 Agency | Lead Generation & Performance Marketing",
    template: "%s | 63 Agency",
  },
  description:
    "Lead generation & performance marketing agency in Morocco & Europe.",
  icons: {
    icon: "/images/hero/63.png",
    apple: "/images/hero/63.png",
  },
  verification: {
    google: "PLACEHOLDER_GOOGLE_SEARCH_CONSOLE_TAG",
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages({ locale });
  
  return (
    <html lang={locale} dir="ltr">
      <head>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-black text-white m-0 p-0">
        <NextIntlClientProvider messages={messages}>
          <main>
            <CardNavHeader />
            <div className="pt-0 sm:pt-4">{children}</div>
          </main>
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
