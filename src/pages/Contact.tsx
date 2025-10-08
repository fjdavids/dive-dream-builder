import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const WHATSAPP_LINK = "https://wa.me/+525513572569";
const EMAIL_CONTACT = "contacto@divelife.mx";
const PHONE = "+52 55 1357 2569";

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    preferredDate: '',
    message: '',
    guestType: 'internal',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.topic || formData.message.length < 20) {
      toast({
        title: language === 'en' ? 'Validation Error' : 'Error de Validación',
        description: language === 'en' 
          ? 'Please fill all required fields. Message must be at least 20 characters.'
          : 'Por favor completa todos los campos requeridos. El mensaje debe tener al menos 20 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: language === 'en' ? 'Invalid Email' : 'Email Inválido',
        description: language === 'en' ? 'Please enter a valid email address.' : 'Por favor ingresa un email válido.',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, this would send to an API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    toast({
      title: language === 'en' ? 'Message Sent!' : '¡Mensaje Enviado!',
      description: language === 'en' 
        ? 'We\'ll get back to you soon.'
        : 'Te responderemos pronto.',
    });
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Hi DiveLife, I'm ${formData.name}. Topic: ${formData.topic}. ${formData.preferredDate ? `Preferred date: ${formData.preferredDate}. ` : ''}Message: ${formData.message}`
    );
    return `${WHATSAPP_LINK}?text=${message}`;
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-[80vh]">
        <section className="py-16 md:py-24 flex-1 flex items-center justify-center">
          <div className="container max-w-2xl text-center space-y-6">
            <div className="inline-flex p-6 rounded-full ocean-gradient mb-4">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {language === 'en' ? 'Message Sent!' : '¡Mensaje Enviado!'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'en' 
                ? 'Thank you for contacting DiveLife. We\'ll respond within 24 hours.'
                : 'Gracias por contactar a DiveLife. Responderemos en 24 horas.'}
            </p>
            <div className="pt-6">
              <p className="mb-4 font-medium">
                {language === 'en' ? 'Prefer WhatsApp?' : '¿Prefieres WhatsApp?'}
              </p>
              <Button size="lg" className="ocean-gradient" asChild>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2" />
                  {language === 'en' ? 'Continue on WhatsApp' : 'Continuar en WhatsApp'}
                </a>
              </Button>
            </div>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              {language === 'en' ? 'Send Another Message' : 'Enviar Otro Mensaje'}
            </Button>
          </div>
        </section>
      </div>
    );
  }

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
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'en' ? 'Name' : 'Nombre'} *
                      </Label>
                      <Input 
                        id="name" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'en' ? 'Phone (with country code)' : 'Teléfono (con código de país)'} *
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      required 
                      placeholder="+52 555 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      maxLength={20}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">
                      {language === 'en' ? 'Topic' : 'Tema'} *
                    </Label>
                    <Select value={formData.topic} onValueChange={(value) => setFormData({ ...formData, topic: value })}>
                      <SelectTrigger id="topic">
                        <SelectValue placeholder={language === 'en' ? 'Select a topic' : 'Selecciona un tema'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bookings">{language === 'en' ? 'Bookings' : 'Reservas'}</SelectItem>
                        <SelectItem value="groups">{language === 'en' ? 'Groups/Private' : 'Grupos/Privados'}</SelectItem>
                        <SelectItem value="media">{language === 'en' ? 'Media/Collabs' : 'Media/Colaboraciones'}</SelectItem>
                        <SelectItem value="other">{language === 'en' ? 'Other' : 'Otro'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestType">
                      {language === 'en' ? 'Guest Type' : 'Tipo de Huésped'}
                    </Label>
                    <Select value={formData.guestType} onValueChange={(value) => setFormData({ ...formData, guestType: value })}>
                      <SelectTrigger id="guestType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">
                          {language === 'en' ? 'Kanai/Grand Velas Guest' : 'Huésped Kanai/Grand Velas'}
                        </SelectItem>
                        <SelectItem value="external">
                          {language === 'en' ? 'External Guest' : 'Huésped Externo'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.guestType === 'external' && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {language === 'en' 
                          ? 'Availability on request. Pick-up available in Playa del Carmen & nearby areas.'
                          : 'Disponibilidad bajo solicitud. Pick-up disponible en Playa del Carmen y áreas cercanas.'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">
                      {language === 'en' ? 'Preferred Date/Time (Optional)' : 'Fecha/Hora Preferida (Opcional)'}
                    </Label>
                    <Input 
                      id="preferredDate" 
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {language === 'en' ? 'Message' : 'Mensaje'} * (min 20 characters)
                    </Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      minLength={20}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.message.length}/1000
                    </p>
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
