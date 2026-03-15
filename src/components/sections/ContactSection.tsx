"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import ContactFormThreeSteps from "@/components/ContactFormThreeSteps";

const Grainient = dynamic(() => import("@/components/Grainient"), { ssr: false });

const REVIEW_AVATARS = [
  "/images/review/Tarik.webp",
  "/images/review/kenza.webp",
  "/images/review/Samir.webp",
];

export default function ContactSection() {
  const t = useTranslations("contactPage");

  return (
    <section id="contact" className="relative overflow-hidden bg-black">
      {/* Grainient background — même style que page contact */}
      <div className="absolute inset-0 z-0 w-full min-h-full">
        <Grainient
          className="h-full w-full min-h-full"
          color1="#000000"
          color2="#5a5a5a"
          color3="#2d2d2d"
          timeSpeed={0.45}
          warpStrength={1.5}
          warpSpeed={2}
          grainAmount={0.12}
          grainAnimated={true}
        />
      </div>

      <div className="relative z-10">
        {/* Top: CONTACT + hero headline — comme page contact */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 sm:pt-12 sm:pb-14">
          <div className="relative">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white">
                {t("contactTag")}
              </span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              <span className="block">{t("heroHeadline1")}</span>
              <span className="block mt-1.5 sm:mt-2 text-white/90 font-semibold text-lg sm:text-3xl md:text-4xl">
                {t("heroHeadline3")}
              </span>
            </h1>
            <div className="absolute top-0 right-0 text-white">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 opacity-70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bloc texte à gauche, formulaire à droite — comme page contact */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 lg:items-stretch">
              {/* Bloc texte — gauche */}
              <div className="lg:col-span-5 order-2 lg:order-1 lg:min-h-0 lg:flex lg:flex-col">
                <div className="p-0 lg:sticky lg:top-24 overflow-hidden text-white lg:flex-1 lg:flex lg:flex-col lg:min-h-0">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {REVIEW_AVATARS.map((src) => (
                          <div
                            key={src}
                            className="relative w-9 h-9 rounded-full border-2 border-gray-600 bg-gray-700 flex-shrink-0 overflow-hidden ring-2 ring-gray-900"
                            aria-hidden
                          >
                            <Image
                              src={src}
                              alt=""
                              fill
                              className="object-cover object-top"
                              sizes="36px"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="rounded-full bg-green-500 text-white px-3 py-1.5 text-sm font-bold">
                        {t("sidebarSocialBadge")}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{t("sidebarClientsSatisfaits")}</p>
                      <div className="flex items-center justify-end gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-4 text-white">
                    {t("sidebarHeadline")}{" "}
                    <span className="underline underline-offset-2 decoration-white text-white">{t("sidebarHeadlineHighlight")}</span>
                  </h2>

                  <div className="text-sm text-white/90 leading-relaxed mb-6 space-y-3">
                    {t("sidebarDescription")
                      .split(/\n\n+/)
                      .map((paragraph, idx) => (
                        <p key={idx}>
                          {paragraph.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="font-semibold text-blue-400">{part}</strong> : part
                          )}
                        </p>
                      ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat1Value")}</p>
                      <p className="text-xs text-white/80 mt-1">{t("sidebarStat1Label")}</p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat2Value")}</p>
                      <p className="text-xs text-white/80 mt-1">{t("sidebarStat2Label")}</p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">{t("sidebarStat3Value")}</p>
                      <p className="text-xs text-white/80 mt-1">{t("sidebarStat3Label")}</p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                    {[t("sidebarGuarantee1"), t("sidebarGuarantee2"), t("sidebarGuarantee3")].map((label, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/90 whitespace-nowrap">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-amber-400/50 bg-amber-400/5 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">{t("sidebarLimitedTitle")}</p>
                        <p className="text-sm text-amber-300 font-medium">{t("sidebarLimitedText")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/90 mb-3">
                      {t("visitOffices")}
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-white/80">
                      <div>
                        <p className="font-semibold text-white/95">{t("officeCasa")}</p>
                        <p className="leading-snug mt-0.5">{t("addressCasa")}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-white/95">{t("officeRabat")}</p>
                        <p className="leading-snug mt-0.5">{t("addressRabat")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire — droite */}
              <div id="form" className="lg:col-span-6 lg:col-start-7 min-w-0 flex flex-col items-stretch order-1 lg:order-2">
                <div className="w-full">
                  <ContactFormThreeSteps />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
