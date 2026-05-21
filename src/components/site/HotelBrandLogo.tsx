import Image from "next/image";

const LOGO_WIDTH = 160;
const LOGO_HEIGHT = 32;

type HotelBrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
};

export function HotelBrandLogo({
  className,
  priority = false,
  sizes = "(max-width: 860px) 120px, 160px",
  width = LOGO_WIDTH,
}: HotelBrandLogoProps) {
  const height = Math.round((width * LOGO_HEIGHT) / LOGO_WIDTH);

  return (
    <Image
      alt="Hospedaje Restaurante El Hombre"
      className={className}
      height={height}
      priority={priority}
      sizes={sizes}
      src="/assets/branding/logo-horizontal-el-hombre.webp"
      width={width}
    />
  );
}
