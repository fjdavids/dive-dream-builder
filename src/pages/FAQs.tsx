import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const FAQ_ITEMS = {
  en: [
    { q: 'How do I book an experience?', a: 'Choose an experience and send your preferred date and participant details. We’ll confirm availability and send a quote. Complete any required payment, then receive your booking confirmation.' },
    { q: 'Does submitting a request confirm my booking?', a: 'No. A request lets our team check availability and prepare your proposal. Your booking is confirmed only when DiveLife sends the booking confirmation.' },
    { q: 'When do I pay?', a: 'After we confirm availability and send the price and conditions. Your quote will state the payment required to confirm the booking. Complimentary pool demonstrations do not require payment.' },
    { q: 'Can I join if I’m staying at another hotel?', a: 'External guests may join subject to availability and access arrangements. Tell us your accommodation so we can confirm the meeting point and any transport options.' },
    { q: 'What happens if weather affects the activity?', a: 'If DiveLife cancels because of weather, port restrictions or safety, you may reschedule or receive a full refund for the cancelled service. Review the cancellation policy and any special conditions in your quote.' },
    { q: 'Can children participate?', a: 'Participation depends on the activity, age and applicable requirements. Include each child’s age so we can confirm the appropriate option before booking.' },
  ],
  es: [
    { q: '¿Cómo reservo una experiencia?', a: 'Elige una experiencia y envía tu fecha preferida y los datos de los participantes. Confirmaremos disponibilidad y enviaremos una cotización. Realiza el pago requerido, cuando corresponda, y recibe la confirmación de tu reserva.' },
    { q: '¿Enviar una solicitud confirma mi reserva?', a: 'No. La solicitud permite revisar disponibilidad y preparar tu propuesta. La reserva queda confirmada cuando DiveLife envía la confirmación de reserva.' },
    { q: '¿Cuándo debo pagar?', a: 'Después de confirmar disponibilidad y enviarte precio y condiciones. La cotización indicará el pago necesario para confirmar. Las demostraciones gratuitas en piscina no requieren pago.' },
    { q: '¿Puedo participar si estoy en otro hotel?', a: 'Los huéspedes externos pueden participar según disponibilidad y condiciones de acceso. Indícanos tu alojamiento para confirmar el punto de encuentro y las opciones de transporte.' },
    { q: '¿Qué ocurre si el clima afecta la actividad?', a: 'Si DiveLife cancela por clima, restricciones de puerto o seguridad, podrás reprogramar o recibir el reembolso completo del servicio cancelado. Consulta la política de cancelación y las condiciones especiales de tu cotización.' },
    { q: '¿Pueden participar niños?', a: 'La participación depende de la actividad, edad y requisitos aplicables. Incluye la edad de cada menor para confirmar la opción adecuada antes de reservar.' },
  ],
};

export default function FAQs() {
  const { language } = useLanguage();
  const title = language === 'en' ? 'Frequently Asked Questions' : 'Preguntas frecuentes';
  const items = FAQ_ITEMS[language];
  return (
    <div className="flex flex-col">
      <SEO
        title={`${title} | DiveLife`}
        description={items[0].a}
        path="/faqs"
        locale={language}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
        }}
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="mb-10 font-serif text-4xl font-normal md:text-5xl">{title}</h1>
          <Accordion type="single" collapsible>
            {items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 flex flex-wrap gap-6">
            <Button asChild>
              <Link to={`/availability?lang=${language}`}>{language === 'en' ? 'Check Availability' : 'Consultar disponibilidad'}</Link>
            </Button>
            <Link className="link-editorial" to="/cancellation-policy">
              {language === 'en' ? 'Cancellation Policy' : 'Política de cancelación'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
