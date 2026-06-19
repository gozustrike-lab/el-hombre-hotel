import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n-context";
import { BookingProvider } from "@/lib/booking-context";
import { BottomNav } from "@/components/site/bottom-nav";
import { BookingSheet } from "@/components/site/booking-sheet";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hospedaje Restaurante El Hombre | Puerto Chicama, La Libertad, Perú",
  description:
    "Hospedaje y restaurante frente a la ola izquierda más larga del mundo en Puerto Chicama, La Libertad, Perú. Habitaciones cómodas, gastronomía peruana y experiencias de surf únicas. Capacidad total: 17 personas.",
  keywords: [
    "Puerto Chicama",
    "hospedaje",
    "restaurante",
    "Perú",
    "La Libertad",
    "surf",
    "ola izquierda",
    "hotel",
    "Puerto Malabrigo",
  ],
  openGraph: {
    title: "Hospedaje Restaurante El Hombre | Puerto Chicama, La Libertad, Perú",
    description:
      "Hospedaje y restaurante frente a la ola izquierda más larga del mundo en Puerto Chicama, Perú.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased w-full min-h-screen m-0 p-0 overflow-x-hidden bg-background text-foreground transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <I18nProvider>
            <BookingProvider>
              {children}
              <BottomNav />
              <BookingSheet />
            </BookingProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}