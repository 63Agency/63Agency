import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "63 Agency | Turning Marketing Into Predictable Revenue",
  description: "We build systems that generate qualified leads consistently. Performance-driven lead generation agency in Morocco and Europe.",
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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-black text-white m-0 p-0">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pt-20">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
