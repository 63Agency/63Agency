"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import StaggeredMenu from "@/components/StaggeredMenu";

const GREEN_ACCENT = "#22c55e";
const EXPERTISES_IMAGE_SRC = "/images/hero/expertigelogo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpertisesOpen, setIsExpertisesOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home"), highlight: true },
    { href: `/${locale}/about`, label: t("nav.innovations") },
    { href: "#services", label: t("nav.expertises"), hasDropdown: true },
    { href: "#services", label: t("nav.solutions") },
    { href: "#contact", label: t("nav.joinUs") },
  ];

  const getNavHref = (href: string) =>
    href.startsWith("#") ? `/${locale}${href}` : href;
  const isOnHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const services = [
    { label: t("services.webDesign"), href: "#services" },
    { label: t("services.moroccoSeo"), href: "#services" },
    { label: t("services.graphicDesign"), href: "#services" },
    { label: t("services.socialMedia"), href: "#services" },
    { label: t("services.advertising"), href: "#services" },
    { label: t("services.copywriting"), href: "#services" },
    { label: t("services.photography"), href: "#services" },
    { label: t("services.b2bSeo"), href: "#services" },
  ];

  const expertisesT = useTranslations("expertisesMenu");
  const expertisesColumns = [
    { title: expertisesT("col1Title"), links: [expertisesT("col1_1"), expertisesT("col1_2"), expertisesT("col1_3"), expertisesT("col1_4")] },
    { title: expertisesT("col2Title"), links: [expertisesT("col2_1"), expertisesT("col2_2"), expertisesT("col2_3"), expertisesT("col2_4")] },
    { title: expertisesT("col3Title"), links: [expertisesT("col3_1"), expertisesT("col3_2"), expertisesT("col3_3"), expertisesT("col3_4")] },
    { title: expertisesT("col4Title"), links: [expertisesT("col4_1"), expertisesT("col4_2"), expertisesT("col4_3"), expertisesT("col4_4")] },
  ];

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace("#", "");
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      scrollToSection(href);
    }
    setIsMobileMenuOpen(false);
    setIsExpertisesOpen(false);
  };

  const staggeredMenuItems = useMemo(
    () => [
      { label: t("nav.home"), ariaLabel: t("nav.home"), link: `/${locale}` },
      { label: t("nav.innovations"), ariaLabel: t("nav.innovations"), link: `/${locale}/about` },
      { label: t("nav.expertises"), ariaLabel: t("nav.expertises"), link: getNavHref("#services") },
      { label: t("nav.solutions"), ariaLabel: t("nav.solutions"), link: getNavHref("#services") },
      { label: t("nav.joinUs"), ariaLabel: t("nav.joinUs"), link: getNavHref("#contact") },
      { label: t("nav.contactButton"), ariaLabel: t("nav.contactButton"), link: `/${locale}/contact` },
    ],
    [t, locale]
  );

  return (
    <>
      {/* Desktop header */}
    <header
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href={`/${locale}`}
              className="flex items-center hover:opacity-85 transition-opacity"
            >
              <Image
                src="/images/hero/63agency.png"
                alt="63 Agency"
                width={140}
                height={44}
                className="object-contain h-9 sm:h-11 w-auto"
              />
            </Link>
          </div>

          {/* Center: Nav links - Desktop */}
          <nav className="hidden lg:flex items-center gap-0">
            <div className="h-6 w-px bg-gray-200 mx-2" />
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown) {
                    if (closeTimeout) {
                      clearTimeout(closeTimeout);
                      setCloseTimeout(null);
                    }
                    setIsExpertisesOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown) {
                    const timeoutId = setTimeout(() => setIsExpertisesOpen(false), 200);
                    setCloseTimeout(timeoutId);
                  }
                }}
              >
                <Link
                  href={getNavHref(link.href)}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      if (isOnHome) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }
                  }}
                  className="flex items-center gap-1 px-4 py-2 font-medium text-sm transition-colors hover:opacity-80"
                  style={{
                    color: link.highlight ? GREEN_ACCENT : "black",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 text-black transition-transform ${isExpertisesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2" />
          </nav>

          {/* Right: Lang + CTA - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => switchLocale("en")}
                className={`p-1.5 rounded text-sm transition-colors ${
                  locale === "en" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => switchLocale("fr")}
                className={`p-1.5 rounded text-sm transition-colors ${
                  locale === "fr" ? "bg-black text-white" : "text-black hover:bg-gray-100"
                }`}
                title="Français"
              >
                FR
              </button>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="coolBeans bg-black text-white px-5 py-2.5 font-semibold text-sm border-2 border-white inline-block"
              style={{ textDecoration: "none" }}
            >
              {t("nav.contactButton")}
            </Link>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200" />
      </div>

      {/* Expertises mega menu - desktop */}
      {isExpertisesOpen && (
        <div
          className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-xl z-40 hidden lg:block"
          onMouseEnter={() => {
            if (closeTimeout) {
              clearTimeout(closeTimeout);
              setCloseTimeout(null);
            }
            setIsExpertisesOpen(true);
          }}
          onMouseLeave={() => setCloseTimeout(setTimeout(() => setIsExpertisesOpen(false), 150))}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex gap-8">
              {/* Left: Image + caption - expertigelogo.png (63 AGENCY) */}
              <div className="w-[280px] shrink-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Native img so the logo loads reliably in the dropdown */}
                  <img
                    src={EXPERTISES_IMAGE_SRC}
                    alt="63 Agency"
                    className="absolute inset-0 h-full w-full object-contain object-center"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
              {/* Right: 4 columns */}
              <div className="grid grid-cols-4 gap-6 flex-1 min-w-0">
                {expertisesColumns.map((col) => (
                  <div key={col.title}>
                    <h4 className="font-bold text-black text-sm mb-3">{col.title}</h4>
                    <ul className="space-y-2">
                      {col.links.map((label) => (
                        <li key={label}>
                          <Link
                            href={getNavHref("#services")}
                            onClick={(e) => {
                              if (isOnHome) {
                                e.preventDefault();
                                handleNavClick("#services");
                              }
                            }}
                            className="text-sm text-gray-700 hover:text-black transition-colors"
                            style={{ textDecoration: "none" }}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

</header>

      {/* Mobile: StaggeredMenu (remplace le menu responsive) */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          position="right"
          items={staggeredMenuItems}
          logoUrl="/images/hero/63agency.png"
          colors={["#ffffff", "#f5f5f5"]}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          accentColor={GREEN_ACCENT}
          displaySocials={false}
          displayItemNumbering={false}
          changeMenuColorOnOpen={false}
          closeOnClickAway={true}
        />
      </div>
    </>
  );
}
