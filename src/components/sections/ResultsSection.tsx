"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ResultsSection() {
  const t = useTranslations("results");

  const metrics = [
    { value: t("metric1.value"), label: t("metric1.label"), description: t("metric1.description") },
    { value: t("metric2.value"), label: t("metric2.label"), description: t("metric2.description") },
    { value: t("metric3.value"), label: t("metric3.label"), description: t("metric3.description") },
    { value: t("metric4.value"), label: t("metric4.label"), description: t("metric4.description") },
  ];

  return (
    <section id="results" className="relative py-16 sm:py-24 bg-black overflow-hidden">
      {/* Decorative: image 63 en arrière-plan, effet gris */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
        <Image
          src="/images/hero/63.png"
          alt=""
          width={520}
          height={320}
          className="w-[min(40vw,520px)] h-auto object-contain opacity-[0.08] grayscale"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 sm:mb-16">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t("title")}
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Metrics: bento-style — first card large, then 3 in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Hero metric (Leads) — spans 5 cols on lg */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 hover:border-white/20 transition-colors duration-300">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
              {metrics[0].value}
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white mb-1">
              {metrics[0].label}
            </div>
            <div className="text-sm text-white/50">
              {metrics[0].description}
            </div>
            <div className="mt-6 h-px w-12 bg-white/20" aria-hidden />
          </div>

          {/* Right column: 3 metrics stacked */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {metrics.slice(1, 4).map((metric, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 hover:border-white/20 transition-colors duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                  {metric.value}
                </div>
                <div className="text-base font-semibold text-white">
                  {metric.label}
                </div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line: single thin rule */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div className="h-px w-24 sm:w-32 bg-white/20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
