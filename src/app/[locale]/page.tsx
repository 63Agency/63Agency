import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import HeroSection from "@/components/sections/HeroSection";
import FounderSection from "@/components/sections/FounderSection";
import OurSystemSection from "@/components/sections/OurSystemSection";
import ResultsSection from "@/components/sections/ResultsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import CTASection from "@/components/sections/CTASection";
import DigitalPresenceSection from "@/components/sections/DigitalPresenceSection";
import PartnersGridSection from "@/components/sections/PartnersGridSection";
import ScrollReveal from "@/components/ScrollReveal";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isEn = locale === "en";
  const title = isEn
    ? "63 Agency | Lead Generation & Performance Marketing"
    : "63 Agency | Génération de Leads & Marketing Performance";
  const description = isEn
    ? "We generate qualified leads for Education, B2B and Real Estate in Morocco & Europe. Book a free strategy call."
    : "Nous générons des leads qualifiés pour l'éducation, le B2B et l'immobilier au Maroc & en Europe. Réservez un appel gratuit.";
  const keywords = isEn
    ? ["lead generation Morocco", "performance marketing", "B2B leads", "education leads"]
    : ["génération de leads Maroc", "marketing performance", "leads B2B", "agence leads"];
  const baseUrl = "https://63agency.ma";
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "63 Agency",
      images: [
        { url: "/images/og-63agency.jpg", width: 1200, height: 630, alt: "63 Agency" },
      ],
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Home() {
  return (
    <main className="bg-black">
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
        <CTASection />
      </ScrollReveal>
      <ScrollReveal variant="fadeUp">
        <PartnersGridSection />
      </ScrollReveal>
    </main>
  );
}
