"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

const LABELS: Record<Locale, string> = {
  en: "GB",
  fr: "FR",
};

export default function LanguageSwitcher({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "footer";
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
  const btnBase =
    "inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";
  const btnActive = isFooter
    ? "bg-white/10 border-2 border-white/50 text-white"
    : "border-2 border-gray-400 bg-transparent text-black";
  const btnInactive = isFooter
    ? "text-white/60 hover:text-white border border-transparent"
    : "text-gray-500 hover:text-gray-700 border border-transparent";

  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Switch language">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          className={`${btnBase} ${isActive(l) ? btnActive : btnInactive}`}
          aria-label={l === "en" ? t("languageEn") : t("languageFr")}
          aria-current={isActive(l) ? "true" : undefined}
          title={l === "en" ? t("languageEn") : t("languageFr")}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
