// Central image mapping for all experiences
// Single source of truth with fallback chain: webp → jpg → png → placeholder

// Glob import all assets AS URLs (critical for <img src>)
const ASSETS_GLOB = import.meta.glob<string>('/src/assets/*.{webp,jpg,jpeg,png,gif}', { 
  eager: true, 
  import: 'default'
});

// Normalize helper: lowercase, remove accents, spaces, underscores
const normalize = (str: string): string => 
  str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_\s]/g, '-');

// Build lookup map with normalized keys
const ASSETS_MAP: Record<string, string> = {};
Object.entries(ASSETS_GLOB).forEach(([path, url]) => {
  const filename = path.split('/').pop() || '';
  const normalized = normalize(filename);
  const nameWithoutExt = normalized.replace(/\.(webp|jpg|jpeg|png|gif)$/i, '');
  
  ASSETS_MAP[normalized] = url;
  ASSETS_MAP[nameWithoutExt] = url;
  // Also keep original case for exact matches
  ASSETS_MAP[filename.toLowerCase()] = url;
});

// Placeholder for missing images
const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%230EA5E9" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif"%3EDiveLife%3C/text%3E%3C/svg%3E';

// Helper to find image with fallback chain
function resolveImage(baseName: string): string {
  const normalized = normalize(baseName);
  const extensions = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
  
  // Try exact normalized match first
  for (const ext of extensions) {
    const filename = `${normalized}.${ext}`;
    if (ASSETS_MAP[filename]) {
      return ASSETS_MAP[filename];
    }
  }
  
  // Try without -divelife suffix
  const baseNameAlt = normalized.replace(/-divelife$/, '');
  for (const ext of extensions) {
    const filename = `${baseNameAlt}.${ext}`;
    if (ASSETS_MAP[filename]) {
      return ASSETS_MAP[filename];
    }
  }
  
  console.warn(`Image not found: ${baseName}`);
  return PLACEHOLDER;
}

interface ImageData {
  src: string;
  alt: {
    en: string;
    es: string;
  };
}

// Explicit slug → filename mapping (EXACT slugs from allExperiences.ts)
export const IMAGE_MAP: Record<string, ImageData> = {
  'reef-snorkel': {
    src: resolveImage('snorkeling-turtle'),
    alt: {
      en: 'Reef snorkel – DiveLife Riviera Maya',
      es: 'Snorkel en arrecife – DiveLife Riviera Maya',
    },
  },
  'tres-rios-snorkel': {
    src: resolveImage('tres-rios-snorkel-divelife'),
    alt: {
      en: 'Tres Ríos & Herradura Snorkel – DiveLife Riviera Maya',
      es: 'Tres Ríos y Herradura Snorkel – DiveLife Riviera Maya',
    },
  },
  'night-snorkel': {
    src: resolveImage('night-snorkeling'),
    alt: {
      en: 'Guided night snorkeling experience with safety lights',
      es: 'Experiencia de snorkel nocturno guiado con luces de seguridad',
    },
  },
  'discover-scuba': {
    src: resolveImage('dsd-discover-scuba-diver'),
    alt: {
      en: 'Discover Scuba Diving – DiveLife Riviera Maya',
      es: 'Discover Scuba Diving – DiveLife Riviera Maya',
    },
  },
  'local-dive': {
    src: resolveImage('local-dive-divelife'),
    alt: {
      en: 'Local dive – DiveLife Riviera Maya',
      es: 'Buceo local – DiveLife Riviera Maya',
    },
  },
  'padi-scuba-diver': {
    src: resolveImage('padi-scuba-diver-divelife'),
    alt: {
      en: 'PADI Scuba Diver – DiveLife Riviera Maya',
      es: 'PADI Scuba Diver – DiveLife Riviera Maya',
    },
  },
  'padi-open-water': {
    src: resolveImage('padi-open-water-divelife'),
    alt: {
      en: 'PADI Open Water Diver – DiveLife Riviera Maya',
      es: 'PADI Open Water Diver – DiveLife Riviera Maya',
    },
  },
  'scuba-kids': {
    src: resolveImage('scuba-kids-divelife'),
    alt: {
      en: 'Scuba Kids – DiveLife Riviera Maya',
      es: 'Scuba Kids – DiveLife Riviera Maya',
    },
  },
  'pool-demo': {
    src: resolveImage('pool-lesson'),
    alt: {
      en: 'Free Pool Scuba Demo – DiveLife Riviera Maya',
      es: 'Demo de Buceo en Alberca Gratis – DiveLife Riviera Maya',
    },
  },
  'hobie-sailing': {
    src: resolveImage('hobie-sailing'),
    alt: {
      en: 'Hobie sailing – DiveLife Riviera Maya',
      es: 'Navegación en Hobie – DiveLife Riviera Maya',
    },
  },
  'hobie-sailing-snorkel': {
    src: resolveImage('hobie-sailing-snorkel-combo'),
    alt: {
      en: 'Hobie Cat Sailing + Snorkel – DiveLife Riviera Maya',
      es: 'Hobie Cat Sailing + Snorkel – DiveLife Riviera Maya',
    },
  },
  'sailing-lessons': {
    src: resolveImage('sailing-lessons-divelife'),
    alt: {
      en: 'Sailing lessons – DiveLife Riviera Maya',
      es: 'Clases de navegación – DiveLife Riviera Maya',
    },
  },
  'luxury-catamaran': {
    src: resolveImage('luxury-catamaran-new'),
    alt: {
      en: 'Luxury catamaran sailing experience for 12–15 guests',
      es: 'Experiencia en catamarán de lujo para 12–15 personas',
    },
  },
  'jetski-tour': {
    src: resolveImage('jetski'),
    alt: {
      en: 'Jet ski tour – DiveLife Riviera Maya',
      es: 'Tour en moto acuática – DiveLife Riviera Maya',
    },
  },
  'seabob-session': {
    src: resolveImage('seabob-action-divelife'),
    alt: {
      en: 'Seabob session – DiveLife Riviera Maya',
      es: 'Sesión de Seabob – DiveLife Riviera Maya',
    },
  },
  'surface-supply': {
    src: resolveImage('surface-supply-snuba'),
    alt: {
      en: 'Surface supply diving – DiveLife Riviera Maya',
      es: 'Buceo con suministro de superficie – DiveLife Riviera Maya',
    },
  },
  'cenote-dive': {
    src: resolveImage('cenote-diving-new'),
    alt: {
      en: 'Certified cenote diving in crystal-clear caverns',
      es: 'Buceo en cenotes para buzos certificados en cavernas cristalinas',
    },
  },
  'cozumel-dive': {
    src: resolveImage('cozumel-dive-divelife'),
    alt: {
      en: 'Cozumel dive – DiveLife Riviera Maya',
      es: 'Buceo en Cozumel – DiveLife Riviera Maya',
    },
  },
  'cenote-family-snorkel': {
    src: resolveImage('cenote-family-snorkel'),
    alt: {
      en: 'Cenote family snorkel – DiveLife Riviera Maya',
      es: 'Snorkel familiar en cenote – DiveLife Riviera Maya',
    },
  },
  'manatee-snorkel': {
    src: resolveImage('manatee-snorkeling-divelife'),
    alt: {
      en: 'Manatee snorkeling – DiveLife Riviera Maya',
      es: 'Snorkel con manatíes – DiveLife Riviera Maya',
    },
  },
  'paddleboard-ojo-agua': {
    src: resolveImage('stand-up-paddle-board'),
    alt: {
      en: 'Stand-up paddle board tour to Ojo de Agua & Eagle',
      es: 'Tour de stand up paddle hacia Ojo de Agua y Eagle',
    },
  },
  'panga-fishing': {
    src: resolveImage('fishing-mahi-divelife'),
    alt: {
      en: 'Mexican panga fishing – DiveLife Riviera Maya',
      es: 'Pesca en panga mexicana – DiveLife Riviera Maya',
    },
  },
};

export function getImage(slug: string, locale: 'en' | 'es' = 'en'): ImageData {
  const image = IMAGE_MAP[slug];
  if (!image) {
    console.warn(`Missing slug in IMAGE_MAP: ${slug}`);
    return {
      src: PLACEHOLDER,
      alt: { 
        en: 'DiveLife Riviera Maya experience', 
        es: 'Experiencia DiveLife Riviera Maya' 
      },
    };
  }
  return image;
}

export function getImageSrc(slug: string): string {
  const image = getImage(slug);
  return image.src || PLACEHOLDER;
}

export function getImageAlt(slug: string, locale: 'en' | 'es' = 'en'): string {
  const image = getImage(slug, locale);
  return image.alt[locale] || '';
}
