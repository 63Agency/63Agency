"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function PartnersSection() {
  const t = useTranslations('partners');

  const partners = [
    { name: "Partenaire 1", logo: "/images/partners/partner-logos/partener1.png" },
    { name: "Partenaire 2", logo: "/images/partners/partner-logos/partener2.png" },
    { name: "Partenaire 3", logo: "/images/partners/partner-logos/partener3.png" },
    { name: "Partenaire 4", logo: "/images/partners/partner-logos/partenaire4.png" },
    { name: "Partenaire 5", logo: "/images/partners/partner-logos/Partenaire5.png" },
    { name: "Partenaire 6", logo: "/images/partners/partner-logos/partenaire6.png" },
    { name: "Partenaire 7", logo: "/images/partners/partner-logos/partenaire7.png" },
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="relative pt-0 pb-16 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-12 flex-wrap lg:flex-nowrap">
          {/* Title - Left Side */}
          <div className="flex-shrink-0 ml-16 lg:ml-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              <span className="block">{t('titleLine1')}</span>
              <span className="block">{t('titleLine2')}</span>
            </h2>
          </div>

          {/* Logos - Right Side with Loop Animation */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll gap-8 lg:gap-12 items-center">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: '150px', height: '80px' }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                    style={{ maxWidth: '150px', maxHeight: '80px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
