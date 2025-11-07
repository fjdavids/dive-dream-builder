// Central image mapping for all experiences
// Single source of truth with fallback chain: webp → jpg → png → placeholder

// Glob import all assets
const ASSETS_GLOB = import.meta.glob<{ default: string }>('/src/assets/*', { eager: true });

// Extract filename from path and create lookup
const ASSETS_MAP: Record<string, string> = {};
Object.entries(ASSETS_GLOB).forEach(([path, module]) => {
  const filename = path.split('/').pop()?.toLowerCase() || '';
  const nameWithoutExt = filename.replace(/\.(webp|jpg|jpeg|png|gif)$/i, '');
  ASSETS_MAP[filename] = module.default;
  ASSETS_MAP[nameWithoutExt] = module.default;
});

// Placeholder for missing images
const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%230EA5E9" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="white" font-size="24" font-family="sans-serif"%3EDiveLife%3C/text%3E%3C/svg%3E';

// Helper to find image with fallback chain
function resolveImage(baseName: string): string {
  const extensions = ['webp', 'jpg', 'jpeg', 'png', 'gif'];
  
  for (const ext of extensions) {
    const filename = `${baseName}.${ext}`;
    if (ASSETS_MAP[filename]) {
      return ASSETS_MAP[filename];
    }
  }
  
  // Try without -divelife suffix
  const baseNameAlt = baseName.replace(/-divelife$/, '');
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

export const IMAGE_MAP: Record<string, ImageData> = {
  'reef-snorkel': {
    src: resolveImage('snorkeling-turtle'),
    alt: {
      en: 'Reef snorkel – DiveLife Riviera Maya',
      es: 'Snorkel en arrecife – DiveLife Riviera Maya',
    },
  },
  'tres-rios': {
    src: resolveImage('tres-rios'),
    alt: {
      en: 'Tres Ríos snorkel – DiveLife Riviera Maya',
      es: 'Snorkel en Tres Ríos – DiveLife Riviera Maya',
    },
  },
  'night-snorkel': {
    src: resolveImage('night-snorkel'),
    alt: {
      en: 'Night snorkel – DiveLife Riviera Maya',
      es: 'Snorkel nocturno – DiveLife Riviera Maya',
    },
  },
  'discover-scuba-diving': {
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
  'scuba-diver': {
    src: resolveImage('pool-lesson'),
    alt: {
      en: 'PADI Scuba Diver – DiveLife Riviera Maya',
      es: 'PADI Scuba Diver – DiveLife Riviera Maya',
    },
  },
  'open-water': {
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
      en: 'Hobie sailing & snorkel – DiveLife Riviera Maya',
      es: 'Navegación en Hobie y snorkel – DiveLife Riviera Maya',
    },
  },
  'sailing-lessons': {
    src: resolveImage('sailing-lessons-divelife'),
    alt: {
      en: 'Sailing lessons – DiveLife Riviera Maya',
      es: 'Clases de navegación – DiveLife Riviera Maya',
    },
  },
  'luxury-sailing': {
    src: resolveImage('luxury-catamaran'),
    alt: {
      en: 'Luxury sailing catamaran – DiveLife Riviera Maya',
      es: 'Catamarán de lujo – DiveLife Riviera Maya',
    },
  },
  'jet-ski': {
    src: resolveImage('jetski'),
    alt: {
      en: 'Jet ski – DiveLife Riviera Maya',
      es: 'Moto acuática – DiveLife Riviera Maya',
    },
  },
  'seabob': {
    src: resolveImage('seabob-action-divelife'),
    alt: {
      en: 'Seabob session – DiveLife Riviera Maya',
      es: 'Sesión de Seabob – DiveLife Riviera Maya',
    },
  },
  'surface-supply': {
    src: resolveImage('surface-supply-snuba'),
    alt: {
      en: 'Surface supply snorkeling – DiveLife Riviera Maya',
      es: 'Snorkel con suministro de superficie – DiveLife Riviera Maya',
    },
  },
  'cenote-dive': {
    src: resolveImage('cenote-dive-divelife'),
    alt: {
      en: 'Cenote dive – DiveLife Riviera Maya',
      es: 'Buceo en cenote – DiveLife Riviera Maya',
    },
  },
  'cozumel-dive': {
    src: resolveImage('cozumel-dive-divelife'),
    alt: {
      en: 'Cozumel dive – DiveLife Riviera Maya',
      es: 'Buceo en Cozumel – DiveLife Riviera Maya',
    },
  },
  'cenote-family': {
    src: resolveImage('cenote-family-snorkel'),
    alt: {
      en: 'Cenote family snorkel – DiveLife Riviera Maya',
      es: 'Snorkel familiar en cenote – DiveLife Riviera Maya',
    },
  },
  'manatee-snorkeling': {
    src: resolveImage('manatee-snorkeling-divelife'),
    alt: {
      en: 'Manatee snorkeling – DiveLife Riviera Maya',
      es: 'Snorkel con manatíes – DiveLife Riviera Maya',
    },
  },
  'paddleboard': {
    src: resolveImage('paddleboard'),
    alt: {
      en: 'Paddleboard Ojo de Agua & Eagle Rays – DiveLife Riviera Maya',
      es: 'Paddleboard Ojo de Agua & Eagle Rays – DiveLife Riviera Maya',
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
    console.warn(`Image not found for slug: ${slug}`);
    return {
      src: '',
      alt: { en: '', es: '' },
    };
  }
  return image;
}

export function getImageSrc(slug: string): string {
  return IMAGE_MAP[slug]?.src || '';
}

export function getImageAlt(slug: string, locale: 'en' | 'es' = 'en'): string {
  return IMAGE_MAP[slug]?.alt[locale] || '';
}
