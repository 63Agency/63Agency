import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import HeroSection from "@/components/sections/HeroSection";
import FounderSection from "@/components/sections/FounderSection";
import OurSystemSection from "@/components/sections/OurSystemSection";
import ResultsSection from "@/components/sections/ResultsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ContactSection from "@/components/sections/ContactSection";
import DigitalPresenceSection from "@/components/sections/DigitalPresenceSection";
import PartnersGridSection from "@/components/sections/PartnersGridSection";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/seo/JsonLd";

const BASE_URL = "https://63agency.ma";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isEn = locale === "en";
  const title = isEn
    ? "63 Agency | Lead Generation & Performance Marketing Agency in Morocco"
    : "63 Agency | Agence de Génération de Leads & Marketing Performance au Maroc";
  const description = isEn
    ? "Maximize your ROI with 63 Agency. Lead generation specialists, Meta Ads & Google Ads in Morocco and Europe. Measurable results guaranteed."
    : "Boostez votre ROI avec 63 Agency. Spécialistes en génération de leads, Meta Ads & Google Ads au Maroc et en Europe. Résultats mesurables garantis.";
  const keywords = isEn
    ? ["lead generation Morocco", "performance marketing", "B2B leads", "education leads", "Meta Ads agency Morocco", "Google Ads agency Morocco"]
    : ["génération de leads Maroc", "marketing performance", "ROI", "Meta Ads", "Google Ads", "agence marketing Maroc", "lead generation Maroc"];
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${BASE_URL}/${locale}`,
      siteName: "63 Agency",
      images: [
        { url: "/images/og-63agency.jpg", width: 1200, height: 630, alt: "63 Agency" },
      ],
      locale: isEn ? "en_US" : "fr_FR",
      alternateLocale: isEn ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        fr: `${BASE_URL}/fr`,
        "x-default": `${BASE_URL}/fr`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function getProfessionalServiceSchema(locale: string) {
  const isEn = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "63 Agency",
    url: BASE_URL,
    serviceType: isEn
      ? "Lead Generation & Performance Marketing"
      : "Génération de Leads & Marketing Performance",
    areaServed: [{ "@type": "Country", name: "Morocco" }, { "@type": "Country", name: "France" }, { "@type": "Country", name: "Belgium" }, { "@type": "Country", name: "Switzerland" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEn ? "Performance Marketing Services" : "Services Marketing Performance",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isEn ? "Lead Generation" : "Génération de Leads",
            description: isEn ? "Qualified lead generation for Education, B2B and Real Estate." : "Génération de leads qualifiés pour l'éducation, le B2B et l'immobilier.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Meta Ads",
            description: isEn ? "Meta Ads campaigns for leads and conversions." : "Campagnes Meta Ads pour leads et conversions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Ads",
            description: isEn ? "Google Ads for performance and ROI." : "Google Ads pour la performance et le ROI.",
          },
        },
      ],
    },
  };
}

export default function Home({ params }: Props) {
  const locale = params.locale;
  return (
    <main className="bg-black">
      <JsonLd data={getProfessionalServiceSchema(locale)} />
      <HeroSection />
      <ScrollReveal variant="fadeUp">
        <OurSystemSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <FounderSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <ResultsSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <IndustriesSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <DigitalPresenceSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <ContactSection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <PartnersGridSection />
      </ScrollReveal>
    </main>
  );
}
