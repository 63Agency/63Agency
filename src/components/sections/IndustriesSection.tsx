"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function IndustriesSection() {
  const t = useTranslations('industries');

  const industries = [
    {
      name: t('privateSchools.name'),
      description: t('privateSchools.description'),
      image: "/images/Ecolepreve.png",
    },
    {
      name: t('b2bServices.name'),
      description: t('b2bServices.description'),
      image: "/images/Entreprise.png",
    },
    {
      name: t('realEstate.name'),
      description: t('realEstate.description'),
      image: "/images/Immobilier.png",
    },
    {
      name: t('hospitality.name'),
      description: t('hospitality.description'),
      image: "/images/Hotellerie.png",
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.06) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Industries Grid - 4 cards on same line from md up */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 bg-white shadow-sm hover:shadow-md min-w-0"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden bg-gray-100">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 whitespace-nowrap overflow-hidden text-ellipsis block">
                  {industry.name}
                </h3>
                <p className="text-sm sm:text-base text-white/90 whitespace-nowrap overflow-hidden text-ellipsis block">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
