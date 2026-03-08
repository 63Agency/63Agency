"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const META_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/Meta-EN-(1).png",
  fr: "/images/Feceboock/Meta-Fr-(3).png",
};
const GOOGLE_ADS_IMAGE_BY_LOCALE: Record<string, string> = {
  en: "/images/Feceboock/GoogleAds-EN-(3).png",
  fr: "/images/Feceboock/Google-Ads-Fr-(2).png",
};

export default function DigitalPresenceSection() {
  const t = useTranslations("digitalPresence");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const metaSrc = META_IMAGE_BY_LOCALE[locale] ?? META_IMAGE_BY_LOCALE.fr;
  const googleAdsSrc = GOOGLE_ADS_IMAGE_BY_LOCALE[locale] ?? GOOGLE_ADS_IMAGE_BY_LOCALE.fr;

  return (
    <section className="relative py-6 sm:py-12 overflow-hidden bg-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left column - Meta : même fond blanc pour image + texte */}
          <div className="flex flex-col">
            <div className="relative w-full">
              <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 rounded-2xl bg-white z-0" aria-hidden />
              <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
                <div
                  className="w-[75%] max-w-[400px] aspect-square rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(147, 197, 253, 0.22) 0%, rgba(96, 165, 250, 0.06) 45%, transparent 70%)",
                  }}
                />
              </div>
              <Image
                src={encodeURI(metaSrc)}
                alt={t("card2Alt")}
                width={600}
                height={200}
                className="relative z-10 w-full h-auto block rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="relative z-10 px-4 sm:px-5 pt-6 pb-5 sm:pb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  {t("headline2")}
                </h3>
                <p className="mt-3 text-black/80 text-base sm:text-lg leading-relaxed">
                  {t("body2")}
                </p>
                <p className="mt-3 text-black font-bold text-base sm:text-lg">
                  {t("emphasis2")}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/${locale}/contact`}
                    className="view-more-btn"
                    aria-label={tNav("contactButton")}
                  >
                    <span>
                      <span className="text-1">{tNav("contactButton")}</span>
                      <span className="text-2">{tNav("contactButton")}</span>
                    </span>
                    <i>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Google Ads : même fond blanc pour image + texte */}
          <div className="flex flex-col">
            <div className="relative w-full">
              <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 rounded-2xl bg-white z-0" aria-hidden />
              <div className="absolute left-0 right-0 top-40 sm:top-52 bottom-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
                <div
                  className="w-[75%] max-w-[400px] aspect-square rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(253, 224, 71, 0.1) 0%, rgba(251, 191, 36, 0.04) 45%, transparent 70%)",
                  }}
                />
              </div>
              <Image
                src={encodeURI(googleAdsSrc)}
                alt={t("card1Alt")}
                width={800}
                height={500}
                className="relative z-10 w-full h-auto block rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="relative z-10 px-4 sm:px-5 pt-6 pb-5 sm:pb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-black">
                  {t("headline1")}
                </h3>
                <p className="mt-3 text-black/80 text-base sm:text-lg leading-relaxed">
                  {t("body1")}
                </p>
                <p className="mt-3 text-black font-bold text-base sm:text-lg">
                  {t("emphasis1")}
                </p>
                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/${locale}/contact`}
                    className="view-more-btn"
                    aria-label={tNav("contactButton")}
                  >
                    <span>
                      <span className="text-1">{tNav("contactButton")}</span>
                      <span className="text-2">{tNav("contactButton")}</span>
                    </span>
                    <i>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
