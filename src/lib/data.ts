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

export const featuredDishes: FeaturedDish[] = [
  {
    id: 1,
    name: "Ceviche Especial",
    description:
      "Ceviche de pescado fresco con camarón, limón, cebolla morada y cilantro.",
    price: "$12.00",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 2,
    name: "Jalea Mixta",
    description:
      "Fritura de pescado, camarones, calamar y patacones con salsa de ají.",
    price: "$15.00",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
    category: "Mariscos",
  },
  {
    id: 3,
    name: "Menú Ejecutivo",
    description:
      "Sopa del día, plato principal, jugo y postre. Especialidad de la casa.",
    price: "$8.00",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    category: "Ejecutivo",
  },
];

export const fullMenu: Record<string, MenuItem[]> = {
  Entradas: [
    {
      name: "Ceviche de Camarón",
      description:
        "Camarones frescos marinados en limón con tomate y cebolla.",
      price: "$10.00",
    },
    {
      name: "Ceviche de Pescado",
      description:
        "Pescado fresco marinado en limón con cebolla morada y cilantro.",
      price: "$8.00",
    },
    {
      name: "Salpicón de Mariscos",
      description: "Mezcla de mariscos frescos con limón y especias.",
      price: "$12.00",
    },
    {
      name: "Patacones con Guacamole",
      description: "Patacones crujientes acompañados de guacamole fresco.",
      price: "$6.00",
    },
  ],
  "Platos Principales": [
    {
      name: "Jalea Mixta",
      description: "Fritura de pescado, camarones, calamar con patacones.",
      price: "$15.00",
    },
    {
      name: "Ceviche Especial",
      description: "Ceviche de pescado y camarón con todos los aderezos.",
      price: "$12.00",
    },
    {
      name: "Arroz con Mariscos",
      description: "Arroz cocinado con camarones, calamar y verduras.",
      price: "$14.00",
    },
    {
      name: "Pescado Frito Entero",
      description:
        "Pescado frito acompañado de arroz, patacones y ensalada.",
      price: "$11.00",
    },
    {
      name: "Encebollado",
      description: "Sopa de pescado con yuca, cebolla y tomate.",
      price: "$8.00",
    },
  ],
  Bebidas: [
    {
      name: "Jugo de Frutas Natural",
      description: "Jugo fresco de frutas de temporada.",
      price: "$3.00",
    },
    {
      name: "Cerveza Nacional",
      description: "Cerveza Pilsener o Club premium.",
      price: "$3.50",
    },
    {
      name: "Agua Mineral",
      description: "Agua natural o con gas.",
      price: "$1.50",
    },
    {
      name: "Cóctel de Maracuyá",
      description: "Cóctel de maracuyá con hielo picado.",
      price: "$5.00",
    },
  ],
  Postres: [
    {
      name: "Tres Leches",
      description: "Bizcocho bañado en tres clases de leche.",
      price: "$5.00",
    },
    {
      name: "Helado Artesanal",
      description: "Helado de sabores tropicales.",
      price: "$3.50",
    },
    {
      name: "Fruta de Temporada",
      description: "Frutas frescas de la región.",
      price: "$3.00",
    },
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    location: "Quito, Ecuador",
    avatar: "MG",
    rating: 5,
    text: "Una experiencia inolvidable. Las habitaciones tienen vista al mar y el ceviche es el mejor que he probado. El personal es increíblemente amable.",
    platform: "Booking.com",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    location: "Cuenca, Ecuador",
    avatar: "CR",
    rating: 5,
    text: "Perfecto para desconectar. La playa está a pocos pasos y la comida del restaurante es espectacular. Volveremos sin duda.",
    platform: "TripAdvisor",
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Lima, Perú",
    avatar: "AM",
    rating: 5,
    text: "El mejor hospedaje en Puerto López. Limpio, cómodo y con una vista al mar impresionante. Muy recomendable.",
    platform: "Google",
  },
  {
    id: 4,
    name: "Diego Sánchez",
    location: "Guayaquil, Ecuador",
    avatar: "DS",
    rating: 4,
    text: "Muy buena relación calidad-precio. La jalea mixta del restaurante es espectacular y las habitaciones son amplias.",
    platform: "Booking.com",
  },
];

export const experiences: Experience[] = [
  {
    title: "Avistamiento de Ballenas",
    description:
      "Excursión para observar ballenas jorobadas en su hábitat natural. Temporada: junio a septiembre.",
    image:
      "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80",
    tag: "Jun-Sep",
  },
  {
    title: "Surf en Puerto López",
    description:
      "Clases de surf para todos los niveles con instructores locales experimentados.",
    image:
      "https://images.unsplash.com/photo-1502680390548-bdbac40a5751?w=800&q=80",
    tag: "Todo el año",
  },
  {
    title: "Isla de la Plata",
    description:
      "Visita la 'Isla Galápagos del Pobre' con snorkel y avistamiento de aves tropicales.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    tag: "Populares",
  },
  {
    title: "Tour Gastronómico",
    description:
      "Descubre los sabores locales con nuestro tour por los mercados y restaurantes de la zona.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Culinario",
  },
];

export const rooms: Room[] = [
  {
    name: "Habitación Estándar",
    description:
      "Habitación cómoda con cama doble, baño privado, aire acondicionado y WiFi gratis.",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    features: ["WiFi", "A/C", "TV", "Baño Privado"],
  },
  {
    name: "Habitación Deluxe",
    description:
      "Habitación amplia con vista al mar, balcón privado, minibar y amenities premium.",
    price: "$55",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80",
    features: ["Vista al Mar", "Balcón", "Minibar", "WiFi"],
  },
  {
    name: "Suite Familiar",
    description:
      "Suite espaciosa para familias, dos ambientes, cocina pequeña y terraza con vista panorámica.",
    price: "$75",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    features: ["2 Ambientes", "Cocina", "Terraza", "A/C"],
  },
];
