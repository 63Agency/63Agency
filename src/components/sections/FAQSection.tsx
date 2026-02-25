"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const INITIAL_VISIBLE = 3;

export default function FAQSection() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE);
  const hasMore = items.length > INITIAL_VISIBLE && !showAll;

  return (
    <section className="relative py-20 sm:py-28 bg-black overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 sm:mb-14">
          {t("title")}
        </h2>

        <div className="space-y-3">
          {visibleItems.map((item, index) => {
            const isOpen = openId === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-white/10 bg-white/5 overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="text-white font-medium text-sm sm:text-base pr-2">
                    {item.q}
                  </span>
                  <span className="shrink-0 text-white transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0">
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 text-white font-medium hover:opacity-90 transition-opacity"
            >
              {t("showMore")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {showAll && items.length > INITIAL_VISIBLE && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
            >
              {t("showLess")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: "rotate(180deg)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
