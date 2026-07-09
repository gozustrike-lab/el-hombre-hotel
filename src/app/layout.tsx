import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SuspendedPage } from "@/components/site/suspended-page";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sitio Suspendido | Hospedaje Restaurante El Hombre",
  description:
    "Sitio temporalmente suspendido. Contacte al administrador para más información.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased w-full min-h-screen m-0 p-0 overflow-x-hidden">
        <SuspendedPage />
      </body>
    </html>
  );
}