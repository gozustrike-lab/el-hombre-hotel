export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface FeaturedDish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  platform: string;
}

export interface Experience {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface Room {
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export interface ServiceItem {
  icon: string;
  label: string;
  paid?: boolean;
}

export interface ServiceCategory {
  title: string;
  icon: string;
  items: ServiceItem[];
}

/* ─── HOTEL IDENTITY ─────────────────────────────────────────── */

export const HOTEL_NAME = "Hospedaje Restaurante El Hombre";

export const HOTEL_LOCATION = {
  city: "Puerto Chicama",
  province: "La Libertad",
  country: "Perú",
  address: "Arica 803, Puerto Malabrigo (Puerto Chicama), La Libertad, Perú",
  phone: "+51 949 090 421",
  whatsapp: "51949090421",
  email: "info@elhombreperu.com",
};

export const HOTEL_SCORE = {
  value: 9.2,
  label: "Fantástico",
  reviews: 74,
  subLabel: "Basado en opiniones reales",
  beachRating: 9.2,
  beachLabel: "Playa",
};

export const HOTEL_DESCRIPTION =
  "Ofrece zona de playa privada, salón de uso común, terraza panorámica frente al mar y restaurante en Malabrigo. Dispone de bar, cocina compartida, mostrador de información turística y cambio de moneda. A pocos pasos de la Playa de Puerto Chicama.";

export const HOTEL_POLICIES = {
  checkIn: "14:00",
  checkOut: "12:00",
  languages: ["Español"],
  smoking: "Prohibido fumar en todo el alojamiento",
  parking: "No hay parking — aparcamiento público gratuito en las cercanías",
};

/* ─── SERVICES & AMENITIES (Booking.com verified) ──────────────── */

export const services: ServiceCategory[] = [
  {
    title: "Más Populares",
    icon: "Star",
    items: [
      { icon: "Plane", label: "Traslado aeropuerto", paid: true },
      { icon: "Wifi", label: "WiFi gratis" },
      { icon: "Umbrella", label: "Frente a la playa" },
      { icon: "UtensilsCrossed", label: "Restaurante a la carta" },
      { icon: "Wine", label: "Bar" },
      { icon: "Palmtree", label: "Zona privada de playa" },
      { icon: "Coffee", label: "Desayuno incluido" },
    ],
  },
  {
    title: "Exteriores & Actividades",
    icon: "Sun",
    items: [
      { icon: "Sun", label: "Terraza / solárium con vista panorámica 180°" },
      { icon: "Waves", label: "Zona de playa privada" },
      { icon: "MountainSnow", label: "Acceso directo para surfistas" },
      { icon: "TreePalm", label: "Jardín" },
      { icon: "Armchair", label: "Terraza / patio" },
    ],
  },
  {
    title: "Recepción",
    icon: "ConciergeBell",
    items: [
      { icon: "Lock", label: "Registro de entrada/salida privado" },
      { icon: "Zap", label: "Registro exprés" },
      { icon: "MapPin", label: "Información turística de Puerto Chicama" },
      { icon: "CircleDollarSign", label: "Cambio de moneda" },
    ],
  },
  {
    title: "Instalaciones",
    icon: "Building",
    items: [
      { icon: "Tv", label: "Zona TV / salón de uso compartido" },
      { icon: "CookingPot", label: "Cocina compartida" },
      { icon: "Shirt", label: "Servicio de lavandería" },
      { icon: "Wind", label: "Servicio de limpieza en seco" },
      { icon: "Package", label: "Almuerzos para llevar" },
    ],
  },
  {
    title: "Seguridad",
    icon: "ShieldCheck",
    items: [
      { icon: "Camera", label: "Cámaras de seguridad exteriores" },
      { icon: "FireExtinguisher", label: "Extintores" },
      { icon: "Shield", label: "Seguridad 24 horas" },
      { icon: "Lock", label: "Candado en la habitación" },
      { icon: "Safe", label: "Caja fuerte en la habitación" },
    ],
  },
  {
    title: "Baño",
    icon: "Bath",
    items: [
      { icon: "ShowerHead", label: "Ducha" },
      { icon: "Bath", label: "Bañera" },
      { icon: "Ruler", label: "Papel higiénico" },
      { icon: "CircleDot", label: "WC" },
    ],
  },
];

/* ─── ROOM AMENITIES (Booking.com verified) ───────────────────── */

export const roomAmenities = [
  "Vistas al mar",
  "Ventilador",
  "Ventilador de techo",
  "Calefacción",
  "Cama de matrimonio",
  "Cama individual",
  "Cama grande (+2 plazas)",
  "Toallas",
  "Ropa de cama",
  "Mosquitera",
];

/* ─── FEATURED DISHES ──────────────────────────────────────────── */

export const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: "Ceviche Especial",
    description:
      "Ceviche de pescado fresco del Pacífico con camarón, limón de Chulucanas, cebolla morada y cilantro. Receta tradicional de la costa norte peruana.",
    price: "S/. 35",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 2,
    name: "Jalea Marina",
    description:
      "Fritura de pescado, camarones, calamar y chita acompañada de yuca sancochada, salsa criolla y ají limo.",
    price: "S/. 45",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 3,
    name: "Menú Ejecutivo Diario",
    description:
      "Sopa del día, plato principal entre tres opciones, jugo de fruta natural y postre. La mejor opción para recargar energía después del surf.",
    price: "S/. 15",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    category: "Ejecutivo",
  },
];

/* ─── FULL MENU ────────────────────────────────────────────────── */

export const fullMenu: Record<string, MenuItem[]> = {
  Entradas: [
    {
      name: "Ceviche de Camarón",
      description:
        "Camarones frescos del puerto marinados en limón con tomate, cebolla y ají limo.",
      price: "S/. 28",
    },
    {
      name: "Ceviche de Pescado",
      description:
        "Pescado fresco del día marinado en limón con cebolla morada, cilantro y camote.",
      price: "S/. 25",
    },
    {
      name: "Salpicón de Mariscos",
      description: "Mezcla de mariscos frescos con limón, cebolla y especias peruanas.",
      price: "S/. 30",
    },
    {
      name: "Tiradito Clásico",
      description: "Pescado en láminas finas con salsa de ají amarillo y leche de tigre.",
      price: "S/. 30",
    },
    {
      name: "Chicharrón de Calamar",
      description: "Aros de calamar dorados acompañados de salsa tartara y limón.",
      price: "S/. 22",
    },
  ],
  "Platos Principales": [
    {
      name: "Jalea Marina",
      description:
        "Fritura de pescado, camarones, calamar y chita con yuca y salsa criolla.",
      price: "S/. 45",
    },
    {
      name: "Ceviche Especial",
      description:
        "Ceviche de pescado y camarón con todos los aderezos de la casa.",
      price: "S/. 35",
    },
    {
      name: "Arroz con Mariscos",
      description: "Arroz cocinado con camarones, calamar, langostino y verduras.",
      price: "S/. 38",
    },
    {
      name: "Pescado Frito Entero",
      description:
        "Pescado frito acompañado de arroz, yuca, ensalada y salsa criolla.",
      price: "S/. 30",
    },
    {
      name: "Sudado de Pescado",
      description:
        "Pescado en salsa de tomate, cebolla, ají amarillo y culantro. Tradición costera.",
      price: "S/. 28",
    },
    {
      name: "Parihuela",
      description:
        "Sopa espesa de mariscos con pescado, camarones, conchas y langostinos.",
      price: "S/. 35",
    },
  ],
  Bebidas: [
    {
      name: "Jugo de Frutas Natural",
      description: "Jugo fresco de frutas de temporada (papaya, maracuyá, piña).",
      price: "S/. 8",
    },
    {
      name: "Cerveza Artesanal",
      description: "Cerveza artesanal peruana — Franca, Pilsen Callao o Cusqueña.",
      price: "S/. 10",
    },
    {
      name: "Agua Mineral",
      description: "Agua natural o con gas San Luis.",
      price: "S/. 5",
    },
    {
      name: "Pisco Sour",
      description:
        "El cóctil bandera del Perú. Pisco quebranta, limón, jarabe de goma y clara de huevo.",
      price: "S/. 18",
    },
    {
      name: "Chicha de Jora",
      description: "Bebida ancestral andina de maíz fermentado. Tradición peruana.",
      price: "S/. 8",
    },
  ],
  Postres: [
    {
      name: "Tres Leches",
      description: "Bizcocho bañado en leche evaporada, condensada y crema.",
      price: "S/. 15",
    },
    {
      name: "Suspiro a la Limeña",
      description: "Merengue sobre manjarblanco y canela. Clásico peruano.",
      price: "S/. 15",
    },
    {
      name: "Picarones",
      description: "Rosquitas de masa de camote y zapallo bañadas en miel de chancaca.",
      price: "S/. 12",
    },
    {
      name: "Fruta de Temporada",
      description: "Frutas frescas de la región norte: mango, chirimoya, lúcuma.",
      price: "S/. 10",
    },
  ],
};

/* ─── TESTIMONIALS ─────────────────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id: 0,
    name: "Julio",
    location: "México",
    avatar: "JU",
    rating: 5,
    text: "Excelente lugar y servicio. Luis y su hermana te hacen sentir en casa.",
    platform: "Booking.com",
  },
  {
    id: 1,
    name: "Diego Alvarado",
    location: "Trujillo, Perú",
    avatar: "DA",
    rating: 5,
    text: "Puerto Chicama a su máximo. Las habitaciones están justo frente a la ola, el ceviche es de primera y la onda del lugar es incomparable. Cada surfista debería pasar por aquí.",
    platform: "Google",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    location: "California, USA",
    avatar: "SM",
    rating: 5,
    text: "I came for the longest left wave in the world and found a perfect home base. The food is incredible — best ceviche I've had in South America. Already planning my next trip.",
    platform: "TripAdvisor",
  },
  {
    id: 3,
    name: "Carlos Bejarano",
    location: "Lima, Perú",
    avatar: "CB",
    rating: 5,
    text: "Un paraíso escondido en La Libertad. La jalea marina del restaurante es espectacular, las habitaciones son cómodas y la atención es de primera. Volveremos siempre.",
    platform: "Booking.com",
  },
  {
    id: 4,
    name: "Jake Thompson",
    location: "Gold Coast, Australia",
    avatar: "JT",
    rating: 5,
    text: "Chicama is legendary and this place does it justice. Woke up, checked the surf, paddled out, came back to an amazing meal. The hospitality here is genuine and warm.",
    platform: "Google",
  },
  {
    id: 5,
    name: "Lucía Navarro",
    location: "Chiclayo, Perú",
    avatar: "LN",
    rating: 5,
    text: "Fuimos en familia y fue perfecto. Las habitaciones limpias, el personal muy atento y la comida deliciosa. Los niños disfrutaron la playa y nosotros la tranquilidad.",
    platform: "Booking.com",
  },
];

/* ─── EXPERIENCES ──────────────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    title: "Surf en Puerto Chicama",
    description:
      "Clases de surf en la ola izquierda más larga del mundo (2.2 km). Instructores locales experimentados, todo el año. Todas las niveles.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    tag: "Todo el año",
  },
  {
    title: "Tours Culinarios Marinos",
    description:
      "Descubre los sabores de la costa norte peruana. Tour por mercados de pescadores, clase de ceviche y degustación de platos típicos.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Gastronómico",
  },
  {
    title: "Sunset en Malecón",
    description:
      "Paseo al atardecer por el malecón de Puerto Chicama con vista a las olas y la cordillera. Foto profesional incluida.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    tag: "Experiencia",
  },
  {
    title: "Avistamiento de Fauna",
    description:
      "Excursión a los humedales y ecosistemas costeros de La Libertad. Flamencos, pelícanos y lobos marinos en su hábitat natural.",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    tag: "Naturaleza",
  },
];

/* ─── ROOMS (Booking.com verified — official room types & prices) ── */

export const rooms: Room[] = [
  {
    name: "Habitación Individual con Vista al Mar",
    description:
      "Habitación individual con vistas al mar, baño compartido equipado con bañera y ducha. Incluye 1 cama, WiFi gratis y desayuno. Ideal para viajeros en solitario que buscan despertar frente al Pacífico.",
    price: "S/. 68",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "Vista al Mar", "Baño Compartido", "Bañera", "Ducha"],
  },
  {
    name: "Habitación Twin",
    description:
      "Dos camas individuales, baño privado con bañera y ducha, WiFi gratis y desayuno incluido. Cancelación gratuita y pago en el alojamiento. Perfecta para amigos o compañeros de viaje.",
    price: "S/. 120",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "Baño Privado", "2 Camas Individuales"],
  },
  {
    name: "Habitación Twin con Baño Compartido",
    description:
      "Dos camas individuales con baño compartido que incluye bañera, ducha y WC. WiFi gratis, desayuno incluido, toallas y papel higiénico. Cancelación gratuita disponible.",
    price: "S/. 100",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "Baño Compartido", "2 Camas Individuales", "Bañera"],
  },
  {
    name: "Habitación Queen con Vista al Mar",
    description:
      "Cama queen size con vistas al mar, baño privado equipado con bañera y ducha. WiFi gratis, desayuno incluido y toallas. La experiencia premium frente a Puerto Chicama.",
    price: "S/. 140",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "Vista al Mar", "Baño Privado", "Cama Queen"],
  },
  {
    name: "Habitación Deluxe Queen",
    description:
      "Cama queen size en habitación deluxe, baño privado con bañera y ducha, WiFi gratis y desayuno incluido. Máximo confort y espacio amplio para una estancia premium.",
    price: "S/. 150",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "Baño Privado", "Cama Queen", "Deluxe"],
  },
  {
    name: "Habitación Triple Básica",
    description:
      "Tres camas individuales, baño compartido con ducha y WC, WiFi gratis y desayuno incluido. Perfecta para grupos de surfistas o familias pequeñas que buscan presupuesto accesible.",
    price: "S/. 150",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    features: ["WiFi Gratis", "Desayuno Incluido", "3 Camas Individuales", "Baño Compartido"],
  },
];
