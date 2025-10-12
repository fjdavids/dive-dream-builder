import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const orderId = searchParams.get('order');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-2xl text-center">
        <div className="ocean-gradient w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === 'en' ? 'Thank You!' : '¡Gracias!'}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          {language === 'en' 
            ? 'Your booking has been confirmed. We\'ll contact you shortly from info@divelife.mx with all the details.' 
            : 'Tu reserva ha sido confirmada. Te escribiremos a la brevedad desde info@divelife.mx con todos los detalles.'}
        </p>

        {orderId && (
          <div className="bg-muted p-4 rounded-lg mb-8 inline-block">
            <p className="text-sm text-muted-foreground mb-1">
              {language === 'en' ? 'Order ID' : 'ID de Pedido'}
            </p>
            <p className="font-mono font-semibold">{orderId}</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Please check your email for confirmation. If you have any questions, contact us at:' 
              : 'Por favor revisa tu correo electrónico para la confirmación. Si tienes alguna pregunta, contáctanos en:'}
          </p>
          
          <p className="text-xl font-semibold text-primary">
            <a href="mailto:info@divelife.mx" className="hover:underline">
              info@divelife.mx
            </a>
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Button asChild variant="outline">
              <Link to="/experiences">
                {language === 'en' ? 'Browse More Experiences' : 'Ver Más Experiencias'}
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
