export interface Experience {
  id: string;
  slug: string;
  title: {
    en: string;
    es: string;
  };
  shortDesc: {
    en: string;
    es: string;
  };
  duration: string;
  level: {
    en: string;
    es: string;
  };
  minAge: string;
  price: string;
  image: string;
  category: 'snorkeling' | 'diving' | 'sailing' | 'pool' | 'trips';
}

export const experiences: Experience[] = [
  {
    id: '1',
    slug: 'snorkeling-local-reef',
    title: {
      en: 'Snorkeling – Local Reef (Motorboat)',
      es: 'Snorkel – Arrecife Local (Lancha)',
    },
    shortDesc: {
      en: 'Family-friendly guided reef & "ojo de agua" stops. Certified guide, gear included.',
      es: 'Tour familiar guiado por arrecife y "ojo de agua". Guía certificado, equipo incluido.',
    },
    duration: '2-3 hours',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '6 years',
    price: '1,200',
    image: '/placeholder.svg',
    category: 'snorkeling',
  },
  {
    id: '2',
    slug: 'discover-scuba-diving',
    title: {
      en: 'Discover Scuba Diving (DSD)',
      es: 'Descubre el Buceo (DSD)',
    },
    shortDesc: {
      en: 'Pool skills + 1 guided ocean dive up to 12m. PADI instructor supervision.',
      es: 'Habilidades en piscina + 1 inmersión guiada hasta 12m. Supervisión de instructor PADI.',
    },
    duration: '3-4 hours',
    level: { en: 'Beginner', es: 'Principiante' },
    minAge: '10 years',
    price: '2,500',
    image: '/placeholder.svg',
    category: 'diving',
  },
  {
    id: '3',
    slug: 'hobie-cat-sailing-cruise',
    title: {
      en: 'Hobie Cat Sailing – Cruise',
      es: 'Navegación en Hobie Cat – Paseo',
    },
    shortDesc: {
      en: 'Silent wind-powered coastal ride. Relaxing, scenic ocean experience.',
      es: 'Paseo costero silencioso impulsado por viento. Experiencia oceánica relajante.',
    },
    duration: '1.5 hours',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '8 years',
    price: '1,500',
    image: '/placeholder.svg',
    category: 'sailing',
  },
  {
    id: '4',
    slug: 'cenote-dive',
    title: {
      en: 'Cenote Dive (Certified)',
      es: 'Buceo en Cenote (Certificados)',
    },
    shortDesc: {
      en: 'Two guided cavern dives. Transport & entrance included. Min PADI Open Water.',
      es: 'Dos inmersiones guiadas en caverna. Transporte y entrada incluidos. Mín PADI Open Water.',
    },
    duration: '5-6 hours',
    level: { en: 'Certified divers', es: 'Buzos certificados' },
    minAge: '12 years',
    price: '3,200',
    image: '/placeholder.svg',
    category: 'diving',
  },
  {
    id: '5',
    slug: 'pool-seabob',
    title: {
      en: 'Pool – Underwater Scooter (Seabob)',
      es: 'Piscina – Scooter Submarino (Seabob)',
    },
    shortDesc: {
      en: 'Fun propulsion session in pool or confined waters. No certification required.',
      es: 'Sesión de propulsión divertida en piscina. No requiere certificación.',
    },
    duration: '30 minutes',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: '8 years',
    price: '800',
    image: '/placeholder.svg',
    category: 'pool',
  },
  {
    id: '6',
    slug: 'luxury-yacht-rental',
    title: {
      en: 'Luxury Yacht Rental',
      es: 'Renta de Yate de Lujo',
    },
    shortDesc: {
      en: 'Half-day/full-day private charters. Snorkel stops, premium service, custom catering.',
      es: 'Charters privados medio día/día completo. Paradas snorkel, servicio premium, catering personalizado.',
    },
    duration: '4-8 hours',
    level: { en: 'All levels', es: 'Todos los niveles' },
    minAge: 'All ages',
    price: '15,000',
    image: '/placeholder.svg',
    category: 'trips',
  },
];
