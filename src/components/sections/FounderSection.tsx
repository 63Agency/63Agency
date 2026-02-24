"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LINKEDIN_URL = "https://www.linkedin.com/in/ayoub-rhillane";

export default function FounderSection() {
  const t = useTranslations("founder");
  const [showMore, setShowMore] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-[#F5F5F5]" id="founder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 sm:mb-10 text-left">
          {t("title")}
        </h2>

        {/* Image beside text - no card */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,0.4fr)_1fr] gap-8 md:gap-12 items-start">
          {/* Image */}
          <div className="relative w-full aspect-[3/4] max-w-md mx-auto md:mx-0 md:max-w-none rounded-xl overflow-hidden bg-gray-200">
            {!imgError ? (
              <Image
                src="/images/ceofunder/image.png"
                alt={t("name")}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 text-4xl font-bold">
                SC
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-1">
              {t("name")}
            </h3>
            <p className="text-sm font-bold text-black uppercase tracking-wide mb-5">
              {t("role")}
            </p>
            <p className="text-black/80 leading-relaxed mb-3 text-[15px]">
              {t("description")}
            </p>
            {showMore && (
              <p className="text-black/80 leading-relaxed mb-3 text-[15px]">
                {t("extendedDescription")}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-1 text-black font-medium text-sm hover:underline mb-6 self-start"
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

            <div className="w-1/2 border-t border-black/20 pt-6 mb-6" />

            <p className="text-black font-bold text-sm mb-2">{t("contactUs")}</p>
            <a
              href={`tel:${t("phone").replace(/\s/g, "")}`}
              className="font-bold text-base text-black hover:underline block mb-4"
            >
              {t("phone")}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 bg-black text-white rounded-[6px] hover:bg-black/90 transition-opacity"
              aria-label={t("linkedInLabel")}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
