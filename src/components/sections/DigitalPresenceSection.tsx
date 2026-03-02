"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function DigitalPresenceSection() {
  const t = useTranslations("digitalPresence");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Left column - Dashboard: image only, no frame */}
          <div className="flex flex-col">
            <div className="relative w-full">
              <Image
                src="/images/Feceboock/Dashbord.png"
                alt={t("card1Alt")}
                width={800}
                height={500}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white">
              {t("headline1")}
            </h3>
            <p className="mt-3 text-white/90 text-base sm:text-lg leading-relaxed">
              {t("body1")}
            </p>
            <p className="mt-3 text-white font-bold text-base sm:text-lg">
              {t("emphasis1")}
            </p>
          </div>

          {/* Right column - Result: image only, no card/chrome */}
          <div className="flex flex-col">
            <div className="relative w-full">
              <Image
                src="/images/Feceboock/result.png"
                alt={t("card2Alt")}
                width={600}
                height={200}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-white">
              {t("headline2")}
            </h3>
            <p className="mt-3 text-white/90 text-base sm:text-lg leading-relaxed">
              {t("body2")}
            </p>
            <p className="mt-3 text-white font-bold text-base sm:text-lg">
              {t("emphasis2")}
            </p>
          </div>
        </div>

        <div className="mt-14 sm:mt-16 flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white bg-black border-2 border-white hover:bg-white hover:text-black transition-colors no-underline text-base sm:text-lg"
          >
            {tNav("contactButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}
