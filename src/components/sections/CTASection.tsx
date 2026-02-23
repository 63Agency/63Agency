"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white opacity-80 mb-8 sm:mb-12 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <Link
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#contact");
          }}
          className="coolBeans inline-block px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold"
          style={{ textDecoration: 'none' }}
        >
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
