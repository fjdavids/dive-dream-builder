import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';

const POLICY = {
  en: {
    title: 'Cancellation Policy',
    blocks: [
      { h: 'Standard bookings', p: [
        'Cancel 48 hours or more before the confirmed start time for a full refund.',
        'Cancel between 24 hours and less than 48 hours before the confirmed start time for a 50% refund.',
        'Cancellations less than 24 hours before the confirmed start time and no-shows are non-refundable.',
        'If DiveLife cancels your activity because of weather, port restrictions or safety conditions, you may reschedule or receive a full refund for the cancelled service.',
      ] },
      { h: 'Private charters and services with special conditions', p: [
        'Any different cancellation or payment conditions will be stated in your quote before payment.',
        'Cancellation deadlines use the local time in Playa del Carmen.',
        'Existing bookings retain the conditions accepted when they were made.',
        'To request a cancellation, contact info@divelife.mx or +52 55 1357 2569 and include your booking reference.',
      ] },
    ],
  },
  es: {
    title: 'Política de cancelación',
    blocks: [
      { h: 'Reservas estándar', p: [
        'Las cancelaciones realizadas con 48 horas o más de anticipación al inicio confirmado tienen un reembolso del 100 %.',
        'Las cancelaciones realizadas desde 24 horas hasta menos de 48 horas antes del inicio confirmado tienen un reembolso del 50 %.',
        'Las cancelaciones con menos de 24 horas de anticipación y las ausencias no tienen reembolso.',
        'Si DiveLife cancela la actividad por clima, restricciones de puerto o condiciones de seguridad, podrás reprogramar o recibir el reembolso completo del servicio cancelado.',
      ] },
      { h: 'Charters privados y servicios con condiciones especiales', p: [
        'Cualquier condición diferente de cancelación o pago se indicará en tu cotización antes del pago.',
        'Los plazos de cancelación se calculan con la hora local de Playa del Carmen.',
        'Las reservas existentes conservan las condiciones aceptadas al contratar.',
        'Para solicitar una cancelación, contacta a info@divelife.mx o al +52 55 1357 2569 e incluye tu referencia de reserva.',
      ] },
    ],
  },
};

export default function CancellationPolicy() {
  const { language } = useLanguage();
  const c = POLICY[language];
  return (
    <div className="flex flex-col">
      <SEO title={`${c.title} | DiveLife`} description={c.blocks[0].p[0]} path="/cancellation-policy" locale={language} />
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h1 className="mb-10 font-serif text-4xl font-normal md:text-5xl">{c.title}</h1>
          {c.blocks.map((b) => (
            <div key={b.h} className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-normal">{b.h}</h2>
              {b.p.map((p) => (
                <p key={p} className="mb-4 text-muted-foreground">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
