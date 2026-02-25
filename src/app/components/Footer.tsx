"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const LOGO_SRC = "/images/logo/6.jpg";

export default function Footer() {
  const t = useTranslations();
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}#services`, label: t("nav.expertises") },
    { href: `/${locale}#system`, label: t("nav.innovations") },
    { href: `/${locale}#services`, label: t("nav.solutions") },
    { href: `/${locale}/contact`, label: t("nav.contactButton") },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Logo + tagline */}
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center gap-2 mb-4">
              <Image
                src={LOGO_SRC}
                alt="63 Agency"
                width={40}
                height={40}
                className="rounded object-cover"
              />
              <span className="font-bold text-lg tracking-tight">63 AGENCY</span>
            </Link>
            <p className="text-sm text-white/70 max-w-xs">
              {tFooter("tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              {tFooter("links")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">
              {tFooter("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={`tel:${tFooter("phone").replace(/\s/g, "").replace(/-/g, "")}`} className="hover:text-white transition-colors">
                  {tFooter("phone")}
                </a>
              </li>
              <li>
                <a href={`mailto:${tFooter("email")}`} className="hover:text-white transition-colors break-all">
                  {tFooter("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          {tFooter("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
