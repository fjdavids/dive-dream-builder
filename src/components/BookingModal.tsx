import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Clock, Users, ExternalLink, MessageCircle } from 'lucide-react';
import { getSlotsForSlug, NIGHT_SNORKEL_NOTE, SMARTWAIVER_EN, SMARTWAIVER_ES, getSlotDuration } from '@/data/schedule';
import { buildPayPalLink } from '@/lib/paypal';
import { getPriceForSlug } from '@/data/prices';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  slug: string;
  title: string;
  locale: 'en' | 'es';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingModal({ slug, title, locale, open, onOpenChange }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<{ time: string; status: 'free' | 'taken' }[]>([]);
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [guests, setGuests] = useState('1');
  const [hotel, setHotel] = useState('');
  const [room, setRoom] = useState('');
  const [notes, setNotes] = useState('');
  const [waiverChecked, setWaiverChecked] = useState(false);

  const isEN = locale === 'en';

  // Reset when modal opens/closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedDate(undefined);
      setSelectedTime('');
      setAvailableSlots([]);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setGuests('1');
      setHotel('');
      setRoom('');
      setNotes('');
      setWaiverChecked(false);
    }
  }, [open]);

  // Fetch availability when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const { slots, requiresConfirmation: reqConf } = getSlotsForSlug(slug, dateStr);
    
    setRequiresConfirmation(reqConf);

    if (reqConf) {
      setAvailableSlots([]);
      return;
    }

    // Fetch availability from API
    const fetchAvailability = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('availability', {
          body: { slug, date: dateStr }
        });

        if (error) throw error;
        
        if (data?.slots) {
          setAvailableSlots(data.slots);
        } else {
          // Fallback to local slots
          setAvailableSlots(slots.map(time => ({ time, status: 'free' as const })));
        }
      } catch (err) {
        console.error('Availability error:', err);
        // Fallback to local slots
        setAvailableSlots(slots.map(time => ({ time, status: 'free' as const })));
      }
    };

    fetchAvailability();
  }, [selectedDate, slug]);

  const handleContinue = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && selectedTime) {
      setStep(3);
    }
  };

  const handleBookNow = async () => {
    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone) {
      toast.error(isEN ? 'Please fill all required fields' : 'Por favor completa todos los campos requeridos');
      return;
    }

    if (!waiverChecked) {
      toast.error(isEN ? 'Please acknowledge the waiver' : 'Por favor acepta el descargo de responsabilidad');
      return;
    }

    setLoading(true);

    try {
      const dateStr = selectedDate!.toISOString().split('T')[0];
      const waiverUrl = isEN ? SMARTWAIVER_EN : SMARTWAIVER_ES;

      // Create hold booking
      const { data, error } = await supabase.functions.invoke('bookings-hold', {
        body: {
          slug,
          title,
          date: dateStr,
          time: selectedTime,
          guests: parseInt(guests) || 1,
          customerName,
          customerEmail,
          customerPhone,
          hotel: hotel || null,
          room: room || null,
          notes: notes || null,
          locale,
          waiverChecked,
          waiverUrl
        }
      });

      if (error) throw error;

      if (!data.ok) {
        if (data.reason === 'taken') {
          toast.error(isEN ? 'This slot is no longer available' : 'Este horario ya no está disponible');
          // Refresh availability
          const dateStr = selectedDate!.toISOString().split('T')[0];
          const { data: availData } = await supabase.functions.invoke('availability', {
            body: { slug, date: dateStr }
          });
          if (availData?.slots) setAvailableSlots(availData.slots);
          return;
        }
        throw new Error(data.reason);
      }

      // Proceed to PayPal
      const amount = getPriceForSlug(slug);
      const paypalUrl = buildPayPalLink({
        business: 'info@divelife.mx',
        item_name: `${title} – ${dateStr} ${selectedTime}`,
        amount,
        currency_code: 'MXN',
        quantity: 1,
        custom: `${slug}|${dateStr}|${selectedTime}|${locale}|${data.bookingId}`
      });

      // Store booking ID in sessionStorage for thank you page
      sessionStorage.setItem('divelife_booking_id', data.bookingId);

      window.open(paypalUrl, '_blank', 'noopener,noreferrer');
      
      onOpenChange(false);

      // Track analytics
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'MXN',
          value: amount,
          items: [{ item_name: title, item_id: slug }]
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(isEN ? 'Booking failed. Please try again.' : 'Error en la reserva. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const whatsappNumber = '+5219841234567'; // Update with actual number
    const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const message = isEN
      ? `Hi! I'd like to book ${title} on ${dateStr}${selectedTime ? ` at ${selectedTime}` : ''}. My name is ${customerName || '[Your Name]'}.`
      : `¡Hola! Quiero reservar ${title} el ${dateStr}${selectedTime ? ` a las ${selectedTime}` : ''}. Mi nombre es ${customerName || '[Tu Nombre]'}.`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    onOpenChange(false);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEN ? 'Book Your Experience' : 'Reserva tu Experiencia'}
          </DialogTitle>
          <p className="text-muted-foreground">{title}</p>
        </DialogHeader>

        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4" />
                {isEN ? 'Select Date' : 'Selecciona la Fecha'}
              </Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < minDate || date > maxDate}
                className="rounded-md border pointer-events-auto"
              />
            </div>
            <Button 
              onClick={handleContinue} 
              disabled={!selectedDate}
              className="w-full ocean-gradient"
            >
              {isEN ? 'Continue' : 'Continuar'}
            </Button>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <div className="space-y-4">
            {requiresConfirmation ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{NIGHT_SNORKEL_NOTE[locale]}</p>
                </div>
                <Button onClick={handleWhatsApp} className="w-full" variant="default">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {isEN ? 'Contact on WhatsApp' : 'Contactar por WhatsApp'}
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    {isEN ? 'Select Time' : 'Selecciona la Hora'}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map(({ time, status }) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        disabled={status === 'taken'}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          selectedTime === time && 'ocean-gradient',
                          status === 'taken' && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        {time} {status === 'taken' && '(Full)'}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                    {isEN ? 'Back' : 'Atrás'}
                  </Button>
                  <Button onClick={handleContinue} disabled={!selectedTime} className="flex-1 ocean-gradient">
                    {isEN ? 'Continue' : 'Continuar'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 3: Customer Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{isEN ? 'Full Name' : 'Nombre Completo'} *</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{isEN ? 'Email' : 'Correo Electrónico'} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{isEN ? 'Phone/WhatsApp' : 'Teléfono/WhatsApp'} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {isEN ? 'Guests' : 'Personas'} *
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="hotel">{isEN ? 'Hotel' : 'Hotel'}</Label>
                <Input
                  id="hotel"
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="room">{isEN ? 'Room' : 'Habitación'}</Label>
                <Input
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">{isEN ? 'Notes' : 'Notas'}</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Waiver */}
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <ExternalLink className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="font-semibold">
                    {isEN ? 'Liability Waiver (Required)' : 'Descargo de Responsabilidad (Requerido)'}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isEN 
                      ? 'Please read and sign the waiver before booking.'
                      : 'Por favor lee y firma el descargo antes de reservar.'}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-2"
                    onClick={() => window.open(isEN ? SMARTWAIVER_EN : SMARTWAIVER_ES, '_blank')}
                  >
                    {isEN ? 'Open Waiver (New Tab)' : 'Abrir Descargo (Nueva Pestaña)'}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="waiver"
                  checked={waiverChecked}
                  onCheckedChange={(checked) => setWaiverChecked(checked === true)}
                />
                <Label htmlFor="waiver" className="text-sm cursor-pointer">
                  {isEN
                    ? 'I have read and signed the liability waiver'
                    : 'He leído y firmado el descargo de responsabilidad'}
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                {isEN ? 'Back' : 'Atrás'}
              </Button>
              <Button
                onClick={handleBookNow}
                disabled={loading || !waiverChecked || !customerName || !customerEmail || !customerPhone}
                className="flex-1 ocean-gradient font-semibold"
              >
                {loading ? (isEN ? 'Processing...' : 'Procesando...') : (isEN ? 'Pay with PayPal' : 'Pagar con PayPal')}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              {isEN
                ? 'You will be redirected to PayPal to complete your payment securely.'
                : 'Serás redirigido a PayPal para completar tu pago de forma segura.'}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
