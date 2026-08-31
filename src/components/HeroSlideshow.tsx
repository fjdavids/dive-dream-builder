import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Import hero images from assets
import snorkelingturtleImg from '@/assets/snorkeling-turtle.jpg';
import reefDiveImg from '@/assets/reef-dive-divelife.jpg';
import familyScubaImg from '@/assets/family-scuba-divelife.jpg';
import sailingImg from '@/assets/luxury-catamaran-new.jpg';
import seabobActionImg from '@/assets/seabob-action-divelife.jpg';

const heroImages: { src: string; altEn: string; altEs: string }[] = [
  { src: snorkelingturtleImg, altEn: 'Snorkeler swimming beside a sea turtle in the Caribbean reef', altEs: 'Snorkeler nadando junto a una tortuga marina en el arrecife del Caribe' },
  { src: reefDiveImg, altEn: 'Scuba diver exploring a coral reef in Playa del Carmen', altEs: 'Buzo explorando un arrecife de coral en Playa del Carmen' },
  { src: familyScubaImg, altEn: 'Family learning to scuba dive with a PADI instructor', altEs: 'Familia aprendiendo a bucear con un instructor PADI' },
  { src: sailingImg, altEn: 'Luxury catamaran sailing along the Riviera Maya coastline', altEs: 'Catamarán de lujo navegando por la costa de la Riviera Maya' },
  { src: seabobActionImg, altEn: 'Guest riding a Seabob underwater scooter over turquoise water', altEs: 'Huésped montando un Seabob sobre aguas turquesa' },
];

export default function HeroSlideshow() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[620px] md:min-h-[760px] flex items-end overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <img
              src={image.src}
              alt={language === 'es' ? image.altEs : image.altEn}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              {...(index === 0
                ? { fetchPriority: 'high' as const, loading: 'eager' as const, decoding: 'async' as const }
                : { loading: 'lazy' as const, decoding: 'async' as const })}
            />
          </div>
        ))}
        {/* Subtle, functional legibility overlay only */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/35 to-ocean-deep/15" />
      </div>

      {/* Hero Content — editorial, left aligned */}
      <div className="relative z-20 container pb-20 pt-32 md:pb-28 md:pt-40 text-ivory">
        <div className="max-w-[46rem]">
          <p className="eyebrow mb-6 text-ivory/80 animate-fade-in">{t.footer.padi}</p>
          <h1 className="mb-6 animate-fade-in text-ivory">
            {t.hero.title}
          </h1>
          <p className="lead mb-9 max-w-[36rem] animate-fade-in text-ivory/85">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-in">
            <Button size="lg" className="bg-ivory text-ocean-deep hover:bg-white" asChild>
              <Link to="/experiences">{t.hero.cta1}</Link>
            </Button>
            <Link to="/experiences" className="link-editorial">
              {t.hero.cta2}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 right-6 md:right-10 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-[2px] transition-all duration-300 ${
              index === currentIndex
                ? 'bg-ivory w-10'
                : 'bg-ivory/45 hover:bg-ivory/80 w-5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
