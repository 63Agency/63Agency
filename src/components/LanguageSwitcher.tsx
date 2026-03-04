"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

function FlagMA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <rect width="60" height="40" fill="#C1272D" />
      <path
        fill="#006233"
        d="M30 8 L35 20 L30 32 L25 20 Z M30 11.5 L27 18 L30 24 L33 18 Z"
      />
      <path
        fill="#006233"
        d="M30 10.5 L32.5 17 L30 22 L27.5 17 Z M30 14 L29 17 H31 L30 20 L29 17 H31 Z"
      />
      <path
        fill="#006233"
        stroke="#006233"
        strokeWidth="0.5"
        d="M30 8 L33.5 14 L30 12 L26.5 14 Z M30 12 L33 16 L30 20 L27 16 Z M30 20 L33 24 L30 28 L27 24 Z M30 28 L33.5 32 L30 30 L26.5 32 Z M30 8 L27 14 L30 12 L33.5 14 Z"
      />
      {/* Moroccan green pentagram (simplified star) */}
      <path
        fill="#006233"
        d="M30 10 L31.76 16.18 L38.09 16.18 L32.66 20.64 L34.42 26.82 L30 23.27 L25.58 26.82 L27.34 20.64 L21.91 16.18 L28.24 16.18 Z"
      />
    </svg>
  );
}

function FlagEN({ className }: { className?: string }) {
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
    <svg viewBox="0 0 60 40" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="20" height="40" x="0" fill="#002395" />
      <rect width="20" height="40" x="20" fill="#fff" />
      <rect width="20" height="40" x="40" fill="#ED2939" />
    </svg>
  );
}

const FR_FLAG_STORAGE_KEY = "63agency_fr_flag"; // "ma" = Maroc, "fr" = France

const FLAG_SVG: Record<Locale, React.FC<{ className?: string }>> = {
  en: FlagEN,
  fr: FlagFR,
};

/** 3 options: Maroc (fr), France (fr), Anglais (en) – كلاهما Maroc و France يعرضان الموقع بالفرنسية */
const LANGUAGE_OPTIONS: { locale: Locale; Flag: React.FC<{ className?: string }>; labelKey: 'languageMa' | 'languageFr' | 'languageEn' }[] = [
  { locale: 'fr', Flag: FlagMA, labelKey: 'languageMa' },
  { locale: 'fr', Flag: FlagFR, labelKey: 'languageFr' },
  { locale: 'en', Flag: FlagEN, labelKey: 'languageEn' },
];

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [frVariant, setFrVariant] = useState<"ma" | "fr">("fr");

  useEffect(() => {
    setMounted(typeof document !== "undefined");
  }, []);

  useEffect(() => {
    if (!mounted || locale !== "fr") return;
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(FR_FLAG_STORAGE_KEY) : null;
    setFrVariant(stored === "ma" ? "ma" : "fr");
  }, [mounted, locale]);

  const switchLocale = (newLocale: Locale, labelKey?: "languageMa" | "languageFr" | "languageEn") => {
    if (newLocale === locale) {
      if (newLocale === "fr" && labelKey) {
        const variant = labelKey === "languageMa" ? "ma" : "fr";
        if (variant !== frVariant && typeof window !== "undefined") {
          window.localStorage.setItem(FR_FLAG_STORAGE_KEY, variant);
          setFrVariant(variant);
        }
        setOpen(false);
      }
      return;
    }
    if (newLocale === "fr" && typeof window !== "undefined" && labelKey) {
      const variant = labelKey === "languageMa" ? "ma" : "fr";
      window.localStorage.setItem(FR_FLAG_STORAGE_KEY, variant);
      setFrVariant(variant);
    }
    const newPath = pathname.replace(new RegExp(`^/${locale}(/|$)`), `/${newLocale}$1`) || `/${newLocale}`;
    router.push(newPath);
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const left = rect.left;
    const top = rect.bottom + 6;
    setMenuPos({ top, left, width: 0 });
  }, [open, mounted]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        const portalRoot = document.getElementById("language-dropdown-portal");
        if (portalRoot && portalRoot.contains(target)) return;
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFooter = variant === "footer";
  const isFooterLight = variant === "footerLight";
  const isDark = isFooter && !isFooterLight;
  const isNavbar = variant === "default";
  const triggerBg = isNavbar ? "bg-transparent hover:opacity-80" : isDark ? "bg-white/10 hover:opacity-90" : "bg-white hover:opacity-90";

  const dropdownContent = open && mounted && (
    <ul
      id="language-dropdown-portal"
      className="fixed flex flex-col list-none rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[140px] bg-white"
      style={
        menuPos
          ? { top: menuPos.top, left: menuPos.left, zIndex: 99999 }
          : { top: 0, left: 0, visibility: "hidden" as const, zIndex: 99999 }
      }
      role="listbox"
    >
      {LANGUAGE_OPTIONS.map((opt) => {
        const FlagIcon = opt.Flag;
        const selected = opt.locale === locale;
        return (
          <li key={`${opt.locale}-${opt.labelKey}`} role="option" aria-selected={selected} className="border-b border-gray-100 last:border-b-0">
            <button
              type="button"
              onClick={() => switchLocale(opt.locale, opt.labelKey)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-black hover:bg-gray-50 transition-colors bg-white"
              aria-label={t(opt.labelKey)}
            >
              <FlagIcon className="w-7 h-5 object-cover rounded-sm shrink-0 border border-gray-200" />
              <span className="text-sm font-medium">{t(opt.labelKey)}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div ref={ref} className={`relative ${className}`} role="group" aria-label="Switch language">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(!open)}
          className={`inline-flex items-center gap-1.5 px-1.5 py-1 rounded-lg ${triggerBg} transition-opacity`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={locale === "en" ? t("languageEn") : t("languageFr")}
        >
          {(() => {
            if (locale === "en") return <FlagEN className="w-5 h-3.5 object-cover rounded-sm shrink-0" />;
            return frVariant === "ma" ? (
              <FlagMA className="w-5 h-3.5 object-cover rounded-sm shrink-0" />
            ) : (
              <FlagFR className="w-5 h-3.5 object-cover rounded-sm shrink-0" />
            );
          })()}
          <svg
            className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            style={{ color: isNavbar || isDark ? "#fff" : "#000" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {mounted && dropdownContent && createPortal(dropdownContent, document.body)}
    </>
  );
}
