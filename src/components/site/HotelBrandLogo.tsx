import Image from "next/image";

const LOGO_WIDTH = 110;
const LOGO_HEIGHT = 54;

type HotelBrandLogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
};

export function HotelBrandLogo({
  className,
  priority = false,
  sizes = "(max-width: 860px) 80px, 110px",
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
      src="/assets/branding/el-hombre-logo.png"
      width={width}
    />
  );
}
