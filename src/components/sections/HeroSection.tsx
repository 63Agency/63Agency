"use client";

import Link from "next/link";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

/** Split text into two lines with balanced word count. */
function splitIntoTwoLines(text: string): [string, string] {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [text.trim(), ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

const UNDERLINE_CLASS = "underline underline-offset-2 decoration-2";

/** Apply underlines to multiple phrases (order matters for nested splits). */
function withUnderlines(text: string, phrases: string[]): React.ReactNode {
  if (phrases.length === 0) return text;
  const [phrase, ...rest] = phrases;
  if (!phrase || !text.includes(phrase)) return withUnderlines(text, rest);
  const [before, ...restSplit] = text.split(phrase);
  const after = restSplit.join(phrase);
  return (
    <>
      {withUnderlines(before, rest)}
      <span className={UNDERLINE_CLASS}>{phrase}</span>
      {withUnderlines(after, rest)}
    </>
  );
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const headlineFull = `${t("secondaryHeadlineStart")} ${t("secondaryHeadlineEnd")}`.trim();
  const [line1, line2] = splitIntoTwoLines(headlineFull);
  const underlinePhrases = locale === "en" ? ["50 to 650"] : ["50 et 650", "qualifiés chaque mois"];
  const line1Content = withUnderlines(line1, underlinePhrases);
  const line2Content = withUnderlines(line2, underlinePhrases);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-2 sm:pt-24 lg:pt-32 pb-4 sm:pb-6 lg:pb-8 text-center">
        {/* Primary Headline – même style que la description (Spécialisés…) */}
        <h2 className="text-sm sm:text-lg md:text-xl text-gray-400 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
          {t('primaryHeadline')}
        </h2>

        {/* Secondary Headline – affichage professionnel, 2 lignes */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 flex flex-col items-center sm:items-start max-w-4xl mx-auto">
          <span className="inline-flex flex-col items-center w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden />
              <span
                className="bg-clip-text text-transparent tracking-tight sm:tracking-[-0.02em] whitespace-nowrap"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #7A8B9C 0%, #8293A4 15%, #95A5B5 35%, #A8B8C8 55%, #B8C8D8 72%, #C5D5E5 88%, #D5E2EE 96%, #FFFFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                  textShadow: "0 2px 20px rgba(184, 200, 218, 0.35), 0 0 40px rgba(200, 215, 230, 0.12)",
                }}
              >
                {line1Content}
              </span>
            </span>
            <span
              className="block mt-2 sm:mt-2.5 font-bold tracking-tight whitespace-normal sm:whitespace-nowrap bg-clip-text text-transparent"
              style={{
                letterSpacing: "0.01em",
                lineHeight: 1.2,
                backgroundImage: "linear-gradient(to bottom, #7A8B9C 0%, #8293A4 15%, #95A5B5 35%, #A8B8C8 55%, #B8C8D8 72%, #C5D5E5 88%, #D5E2EE 96%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 20px rgba(184, 200, 218, 0.35), 0 0 40px rgba(200, 215, 230, 0.12)",
              }}
            >
              {line2Content}
            </span>
          </span>
        </h1>

        {/* Descriptive Text – ligne 1 au-dessus de ligne 2 */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-400 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed px-4 font-medium">
          <span className="block">{t("descriptionLine1")}</span>
          <span className="block mt-1">{t("descriptionLine2")}</span>
        </p>

        {/* Main CTA Button */}
        <Link
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#contact");
          }}
          className="coolBeans inline-block px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-bold"
          style={{ textDecoration: 'none' }}
        >
          {t('ctaButton')}
        </Link>
      </div>

      {/* WhatsApp Icon - Bottom Right (07 20 007 007) */}
      <a
        href="https://wa.me/212720007007"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-8 flex h-12 w-12 items-center justify-center bg-green-500 hover:bg-green-600 rounded-full shadow-lg z-20 transition-all duration-200 transform hover:scale-110"
        aria-label="WhatsApp - 07 20 007 007"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </section>
  );
}
