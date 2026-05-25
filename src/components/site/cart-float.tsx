'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, X, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface CartFloatProps {
  items: CartItem[];
  onUpdate: (items: CartItem[]) => void;
}

export function CartFloat({ items, onUpdate }: CartFloatProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity,
    0
  );

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onUpdate(newItems);
  };

  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    onUpdate(newItems);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110"
          aria-label="Carrito de compras"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-orange-500 text-xs font-bold flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#FDFBF7] dark:bg-slate-950"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-serif text-slate-900 dark:text-white">
            Tu Pedido
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Tu carrito está vacío
              </p>
              <p className="text-slate-400 dark:text-slate-600 text-xs mt-1">
                Agrega platos del menú
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 dark:text-white text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-orange-500 text-sm font-semibold">
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium text-slate-900 dark:text-white w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/5 dark:border-white/10 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-600 dark:text-slate-400 text-sm">
                Total
              </span>
              <span className="text-slate-900 dark:text-white text-xl font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base">
              Pedir Ahora
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
