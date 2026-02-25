"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const GREEN_ACCENT = "#22c55e";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "fa-brands fa-instagram" },
  { label: "LinkedIn", href: "#", icon: "fa-brands fa-linkedin-in" },
  { label: "Facebook", href: "#", icon: "fa-brands fa-facebook-f" },
  { label: "YouTube", href: "#", icon: "fa-brands fa-youtube" },
];

export default function Footer() {
  const t = useTranslations();
  const tFooter = useTranslations("footer");
  const tExp = useTranslations("expertisesMenu");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const expertiseColumns = [
    {
      title: tExp("col1Title"),
      items: [tExp("col1_1"), tExp("col1_2"), tExp("col1_3"), tExp("col1_4")],
    },
    {
      title: tExp("col2Title"),
      items: [tExp("col2_1"), tExp("col2_2"), tExp("col2_3"), tExp("col2_4")],
    },
    {
      title: tExp("col3Title"),
      items: [tExp("col3_1"), tExp("col3_2"), tExp("col3_3"), tExp("col3_4")],
    },
    {
      title: tExp("col4Title"),
      items: [tExp("col4_1"), tExp("col4_2"), tExp("col4_3"), tExp("col4_4")],
    },
  ];

  const resourceLinks = [
    { label: tFooter("resource1"), href: `/${locale}#` },
    { label: tFooter("resource2"), href: `/${locale}#` },
    { label: tFooter("resource3"), href: `/${locale}#` },
    { label: tFooter("resource4"), href: `/${locale}#innovations` },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Left: Logo + green dots + social text + addresses */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white shrink-0" />
              <span className="w-2 h-2 rounded-full border border-white shrink-0" />
            </div>
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/hero/image copy 2.png"
                alt="63 Agency"
                width={400}
                height={125}
                className="object-contain h-36 sm:h-40 md:h-44 lg:h-48 w-auto"
              />
            </Link>
            <div className="space-y-4 pt-2">
              <div>
                <p className="font-bold text-white text-sm mb-1">{tFooter("addressMoroccoTitle")}</p>
                <p className="text-sm text-white/70">{tFooter("addressMoroccoValue")}</p>
              </div>
            </div>
          </div>

          {/* Middle: 4 expertise columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            {expertiseColumns.map((col, i) => (
              <div key={i}>
                <h3 className="font-bold text-white text-sm mb-3">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/${locale}#services`}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Resources + Follow us icons */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-bold text-white text-sm mb-3">{tFooter("resources")}</h3>
              <ul className="space-y-2">
                {resourceLinks.map((r) => (
                  <li key={r.label}>
                    <Link
                      href={r.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
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
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-black border border-white/30 text-white rounded hover:bg-white hover:text-black transition-colors"
                    aria-label={s.label}
                  >
                    <i className={`${s.icon} text-lg`} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          {tFooter("copyright", { year })}
        </div>
      </div>
    </footer>
  );
}
