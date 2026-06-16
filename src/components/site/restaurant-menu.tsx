'use client';

import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useLang } from '@/lib/i18n-context';
import type { MenuItem } from '@/lib/data';

interface RestaurantMenuProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  addedItems: Set<string>;
}

export function RestaurantMenu({ items, onAdd, addedItems }: RestaurantMenuProps) {
  const { t } = useLang();

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const nameStr = typeof item.name === 'string' ? item.name : item.name.es;
        const isAdded = addedItems.has(nameStr);
        return (
          <motion.div
            key={nameStr}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group flex items-start gap-4 py-5 border-b border-black/5 dark:border-white/5 last:border-0"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-slate-900 dark:text-white text-base md:text-lg font-medium">
                  {typeof item.name === 'string' ? item.name : t(item.name.es, item.name.en)}
                </h3>
                <span className="text-orange-500 text-base md:text-lg font-semibold shrink-0">
                  {item.price}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                {item.description && (typeof item.description === 'string' ? item.description : t(item.description.es, item.description.en))}
              </p>
            </div>

            <button
              onClick={() => onAdd(item)}
              className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                isAdded
                  ? 'bg-green-500 text-white scale-100'
                  : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white group-hover:scale-110'
              }`}
            >
              {isAdded ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
