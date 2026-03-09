"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function ContactThankYouPage() {
  const t = useTranslations("contactPage");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-white shadow-xl p-8 sm:p-12 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6"
          aria-hidden
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
          {t("thankYouTitle")}
        </h1>
        <p className="text-lg text-black/80 mb-2">
          {t("thankYouMessage")}
        </p>
        <p className="text-base text-black/60 mb-8 max-w-md mx-auto">
          {t("thankYouSubMessage")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white bg-black border-2 border-black hover:bg-gray-800 transition-colors no-underline"
          >
            {t("backToHome")}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-black border-2 border-gray-300 bg-transparent hover:bg-gray-100 transition-colors no-underline"
          >
            {t("thankYouButton")}
          </Link>
        </div>
      </div>
    </div>
  );
}
