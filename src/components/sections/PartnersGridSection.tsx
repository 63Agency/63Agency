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
  { name: "Commons", logo: "/images/partners/partner-logos/imagecopy6.png" },
  { name: "La Villette International School", logo: "/images/partners/partner-logos/image1copy.png" },
  { name: "Afriquia", logo: "/images/partners/partner-logos/Afriquia.png" },
  { name: "Partenaire 10", logo: "/images/partners/partner-logos/partenaire10.jpg" },
  { name: "EasyPower", logo: "/images/partners/partner-logos/EasyPower(1)(2).png" },
  { name: "Jules Renard International School", logo: "/images/partners/partner-logos/image2copy.png" },
  { name: "ScolaritéPlus", logo: "/images/partners/partner-logos/image%20copy.png" },
  { name: "DELTA ACADEMY", logo: "/images/partners/partner-logos/imagecopy2.png" },
  { name: "Partenaire 15", logo: "/images/partners/partner-logos/partenaire15.jpg" },
  { name: "Manar Assanaoubar Groupe Scolaire", logo: "/images/partners/partner-logos/image3copy%202.png" },
  { name: "Partenaire 17", logo: "/images/partners/partner-logos/partenaire17.png" },
  { name: "Partenaire 18", logo: "/images/partners/partner-logos/partenaire18.png" },
  { name: "Partenaire 19", logo: "/images/partners/partner-logos/partenaire19.jpg" },
  { name: "MGT", logo: "/images/partners/partner-logos/image-copy.png" },
  { name: "Partenaire Logo", logo: "/images/partners/partner-logos/logo.png" },
  { name: "Partenaire Logo 02", logo: "/images/partners/partner-logos/logo02cadre.png" },
  { name: "EducAtlas", logo: "/images/partners/partner-logos/image.png" },
  { name: "Madariss Achbal Al Atlas", logo: "/images/partners/partner-logos/imagecopy.png" },
  { name: "Partenaire LOGO PNG", logo: "/images/partners/partner-logos/LOGO PNG-01.png" },
  { name: "London Academy", logo: "/images/partners/partner-logos/londonacademio.png" },
];

export default function PartnersGridSection() {
  const t = useTranslations("partners");

  return (
    <section className="relative py-6 sm:py-12 bg-neutral-100 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 text-center mb-10 sm:mb-14 leading-tight whitespace-nowrap">
          {t("titleLine1")} {t("titleLine2")}
        </h2>

        {/* Logos grid — chaque logo affiché une seule fois */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 items-center justify-items-center">
          {PARTNER_LOGOS.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center w-full aspect-[2/1] max-w-[120px]"
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
