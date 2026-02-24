"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

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
    { href: "#services", label: t("nav.expertises"), hasDropdown: true },
    { href: "#system", label: t("nav.innovations") },
    { href: "#services", label: t("nav.solutions") },
    { href: "#contact", label: t("nav.joinUs") },
  ];

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 relative ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left: Logo + ISO badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 hover:opacity-85 transition-opacity"
            >
              <Image
                src="/images/logo/6.jpg"
                alt="63 Agency"
                width={44}
                height={44}
                className="object-contain w-9 h-9 sm:w-11 sm:h-11 rounded"
              />
              <span className="text-lg sm:text-xl font-semibold text-black tracking-tight hidden sm:inline">
                63 AGENCY
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

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
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(link.href);
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
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="bg-black text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
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
                            href="#services"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick("#services");
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white border-l border-gray-200 shadow-xl z-50">
            <nav className="flex flex-col py-6 px-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end p-2 text-black hover:bg-gray-100 rounded"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className="flex items-center gap-2 py-3 px-4 font-medium text-black hover:bg-gray-100 rounded-lg"
                    style={{
                      color: link.highlight ? GREEN_ACCENT : undefined,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                    </Link>
                  {link.hasDropdown &&
                    services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(s.href);
                        }}
                        className="block py-2 pl-8 pr-4 text-sm text-black hover:bg-gray-50"
                        style={{ textDecoration: "none" }}
                      >
                        {s.label}
                      </Link>
                    ))}
                </div>
              ))}
              <div className="border-t border-gray-200 mt-4 pt-4 flex gap-2">
                <button
                  onClick={() => switchLocale("en")}
                  className={`flex-1 py-2 rounded text-sm font-medium ${locale === "en" ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale("fr")}
                  className={`flex-1 py-2 rounded text-sm font-medium ${locale === "fr" ? "bg-black text-white" : "bg-gray-100 text-black"}`}
                >
                  FR
                </button>
              </div>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                className="mt-4 bg-black text-white py-3 rounded-lg font-semibold text-center block"
                style={{ textDecoration: "none" }}
              >
                {t("nav.contactButton")}
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
