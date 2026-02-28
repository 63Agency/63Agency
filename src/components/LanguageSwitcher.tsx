"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path fill="none" stroke="#fff" strokeWidth="7" d="M0 0 L60 30 M60 0 L0 30" />
      <path fill="none" stroke="#C8102E" strokeWidth="4" d="M0 0 L60 30 M60 0 L0 30" />
      <path fill="none" stroke="#fff" strokeWidth="5" d="M30 0 L30 30 M0 15 L60 15" />
      <path fill="none" stroke="#C8102E" strokeWidth="2.5" d="M30 0 L30 30 M0 15 L60 15" />
    </svg>
  );
}

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <rect width="20" height="40" x="0" fill="#002395" />
      <rect width="20" height="40" x="20" fill="#fff" />
      <rect width="20" height="40" x="40" fill="#ED2939" />
    </svg>
  );
}

const FLAG_SVG: Record<Locale, React.FC<{ className?: string }>> = {
  en: FlagGB,
  fr: FlagFR,
};

export default function LanguageSwitcher({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "footer" | "footerLight";
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(new RegExp(`^/${locale}(/|$)`), `/${newLocale}$1`) || `/${newLocale}`;
    router.push(newPath);
  };

  const isActive = (l: Locale) => l === locale;
  const isFooter = variant === "footer";
  const isFooterLight = variant === "footerLight";
  const btnBase =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 overflow-hidden";
  const btnActive = isFooterLight
    ? "ring-2 ring-black/30 ring-offset-2 ring-offset-neutral-100 bg-black/5"
    : isFooter
    ? "ring-2 ring-white/60 ring-offset-2 ring-offset-black bg-white/5"
    : "ring-2 ring-gray-400 ring-offset-2 ring-offset-transparent bg-gray-100/50";
  const btnInactive = isFooter || isFooterLight ? "opacity-70 hover:opacity-100" : "opacity-60 hover:opacity-100";

  return (
    <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="Switch language">
      {locales.map((l) => {
        const FlagIcon = FLAG_SVG[l];
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchLocale(l)}
            className={`${btnBase} ${isActive(l) ? btnActive : btnInactive}`}
            aria-label={l === "en" ? t("languageEn") : t("languageFr")}
            aria-current={isActive(l) ? "true" : undefined}
            title={l === "en" ? t("languageEn") : t("languageFr")}
          >
            <FlagIcon className="w-6 h-4 object-cover rounded-sm" />
          </button>
        );
      })}
    </div>
  );
}
