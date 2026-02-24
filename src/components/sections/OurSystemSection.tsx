"use client";

import { useTranslations } from 'next-intl';

export default function OurSystemSection() {
  const t = useTranslations('system');

  const steps = [
    {
      number: "01",
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      number: "02",
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      number: "03",
      title: t('step3.title'),
      description: t('step3.description'),
    },
    {
      number: "04",
      title: t('step4.title'),
      description: t('step4.description'),
    },
  ];

  return (
    <section id="system" className="relative py-20 sm:py-32 bg-black overflow-hidden">
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

        {/* System Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="border border-white border-opacity-20 rounded-lg p-6 sm:p-8 hover:border-opacity-40 transition-all duration-300 bg-black bg-opacity-50">
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white opacity-20 group-hover:opacity-40 transition-opacity">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base sm:text-lg text-white opacity-70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xl sm:text-2xl font-bold text-white">
            {t('bottomMessage')}
          </p>
        </div>
      </div>
    </section>
  );
}
