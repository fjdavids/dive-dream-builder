import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, Award, Wrench, ChevronRight, MapPin, Anchor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/allExperiences';
import HeroSlideshow from '@/components/HeroSlideshow';
import { getImage } from '@/data/imageMap';
import ourFacilitiesImg from '@/assets/our-facilities.jpg';

export default function Home() {
  const { t, language } = useLanguage();

  const trustFeatures = [
    {
      icon: Shield,
      title: t.trust.safety,
      description: t.trust.safetyDesc,
    },
    {
      icon: Award,
      title: t.trust.certified,
      description: t.trust.certifiedDesc,
    },
    {
      icon: Users,
      title: t.trust.boutique,
      description: t.trust.boutiqueDesc,
    },
    {
      icon: Wrench,
      title: t.trust.premium,
      description: t.trust.premiumDesc,
    },
  ];

  const safetyFeatures = [
    {
      title: t.safety.protocols,
      description: t.safety.protocolsDesc,
    },
    {
      title: t.safety.weather,
      description: t.safety.weatherDesc,
    },
    {
      title: t.safety.ratios,
      description: t.safety.ratiosDesc,
    },
    {
      title: t.safety.equipment,
      description: t.safety.equipmentDesc,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section with Slideshow */}
      <HeroSlideshow />

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-2xl bg-card hover:ocean-shadow smooth-transition"
              >
                <div className="inline-flex p-4 rounded-full ocean-gradient">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.experiences.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? 'From beginner-friendly snorkeling to advanced cenote dives, discover your perfect ocean adventure.'
                : 'Desde snorkel para principiantes hasta buceos avanzados en cenotes, descubre tu aventura oceánica perfecta.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {experiences.slice(0, 6).map((exp) => {
              const imageData = getImage(exp.slug, language);
              
              return (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  title={exp.title[language]}
                  slug={exp.slug}
                  image={imageData.src}
                  duration={exp.duration}
                  level={exp.level[language]}
                  minAge={exp.minAge}
                  price={exp.price}
                />
              );
            })}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="group" asChild>
              <Link to="/experiences">
                {t.experiences.viewAll}
                <ChevronRight className="ml-2 group-hover:translate-x-1 smooth-transition" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 ocean-gradient-soft">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{t.location.title}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{t.location.subtitle}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card">
                  <Anchor className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">{t.location.kanai}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Direct access for Kanai residents' : 'Acceso directo para residentes de Kanai'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card">
                  <Anchor className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">{t.location.velas}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'On-site for Grand Velas guests' : 'En el lugar para huéspedes de Grand Velas'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card">
                  <Anchor className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">{t.location.external}</h3>
                    <p className="text-sm text-muted-foreground">{t.location.externalDesc}</p>
                  </div>
                </div>
              </div>

              <Button size="lg" asChild>
                <Link to="/location">
                  {language === 'en' ? 'View Full Map & Details' : 'Ver Mapa Completo y Detalles'}
                </Link>
              </Button>
            </div>

            <div className="relative rounded-2xl overflow-hidden ocean-shadow aspect-square">
              <img
                src={ourFacilitiesImg}
                alt={language === 'en' 
                  ? "DiveLife team of divers on shore with full gear, group photo" 
                  : "Equipo de buzos de DiveLife en tierra con equipo completo, foto grupal"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.safety.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.safety.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {safetyFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border bg-card hover:ocean-shadow smooth-transition"
              >
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 ocean-gradient text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl mb-8 text-white/90">{t.cta.subtitle}</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
            {t.cta.button}
          </Button>
        </div>
      </section>
    </div>
  );
}
