'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Trash2, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { sendRestaurantWA } from '@/lib/whatsapp';

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
    (sum, item) => sum + parseFloat(item.price.replace(/S\/\./, '').trim()) * item.quantity,
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

  const handleWhatsAppOrder = () => {
    const cartPayload = items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: parseFloat(item.price.replace(/S\/\./, '').trim()).toFixed(0),
    }));
    sendRestaurantWA(cartPayload, totalPrice.toFixed(0));
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
        className="w-full sm:max-w-md bg-[#FDFBF7] dark:bg-slate-950 p-0"
      >
        {/* Premium header with breathing room */}
        <SheetHeader className="px-6 pt-8 pb-2 sm:px-8 sm:pt-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-serif text-slate-900 dark:text-white tracking-wide">
              Tu Pedido
            </SheetTitle>
            <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Revisa tu selección antes de ordenar
          </p>
        </SheetHeader>

        {/* Items list with generous spacing */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center mb-5">
                <ShoppingCart className="h-8 w-8 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                Tu carrito está vacío
              </p>
              <p className="text-slate-400 dark:text-slate-600 text-xs mt-2 leading-relaxed">
                Agrega platos desde nuestra carta<br />para preparar tu pedido
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              <AnimatePresence>
                {items.map((item, index) => {
                  const itemTotal = parseFloat(item.price.replace(/S\/\./, '').trim()) * item.quantity;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 py-5 border-b border-black/[0.06] dark:border-white/[0.06] last:border-b-0"
                    >
                      {/* Item info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-900 dark:text-white text-sm font-medium leading-snug">
                          {item.name}
                        </p>
                        <p className="text-orange-500 text-sm font-semibold mt-1">
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-90"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-90"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Item subtotal */}
                      <div className="text-right shrink-0 min-w-[56px]">
                        <p className="text-slate-900 dark:text-white text-sm font-semibold">
                          S/. {itemTotal.toFixed(0)}
                        </p>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(index)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 shrink-0 active:scale-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Total + CTA footer with premium spacing */}
        {items.length > 0 && (
          <div className="border-t border-black/5 dark:border-white/10 px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                Total
              </span>
              <span className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                S/. {totalPrice.toFixed(0)}
              </span>
            </div>

            <p className="text-slate-400 dark:text-slate-600 text-xs mb-5 leading-relaxed">
              Se abrirá WhatsApp con tu pedido listo para enviar al restaurante.
            </p>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(249,115,22,0.35)]"
            >
              <MessageCircle className="h-5 w-5" />
              Pedir por WhatsApp
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
