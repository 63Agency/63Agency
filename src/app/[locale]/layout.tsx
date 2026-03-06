import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import CardNavHeader from "@/components/CardNavHeader";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://63agency.ma"),
  title: {
    default: "63 Agency | Lead Generation & Performance Marketing",
    template: "%s | 63 Agency",
  },
  description:
    "Lead generation & performance marketing agency in Morocco & Europe.",
  icons: {
    icon: "/favicon.ico",
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
