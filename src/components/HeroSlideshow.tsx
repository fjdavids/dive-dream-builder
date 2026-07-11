import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
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
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container text-center text-white px-4">
        <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-fade-in">
          {t.footer.padi}
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 animate-fade-in">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button size="lg" className="ocean-gradient ocean-shadow text-lg px-8" asChild>
            <Link to="/experiences">{t.hero.cta1}</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8" 
            asChild
          >
            <Link to="/experiences">{t.hero.cta2}</Link>
          </Button>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
