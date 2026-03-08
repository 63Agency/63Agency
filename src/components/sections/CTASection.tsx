"use client";

import { useTranslations } from "next-intl";
import ContactFormThreeSteps from "@/components/ContactFormThreeSteps";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section id="contact" className="relative py-6 sm:py-12 bg-white overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="lg:pt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              {t("title")}
            </h2>
            <div className="space-y-3">
              <p className="text-base text-black/90 leading-relaxed font-medium">
                {t("auditIntro")
                  .split(/\*\*(.*?)\*\*/g)
                  .map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-semibold text-black">{part}</strong>
                    ) : (
                      part
                    )
                  )}
              </p>
              <p className="text-sm text-black/75 leading-relaxed">
                {t("auditDetail")
                  .split(/\*\*(.*?)\*\*/g)
                  .map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="font-semibold text-black">{part}</strong>
                    ) : (
                      part
                    )
                  )}
              </p>
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                {[t("guarantee1"), t("guarantee2"), t("guarantee3")].map((label, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-black/90 whitespace-nowrap">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative">
            <ContactFormThreeSteps />
            <div className="flex gap-3 justify-end mt-4 sm:mt-6">
              <a
                href="https://wa.me/212720007007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 bg-black text-white border-2 border-black"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 bg-black text-white border-2 border-black"
                aria-label="Remonter"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
