'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Section IDs on the homepage that should be tracked.
 * Add new section IDs here to extend deep linking.
 */
export const SECTION_IDS = [
  'inicio',
  'habitaciones',
  'servicios',
  'restaurante',
  'experiencias',
  'testimonios',
  'contacto',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * useScrollSpy — observes homepage sections and returns the currently visible one.
 * Also updates the browser URL via History API (replaceState) so links are shareable.
 *
 * @param enabled — only runs on the homepage (path === '/')
 */
export function useScrollSpy(enabled: boolean): SectionId {
  const [activeId, setActiveId] = useState<SectionId>('inicio');
  const pathname = usePathname();
  const ticking = useRef(false);
  const observersRef = useRef<IntersectionObserver[]>([]);

  const updateUrl = useCallback((id: string) => {
    const hash = id === 'inicio' ? '' : `#${id}`;
    const newUrl = `${window.location.pathname}${hash}${window.location.search}`;
    // Only update if different to avoid unnecessary history entries
    if (window.location.hash !== `#${id}` || (id === 'inicio' && window.location.hash !== '')) {
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  useEffect(() => {
    // Only run on homepage
    if (!enabled || pathname !== '/') {
      // Clean up observers when leaving homepage
      observersRef.current.forEach((obs) => obs.disconnect());
      observersRef.current = [];
      return;
    }

    // Disconnect any previous observers
    observersRef.current.forEach((obs) => obs.disconnect());
    observersRef.current = [];

    const sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length === 0) return;

    // Track which sections are currently intersecting
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Use requestAnimationFrame to batch DOM reads
        if (!ticking.current) {
          ticking.current = true;
          requestAnimationFrame(() => {
            ticking.current = false;

            // Find the topmost visible section
            let topSection: string | null = null;
            let topPosition = Infinity;

            visibleSections.forEach((_, id) => {
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top < topPosition && rect.top < window.innerHeight * 0.5) {
                  topPosition = rect.top;
                  topSection = id;
                }
              }
            });

            // If no section found (e.g., at very bottom), use the last one
            if (!topSection && visibleSections.size > 0) {
              topSection = Array.from(visibleSections.keys()).pop() || null;
            }

            if (topSection) {
              setActiveId(topSection as SectionId);
              updateUrl(topSection);
            }
          });
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    observersRef.current.push(observer);

    return () => {
      observer.disconnect();
      const idx = observersRef.current.indexOf(observer);
      if (idx > -1) observersRef.current.splice(idx, 1);
    };
  }, [enabled, pathname, updateUrl]);

  return activeId;
}

/**
 * scrollToHash — smooth-scrolls to a section by ID.
 * Call this on page load or when navigating to a hash.
 */
export function scrollToHash(offset = 80): void {
  if (typeof window === 'undefined') return;

  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  // Small delay to ensure DOM is painted
  setTimeout(() => {
    const el = document.getElementById(hash);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 100);
}

/**
 * scrollToSection — programmatic smooth scroll to any section ID.
 */
export function scrollToSection(id: string, offset = 80): void {
  if (typeof window === 'undefined') return;

  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    // Update URL
    const hash = id === 'inicio' ? '' : `#${id}`;
    window.history.replaceState(null, '', `${window.location.pathname}${hash}${window.location.search}`);
  }
}
