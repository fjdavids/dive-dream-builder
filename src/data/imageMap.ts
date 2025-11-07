// Central image mapping for all experiences
// Single source of truth for experience images across the site

import snorkelingTurtle from '@/assets/snorkeling-turtle.jpg';
import tresRios from '@/assets/tres-rios.jpg';
import nightSnorkel from '@/assets/night-snorkel.jpg';
import destinationPadi from '@/assets/Destination_PADI-6-scaled.jpg';
import openWaterDiver1 from '@/assets/Open-Water-Diver-1-scaled.jpg';
import poolLesson from '@/assets/pool-lesson.jpg';
import divemaster from '@/assets/Divemaster-1-2048x1024.jpg';
import scubaKids from '@/assets/BBIeMkrSITmJun2015_371.jpg';
import hobieSailing from '@/assets/hobie-sailing.jpg';
import acuatico6 from '@/assets/ACUATICETÉREO-6.jpg';
import acuatico48 from '@/assets/ACUATICETÉREO-48.jpg';
import luxuryCatamaran from '@/assets/luxury-catamaran.jpg';
import jetski from '@/assets/jetski.jpg';
import seabob from '@/assets/seabob-erlebnis-r-u-ready.jpg';
import snuba from '@/assets/The-Last-Man-Diving-SNUBA.png';
import cenoteDive from '@/assets/Sdmnt0613_0765.jpg';
import openWaterDiver4 from '@/assets/Open-Water-Diver-4.jpg';
import cenoteFamilySnorkel from '@/assets/cenote-family-snorkel.jpg';
import manateeSnorkeling from '@/assets/manatee-snorkeling.jpg';
import paddleboard from '@/assets/paddleboard.jpg';
import fishing from '@/assets/WhatsApp-Image-2024-07-26-at-11.14.07AM.jpeg';

interface ImageData {
  src: string;
  alt: {
    en: string;
    es: string;
  };
}

export const IMAGE_MAP: Record<string, ImageData> = {
  'reef-snorkel': {
    src: snorkelingTurtle,
    alt: {
      en: 'Reef snorkel – DiveLife Riviera Maya',
      es: 'Snorkel en arrecife – DiveLife Riviera Maya',
    },
  },
  'tres-rios': {
    src: tresRios,
    alt: {
      en: 'Tres Ríos snorkel – DiveLife Riviera Maya',
      es: 'Snorkel en Tres Ríos – DiveLife Riviera Maya',
    },
  },
  'night-snorkel': {
    src: nightSnorkel,
    alt: {
      en: 'Night snorkel – DiveLife Riviera Maya',
      es: 'Snorkel nocturno – DiveLife Riviera Maya',
    },
  },
  'discover-scuba-diving': {
    src: destinationPadi,
    alt: {
      en: 'Discover Scuba Diving – DiveLife Riviera Maya',
      es: 'Discover Scuba Diving – DiveLife Riviera Maya',
    },
  },
  'local-dive': {
    src: openWaterDiver1,
    alt: {
      en: 'Local dive – DiveLife Riviera Maya',
      es: 'Buceo local – DiveLife Riviera Maya',
    },
  },
  'scuba-diver': {
    src: poolLesson,
    alt: {
      en: 'PADI Scuba Diver – DiveLife Riviera Maya',
      es: 'PADI Scuba Diver – DiveLife Riviera Maya',
    },
  },
  'open-water': {
    src: divemaster,
    alt: {
      en: 'PADI Open Water Diver – DiveLife Riviera Maya',
      es: 'PADI Open Water Diver – DiveLife Riviera Maya',
    },
  },
  'scuba-kids': {
    src: scubaKids,
    alt: {
      en: 'Scuba Kids – DiveLife Riviera Maya',
      es: 'Scuba Kids – DiveLife Riviera Maya',
    },
  },
  'hobie-sailing': {
    src: hobieSailing,
    alt: {
      en: 'Hobie sailing – DiveLife Riviera Maya',
      es: 'Navegación en Hobie – DiveLife Riviera Maya',
    },
  },
  'hobie-sailing-snorkel': {
    src: acuatico6,
    alt: {
      en: 'Hobie sailing & snorkel – DiveLife Riviera Maya',
      es: 'Navegación en Hobie y snorkel – DiveLife Riviera Maya',
    },
  },
  'sailing-lessons': {
    src: acuatico48,
    alt: {
      en: 'Sailing lessons – DiveLife Riviera Maya',
      es: 'Clases de navegación – DiveLife Riviera Maya',
    },
  },
  'luxury-sailing': {
    src: luxuryCatamaran,
    alt: {
      en: 'Luxury sailing catamaran – DiveLife Riviera Maya',
      es: 'Catamarán de lujo – DiveLife Riviera Maya',
    },
  },
  'jet-ski': {
    src: jetski,
    alt: {
      en: 'Jet ski – DiveLife Riviera Maya',
      es: 'Moto acuática – DiveLife Riviera Maya',
    },
  },
  'seabob': {
    src: seabob,
    alt: {
      en: 'Seabob session – DiveLife Riviera Maya',
      es: 'Sesión de Seabob – DiveLife Riviera Maya',
    },
  },
  'surface-supply': {
    src: snuba,
    alt: {
      en: 'Surface supply snorkeling – DiveLife Riviera Maya',
      es: 'Snorkel con suministro de superficie – DiveLife Riviera Maya',
    },
  },
  'cenote-dive': {
    src: cenoteDive,
    alt: {
      en: 'Cenote dive – DiveLife Riviera Maya',
      es: 'Buceo en cenote – DiveLife Riviera Maya',
    },
  },
  'cozumel-dive': {
    src: openWaterDiver4,
    alt: {
      en: 'Cozumel dive – DiveLife Riviera Maya',
      es: 'Buceo en Cozumel – DiveLife Riviera Maya',
    },
  },
  'cenote-family': {
    src: cenoteFamilySnorkel,
    alt: {
      en: 'Cenote family snorkel – DiveLife Riviera Maya',
      es: 'Snorkel familiar en cenote – DiveLife Riviera Maya',
    },
  },
  'manatee-snorkeling': {
    src: manateeSnorkeling,
    alt: {
      en: 'Manatee snorkeling – DiveLife Riviera Maya',
      es: 'Snorkel con manatíes – DiveLife Riviera Maya',
    },
  },
  'paddleboard': {
    src: paddleboard,
    alt: {
      en: 'Paddleboard Ojo de Agua & Eagle Rays – DiveLife Riviera Maya',
      es: 'Paddleboard Ojo de Agua & Eagle Rays – DiveLife Riviera Maya',
    },
  },
  'panga-fishing': {
    src: fishing,
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
