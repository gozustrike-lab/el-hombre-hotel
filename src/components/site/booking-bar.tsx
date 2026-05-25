'use client';

import { Search, Phone } from 'lucide-react';
import { HOTEL_LOCATION } from '@/lib/data';

export function BookingBar() {
  const roomOptions = [
    { value: '', label: 'Tipo de habitación' },
    { value: 'individual', label: 'Individual — S/. 68/noche' },
    { value: 'doble', label: 'Doble 2 Camas — S/. 120/noche' },
    { value: 'doble-aseo', label: 'Doble Aseo Compartido — S/. 140/noche' },
    { value: 'doble-dobles', label: 'Doble Camas Dobles — S/. 140/noche' },
    { value: 'deluxe', label: 'Deluxe Vista al Mar — S/. 119/noche' },
    { value: 'triple', label: 'Triple Básica — S/. 150/noche' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="backdrop-blur-2xl bg-white/15 dark:bg-slate-900/40 rounded-2xl border border-white/20 p-3 md:p-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-0">
          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select className="w-full bg-transparent text-white text-sm py-2 rounded-lg appearance-none cursor-pointer focus:outline-none">
              {roomOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-8 bg-white/20 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Fecha Entrada
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="w-px h-8 bg-white/20 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Fecha Salida
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-white text-sm py-2 rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="w-px h-8 bg-white/20 shrink-0" />

          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Huéspedes
            </label>
            <select className="w-full bg-transparent text-white text-sm py-2 rounded-lg appearance-none cursor-pointer focus:outline-none">
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n} {n === 1 ? 'huésped' : 'huéspedes'}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-8 bg-white/20 shrink-0" />

          <a
            href={`https://wa.me/${HOTEL_LOCATION.whatsapp}?text=Hola,%20quiero%20reservar%20habitación%20en%20El%20Hombre`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 shrink-0 ml-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="h-4 w-4" />
            Buscar
          </a>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none">
              <option value="" className="bg-slate-900 text-white">Tipo</option>
              <option value="individual" className="bg-slate-900 text-white">Individual</option>
              <option value="doble" className="bg-slate-900 text-white">Doble 2 Camas</option>
              <option value="deluxe" className="bg-slate-900 text-white">Deluxe Vista</option>
            </select>
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Huéspedes
            </label>
            <select className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none">
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-slate-900 text-white">
                  {n} {n === 1 ? 'huésped' : 'huéspedes'}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Entrada
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-white text-sm rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Salida
            </label>
            <input
              type="date"
              className="w-full bg-transparent text-white text-sm rounded-lg focus:outline-none [color-scheme:dark]"
            />
          </div>

          <a
            href={`https://wa.me/${HOTEL_LOCATION.whatsapp}?text=Hola,%20quiero%20reservar%20habitación%20en%20El%20Hombre`}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
          >
            <Phone className="h-4 w-4" />
            Reservar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
