import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface PayPalCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  description: string;
  experienceTitle: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalCheckout({ 
  open, 
  onOpenChange, 
  amount, 
  description,
  experienceTitle 
}: PayPalCheckoutProps) {
  const { language } = useLanguage();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !paypalRef.current || !window.paypal || amount === 'contact') return;

    // Clear previous buttons
    paypalRef.current.innerHTML = '';

    try {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          shape: 'pill',
          label: 'paypal',
          color: 'blue',
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { 
                value: amount, 
                currency_code: 'MXN' 
              },
              description: description,
              payee: { 
                email_address: 'info@divelife.mx' 
              }
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
              brand_name: 'DiveLife'
            }
          });
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            const order = await actions.order.capture();
            // Redirect to thank you page
            window.location.href = `/thank-you?order=${encodeURIComponent(order?.id || '')}`;
          } catch (err) {
            console.error('Error capturing order:', err);
            setError(language === 'en' 
              ? 'There was an error processing your payment. Please contact us at info@divelife.mx' 
              : 'Hubo un error al procesar tu pago. Por favor contáctanos en info@divelife.mx'
            );
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          setError(language === 'en' 
            ? 'There was an error with PayPal. Please try again or contact us at info@divelife.mx' 
            : 'Hubo un error con PayPal. Intenta nuevamente o contáctanos en info@divelife.mx'
          );
        }
      }).render(paypalRef.current);
    } catch (err) {
      console.error('Error rendering PayPal buttons:', err);
      setError(language === 'en' 
        ? 'Unable to load payment system. Please contact us directly at info@divelife.mx' 
        : 'No se pudo cargar el sistema de pago. Por favor contáctanos directamente en info@divelife.mx'
      );
    }
  }, [open, amount, description, language]);

  if (amount === 'contact') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {language === 'en' ? 'Complete Your Booking' : 'Completa tu Reserva'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{experienceTitle}</h3>
            <p className="text-2xl font-bold text-primary">${amount} MXN</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div ref={paypalRef} className="min-h-[200px]"></div>

          <p className="text-xs text-muted-foreground text-center">
            {language === 'en' 
              ? 'Secure payment processed by PayPal. Questions? Contact us at info@divelife.mx' 
              : 'Pago seguro procesado por PayPal. ¿Preguntas? Contáctanos en info@divelife.mx'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
