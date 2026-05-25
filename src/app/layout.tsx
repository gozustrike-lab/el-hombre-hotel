import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hospedaje Restaurante El Hombre | Puerto López, Manabí",
  description:
    "Hospedaje y restaurante frente al mar en Puerto López, Manabí, Ecuador. Habitaciones cómodas, gastronomía local y experiencias únicas.",
  keywords: [
    "Puerto López",
    "hospedaje",
    "restaurante",
    "Ecuador",
    "Manabí",
    "playa",
    "hotel",
  ],
  openGraph: {
    title: "Hospedaje Restaurante El Hombre | Puerto López, Manabí",
    description:
      "Hospedaje y restaurante frente al mar en Puerto López, Manabí, Ecuador.",
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
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
