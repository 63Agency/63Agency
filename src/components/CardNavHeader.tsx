"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import CardNav from "@/components/CardNav";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SCROLL_THRESHOLD = 120;

export default function CardNavHeader() {
  const [compact, setCompact] = useState(false);
  const tNav = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = `/${locale}`;

  const barLinks = [
    { label: tNav("testimonials"), href: `${prefix}#testimonials` },
    { label: tNav("system"), href: `${prefix}#system` },
  ];

  return (
    <div
      className="card-nav-header-dark fixed top-0 left-0 right-0 z-50 flex justify-center pt-1 sm:pt-2 px-4 sm:px-6 transition-transform duration-300 ease-out"
    >
      <CardNav
        logo="/images/hero/63AgencyTextwhit.png"
        logoAlt="63 Agency"
        logoHref={prefix}
        barLinks={barLinks}
        baseColor="rgba(15, 15, 20, 0.58)"
        buttonTextColor="#fff"
        ctaLabel={tNav("contactButton")}
        ctaHref={`${prefix}#contact`}
        trailingSlot={<LanguageSwitcher className="shrink-0" />}
        compact={compact}
      />
    </div>
  );
}
