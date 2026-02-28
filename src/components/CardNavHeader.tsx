"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import CardNav, { type CardNavItem } from "@/components/CardNav";

const GREEN_ACCENT = "#22c55e";
const SCROLL_THRESHOLD = 180;

export default function CardNavHeader() {
  const [showNav, setShowNav] = useState(false);
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const tExp = useTranslations("expertisesMenu");
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = `/${locale}`;

  const navItems: CardNavItem[] = [
    {
      label: tNav("home"),
      bgColor: "#0a0a0a",
      textColor: "#fff",
      links: [
        { label: tNav("home"), href: prefix, ariaLabel: tNav("home") },
        { label: tNav("innovations"), href: `${prefix}/about`, ariaLabel: tNav("innovations") },
        { label: tNav("solutions"), href: `${prefix}#services`, ariaLabel: tNav("solutions") },
        { label: tNav("joinUs"), href: `${prefix}#contact`, ariaLabel: tNav("joinUs") },
      ],
    },
    {
      label: t("nav.expertises"),
      bgColor: "#171717",
      textColor: "#fff",
      links: [
        { label: tExp("section1Title"), href: `${prefix}#services`, ariaLabel: tExp("section1Title") },
        { label: tExp("section2Title"), href: `${prefix}#services`, ariaLabel: tExp("section2Title") },
        { label: tExp("section3Title"), href: `${prefix}#services`, ariaLabel: tExp("section3Title") },
        { label: tExp("section4Title"), href: `${prefix}#services`, ariaLabel: tExp("section4Title") },
        { label: tExp("section5Title"), href: `${prefix}#services`, ariaLabel: tExp("section5Title") },
      ],
    },
    {
      label: tNav("contactButton"),
      bgColor: GREEN_ACCENT,
      textColor: "#fff",
      links: [
        { label: tNav("contactButton"), href: `${prefix}/contact`, ariaLabel: tNav("contactButton") },
      ],
    },
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-transform duration-300 ease-out"
      style={{ transform: showNav ? "translateY(0)" : "translateY(-100%)" }}
      aria-hidden={!showNav}
    >
      <CardNav
        logo="/images/logo/6.jpg"
        logoAlt="63 Agency"
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#000"
        buttonTextColor="#fff"
        ctaLabel={tNav("contactButton")}
        ctaHref={`${prefix}/contact`}
      />
    </div>
  );
}
