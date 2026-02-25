"use client";

import { useTranslations, useLocale } from "next-intl";
import FlowingMenu from "@/components/FlowingMenu";

const GREEN_ACCENT = "#22c55e";
const YELLOW_ACCENT = "#eab308";
const CREAM_BG = "#FBF9F2";

// 6 solutions alignées avec la page d'accueil "Nos solutions de marketing digital"
const SOLUTIONS = [
  { titleKey: "solution1Title" as const, icon: "/icons/iconSeo.png" },
  { titleKey: "solution2Title" as const, icon: "/icons/IconGoogleFecebouckAds.png" },
  { titleKey: "solution3Title" as const, icon: "/icons/IconWebSiteCreation.png" },
  { titleKey: "solution4Title" as const, icon: "/icons/IconVediographyPhotoGraphy.png" },
  { titleKey: "solution5Title" as const, icon: "/icons/IconCommunotyManagement.png" },
  { titleKey: "solution6Title" as const, icon: "/icons/IconGraphiqueDesigne.png" },
];

export default function AboutServicesSection() {
  const tAbout = useTranslations("aboutServices");
  const tServices = useTranslations("servicesSection");
  const locale = useLocale();

  const items = SOLUTIONS.map(({ titleKey, icon }) => ({
    link: `/${locale}#services`,
    text: tServices(titleKey),
    image: icon,
  }));

  const highlight = tAbout("titleHighlight");
  const parts = tAbout("title").split(highlight);
  const h1 = tAbout("titleHighlight1");
  const h2 = tAbout("titleHighlight2");

  return (
    <section className="relative w-full" style={{ backgroundColor: CREAM_BG }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-10">
        <p className="text-black/60 text-sm font-medium uppercase tracking-wider mb-2">
          {tAbout("label")}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight max-w-5xl">
          {parts[0]}
          <span className="border-b-4 pb-0.5" style={{ borderColor: GREEN_ACCENT }}>
            {h1}
          </span>
          <span className="border-b-4 pb-0.5" style={{ borderColor: YELLOW_ACCENT }}>
            {h2}
          </span>
          {parts[1]}
        </h2>
      </div>

      {/* Thin separator line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <hr className="border-0 border-t border-gray-200" />
      </div>

      {/* FlowingMenu: 6 solutions (alignées avec la page d'accueil) */}
      <div className="min-h-[90vh] flex flex-col" style={{ backgroundColor: CREAM_BG }}>
        <FlowingMenu
          items={items}
          speed={20}
          textColor="#000"
          bgColor={CREAM_BG}
          marqueeBgColor="#000"
          marqueeTextColor="#fff"
          borderColor="rgba(0,0,0,0.08)"
        />
      </div>
    </section>
  );
}
