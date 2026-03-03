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

export default function Footer() {
  const tFooter = useTranslations("footer");
  const tSystem = useTranslations("system");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const systemCols = [
    { title: tSystem("step1.title"), items: [tSystem("step1.item1"), tSystem("step1.item2"), tSystem("step1.item3"), tSystem("step1.item4")] },
    { title: tSystem("step2.title"), items: [tSystem("step2.item1"), tSystem("step2.item2"), tSystem("step2.item3"), tSystem("step2.item4")] },
    { title: tSystem("step3.title"), items: [tSystem("step3.item1"), tSystem("step3.item2"), tSystem("step3.item3"), tSystem("step3.item4")] },
    { title: tSystem("step4.title"), items: [tSystem("step4.item1"), tSystem("step4.item2"), tSystem("step4.item3"), tSystem("step4.item4")] },
    { title: tSystem("step5.title"), items: [tSystem("step5.item1"), tSystem("step5.item2"), tSystem("step5.item3"), tSystem("step5.item4")] },
  ];

  const resourceLinks = [
    { label: tFooter("resource1"), href: `/${locale}#system` },
    { label: tFooter("resource2"), href: `/${locale}#results` },
    { label: tFooter("resource3"), href: `/${locale}/contact` },
    { label: tFooter("resource4"), href: `/${locale}#contact` },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-10">
          {/* Column 1: Logo + tagline (system) + addresses */}
          <div className="space-y-5 min-w-0">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/hero/63.png"
                alt="63 Agency"
                width={200}
                height={64}
                className="object-contain h-14 sm:h-16 w-auto max-w-full"
              />
            </Link>
            <p className="text-sm text-white/80 leading-snug">{tFooter("tagline")}</p>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("officesTitle")}</p>
                <p className="text-sm text-white/70 leading-snug">{tFooter("addressRabat")}</p>
                <p className="text-sm text-white/70 leading-snug mt-1">{tFooter("addressCasa")}</p>
              </div>
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("contact")}</p>
                <a
                  href={`tel:${tFooter("phone").replace(/\s/g, "")}`}
                  className="text-sm text-white/70 hover:text-white block"
                >
                  {tFooter("phone")}
                </a>
                <a
                  href={`mailto:${tFooter("email")}`}
                  className="text-sm text-white/70 hover:text-white block mt-1"
                >
                  {tFooter("email")}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Steps 1 & 2 (Le Système) */}
          <div className="flex flex-col gap-8 min-w-0">
            {systemCols.slice(0, 2).map((col, i) => (
              <div key={i} className="min-w-0">
                <h3 className="font-bold text-white text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}#system`}
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

          {/* Column 3: Steps 3 & 4 (Le Système) */}
          <div className="flex flex-col gap-8 min-w-0">
            {systemCols.slice(2, 4).map((col, i) => (
              <div key={i} className="min-w-0">
                <h3 className="font-bold text-white text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}#system`}
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

          {/* Column 4: Step 5 + Resources + Follow us */}
          <div className="space-y-8 min-w-0">
            <div>
              <h3 className="font-bold text-white text-sm mb-3">{systemCols[4].title}</h3>
              <ul className="space-y-2 mb-6">
                {systemCols[4].items.map((item, j) => (
                  <li key={j}>
                    <Link
                      href={`/${locale}#system`}
                      className="text-sm text-white/70 hover:text-white block break-words"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
