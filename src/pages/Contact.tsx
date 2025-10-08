import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const WHATSAPP_LINK = "https://wa.me/+525513572569";
const EMAIL_CONTACT = "contacto@divelife.mx";
const PHONE = "+52 55 1357 2569";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 ocean-gradient text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'en' ? 'Get in Touch' : 'Contáctanos'}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Questions about our experiences? Need help with your booking? We\'re here to help!'
              : '¿Preguntas sobre nuestras experiencias? ¿Necesitas ayuda con tu reserva? ¡Estamos aquí para ayudar!'}
          </p>
        </div>
      </section>

      {/* Contact Options & Form */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* WhatsApp */}
            <Card className="hover:ocean-shadow smooth-transition">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full ocean-gradient">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">WhatsApp</h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'en' ? 'Quick responses, 24/7' : 'Respuestas rápidas, 24/7'}
                </p>
                <Button className="w-full ocean-gradient" asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    {language === 'en' ? 'Chat Now' : 'Chatear Ahora'}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="hover:ocean-shadow smooth-transition">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full ocean-gradient">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {language === 'en' ? 'Phone' : 'Teléfono'}
                </h3>
                <p className="text-muted-foreground text-sm">{PHONE}</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${PHONE}`}>
                    {language === 'en' ? 'Call Us' : 'Llamar'}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:ocean-shadow smooth-transition">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full ocean-gradient">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-muted-foreground text-sm">{EMAIL_CONTACT}</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${EMAIL_CONTACT}`}>
                    {language === 'en' ? 'Send Email' : 'Enviar Email'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'en' ? 'Send us a Message' : 'Envíanos un Mensaje'}
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'en' ? 'Name' : 'Nombre'}
                      </Label>
                      <Input id="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {language === 'en' ? 'Subject' : 'Asunto'}
                    </Label>
                    <Input id="subject" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'en' ? 'Message' : 'Mensaje'}
                    </Label>
                    <Textarea id="message" rows={6} required />
                  </div>

                  <Button type="submit" size="lg" className="w-full ocean-gradient">
                    {language === 'en' ? 'Send Message' : 'Enviar Mensaje'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Location Info */}
          <div className="mt-16 text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>
                {language === 'en'
                  ? 'Playa del Carmen, Quintana Roo — Inside Kanai & Grand Velas'
                  : 'Playa del Carmen, Quintana Roo — Dentro de Kanai & Grand Velas'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
