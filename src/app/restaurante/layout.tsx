import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carta Completa | Restaurante El Hombre - Puerto Malabrigo",
  description: "Explora nuestra carta completa de mariscos frescos, platos regionales y bebidas artesanales frente al mar en Puerto Malabrigo, La Libertad, Peru.",
};

export default function RestauranteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
