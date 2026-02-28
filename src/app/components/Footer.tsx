"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "#", icon: "fa-brands fa-linkedin-in" },
  { label: "Facebook", href: "#", icon: "fa-brands fa-facebook-f" },
];

export default function Footer() {
  const tFooter = useTranslations("footer");
  const tExp = useTranslations("expertisesMenu");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const expertiseCols = [
    { title: tExp("col1Title"), items: [tExp("col1_1"), tExp("col1_2"), tExp("col1_3"), tExp("col1_4")] },
    { title: tExp("col2Title"), items: [tExp("col2_1"), tExp("col2_2"), tExp("col2_3"), tExp("col2_4")] },
    { title: tExp("col3Title"), items: [tExp("col3_1"), tExp("col3_2"), tExp("col3_3"), tExp("col3_4")] },
    { title: tExp("col4Title"), items: [tExp("col4_1"), tExp("col4_2"), tExp("col4_3"), tExp("col4_4")] },
  ];

  const resourceLinks = [
    { label: tFooter("resource1"), href: `/${locale}#` },
    { label: tFooter("resource2"), href: `/${locale}#` },
    { label: tFooter("resource3"), href: `/${locale}#` },
    { label: tFooter("resource4"), href: `/${locale}#innovations` },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-10">
          {/* Column 1: Logo + social text + addresses */}
          <div className="space-y-5 min-w-0">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/hero/63.png"
                alt="63 Agency"
                width={280}
                height={90}
                className="object-contain h-24 sm:h-28 w-auto max-w-full"
              />
            </Link>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("addressUaeTitle")}</p>
                <p className="text-sm text-white/70 leading-snug">{tFooter("addressUaeValue")}</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("addressMoroccoTitle")}</p>
                <p className="text-sm text-white/70 leading-snug">{tFooter("addressMoroccoValue")}</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("contact")}</p>
                <a
                  href={`tel:${tFooter("phone").replace(/\s/g, "")}`}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {tFooter("phone")}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Strategy & Branding + Social Media */}
          <div className="flex flex-col gap-8 min-w-0">
            {expertiseCols.slice(0, 2).map((col, i) => (
              <div key={i} className="min-w-0">
                <h3 className="font-bold text-white text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}#services`}
                        className="text-sm text-white/70 hover:text-white block break-words"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Media & Performance + Customer Experience & AI */}
          <div className="flex flex-col gap-8 min-w-0">
            {expertiseCols.slice(2, 4).map((col, i) => (
              <div key={i} className="min-w-0">
                <h3 className="font-bold text-white text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}#services`}
                        className="text-sm text-white/70 hover:text-white block break-words"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 4: Resources + Follow us icons */}
          <div className="space-y-8 min-w-0">
            <div>
              <h3 className="font-bold text-white text-sm mb-3">{tFooter("resources")}</h3>
              <ul className="space-y-2">
                {resourceLinks.map((r) => (
                  <li key={r.label}>
                    <Link
                      href={r.href}
                      className="text-sm text-white/70 hover:text-white block"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
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

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/60">
          <LanguageSwitcher variant="footer" />
          <span>{tFooter("copyright", { year })}</span>
        </div>
      </div>
    </footer>
  );
}
