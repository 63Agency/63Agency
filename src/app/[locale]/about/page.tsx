import type { Metadata } from "next";
import AboutIntroSection from "@/components/sections/AboutIntroSection";
import AboutServicesSection from "@/components/sections/AboutServicesSection";
import ShapeFutureSection from "@/components/sections/ShapeFutureSection";
import JsonLd from "@/components/seo/JsonLd";
import fr from "@/../messages/fr.json";
import en from "@/../messages/en.json";

const BASE_URL = "https://63agency.ma";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isEn = locale === "en";
  const title = isEn
    ? "About Us | 63 Agency - Our Performance Marketing Expertise"
    : "À Propos | 63 Agency - Notre Expertise en Marketing Performance";
  const description = isEn
    ? "Meet the team behind 63 Agency. Specialists in lead generation and ROI-driven marketing in Morocco and Europe."
    : "Découvrez l'équipe et l'expertise de 63 Agency. Agence spécialisée en génération de leads et marketing ROI au Maroc et Europe.";
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${BASE_URL}/${locale}/about`,
      siteName: "63 Agency",
      locale: isEn ? "en_US" : "fr_FR",
      alternateLocale: isEn ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        en: `${BASE_URL}/en/about`,
        fr: `${BASE_URL}/fr/about`,
        "x-default": `${BASE_URL}/fr/about`,
      },
    },
    robots: { index: true, follow: true },
  };
}

function getAboutFaqSchema(locale: string) {
  const faq = locale === "en" ? (en as any).aboutFaq : (fr as any).aboutFaq;
  if (!faq) return null;
  const questions = [
    [faq.q1, faq.a1],
    [faq.q2, faq.a2],
    [faq.q3, faq.a3],
    [faq.q4, faq.a4],
    [faq.q5, faq.a5],
    [faq.q6, faq.a6],
    [faq.q7, faq.a7],
    [faq.q8, faq.a8],
  ].filter(([q]) => q);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function getBreadcrumbSchema(locale: string) {
  const isEn = locale === "en";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "About Us" : "À Propos", item: `${BASE_URL}/${locale}/about` },
    ],
  };
}

export default async function AboutPage({ params }: Props) {
  const locale = params.locale;
  const faqSchema = getAboutFaqSchema(locale);
  const breadcrumbSchema = getBreadcrumbSchema(locale);

  return (
    <>
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={breadcrumbSchema} />
      <div className="bg-black">
        <ShapeFutureSection />
      </div>
      <AboutIntroSection />
      <AboutServicesSection />
    </>
  );
}
