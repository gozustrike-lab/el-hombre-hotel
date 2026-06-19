'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface BookingContextValue {
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <BookingContext.Provider value={{ bookingOpen, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookingContext must be used within BookingProvider');
  return ctx;
}