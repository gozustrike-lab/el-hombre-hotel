'use client';

import { Search } from 'lucide-react';

export function BookingBar() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="backdrop-blur-2xl bg-white/20 dark:bg-slate-900/40 rounded-2xl border border-white/20 p-3 md:p-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-0">
          <div className="flex-1 min-w-[160px] px-3">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select className="w-full bg-transparent text-white text-sm py-2 rounded-lg appearance-none cursor-pointer focus:outline-none">
              <option value="" className="bg-slate-900 text-white">Tipo de habitación</option>
              <option value="estandar" className="bg-slate-900 text-white">Estándar — $35</option>
              <option value="deluxe" className="bg-slate-900 text-white">Deluxe — $55</option>
              <option value="suite" className="bg-slate-900 text-white">Suite Familiar — $75</option>
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
              <option value="1" className="bg-slate-900 text-white">1 huésped</option>
              <option value="2" className="bg-slate-900 text-white">2 huéspedes</option>
              <option value="3" className="bg-slate-900 text-white">3 huéspedes</option>
              <option value="4" className="bg-slate-900 text-white">4 huéspedes</option>
              <option value="5" className="bg-slate-900 text-white">5 huéspedes</option>
              <option value="6" className="bg-slate-900 text-white">6 huéspedes</option>
            </select>
          </div>

          <div className="w-px h-8 bg-white/20 shrink-0" />

          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 text-sm font-medium transition-colors shrink-0 ml-2">
            <Search className="h-4 w-4" />
            Buscar
          </button>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Habitación
            </label>
            <select className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none">
              <option value="" className="bg-slate-900 text-white">Tipo</option>
              <option value="estandar" className="bg-slate-900 text-white">Estándar</option>
              <option value="deluxe" className="bg-slate-900 text-white">Deluxe</option>
              <option value="suite" className="bg-slate-900 text-white">Suite</option>
            </select>
          </div>

          <div className="bg-white/10 rounded-xl px-3 py-2">
            <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">
              Huéspedes
            </label>
            <select className="w-full bg-transparent text-white text-sm rounded-lg appearance-none cursor-pointer focus:outline-none">
              {[1, 2, 3, 4, 5, 6].map((n) => (
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

          <button className="col-span-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 text-sm font-medium transition-colors">
            <Search className="h-4 w-4" />
            Buscar Disponibilidad
          </button>
        </div>
      </div>
    </div>
  );
}
