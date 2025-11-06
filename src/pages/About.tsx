import { Shield, Award, Heart, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';

const ASSET_VER = "20251106b";

export default function About() {
  const { language } = useLanguage();

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
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`/images/experiences/hero-diving.jpg?v=${ASSET_VER}`}
            alt="DiveLife team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        </div>

        <div className="relative z-10 container text-center text-white px-4">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {language === 'en' ? 'PADI 5-Star Dive Center' : 'Centro de Buceo PADI 5-Star'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'en' ? 'About DiveLife.mx' : 'Acerca de DiveLife.mx'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Premium ocean adventures with safety, professionalism, and passion for the Caribbean Sea'
              : 'Aventuras oceánicas premium con seguridad, profesionalismo y pasión por el Mar Caribe'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === 'en' ? 'Our Story' : 'Nuestra Historia'}
          </h2>
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              {language === 'en'
                ? 'DiveLife.mx was founded with a simple mission: to share the beauty and wonder of the Caribbean Sea and cenotes with travelers from around the world. Operating from two prestigious locations—Kanai complex and Grand Velas Riviera Maya—we offer boutique diving and ocean experiences that combine safety, professionalism, and genuine passion for the underwater world.'
                : 'DiveLife.mx fue fundado con una misión simple: compartir la belleza y maravilla del Mar Caribe y los cenotes con viajeros de todo el mundo. Operando desde dos ubicaciones prestigiosas—el complejo Kanai y Grand Velas Riviera Maya—ofrecemos experiencias boutique de buceo y océano que combinan seguridad, profesionalismo y genuina pasión por el mundo submarino.'}
            </p>
            <p>
              {language === 'en'
                ? 'As a PADI 5-Star dive center, we maintain the highest standards of safety and instruction. Our team of certified instructors brings years of experience in Caribbean diving and cenote exploration, ensuring every guest—from first-time snorkelers to advanced divers—has an unforgettable and safe experience.'
                : 'Como centro de buceo PADI 5-Star, mantenemos los más altos estándares de seguridad e instrucción. Nuestro equipo de instructores certificados aporta años de experiencia en buceo caribeño y exploración de cenotes, asegurando que cada huésped—desde snorkelers primerizos hasta buzos avanzados—tenga una experiencia inolvidable y segura.'}
            </p>
            <p>
              {language === 'en'
                ? 'We believe in small groups, personalized attention, and sustainable practices that protect the marine environments we love. Whether you\'re discovering scuba for the first time, sailing on a Hobie Cat, or exploring mystical cenotes, we\'re here to make your ocean dreams come true.'
                : 'Creemos en grupos pequeños, atención personalizada y prácticas sustentables que protegen los ambientes marinos que amamos. Ya sea que estés descubriendo el buceo por primera vez, navegando en un Hobie Cat, o explorando cenotes místicos, estamos aquí para hacer realidad tus sueños oceánicos.'}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {language === 'en' ? 'Our Values' : 'Nuestros Valores'}
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

      {/* Safety Standards */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === 'en' ? 'Safety Standards' : 'Estándares de Seguridad'}
          </h2>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border bg-card">
              <h3 className="text-lg font-bold mb-2">
                {language === 'en' ? 'PADI Certified' : 'Certificado PADI'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'All our instructors are PADI certified and undergo continuous training to maintain the highest standards.'
                  : 'Todos nuestros instructores están certificados PADI y reciben capacitación continua para mantener los más altos estándares.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card">
              <h3 className="text-lg font-bold mb-2">
                {language === 'en' ? 'Equipment Standards' : 'Estándares de Equipo'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Premium gear that is regularly inspected, serviced, and replaced according to manufacturer specifications.'
                  : 'Equipo premium que es inspeccionado, revisado y reemplazado regularmente según especificaciones del fabricante.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card">
              <h3 className="text-lg font-bold mb-2">
                {language === 'en' ? 'Weather Protocols' : 'Protocolos de Clima'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'We monitor weather conditions constantly and will reschedule activities if conditions are not optimal for safety.'
                  : 'Monitoreamos las condiciones climáticas constantemente y reprogramaremos actividades si las condiciones no son óptimas para la seguridad.'}
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-card">
              <h3 className="text-lg font-bold mb-2">
                {language === 'en' ? 'Emergency Procedures' : 'Procedimientos de Emergencia'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Comprehensive emergency action plans, oxygen equipment on all boats, and direct communication with local medical facilities.'
                  : 'Planes de acción de emergencia completos, equipo de oxígeno en todos los botes y comunicación directa con instalaciones médicas locales.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
