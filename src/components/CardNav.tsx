'use client';

import React, { useState, useEffect } from 'react';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div
        className={`card-nav-container relative mx-auto mt-4 md:mt-6 w-[98%] z-10 overflow-visible ${compact ? 'card-nav-container-compact' : ''} ${className}`}
      >
        <nav
          className="card-nav block h-[72px] p-0 rounded-xl shadow-md relative overflow-visible"
          style={{ backgroundColor: baseColor }}
        >
          <div className="card-nav-top absolute inset-x-0 top-0 h-[72px] flex items-center justify-between gap-4 p-3 pl-[1.1rem] pr-5 z-[2]">
            <a href={logoHref} className="logo-container flex items-center shrink-0 -mt-3" aria-label={logoAlt}>
              <img src={logo} alt={logoAlt} className="logo h-[40px] sm:h-[44px]" style={{ filter: 'none' }} />
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
                  className="coolBeansNav card-nav-cta-button inline-flex items-center justify-center rounded-md border border-white/50 px-5 py-2.5 min-h-[36px] font-semibold text-[15px] cursor-pointer no-underline whitespace-nowrap flex-shrink-0 hover:border-white/80"
                  style={{ backgroundColor: 'transparent', color: buttonTextColor }}
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="coolBeansNav card-nav-cta-button inline-flex items-center justify-center rounded-md border border-white/50 px-5 py-2.5 min-h-[36px] font-semibold text-[15px] whitespace-nowrap flex-shrink-0 hover:border-white/80"
                  style={{ backgroundColor: 'transparent', color: buttonTextColor }}
                >
                  {ctaLabel}
                </button>
              )}
            </div>

            {/* Mobile: menu button only */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Menu de navigation"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeSidebar}
            aria-hidden
          />
          <aside
            className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-[rgba(15,15,20,0.98)] shadow-xl flex flex-col p-6 pt-14 transition-transform duration-200 ease-out translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={closeSidebar}
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 mt-4">
              {barLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleBarLinkClick(e, link.href, closeSidebar);
                    if (!link.href.includes('#')) setTimeout(closeSidebar, 0);
                  }}
                  className="text-white/90 hover:text-white text-base font-medium py-3 px-4 rounded-lg border border-white/30 hover:border-white/60 transition-colors no-underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-3">
              {trailingSlot && <div className="px-4">{trailingSlot}</div>}
              {ctaHref ? (
                <a
                  href={ctaHref}
                  onClick={closeSidebar}
                  className="coolBeansNav inline-flex items-center justify-center rounded-md border border-white/50 px-5 py-3 font-semibold text-[15px] text-white no-underline hover:border-white/80 hover:bg-white/10 transition-colors"
                >
                  {ctaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  className="coolBeansNav inline-flex items-center justify-center rounded-md border border-white/50 px-5 py-3 font-semibold text-[15px] text-white hover:border-white/80 hover:bg-white/10 transition-colors"
                  style={{ color: buttonTextColor }}
                >
                  {ctaLabel}
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default CardNav;
