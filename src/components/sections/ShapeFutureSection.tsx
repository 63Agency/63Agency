"use client";

import { useTranslations } from "next-intl";

export default function ShapeFutureSection() {
  const t = useTranslations("shapeFuture");

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-black overflow-hidden">
      {/* Watermark background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white/5 text-[ clamp(4rem,20vw,14rem)] font-bold tracking-[0.2em] select-none">
          63 AGENCY
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center uppercase tracking-tight leading-tight mb-6">
          {t("headline")}
        </h2>

        {/* Subheading with accent underline */}
        <p className="text-center mb-10 sm:mb-12">
          <span className="text-white text-lg sm:text-xl">
            63 Agency : <span className="border-b-2 border-white/60 pb-0.5">{t("subtitleUnderline")}</span>{" "}
            <span className="italic">{t("subtitleItalic")}</span>
          </span>
        </p>

        {/* Central paragraph */}
        <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          {t("paragraph")}
        </p>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 border-t border-white/10 pt-10">
          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-white shrink-0 mt-1">
                <i className="fa-solid fa-up-right-from-square text-lg" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-white">{t("col1Title")}</h3>
            </div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed pl-8">
              {t("col1Body")}
            </p>
          </div>

          <div className="flex flex-col md:border-x border-white/10 md:px-8">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-white shrink-0 mt-1">
                <i className="fa-solid fa-up-right-from-square text-lg" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-white">{t("col2Title")}</h3>
            </div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed pl-8">
              {t("col2Body")}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-white shrink-0 mt-1">
                <i className="fa-solid fa-up-right-from-square text-lg" aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-white">{t("col3Title")}</h3>
            </div>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed pl-8">
              {t("col3Body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
