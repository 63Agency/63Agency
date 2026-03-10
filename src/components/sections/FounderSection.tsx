"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";


export default function FounderSection() {
  const t = useTranslations("founder");
  const locale = useLocale();
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-6 sm:py-12 bg-white" id="founder">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Titre principal + point vert */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-10 sm:mb-12 text-left leading-tight">
          {t("headline")}
          <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] align-middle ml-1.5" aria-hidden />
        </h2>

        {/* Bloc témoignage CEO : photo ronde à gauche + citation à droite */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start mb-10">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-300 ring-2 ring-gray-200">
              {!imgError ? (
                <Image
                  src="/images/ceofunder/image.png"
                  alt={t("name")}
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-white text-xl font-bold">
                  SC
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="relative text-lg sm:text-xl text-black/90 italic leading-relaxed">
              <span className="text-[#22c55e] font-serif text-3xl sm:text-4xl leading-none select-none" aria-hidden>
                "
              </span>
              <span className="px-1 whitespace-pre-line">{t("quote")}</span>
              <span className="text-[#22c55e] font-serif text-3xl sm:text-4xl leading-none select-none align-top" aria-hidden>
                "
              </span>
            </p>
            <p className="mt-1.5 text-sm text-gray-500 font-normal">
              {t("quoteAuthor")}
            </p>
          </div>
        </div>

        {/* Bouton CTA noir, hover = fond blanc + texte noir (comme navbar) */}
        <Link
          href={`/${locale}#contact`}
          className="coolBeansNav inline-flex items-center gap-3 px-6 py-3.5 rounded-[3rem] border-2 border-white bg-black text-white font-semibold text-[15px] no-underline"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-current opacity-90" aria-hidden>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          {t("talkToStrategist")}
        </Link>
      </div>
    </section>
  );
}
