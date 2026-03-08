"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/63agency.ma?igsh=MXVkZ3B2Znp6cnRzeA==", icon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/63-agency/", icon: "fa-brands fa-linkedin-in" },
  { label: "Facebook", href: "https://www.facebook.com/63agency", icon: "fa-brands fa-facebook-f" },
];

const FOOTER_SERVICES = [
  "service1",
  "service2",
  "service3",
  "service4",
  "service5",
] as const;

export default function Footer() {
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-10 gap-x-8 lg:gap-x-10 items-start">
          {/* Colonne 1 : Logo + taglines – espacement serré (CSS .footer-col-1) */}
          <div className="footer-col-1 min-w-0">
            <Link href={`/${locale}`} className="footer-logo inline-block" aria-label="63 Agency">
              <Image
                src="/images/hero/63.png"
                alt="63 Agency"
                width={140}
                height={45}
                className="object-contain h-10 sm:h-12 w-auto max-w-full"
              />
            </Link>
            <p className="footer-tagline-intro text-sm text-white/80 leading-snug">{tFooter("taglineIntro")}</p>
            <p className="footer-tagline text-sm text-white/80 leading-snug">{tFooter("tagline")}</p>
          </div>

          {/* Colonne 2 : Notre système – même arrangement que Contactez-nous, un peu à droite */}
          <div className="min-w-0 flex flex-col lg:pl-6">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              {tFooter("servicesTitle")}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              {FOOTER_SERVICES.map((key) => (
                <Link
                  key={key}
                  href={`/${locale}#system`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit text-white/70"
                >
                  {tFooter(key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Colonne 3 : Contactez-nous + Nous suivre – disposition verticale, un peu à droite */}
          <div className="min-w-0 flex flex-col space-y-5 lg:pl-6">
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
                {tFooter("contactSectionTitle")}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-white/80">
                <a
                  href={`mailto:${tFooter("email")}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {tFooter("email")}
                </a>
                <a
                  href={`tel:${tFooter("phone").replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors w-fit"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {tFooter("phone")}
                </a>
                {/* Rabat */}
                <span className="inline-flex items-start gap-2 w-fit">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="leading-snug">
                    <span className="font-semibold text-white/90">{tFooter("cityRabat")}</span>
                    {" — "}
                    {tFooter("addressRabat")}
                  </span>
                </span>
                {/* Casablanca */}
                <span className="inline-flex items-start gap-2 w-fit">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="leading-snug">
                    <span className="font-semibold text-white/90">{tFooter("cityCasablanca")}</span>
                    {" — "}
                    {tFooter("addressCasa")}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-2.5">
                {tFooter("followUsTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-white text-black rounded hover:bg-white/90 transition-opacity shrink-0"
                    aria-label={s.label}
                  >
                    <i className={`${s.icon} text-lg`} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm text-white/60">
          <LanguageSwitcher variant="footer" className="shrink-0" />
          <span className="text-center sm:text-left">{tFooter("copyright", { year })}</span>
        </div>
      </div>
    </footer>
  );
}
