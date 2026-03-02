"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <rect width="20" height="40" x="0" fill="#002395" />
      <rect width="20" height="40" x="20" fill="#fff" />
      <rect width="20" height="40" x="40" fill="#ED2939" />
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

const FLAG_SVG: Record<Locale, React.FC<{ className?: string }>> = {
  en: FlagEN,
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(typeof document !== "undefined");
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const newPath = pathname.replace(new RegExp(`^/${locale}(/|$)`), `/${newLocale}$1`) || `/${newLocale}`;
    router.push(newPath);
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const width = Math.max(140, rect.width);
    const left = Math.min(window.innerWidth - 8 - width, Math.max(8, rect.right - width));
    const top = rect.bottom + 8;
    setMenuPos({ top, left, width });
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
  const triggerBg = isNavbar ? "bg-white/10 border-white/30 hover:bg-white/15" : isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200";

  const dropdownContent = open && mounted && (
    <ul
      id="language-dropdown-portal"
      className="fixed py-1 rounded-lg bg-white border border-gray-200 shadow-xl min-w-[100px]"
      role="listbox"
      style={
        menuPos
          ? { top: menuPos.top, left: menuPos.left, width: menuPos.width, zIndex: 99999 }
          : { top: 0, left: 0, width: 140, visibility: "hidden" as const, zIndex: 99999 }
      }
    >
      {locales.map((l) => {
        const FlagIcon = FLAG_SVG[l];
        return (
          <li key={l} role="option" aria-selected={l === locale}>
            <button
              type="button"
              onClick={() => switchLocale(l)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 hover:bg-gray-100 transition-colors ${
                l === locale ? "bg-gray-100" : ""
              }`}
              aria-label={l === "fr" ? t("languageFr") : t("languageEn")}
            >
              <FlagIcon className="w-8 h-5 object-cover rounded-sm flex-shrink-0" />
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
          className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg border ${triggerBg} hover:opacity-90 transition-opacity`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={locale === "en" ? t("languageEn") : t("languageFr")}
        >
          {(() => {
            const FlagIcon = FLAG_SVG[locale];
            return <FlagIcon className="w-6 h-4 object-cover rounded-sm shrink-0" />;
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
