"use client";

import { useState, useEffect, useCallback } from "react";
import type { HotelPageSlug } from "@/lib/hotel-pages";
import type { HotelLocale } from "@/lib/hotel-experience";
import { getHotelUi } from "@/lib/hotel-experience";

type HotelNavItem = {
  slug: HotelPageSlug;
  label: string;
  href: string;
};

type HotelMobileMenuProps = {
  activeSlug: HotelPageSlug;
  bookingCtaLabel: string;
  links?: readonly { label: string; href: string }[];
  locale: HotelLocale;
  onLocaleToggle: () => void;
  pages: readonly HotelNavItem[];
  reservationHref: string;
};

export function HotelMobileMenu({ activeSlug, bookingCtaLabel, links, locale, onLocaleToggle, pages, reservationHref }: HotelMobileMenuProps) {
  const navLinks = links?.length ? links : pages;
  const ui = getHotelUi(locale);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <button
        className="hotel-mobile-menu-trigger"
        onClick={() => setIsOpen(true)}
        aria-label={ui.header.mobileMenuAria}
        type="button"
      >
        <span className="hotel-mobile-menu-trigger-line" />
        <span className="hotel-mobile-menu-trigger-line" />
        <span className="hotel-mobile-menu-trigger-line" />
      </button>

      {isOpen && (
        <div className="hotel-mobile-menu-backdrop" onClick={closeMenu} />
      )}

      <aside className={`hotel-mobile-menu-drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="hotel-mobile-menu-drawer-header">
          <button className="hotel-mobile-menu-drawer-close" onClick={closeMenu} type="button" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button className="hotel-mobile-menu-drawer-locale" onClick={() => { onLocaleToggle(); }} type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>{ui.header.localeButton}</span>
          </button>
        </div>

        <nav className="hotel-mobile-menu-drawer-nav">
          {navLinks.map((page, index) => (
            <a
              className={"slug" in page && page.slug === activeSlug ? "is-active" : ""}
              href={page.href}
              key={page.href}
              onClick={closeMenu}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="hotel-mobile-menu-drawer-link-text">{page.label}</span>
              <svg className="hotel-mobile-menu-drawer-link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          ))}
        </nav>

        <div className="hotel-mobile-menu-drawer-footer">
          <a className="hotel-mobile-menu-drawer-cta" href={reservationHref} onClick={closeMenu}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11 11 0 0 0 3.87 17.06L2.5 21.5l4.56-1.31A11 11 0 1 0 20.52 3.48Z" fill="currentColor" opacity="0.16" />
              <path d="M12 4.25A7.75 7.75 0 0 0 5.35 15.94l.19.31-.8 2.58 2.64-.76.3.18A7.75 7.75 0 1 0 12 4.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" fill="none" />
              <path d="M9.2 8.95c-.2-.45-.4-.46-.58-.47h-.5c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.73 4.19 3.72 2.07.82 2.49.66 2.94.62.45-.04 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.24-.16-.5-.3-.26-.14-1.53-.76-1.77-.84-.24-.08-.42-.12-.6.12-.18.24-.68.84-.84 1.02-.16.18-.32.2-.58.06-.26-.14-1.1-.4-2.1-1.3-.77-.68-1.3-1.52-1.46-1.78-.16-.26-.02-.4.12-.54.12-.12.26-.32.4-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.06-.14-.58-1.4-.8-1.92Z" fill="currentColor" />
            </svg>
            {bookingCtaLabel}
          </a>
        </div>
      </aside>
    </>
  );
}
