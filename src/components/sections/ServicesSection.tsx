"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const SOLUTION_ICONS = [
  <svg key="1" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  <svg key="2" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>,
  <svg key="3" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>,
  <svg key="4" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>,
  <svg key="5" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>,
  <svg key="6" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
  </svg>,
];

function getBullets(t: ReturnType<typeof useTranslations>, solutionNum: number): string[] {
  const count = solutionNum === 3 ? 5 : 4;
  const bullets: string[] = [];
  for (let i = 1; i <= count; i++) {
    const key = `solution${solutionNum}Bullet${i}` as const;
    const value = t(key);
    if (value && value !== key) bullets.push(value);
  }
  return bullets;
}

export default function ServicesSection() {
  const t = useTranslations("servicesSection");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Title + intro + services list */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-2 leading-relaxed">
              {t("tagline1")} {t("tagline2")}
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              {t("intro")}
            </p>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((id) => {
                const bullets = getBullets(t, id);
                const goalKey = id === 1 ? "solution1Goal" : id === 5 ? "solution5Result" : `solution${id}Tagline` as const;
                const footer = t(goalKey as "solution1Goal");
                const isExpanded = expandedId === id;

                return (
                  <div
                    key={id}
                    className="bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left"
                      onClick={() => setExpandedId(isExpanded ? null : id)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">{SOLUTION_ICONS[id - 1]}</span>
                        <span className="text-base sm:text-lg font-medium text-gray-900">
                          {t(`solution${id}Title` as "solution1Title")}
                        </span>
                      </div>
                      <span className="text-2xl font-light text-gray-500 shrink-0">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-gray-200">
                        <p className="text-sm sm:text-base text-gray-700 mb-3 mt-2">
                          {t(`solution${id}Subtitle` as "solution1Subtitle")}
                        </p>
                        <ul className="space-y-2 mb-3">
                          {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                              <span className="text-green-600 mt-0.5 shrink-0">✔</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-gray-900 font-medium text-sm">{footer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Tablet mockup + metrics */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="relative bg-gray-900 rounded-lg p-2 sm:p-3 shadow-2xl transform rotate-[-2deg]">
                <div className="relative aspect-[4/3] bg-gray-800 rounded overflow-hidden">
                  <Image
                    src="/images/services/branding-design.jpg"
                    alt="Branding Design"
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                    <div className="text-white">
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-blue-300">BRANDING</h3>
                      <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold">DESIGN</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 sm:-bottom-12 left-0 right-0 flex gap-4 sm:gap-6 justify-center">
                <div className="bg-gray-900 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg">
                  <p className="text-xs sm:text-sm text-red-400 opacity-90 mb-1">ORGANIC TRAFFIC</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-500">+77%</p>
                </div>
                <div className="bg-gray-900 px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg">
                  <p className="text-xs sm:text-sm text-red-400 opacity-90 mb-1">ROI REVOLUTION</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-500">+241%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our approach - full width below */}
        <div className="mt-24 sm:mt-32">
          <div className="bg-gray-900 rounded-2xl p-8 sm:p-10 text-white mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              {t("approachTitle")}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 text-sm sm:text-base font-medium"
                >
                  {t(`approachItem${i}` as "approachItem1")}
                </span>
              ))}
            </div>
            <p className="text-center text-lg sm:text-xl font-semibold text-white/95">
              = {t("approachFormula")}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t("ctaTitle")}</p>
            <Link
              href="#contact"
              className="coolBeans inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold border-2 border-white"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
