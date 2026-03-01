"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const LINKEDIN_URL = "https://www.linkedin.com/in/ayoub-rhillane";

export default function FounderSection() {
  const t = useTranslations("founder");
  const locale = useLocale();
  const [showMore, setShowMore] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-white" id="founder">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Quote block */}
        <div className="rounded-2xl bg-black text-white p-8 sm:p-10 mb-8 text-center">
          <p className="text-lg sm:text-xl font-medium leading-relaxed mb-4">
            {t("quote")}
          </p>
          <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            {t("quoteAuthor")}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50/50 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-8 text-center sm:text-left">
            {t("title")}
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            {/* CEO image - small circle */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-200 ring-offset-2">
                {!imgError ? (
                  <Image
                    src="/images/ceofunder/image.png"
                    alt={t("name")}
                    fill
                    className="object-cover object-top"
                    sizes="112px"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-xl font-bold">
                    SC
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-0.5">
                {t("name")}
              </h3>
              <p className="text-xs font-bold text-black/70 uppercase tracking-widest mb-4">
                {t("role")}
              </p>
              <p className="text-black/80 leading-relaxed text-[15px] mb-3">
                {t("description")}
              </p>
              {showMore && (
                <p className="text-black/80 leading-relaxed text-[15px] mb-3">
                  {t("extendedDescription")}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-1.5 text-black font-medium text-sm hover:underline mb-6"
              >
                {showMore ? t("showLess") : t("showMore")}
                <svg
                  className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="border-t border-gray-200 pt-5 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="coolBeans inline-flex items-center justify-center px-5 py-2.5 bg-black text-white font-semibold text-sm rounded-[3rem] border-2 border-black no-underline hover:bg-white hover:text-black hover:border-black transition-colors"
                >
                  {t("talkToStrategist")}
                </Link>
                <div>
                  <p className="text-xs font-bold text-black/60 uppercase tracking-wider mb-1">{t("contactUs")}</p>
                  <a
                    href={`tel:${t("phone").replace(/\s/g, "")}`}
                    className="font-semibold text-black hover:underline"
                  >
                    {t("phone")}
                  </a>
                </div>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shrink-0"
                  aria-label={t("linkedInLabel")}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
