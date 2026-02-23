"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function IndustriesSection() {
  const t = useTranslations('industries');

  const industries = [
    {
      name: t('privateSchools.name'),
      description: t('privateSchools.description'),
      image: "/images/industries/private-schools.jpg",
    },
    {
      name: t('trainingCenters.name'),
      description: t('trainingCenters.description'),
      image: "/images/industries/training-centers.jpg",
    },
    {
      name: t('realEstate.name'),
      description: t('realEstate.description'),
      image: "/images/industries/real-estate.jpg",
    },
    {
      name: t('hospitality.name'),
      description: t('hospitality.description'),
      image: "/images/industries/hospitality.jpg",
    },
    {
      name: t('b2bServices.name'),
      description: t('b2bServices.description'),
      image: "/images/industries/b2b-services.jpg",
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-white opacity-80 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300 bg-black bg-opacity-30"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm sm:text-base text-white opacity-80">
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
