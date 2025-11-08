import { Shield, Award, Heart, Users, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import heroDivingImg from '@/assets/hero-diving.jpg';
import briefingImg from '@/assets/briefing.jpg';
import scubaDivingImg from '@/assets/scuba-diving.jpg';
import radioImg from '@/assets/radio.jpg';
import sunsetSurfaceImg from '@/assets/sunset-surface.jpg';
import oxygenKitImg from '@/assets/oxygen-kit.jpg';
import gearCheckImg from '@/assets/gear-check.jpg';
import cenoteImg from '@/assets/cenote.jpg';
import snorkelImg from '@/assets/reef-snorkel.jpg';
import hobieCatImg from '@/assets/hobie-sailing.jpg';
import seabobImg from '@/assets/seabob.jpg';

export default function About() {
  const { language } = useLanguage();
  const isEN = language === 'en';

  const values = [
    {
      icon: Shield,
      title: language === 'en' ? 'Safety First' : 'Seguridad Primero',
      description: language === 'en'
        ? 'Every dive, every snorkel session follows strict PADI protocols. Your safety is never compromised.'
        : 'Cada buceo, cada sesión de snorkel sigue estrictos protocolos PADI. Tu seguridad nunca se compromete.',
    },
    {
      icon: Award,
      title: language === 'en' ? 'Expert Team' : 'Equipo Experto',
      description: language === 'en'
        ? 'PADI certified instructors with years of experience in Caribbean waters and cenote diving.'
        : 'Instructores certificados PADI con años de experiencia en aguas caribeñas y buceo en cenotes.',
    },
    {
      icon: Heart,
      title: language === 'en' ? 'Passion for Ocean' : 'Pasión por el Océano',
      description: language === 'en'
        ? 'We don\'t just work here—we live for the ocean and want to share its wonders with you.'
        : 'No solo trabajamos aquí—vivimos por el océano y queremos compartir sus maravillas contigo.',
    },
    {
      icon: Users,
      title: language === 'en' ? 'Small Groups' : 'Grupos Pequeños',
      description: language === 'en'
        ? 'Boutique experiences with personalized attention. Never crowded, always memorable.'
        : 'Experiencias boutique con atención personalizada. Nunca abarrotados, siempre memorables.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isEN ? 'About DiveLife.mx - PADI 5-Star Dive Center | Playa del Carmen' : 'Sobre DiveLife.mx - Centro de Buceo PADI 5-Star | Playa del Carmen'}</title>
        <meta name="description" content={isEN ? 'Learn about DiveLife.mx, a PADI 5-Star dive center in Riviera Maya offering premium scuba diving, snorkeling, and sailing experiences with expert instructors and top safety standards.' : 'Conoce DiveLife.mx, un centro de buceo PADI 5-Star en Riviera Maya que ofrece experiencias premium de buceo, snorkel y navegación con instructores expertos y los más altos estándares de seguridad.'} />
        <meta property="og:title" content={isEN ? 'About DiveLife.mx - PADI 5-Star Dive Center' : 'Sobre DiveLife.mx - Centro de Buceo PADI 5-Star'} />
        <meta property="og:description" content={isEN ? 'Learn about our mission, values, and safety standards at DiveLife.mx' : 'Conoce nuestra misión, valores y estándares de seguridad en DiveLife.mx'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={heroDivingImg} />
        <link rel="canonical" href={`https://divelife.mx/${language === 'en' ? 'about' : 'sobre'}`} />
        {language === 'en' ? (
          <link rel="alternate" hrefLang="es" href="https://divelife.mx/sobre" />
        ) : (
          <link rel="alternate" hrefLang="en" href="https://divelife.mx/about" />
        )}
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroDivingImg}
              alt={isEN ? 'DiveLife divers underwater team hero image' : 'Equipo de buzos DiveLife bajo el agua, imagen hero'}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center text-white px-4">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-fade-in">
              {isEN ? 'PADI 5-Star Dive Center' : 'Centro de Buceo PADI 5-Star'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {isEN ? 'About DiveLife.mx' : 'Acerca de DiveLife.mx'}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              {isEN
                ? 'Premium ocean adventures with safety, professionalism, and passion for the Caribbean Sea'
                : 'Aventuras oceánicas premium con seguridad, profesionalismo y pasión por el Mar Caribe'}
            </p>
          </div>
        </section>

        {/* Story & Team Strip */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {isEN ? 'Our Story' : 'Nuestra Historia'}
            </h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground mb-12">
              <p>
                {isEN
                  ? 'DiveLife.mx was founded with a simple mission: to share the beauty and wonder of the Caribbean Sea and cenotes with travelers from around the world. Operating from two prestigious locations—Kanai complex and Grand Velas Riviera Maya—we offer boutique diving and ocean experiences that combine safety, professionalism, and genuine passion for the underwater world.'
                  : 'DiveLife.mx fue fundado con una misión simple: compartir la belleza y maravilla del Mar Caribe y los cenotes con viajeros de todo el mundo. Operando desde dos ubicaciones prestigiosas—el complejo Kanai y Grand Velas Riviera Maya—ofrecemos experiencias boutique de buceo y océano que combinan seguridad, profesionalismo y genuina pasión por el mundo submarino.'}
              </p>
              <p>
                {isEN
                  ? 'As a PADI 5-Star dive center, we maintain the highest standards of safety and instruction. Our team of certified instructors brings years of experience in Caribbean diving and cenote exploration, ensuring every guest—from first-time snorkelers to advanced divers—has an unforgettable and safe experience.'
                  : 'Como centro de buceo PADI 5-Star, mantenemos los más altos estándares de seguridad e instrucción. Nuestro equipo de instructores certificados aporta años de experiencia en buceo caribeño y exploración de cenotes, asegurando que cada huésped—desde snorkelers primerizos hasta buzos avanzados—tenga una experiencia inolvidable y segura.'}
              </p>
              <p>
                {isEN
                  ? 'We believe in small groups, personalized attention, and sustainable practices that protect the marine environments we love. Whether you\'re discovering scuba for the first time, sailing on a Hobie Cat, or exploring mystical cenotes, we\'re here to make your ocean dreams come true.'
                  : 'Creemos en grupos pequeños, atención personalizada y prácticas sustentables que protegen los ambientes marinos que amamos. Ya sea que estés descubriendo el buceo por primera vez, navegando en un Hobie Cat, o explorando cenotes místicos, estamos aquí para hacer realidad tus sueños oceánicos.'}
              </p>
            </div>

            {/* Team Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={briefingImg}
                  alt={isEN ? 'DiveLife team safety briefing on beach' : 'Equipo DiveLife dando briefing de seguridad en la playa'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={scubaDivingImg}
                  alt={isEN ? 'Professional dive instructor with guests' : 'Instructor de buceo profesional con huéspedes'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden ocean-shadow">
                <img
                  src={radioImg}
                  alt={isEN ? 'Safety equipment and emergency communications' : 'Equipo de seguridad y comunicaciones de emergencia'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Mission with Full-Bleed Image */}
            <div className="relative rounded-2xl overflow-hidden ocean-shadow">
              <img
                src={sunsetSurfaceImg}
                alt={isEN ? 'Divers surfacing at sunset, symbolizing DiveLife mission' : 'Buzos emergiendo al atardecer, simbolizando la misión DiveLife'}
                className="w-full h-[400px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                    <Heart className="h-6 w-6" />
                    {isEN ? 'Our Mission' : 'Nuestra Misión'}
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {isEN
                      ? 'To share the magic of the Caribbean Sea and cenotes through safe, personalized, and unforgettable ocean experiences. We are dedicated to preserving marine environments while creating lifelong memories for our guests.'
                      : 'Compartir la magia del Mar Caribe y los cenotes a través de experiencias oceánicas seguras, personalizadas e inolvidables. Estamos dedicados a preservar los ambientes marinos mientras creamos recuerdos para toda la vida para nuestros huéspedes.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {isEN ? 'Our Values' : 'Nuestros Valores'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full ocean-gradient">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Standards with Equipment Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">{isEN ? 'Safety First' : 'Seguridad Primero'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isEN ? 'Safety Standards' : 'Estándares de Seguridad'}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {isEN
                  ? 'Every aspect of our operation is designed with your safety as the top priority. From equipment maintenance to emergency protocols, we follow PADI 5-Star standards.'
                  : 'Cada aspecto de nuestra operación está diseñado con tu seguridad como máxima prioridad. Desde el mantenimiento del equipo hasta los protocolos de emergencia, seguimos los estándares PADI 5-Star.'}
              </p>
            </div>

            {/* Safety Equipment Grid 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="overflow-hidden hover:ocean-shadow smooth-transition">
                <div className="relative aspect-[4/3]">
                  <img
                    src={oxygenKitImg}
                    alt={isEN ? 'Professional oxygen kit and emergency equipment' : 'Kit de oxígeno profesional y equipo de emergencia'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{isEN ? 'Premium Equipment' : 'Equipo Premium'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEN ? 'Regularly maintained and inspected gear following manufacturer specifications' : 'Equipo mantenido e inspeccionado regularmente según especificaciones del fabricante'}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:ocean-shadow smooth-transition">
                <div className="relative aspect-[4/3]">
                  <img
                    src={gearCheckImg}
                    alt={isEN ? 'Scuba regulators and equipment inspection' : 'Reguladores de buceo e inspección de equipo'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{isEN ? 'Equipment Checks' : 'Revisión de Equipo'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEN ? 'Pre-dive safety inspections for every guest before each activity' : 'Inspecciones de seguridad pre-buceo para cada huésped antes de cada actividad'}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:ocean-shadow smooth-transition">
                <div className="relative aspect-[4/3]">
                  <img
                    src={radioImg}
                    alt={isEN ? 'Safety communications and emergency response radio' : 'Comunicaciones de seguridad y radio de respuesta a emergencias'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{isEN ? 'Emergency Communications' : 'Comunicaciones de Emergencia'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEN ? 'Always connected with emergency services and local medical facilities' : 'Siempre conectados con servicios de emergencia e instalaciones médicas locales'}
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:ocean-shadow smooth-transition">
                <div className="relative aspect-[4/3]">
                  <img
                    src={briefingImg}
                    alt={isEN ? 'Safety briefing before water activities' : 'Briefing de seguridad antes de actividades acuáticas'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{isEN ? 'Safety Briefings' : 'Briefings de Seguridad'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEN ? 'Comprehensive instructions and safety protocols before every activity' : 'Instrucciones completas y protocolos de seguridad antes de cada actividad'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beyond Diving Gallery */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {isEN ? 'Beyond Diving' : 'Más Allá del Buceo'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {isEN
                  ? 'While scuba diving is our passion, we offer a complete range of ocean experiences. From sailing to cenote exploration, every adventure is designed to connect you with the beauty of the Caribbean.'
                  : 'Aunque el buceo es nuestra pasión, ofrecemos una gama completa de experiencias oceánicas. Desde navegación hasta exploración de cenotes, cada aventura está diseñada para conectarte con la belleza del Caribe.'}
              </p>
            </div>

            {/* Experience Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={cenoteImg}
                  alt={isEN ? 'Cenote diving and snorkeling adventures' : 'Aventuras de buceo y snorkel en cenotes'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Cenote Adventures' : 'Aventuras en Cenotes'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={snorkelImg}
                  alt={isEN ? 'Reef snorkeling with tropical fish' : 'Snorkel en arrecife con peces tropicales'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Reef Snorkeling' : 'Snorkel en Arrecife'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={hobieCatImg}
                  alt={isEN ? 'Hobie Cat sailing experiences' : 'Experiencias de navegación en Hobie Cat'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Sailing Adventures' : 'Aventuras de Navegación'}</p>
                </div>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden ocean-shadow group">
                <img
                  src={seabobImg}
                  alt={isEN ? 'Seabob underwater exploration' : 'Exploración submarina con Seabob'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white font-semibold">{isEN ? 'Seabob Sessions' : 'Sesiones Seabob'}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {isEN
                  ? 'Ready to explore the Caribbean with us? Book your next adventure today.'
                  : '¿Listo para explorar el Caribe con nosotros? Reserva tu próxima aventura hoy.'}
              </p>
              <Button size="lg" className="ocean-gradient hover:ocean-glow" asChild>
                <a href="/experiences">{isEN ? 'Explore All Experiences' : 'Explorar Todas las Experiencias'}</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
