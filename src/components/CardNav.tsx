'use client';

import React from 'react';
import Image from 'next/image';

export type CardNavBarLink = {
  label: string;
  href: string;
};

function handleBarLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, onNavigate?: () => void) {
  const hash = href.includes('#') ? href.split('#')[1] : null;
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', href);
      }
      onNavigate?.();
    }
  }
}

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: { label: string; href: string; ariaLabel: string }[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  logoHref: string;
  barLinks: CardNavBarLink[];
  className?: string;
  baseColor?: string;
  buttonTextColor?: string;
  ctaLabel?: string;
  ctaHref?: string;
  trailingSlot?: React.ReactNode;
  compact?: boolean;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  logoHref,
  barLinks,
  className = '',
  baseColor = '#fff',
  buttonTextColor,
  ctaLabel = 'Get Started',
  ctaHref,
  trailingSlot,
  compact = false,
}) => {
  return (
    <>
      <div
        className={`card-nav-container relative mx-auto mt-4 md:mt-6 w-[98%] max-w-7xl z-10 overflow-visible ${compact ? 'card-nav-container-compact' : ''} ${className}`}
      >
        <nav
          className="card-nav block h-[56px] sm:h-[72px] p-0 rounded-xl shadow-md relative overflow-visible"
          style={{ backgroundColor: baseColor }}
        >
          <div className="card-nav-top absolute inset-x-0 top-0 h-[56px] sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 pl-2 sm:pl-[1.1rem] pr-3 sm:pr-5 z-[2]">
            <a href={logoHref} className="logo-container flex items-center shrink-0 -mt-2 sm:-mt-3 order-first -ml-0.5 md:ml-0" aria-label={logoAlt}>
              <Image src={logo} alt={logoAlt} width={160} height={40} className="logo h-[24px] sm:h-[32px] md:h-[40px] w-auto object-contain max-h-10 md:max-h-12" style={{ filter: 'none' }} priority />
            </a>

            {/* Desktop: links + trailing + CTA */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {barLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleBarLinkClick(e, link.href)}
                  className="text-white/90 hover:text-white text-[15px] font-medium transition-colors no-underline whitespace-nowrap rounded-lg border border-white/50 px-4 py-2 hover:border-white/80"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className={`hidden md:flex items-center gap-2 sm:gap-3 flex-shrink-0 transition-all duration-300 ease-out overflow-visible ${compact ? 'md:ml-4' : ''}`}>
              {trailingSlot}
              {ctaHref ? (
                <a
                  href={ctaHref}
                  className="coolBeansNav card-nav-cta-button inline-flex items-center justify-center rounded-lg border-2 border-white/60 px-5 py-2.5 min-h-[38px] font-semibold text-[15px] cursor-pointer no-underline whitespace-nowrap flex-shrink-0 shadow-lg shadow-black/20 hover:border-white hover:shadow-xl hover:shadow-black/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out"
                  style={{ backgroundColor: 'transparent', color: buttonTextColor }}
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="coolBeansNav card-nav-cta-button inline-flex items-center justify-center rounded-lg border-2 border-white/60 px-5 py-2.5 min-h-[38px] font-semibold text-[15px] whitespace-nowrap flex-shrink-0 shadow-lg shadow-black/20 hover:border-white hover:shadow-xl hover:shadow-black/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out"
                  style={{ backgroundColor: 'transparent', color: buttonTextColor }}
                >
                  {ctaLabel}
                </button>
              )}
            </div>

            {/* Mobile: CTA same style as nav links (Notre système), un peu plus haut */}
            <div className="md:hidden flex items-center gap-1.5 flex-shrink-0 -mt-1">
              {ctaHref ? (
                <a
                  href={ctaHref}
                  className="text-white/90 hover:text-white text-[13px] sm:text-[15px] font-medium transition-colors no-underline whitespace-nowrap rounded-lg border border-white/50 px-3 py-2 hover:border-white/80 flex-shrink-0"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="text-white/90 hover:text-white text-[13px] sm:text-[15px] font-medium whitespace-nowrap rounded-lg border border-white/50 px-3 py-2 hover:border-white/80 flex-shrink-0 transition-colors"
                  style={{ color: buttonTextColor ?? '#fff' }}
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default CardNav;
