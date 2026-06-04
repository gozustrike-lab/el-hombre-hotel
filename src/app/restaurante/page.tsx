'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { RestaurantMenu } from '@/components/site/restaurant-menu';
import { CartFloat, type CartItem } from '@/components/site/cart-float';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fullMenu, type MenuItem } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function RestaurantePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAdd = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1 }];
    });

    setAddedItems((prev) => {
      const next = new Set(prev);
      next.add(item.name);
      return next;
    });

    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(item.name);
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
              'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <Link
            href="/"
            className="absolute top-20 left-4 md:left-8 text-white/80 hover:text-white flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-orange-500/90 text-white border-none backdrop-blur-sm text-xs uppercase tracking-wider">
              carta
            </Badge>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-orange-400 text-sm uppercase tracking-[0.2em]"
            >
              Gastronomía Costera
            </motion.p>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-3xl md:text-5xl font-serif font-light"
          >
            Nuestra Carta
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-sm md:text-base mt-3 max-w-md"
          >
            Ingredientes frescos del Pacífico peruano, preparados con tradición y pasión.
          </motion.p>
        </div>
      </section>

      {/* Menu content */}
      <section className="flex-1 px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="mb-10 bg-slate-100 dark:bg-slate-900 rounded-xl p-1 flex-wrap h-auto gap-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-sm px-4 py-2 rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                {category}
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
      </section>

      <Footer />
      <CartFloat items={cart} onUpdate={setCart} />
    </main>
  );
}
