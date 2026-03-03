"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const testimonialKeys = ["t1", "t2", "t3", "t4"] as const;

const REVIEW_IMAGES: Record<string, string> = {
  t1: "/images/review/Tarik.png",
  t2: "/images/review/kenza.png",
  t3: "/images/review/Samir.png",
  // t4 Leila: pas d'image, fallback initial
};

function StarRating({ className = "text-black" }: { className?: string }) {
  return (
    <div className={`flex gap-0.5 mt-2 ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white/70 text-center mb-3">
          {t("sectionSubtitle")}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-snug mb-10 sm:mb-14">
          {t("sectionTitle")}
        </h2>

        {/* Horizontal scroll: cartes noir & blanc */}
        <div
          className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {testimonialKeys.map((key) => {
            const name = t(`${key}.name`);
            const initial = name.charAt(0).toUpperCase();
            const imgSrc = REVIEW_IMAGES[key];

            return (
              <article
                key={key}
                className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[400px] snap-center rounded-xl border border-white/20 bg-white shadow-lg hover:shadow-xl hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5 p-5 sm:p-6"
              >
                {/* Photo + nom et post à côté */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-200 ring-2 ring-gray-200 flex-shrink-0">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={name}
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">
                        {initial}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-black truncate">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-black/60 uppercase tracking-wide truncate">
                      {t(`${key}.role`)} — {t(`${key}.company`)}
                    </p>
                  </div>
                </div>

                {/* 5 étoiles noir & blanc */}
                <StarRating className="text-black" />
                {/* Citation */}
                <p className="mt-4 text-sm sm:text-[15px] text-black/90 leading-relaxed line-clamp-5">
                  « {t(`${key}.quote`)} »
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
