"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const GREEN_ACCENT = "#22c55e";
const TRANSITION_MS = 320;
const AUTO_PLAY_MS = 5500;
const SLIDE_OFFSET = 40;
const testimonialKeys = ["t1", "t2", "t3", "t4"] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const total = testimonialKeys.length;
  const key = testimonialKeys[currentIndex];

  const runTransition = useCallback((nextIndex: number, dir: "left" | "right") => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setDirection(null);
      setTimeout(() => setIsTransitioning(false), 30);
    }, TRANSITION_MS);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    const next = currentIndexRef.current === 0 ? total - 1 : currentIndexRef.current - 1;
    runTransition(next, "left");
  }, [runTransition, total]);

  const goNext = useCallback(() => {
    const next = currentIndexRef.current === total - 1 ? 0 : currentIndexRef.current + 1;
    runTransition(next, "right");
  }, [runTransition, total]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  // Auto-play: same slide animation (vers la droite) every AUTO_PLAY_MS, even without clicking arrow
  useEffect(() => {
    const interval = setInterval(() => goNextRef.current(), AUTO_PLAY_MS);
    return () => clearInterval(interval);
  }, []);

  const name = t(`${key}.name`);
  const initial = name.charAt(0).toUpperCase();

  // Slide "vers la droite" = content exits to the right (positive X). Slide "vers la gauche" = exits left (negative X).
  const contentOpacity = isTransitioning ? 0 : 1;
  const contentTranslateX =
    isTransitioning && direction === "right" ? SLIDE_OFFSET : isTransitioning && direction === "left" ? -SLIDE_OFFSET : 0;

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-black/70 text-center mb-3">
          {t("sectionSubtitle")}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center leading-snug mb-12 sm:mb-16">
          {t("sectionTitle")}
        </h2>

        {/* Carousel */}
        <div className="relative flex items-center gap-4 sm:gap-6">
          {/* Left arrow */}
          <button
            type="button"
            onClick={goPrev}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black/20 flex items-center justify-center text-black hover:border-black hover:bg-black hover:text-white transition-all duration-200 ease-out active:scale-95 active:border-black/40 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Témoignage précédent"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Content - one testimonial with transition */}
          <div
            className="flex-1 min-w-0 text-center transition-all ease-out"
            style={{
              transitionDuration: `${TRANSITION_MS}ms`,
              opacity: contentOpacity,
              transform: `translateX(${contentTranslateX}px)`,
            }}
          >
            <blockquote className="text-base sm:text-lg text-black/90 leading-relaxed mb-8 px-2">
              « {t(`${key}.quote`)} »
            </blockquote>
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-gray-200 ring-offset-2">
                <span className="text-2xl sm:text-3xl font-bold text-black/60">{initial}</span>
              </div>
            </div>
            <p className="font-bold text-black text-lg">{name}</p>
            <p className="text-sm text-black/70 mt-1">
              {t(`${key}.role`)} — {t(`${key}.company`)}
            </p>
            <div
              className="w-2 h-2 rounded-full mx-auto mt-4"
              style={{ backgroundColor: GREEN_ACCENT }}
            />
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={goNext}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black/20 flex items-center justify-center text-black hover:border-black hover:bg-black hover:text-white transition-all duration-200 ease-out active:scale-95 active:border-black/40 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Témoignage suivant"
            disabled={isTransitioning}
          >
            <svg className="w-5 h-5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination */}
        <p
          className="text-center text-sm text-black/60 mt-10 font-medium transition-opacity duration-200"
          style={{ opacity: isTransitioning ? 0.6 : 1 }}
        >
          {currentIndex + 1} — {total}
        </p>
      </div>
    </section>
  );
}
