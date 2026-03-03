'use client';

import React from 'react';

export type CardNavBarLink = {
  label: string;
  href: string;
};

function handleBarLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const hash = href.includes('#') ? href.split('#')[1] : null;
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', href);
      }
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
    <div
      className={`card-nav-container relative mx-auto mt-4 md:mt-6 w-[95%] z-10 ${compact ? 'card-nav-container-compact' : ''} ${className}`}
    >
      <nav
        className="card-nav block h-[60px] p-0 rounded-xl shadow-md relative overflow-visible"
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between gap-4 p-2 pl-[1.1rem] pr-5 z-[2]">
          <a href={logoHref} className="logo-container flex items-center shrink-0" aria-label={logoAlt}>
            <img src={logo} alt={logoAlt} className="logo h-[36px] sm:h-[40px]" style={{ filter: 'none' }} />
          </a>

          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            {barLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleBarLinkClick(e, link.href)}
                className="text-white/90 hover:text-white text-[15px] font-medium transition-colors no-underline whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={`flex items-center gap-2 sm:gap-3 flex-shrink-0 transition-all duration-300 ease-out ${compact ? 'md:ml-4' : ''}`}>
            {trailingSlot}
            {ctaHref ? (
              <a
                href={ctaHref}
                className="coolBeansNav card-nav-cta-button inline-flex rounded-[3rem] px-5 py-2 min-h-[36px] items-center justify-center h-full font-semibold text-[15px] cursor-pointer no-underline border-2 whitespace-nowrap flex-shrink-0"
                style={{ backgroundColor: 'transparent', color: buttonTextColor, borderColor: 'currentColor' }}
              >
                {ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                className="coolBeansNav card-nav-cta-button inline-flex rounded-[3rem] px-5 py-2 min-h-[36px] items-center justify-center h-full font-semibold text-[15px] border-2 whitespace-nowrap flex-shrink-0"
                style={{ backgroundColor: 'transparent', color: buttonTextColor, borderColor: 'currentColor' }}
              >
                {ctaLabel}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
