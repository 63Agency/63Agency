"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";

const Grainient = dynamic(() => import("@/components/Grainient"), { ssr: false });

const PARTNER_LOGOS = [
  { src: "/images/partners/partner-logos/partener1.webp", alt: "Partner" },
  { src: "/images/partners/partner-logos/CommonsLogo.webp", alt: "Commons" },
  { src: "/images/partners/partner-logos/Afriquia.webp", alt: "Afriquia" },
  { src: "/images/partners/partner-logos/londonacademio.webp", alt: "London Academy" },
  { src: "/images/partners/partner-logos/Unit-Education .webp", alt: "Unit Education" },
  { src: "/images/partners/partner-logos/partenaire18.webp", alt: "Partner" },
];

/** Responsive: 2 rows of 3 logos (row1: Afriquia, London Academy, Commons | row2: Unit Education, Algorithme, Uno Mars) */
const PARTNER_LOGOS_MOBILE_ROWS: { row1: typeof PARTNER_LOGOS; row2: typeof PARTNER_LOGOS } = {
  row1: [
    { src: "/images/partners/partner-logos/Afriquia.webp", alt: "Afriquia" },
    { src: "/images/partners/partner-logos/londonacademio.webp", alt: "London Academy" },
    { src: "/images/partners/partner-logos/CommonsLogo.webp", alt: "Commons" },
  ],
  row2: [
    { src: "/images/partners/partner-logos/Unit-Education .webp", alt: "Unit Education" },
    { src: "/images/partners/partner-logos/partenaire18.webp", alt: "Algorithme" },
    { src: "/images/partners/partner-logos/partenaire17.webp", alt: "Uno Mars" },
  ],
};

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
  const underlinePhrases = locale === "en" ? ["50 to 950"] : ["50 et 950", "qualifiés chaque mois"];
  const line1Content = withUnderlines(line1, underlinePhrases);
  const line2Content = withUnderlines(line2, underlinePhrases);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-start sm:items-center justify-center bg-black">
      {/* Grainient background — gris et noir, animé */}
      <div className="absolute inset-0 z-0 min-h-screen w-full bg-black">
        <div className="absolute inset-0 min-h-full w-full">
          <Grainient
            className="h-full w-full min-h-screen"
            color1="#000000"
            color2="#404040"
            color3="#1a1a1a"
            timeSpeed={0.8}
            warpStrength={1.4}
            warpSpeed={2.8}
            grainAmount={0.1}
            grainAnimated={true}
          />
        </div>
      </div>
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content — responsive pro: safe area + padding suffisant pour éviter coupure texte */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto pt-24 sm:pt-20 lg:pt-24 pb-6 sm:pb-4 lg:pb-6 text-center box-border overflow-visible pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pl-6 sm:pr-6"
      >
        <div className="w-full min-w-0 max-w-4xl mx-auto px-1 sm:px-4 md:px-0">
        {/* Texte du haut : mobile = très petit + une seule ligne */}
        <h2 className="text-[8px] sm:text-xs md:text-sm text-gray-400 mb-2 max-w-4xl mx-auto leading-none font-medium w-full whitespace-nowrap sm:whitespace-normal tracking-tight sm:tracking-normal overflow-x-auto sm:overflow-visible text-center scrollbar-hide min-w-0" style={{ WebkitTextSizeAdjust: 'none' }}>
          {t("descriptionLine2")}
        </h2>

        {/* Secondary Headline – centré, wrap propre sur mobile */}
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-4 flex flex-col items-center max-w-4xl mx-auto w-full min-w-0">
          <span className="inline-flex flex-col items-center w-full">
            <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden />
              <span
                className="bg-clip-text text-transparent tracking-tight sm:tracking-[-0.02em] text-center break-words"
                style={{
                  backgroundImage: "linear-gradient(to bottom, #E2E8F0 0%, #C5D1DE 18%, #A8B8C8 38%, #94A5B8 55%, #B8C5D2 72%, #D1DCE8 88%, #E8EEF5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                  textShadow: "0 2px 24px rgba(148, 163, 184, 0.35), 0 0 48px rgba(203, 213, 224, 0.15)",
                }}
              >
                {line1Content}
              </span>
            </span>
            <span className="block mt-1.5 sm:mt-2 font-bold tracking-tight text-center text-white break-words w-full">
              {line2Content}
            </span>
          </span>
        </h1>

        {/* Descriptive Text : Selon la capacité... puis Spécialisés... (texte plus petit) */}
        <p className="text-[11px] sm:text-sm md:text-base text-gray-400 mb-4 sm:mb-4 max-w-4xl mx-auto leading-relaxed px-2 sm:px-4 font-medium">
          <span className="block">{t("primaryHeadline")}</span>
          <span className="block mt-1 sm:mt-1">{t("descriptionLine1")}</span>
        </p>

        {/* Main CTA Button – effet ripple comme .btn / .animation */}
        <div className="mt-3 sm:mt-2 flex justify-center">
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
            }}
            className="hero-cta-btn"
          >
            <span className="animation" aria-hidden />
            <span>{t('ctaButton')}</span>
            <span className="animation" aria-hidden />
          </Link>
        </div>

        {/* Partenaires – tous les logos visibles en une ligne (taille réduite pour tenir dans l’écran) */}
        <div className="mt-8 pt-6 sm:mt-4 sm:pt-4 lg:mt-5 w-full max-w-5xl mx-auto px-1 sm:px-0 overflow-visible">
          {/* Mobile: 2 rows of 3, logos plus bas sous le CTA */}
          <div className="md:hidden flex flex-col items-center gap-1 py-1.5 px-2">
            <div className="flex items-center justify-center gap-1 w-full overflow-x-auto scrollbar-hide pr-2">
              {PARTNER_LOGOS_MOBILE_ROWS.row1.map((logo, i) => (
                <div
                  key={`r1-${i}`}
                  className="flex shrink-0 items-center justify-center opacity-90 h-14 sm:h-16 w-28 sm:w-32"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image
                    src={encodeURI(logo.src)}
                    alt={logo.alt}
                    width={128}
                    height={64}
                    className="object-contain max-h-full w-auto"
                    unoptimized={logo.src.includes(" ") ? true : undefined}
                    loading="lazy"
                    sizes="(max-width: 640px) 32vw, 160px"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 w-full min-w-0 overflow-x-auto scrollbar-hide pr-2">
              {PARTNER_LOGOS_MOBILE_ROWS.row2.map((logo, i) => (
                <div
                  key={`r2-${i}`}
                  className="flex shrink-0 items-center justify-center h-14 sm:h-16 w-28 sm:w-32 opacity-90"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image
                    src={encodeURI(logo.src)}
                    alt={logo.alt}
                    width={128}
                    height={64}
                    className="object-contain max-h-full w-auto"
                    unoptimized={logo.src.includes(" ") ? true : undefined}
                    loading="lazy"
                    sizes="(max-width: 640px) 32vw, 160px"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: une ligne scroll — padding gauche/droite pour que le premier et dernier logo ne soient pas coupés */}
          <div className="hidden md:flex scrollbar-hide flex-nowrap items-center justify-center gap-1 overflow-x-auto w-full py-1.5 px-4 lg:px-6">
            <div className="flex shrink-0 items-center gap-1 flex-nowrap">
              {PARTNER_LOGOS.map((logo, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center justify-center opacity-90 h-16 lg:h-20 w-32 lg:w-40"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  <Image
                    src={encodeURI(logo.src)}
                    alt={logo.alt}
                    width={208}
                    height={104}
                    className="object-contain max-h-full w-auto"
                    unoptimized={logo.src.includes(" ") ? true : undefined}
                    loading="lazy"
                    sizes="(max-width: 1024px) 220px, 256px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
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
