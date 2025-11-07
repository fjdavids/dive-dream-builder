import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Download, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { generateICS, downloadICS } from '@/lib/ics';
import { getSlotDuration } from '@/data/schedule';
import { toast } from 'sonner';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isEN = language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);

    // Get booking ID from sessionStorage or PayPal custom param
    const bookingId = sessionStorage.getItem('divelife_booking_id') || searchParams.get('custom')?.split('|')[4];
    
    if (!bookingId) {
      setLoading(false);
      return;
    }

    const confirmBooking = async () => {
      try {
        // Confirm booking and get details
        const { data, error } = await supabase.functions.invoke('bookings-confirm', {
          body: { bookingId }
        });

        if (error) throw error;

        if (data.ok && data.booking) {
          setBooking(data.booking);
          
          // Send emails
          const durationHours = getSlotDuration(data.booking.slug);
          const icsContent = generateICS({
            title: `DiveLife – ${data.booking.title}`,
            description: `Booking Code: ${data.booking.booking_code}\nGuests: ${data.booking.guests}\nWaiver: ${data.booking.waiver_url}`,
            location: 'DiveLife Playa del Carmen',
            startDate: data.booking.date,
            startTime: data.booking.time,
            durationHours,
            bookingCode: data.booking.booking_code
          });

          // Send emails via edge function
          supabase.functions.invoke('send-booking-emails', {
            body: {
              booking: data.booking,
              locale: data.booking.locale,
              icsContent
            }
          }).then(({ data: emailData, error: emailError }) => {
            if (emailError) {
              console.error('Email error:', emailError);
            } else {
              console.log('Emails sent:', emailData);
            }
          });

          // Clear booking ID from session
          sessionStorage.removeItem('divelife_booking_id');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        toast.error(isEN ? 'Error confirming booking' : 'Error al confirmar la reserva');
      } finally {
        setLoading(false);
      }
    };

    confirmBooking();
  }, [searchParams, isEN]);

  const handleDownloadICS = () => {
    if (!booking) return;

    const durationHours = getSlotDuration(booking.slug);
    const icsContent = generateICS({
      title: `DiveLife – ${booking.title}`,
      description: `Booking Code: ${booking.booking_code}\nGuests: ${booking.guests}\nWaiver: ${booking.waiver_url}`,
      location: 'DiveLife Playa del Carmen',
      startDate: booking.date,
      startTime: booking.time,
      durationHours,
      bookingCode: booking.booking_code
    });

    downloadICS(icsContent, `divelife-${booking.booking_code}.ics`);
  };

  const handleWhatsApp = () => {
    const whatsappNumber = '+5219841234567';
    const message = isEN
      ? `Hi! I just completed my booking (Code: ${booking?.booking_code}). Looking forward to the experience!`
      : `¡Hola! Acabo de completar mi reserva (Código: ${booking?.booking_code}). ¡Espero con ansias la experiencia!`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {isEN ? 'Confirming your booking...' : 'Confirmando tu reserva...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-8">
          <div className="ocean-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isEN ? 'Thank You!' : '¡Gracias!'}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {isEN 
              ? 'Your booking has been confirmed!' 
              : '¡Tu reserva ha sido confirmada!'}
          </p>
        </div>

        {booking ? (
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{booking.title}</h2>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {isEN ? 'Booking Code' : 'Código de Reserva'}
                  </p>
                  <p className="text-lg font-mono font-bold text-primary">{booking.booking_code}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Date' : 'Fecha'}</p>
                  <p className="font-semibold">{booking.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Time' : 'Hora'}</p>
                  <p className="font-semibold">{booking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Guests' : 'Personas'}</p>
                  <p className="font-semibold">{booking.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isEN ? 'Name' : 'Nombre'}</p>
                  <p className="font-semibold">{booking.customer_name}</p>
                </div>
              </div>

              {(booking.hotel || booking.room) && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">{isEN ? 'Accommodation' : 'Alojamiento'}</p>
                  <p className="font-semibold">
                    {booking.hotel}{booking.room && ` - ${isEN ? 'Room' : 'Habitación'} ${booking.room}`}
                  </p>
                </div>
              )}

              {booking.pre_notice_accepted && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✓ {isEN ? 'Pre-booking notice accepted' : 'Aviso previo aceptado'}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={handleDownloadICS} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                {isEN ? 'Add to Calendar' : 'Agregar al Calendario'}
              </Button>
              <Button onClick={handleWhatsApp} variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                {isEN ? 'Contact on WhatsApp' : 'Contactar por WhatsApp'}
              </Button>
            </div>

            {/* Email Notice */}
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                {isEN 
                  ? 'A confirmation email has been sent to'
                  : 'Se ha enviado un correo de confirmación a'}{' '}
                <span className="font-semibold">{booking.customer_email}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {isEN
                  ? 'Please check your spam folder if you don\'t see it in your inbox.'
                  : 'Por favor revisa tu carpeta de spam si no lo ves en tu bandeja de entrada.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              {isEN 
                ? 'Your payment has been processed. We\'ll contact you shortly at info@divelife.mx with all the details.' 
                : 'Tu pago ha sido procesado. Te contactaremos pronto a info@divelife.mx con todos los detalles.'}
            </p>
            <p className="text-xl font-semibold text-primary">
              <a href="mailto:info@divelife.mx" className="hover:underline">
                info@divelife.mx
              </a>
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild variant="outline">
            <Link to="/experiences">
              {isEN ? 'Browse More Experiences' : 'Ver Más Experiencias'}
            </Link>
          </Button>
          <Button asChild className="ocean-gradient">
            <Link to="/">
              {isEN ? 'Return Home' : 'Volver al Inicio'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
