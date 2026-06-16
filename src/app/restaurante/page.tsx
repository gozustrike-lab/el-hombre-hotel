'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { RestaurantMenu } from '@/components/site/restaurant-menu';
import { CartFloat, type CartItem } from '@/components/site/cart-float';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fullMenu, menuCategoryLabels, type MenuItem } from '@/lib/data';
import { useLang } from '@/lib/i18n-context';

/* ─── Restaurant gallery photos ──────────────────────────────── */

const RESTAURANT_PHOTOS = [
  '/images/restaurant/foto1.webp',
  '/images/restaurant/foto2.webp',
  '/images/restaurant/foto3.webp',
  '/images/restaurant/foto4.webp',
  '/images/restaurant/foto5.webp',
];

export default function RestaurantePage() {
  const { t } = useLang();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const handleAdd = useCallback((item: MenuItem) => {
    const nameStr = typeof item.name === 'string' ? item.name : item.name.es;
    setCart((prev) => {
      const existing = prev.find((c) => c.name === nameStr);
      if (existing) {
        return prev.map((c) =>
          c.name === nameStr ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { name: nameStr, price: item.price, quantity: 1 }];
    });

    setAddedItems((prev) => {
      const next = new Set(prev);
      next.add(nameStr);
      return next;
    });

    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(nameStr);
        return next;
      });
    }, 1500);
  }, []);

  const categories = Object.keys(fullMenu);

  return (
    <main className="w-full m-0 p-0 overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Hero header */}
      <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(/images/restaurant/foto2.webp)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <Link
            href="/"
            className="absolute top-20 left-4 md:left-8 text-white/80 hover:text-white flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('Inicio', 'Home')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-orange-400 bg-orange-500/20 px-3 py-1 rounded-[2px]">
              {t('carta', 'menu')}
            </span>
            <span className="text-orange-400 text-sm uppercase tracking-[0.2em]">
              Gastronomía Costera
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-3xl md:text-5xl font-serif font-light"
          >
            {t('Nuestra Carta', 'Our Menu')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-sm md:text-base mt-3 max-w-md"
          >
            {t('Ingredientes frescos del Pacífico peruano, preparados con tradición y pasión.', 'Fresh ingredients from the Peruvian Pacific, prepared with tradition and passion.')}
          </motion.p>
        </div>
      </section>

      {/* ═══ RESTAURANT GALLERY ═══ */}
      <section className="w-full py-12 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-serif font-light text-slate-900 dark:text-white mb-8"
          >
            {t('Nuestro Restaurante', 'Our Restaurant')}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {RESTAURANT_PHOTOS.map((photo, i) => (
              <motion.button
                key={photo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightboxIdx(i)}
                className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl border border-gray-100/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <img
                  src={photo}
                  alt={`Restaurante El Hombre - foto ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu content */}
      <section className="flex-1 px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-10 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 flex-wrap h-auto gap-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-sm px-4 py-2 rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  {menuCategoryLabels[category] ? t(menuCategoryLabels[category].es, menuCategoryLabels[category].en) : category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl"
                >
                  <RestaurantMenu
                    items={fullMenu[category]}
                    onAdd={handleAdd}
                    addedItems={addedItems}
                  />
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
      <CartFloat items={cart} onUpdate={setCart} />

      {/* ═══ LIGHTBOX ═══ */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 z-[210] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx - 1 + RESTAURANT_PHOTOS.length) % RESTAURANT_PHOTOS.length);
            }}
            className="absolute left-3 md:left-6 z-[210] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Anterior"
          >
            <span className="text-xl">&larr;</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % RESTAURANT_PHOTOS.length);
            }}
            className="absolute right-3 md:right-6 z-[210] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Siguiente"
          >
            <span className="text-xl">&rarr;</span>
          </button>

          {/* Image */}
          <motion.img
            key={lightboxIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={RESTAURANT_PHOTOS[lightboxIdx]}
            alt={`Foto ${lightboxIdx + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-wider">
            {lightboxIdx + 1} / {RESTAURANT_PHOTOS.length}
          </div>
        </div>
      )}
    </main>
  );
}
