"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const INITIAL_VISIBLE = 4;

export default function AboutFAQSection() {
  const t = useTranslations("aboutFaq");
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
  ];

  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE);
  const hasMore = items.length > INITIAL_VISIBLE && !showAll;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-black">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-14 sm:mb-16">
          {t("title")}
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {visibleItems.map((item, index) => {
            const isOpen = openId === index;
            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden bg-white border border-gray-200 min-h-[4.5rem] sm:min-h-[5rem]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-5 px-6 sm:px-8 py-6 sm:py-8 text-left min-h-[4.5rem] sm:min-h-[5rem]"
                >
                  <span className="text-black font-medium text-base sm:text-lg pr-4 leading-snug">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 text-black transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 border-t border-gray-200">
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed pt-5">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
            >
              {t("showMore")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {showAll && items.length > INITIAL_VISIBLE && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => { setOpenId(null); setShowAll(false); }}
              className="inline-flex items-center gap-2 text-white/80 font-medium hover:text-white transition-colors"
            >
              {t("showLess")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: "rotate(180deg)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
