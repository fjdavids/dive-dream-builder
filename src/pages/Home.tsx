import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Award, Wrench, ChevronRight, MapPin, Anchor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/experiences';
import heroImage from '@/assets/hero-diving.jpg';
import sailingImage from '@/assets/sailing.jpg';
import snorkelingImage from '@/assets/snorkeling-family.jpg';
import cenoteImage from '@/assets/cenote.jpg';

export default function Home() {
  const { t, language } = useLanguage();

  const featuredExperiences = experiences.slice(0, 6).map((exp) => ({
    ...exp,
    title: exp.title[language],
    level: exp.level[language],
    image: exp.slug.includes('snorkel') ? snorkelingImage : 
           exp.slug.includes('sailing') ? sailingImage :
           exp.slug.includes('cenote') ? cenoteImage : heroImage,
  }));

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
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Diving in crystal clear Caribbean waters"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white px-4">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {t.footer.padi}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="ocean-gradient ocean-shadow text-lg px-8" asChild>
              <Link to="/experiences">{t.hero.cta1}</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8" asChild>
              <Link to="/experiences">{t.hero.cta2}</Link>
            </Button>
          </div>
        </div>
      </section>

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
            {featuredExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                title={exp.title}
                slug={exp.slug}
                image={exp.image}
                duration={exp.duration}
                level={exp.level}
                minAge={exp.minAge}
                price={exp.price}
              />
            ))}
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
                  {language === 'en' ? 'View Map & Details' : 'Ver Mapa y Detalles'}
                </Link>
              </Button>
            </div>

            <div className="relative rounded-2xl overflow-hidden ocean-shadow aspect-square">
              <img
                src={sailingImage}
                alt="Playa del Carmen location"
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
