"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNER_LOGOS = [
  { name: "Partenaire 1", logo: "/images/partners/partner-logos/partener1.png" },
  { name: "Partenaire 2", logo: "/images/partners/partner-logos/partener2.png" },
  { name: "Partenaire 3", logo: "/images/partners/partner-logos/partener3.png" },
  { name: "Partenaire 4", logo: "/images/partners/partner-logos/partenaire4.png" },
  { name: "Partenaire 5", logo: "/images/partners/partner-logos/Partenaire5.png" },
  { name: "Partenaire 6", logo: "/images/partners/partner-logos/partenaire6.png" },
  { name: "Partenaire 7", logo: "/images/partners/partner-logos/partenaire7.png" },
];

export default function PartnersGridSection() {
  const t = useTranslations("partners");

  // Repeat logos to fill a grid (~6 rows x 10 cols = 60 items)
  const gridLogos = Array.from({ length: 60 }, (_, i) => PARTNER_LOGOS[i % PARTNER_LOGOS.length]);

  return (
    <section className="relative py-16 sm:py-20 bg-neutral-100 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-10 sm:mb-14 leading-tight">
          <span className="block">{t("titleLine1")}</span>
          <span className="block">{t("titleLine2")}</span>
        </h2>

        {/* Logos grid - greyscale, responsive */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 items-center justify-items-center">
          {gridLogos.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full aspect-[2/1] max-w-[120px] grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={50}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
