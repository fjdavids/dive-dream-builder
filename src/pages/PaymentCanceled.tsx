import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PaymentCanceled() {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-2xl text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-destructive/10">
          <XCircle className="w-12 h-12 text-destructive" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === 'en' ? 'Payment Canceled' : 'Pago Cancelado'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {language === 'en' 
            ? 'Your payment was canceled. You can try again or contact us for assistance.' 
            : 'Tu pago fue cancelado. Puedes intentar de nuevo o contactarnos para asistencia.'}
        </p>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Need help? Contact us at:' 
              : '¿Necesitas ayuda? Contáctanos en:'}
          </p>
          
          <p className="text-xl font-semibold text-primary">
            <a href="mailto:info@divelife.mx" className="hover:underline">
              info@divelife.mx
            </a>
          </p>

          <p className="text-muted-foreground">
            {language === 'en' ? 'Or message us on WhatsApp:' : 'O escríbenos por WhatsApp:'}
          </p>

          <Button asChild variant="outline" className="mb-4">
            <a 
              href="https://wa.me/529842541695" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {language === 'en' ? 'WhatsApp Us' : 'WhatsApp'}
            </a>
          </Button>

          <div className="flex gap-4 justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/experiences">
                {language === 'en' ? 'Browse Experiences' : 'Ver Experiencias'}
              </Link>
            </Button>
            <Button asChild className="ocean-gradient">
              <Link to="/">
                {language === 'en' ? 'Return Home' : 'Volver al Inicio'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
