---
Task ID: 5
Agent: Main Agent
Task: Complete content refactoring — 7 rooms, 2-category menu, i18n EN/ES, dynamic pricing

Work Log:
- Created `/src/lib/i18n-context.tsx` — I18nProvider + useLang hook with t(es, en) helper
- Wrapped app in I18nProvider in layout.tsx
- Complete rewrite of `/src/lib/data.ts`:
  - 10 rooms → 7 official rooms with Bilingual fields
  - 3 rooms with dynamic pricing (King Vista al Mar, Queen Privada, Queen Compartida)
  - 4 menu categories → 2 categories (Pescados y Mariscos 7 items + Platos Criollos 9 items)
  - All text fields migrated to Bilingual type { es, en }
  - New INTRO_TEXT, new surf experience copy
  - menuCategoryLabels export for tab i18n
- Updated navbar.tsx: LangSwitcher component (ES|EN toggle with active pill)
- Updated hero.tsx: CSS vibrancy filters (contrast 1.05, brightness 1.05, saturate 1.1) + i18n
- Created intro-section.tsx: new official brand copy section with Framer Motion
- Updated page.tsx: added IntroSection between Hero and RoomsPreview
- Updated rooms-preview.tsx: dynamic occupancy toggle with AnimatePresence price animation + full i18n
- Updated habitaciones/[slug]/page.tsx: dynamic pricing toggle in both price areas, bilingual fields, i18n
- Updated restaurante/page.tsx: 2-category tabs with i18n labels, cart fix for Bilingual names
- Updated restaurant-preview.tsx: i18n for headings and dish fields
- Updated restaurant-menu.tsx: Bilingual name/description rendering, key fix
- Updated experiences.tsx: new surf copy + i18n
- Updated footer.tsx: bilingual HOTEL_DESCRIPTION
- Updated booking-bar.tsx: 7 new room options with correct prices
- Build: SUCCESS (all 8 routes, 0 TS errors)
- Push: commit b5d6b3c

Stage Summary:
- 15 files changed, 716 insertions, 330 deletions
- Complete i18n infrastructure (ES/EN) with navbar toggle
- 7 official rooms live (3 with interactive 1/2 guest pricing)
- Restaurant menu: 2 categories, 16 dishes
- All content matches official brand data provided by user
- Deployed to Vercel via auto-deploy