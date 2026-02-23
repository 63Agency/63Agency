"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: t('nav.about') },
    { href: "#services", label: t('nav.services'), hasDropdown: true },
    { href: "#blog", label: t('nav.blog') },
    { href: "#contact", label: t('nav.contact') },
  ];

  const services = [
    { label: t('services.webDesign'), href: "#web-design" },
    { label: t('services.moroccoSeo'), href: "#seo-expert" },
    { label: t('services.graphicDesign'), href: "#graphic-design" },
    { label: t('services.socialMedia'), href: "#social-media" },
    { label: t('services.advertising'), href: "#advertising" },
    { label: t('services.copywriting'), href: "#copywriting" },
    { label: t('services.photography'), href: "#photography" },
    { label: t('services.b2bSeo'), href: "#b2b-seo" },
  ];

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-95 backdrop-blur-sm"
          : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/images/hero/image.png"
              alt="63"
              width={60}
              height={60}
              className="object-contain"
            />
            <span className="text-2xl font-light text-white tracking-[0.2em] uppercase italic">
              AGENCY
            </span>
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown) {
                    if (closeTimeout) {
                      clearTimeout(closeTimeout);
                      setCloseTimeout(null);
                    }
                    setIsServicesHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown) {
                    const timeout = setTimeout(() => {
                      setIsServicesHovered(false);
                    }, 300);
                    setCloseTimeout(timeout);
                  }
                }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }
                    if (!link.hasDropdown) {
                      // Only close if not a dropdown link
                      setIsServicesHovered(false);
                    }
                  }}
                  className={`nav-link font-medium transition-colors duration-200 flex items-center gap-1 ${
                    link.hasDropdown && isServicesHovered
                      ? "text-white"
                      : "text-white hover:text-gray-300"
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isServicesHovered ? "text-white" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu for Services */}
                {link.hasDropdown && isServicesHovered && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-black bg-opacity-95 backdrop-blur-md py-2 z-50"
                    onMouseEnter={() => {
                      if (closeTimeout) {
                        clearTimeout(closeTimeout);
                        setCloseTimeout(null);
                      }
                      setIsServicesHovered(true);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setIsServicesHovered(false);
                      }, 300);
                      setCloseTimeout(timeout);
                    }}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(service.href);
                          // Keep dropdown open after click
                        }}
                        onMouseEnter={() => {
                          if (closeTimeout) {
                            clearTimeout(closeTimeout);
                            setCloseTimeout(null);
                          }
                        }}
                        className="block px-4 py-2.5 text-white hover:bg-white hover:text-black transition-colors duration-200"
                        style={{ textDecoration: 'none' }}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher with Flags */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => switchLocale('en')}
                className={`p-1.5 rounded transition-all duration-200 flex items-center justify-center ${
                  locale === 'en'
                    ? 'bg-white text-black'
                    : 'hover:bg-gray-800 opacity-70 hover:opacity-100'
                }`}
                title="English"
              >
                <span className="text-sm">🇬🇧</span>
              </button>
              <button
                onClick={() => switchLocale('fr')}
                className={`p-1.5 rounded transition-all duration-200 flex items-center justify-center ${
                  locale === 'fr'
                    ? 'bg-white text-black'
                    : 'hover:bg-gray-800 opacity-70 hover:opacity-100'
                }`}
                title="Français"
              >
                <span className="text-sm">🇫🇷</span>
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#contact");
              }}
              className="coolBeans px-6 py-2.5 font-semibold"
              style={{ textDecoration: 'none' }}
            >
              {t('nav.getQuote')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
