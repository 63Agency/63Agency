"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";


export default function AboutIntroSection() {
  const t = useTranslations("aboutIntro");

  return (
    <section id="about-intro" className="relative min-h-screen bg-[#f8f9fa] overflow-hidden shrink-0">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: Who are we? - dark blue box */}
          <div
            className="lg:col-span-5 rounded-2xl p-8 sm:p-10 text-white flex flex-col justify-between bg-black"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-6">
                {t("whoWeAreTitle")}
              </h2>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed">
                {t("whoWeAreBody")}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 flex items-center">
              <Image
                src="/images/hero/63AgencyTextwhit.png"
                alt="63 Agency"
                width={180}
                height={48}
                className="h-8 w-auto object-contain object-left"
              />
            </div>
          </div>

          {/* Right: Vision + Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                {t("visionTitle")}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                {t("visionBody")}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                {t("missionTitle")}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {t("missionBody")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="mt-14 sm:mt-16 text-center text-gray-500 text-sm">
          {t("tagline")} — <span className="italic">{t("taglineItalic")}</span>
        </p>
      </div>
    </section>
  );
}
