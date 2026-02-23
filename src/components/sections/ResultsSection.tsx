"use client";

import { useTranslations } from 'next-intl';

export default function ResultsSection() {
  const t = useTranslations('results');

  const metrics = [
    {
      value: t('metric1.value'),
      label: t('metric1.label'),
      description: t('metric1.description'),
    },
    {
      value: t('metric2.value'),
      label: t('metric2.label'),
      description: t('metric2.description'),
    },
    {
      value: t('metric3.value'),
      label: t('metric3.label'),
      description: t('metric3.description'),
    },
    {
      value: t('metric4.value'),
      label: t('metric4.label'),
      description: t('metric4.description'),
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 border border-white border-opacity-10 rounded-lg hover:border-opacity-30 transition-all duration-300 bg-black bg-opacity-30"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
                {metric.value}
              </div>
              <div className="text-lg sm:text-xl font-semibold text-white mb-2">
                {metric.label}
              </div>
              <div className="text-sm sm:text-base text-white opacity-60">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
