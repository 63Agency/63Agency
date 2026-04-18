import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import dynamic from "next/dynamic";
import CardNavHeader from "@/components/CardNavHeader";
import JsonLd from "@/components/seo/JsonLd";
import { META_PIXEL_ID, SITE_URL } from "@/config/site";

const Footer = dynamic(() => import("../components/Footer").then((m) => m.default), { ssr: true });
const ScrollToTop = dynamic(() => import("../components/ScrollToTop").then((m) => m.default), { ssr: false });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "63 Agency",
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero/logoDuSite.png`,
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
    icon: "/images/hero/logoDuSite.png",
    apple: "/images/hero/logoDuSite.png",
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
        <link rel="preload" href="/images/hero/63AgencyTextwhit.webp" as="image" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NMBD3585');` }} />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
            `.trim(),
          }}
        />
      </head>
      <body className="bg-black text-white m-0 p-0">
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NMBD3585" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
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
