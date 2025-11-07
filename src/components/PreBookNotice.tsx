import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Global gtag type
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const WHATSAPP_NUMBER = "+525513572569";

interface PreBookNoticeProps {
  locale: 'en' | 'es';
  title?: string;
  selected?: {
    slug: string;
    title: string;
    date?: string;
    time?: string;
  };
  onAcknowledgeChange: (checked: boolean) => void;
}

const translations = {
  en: {
    title: "Important: contact us before booking",
    body: "Last-minute bookings and weather conditions may force us to cancel or reschedule your experience (date/time) without prior notice. Please contact us on WhatsApp to confirm availability and sea conditions before paying.",
    cta: "Contact on WhatsApp",
    accept: "I understand and agree that weather or operational conditions may force a reschedule/cancellation.",
  },
  es: {
    title: "Importante: contáctanos antes de reservar",
    body: "Las reservas de último minuto y las condiciones del clima pueden forzarnos a cancelar o reprogramar tu experiencia (fecha/horario) sin previo aviso. Por favor contáctanos por WhatsApp para confirmar disponibilidad y condiciones del mar antes de pagar.",
    cta: "Contactar por WhatsApp",
    accept: "Entiendo y acepto que el clima o condiciones operativas pueden requerir reprogramación/cancelación.",
  },
};

export default function PreBookNotice({ locale, title, selected, onAcknowledgeChange }: PreBookNoticeProps) {
  const [checked, setChecked] = useState(false);
  const t = translations[locale];

  const handleCheckChange = (newChecked: boolean) => {
    setChecked(newChecked);
    onAcknowledgeChange(newChecked);
    
    // Analytics
    if (newChecked && window.gtag) {
      window.gtag('event', 'pre_notice_ack', {
        slug: selected?.slug || 'unknown',
        locale: locale,
      });
    }
  };

  const handleWhatsAppClick = () => {
    const experienceTitle = selected?.title || title || 'experience';
    const dateStr = selected?.date ? ` on ${selected.date}` : '';
    const timeStr = selected?.time ? ` at ${selected.time}` : '';
    
    const message = locale === 'en'
      ? `Hi! I'd like to book ${experienceTitle}${dateStr}${timeStr}. Can you confirm availability and conditions?`
      : `¡Hola! Quiero reservar ${experienceTitle}${dateStr}${timeStr}. ¿Pueden confirmar disponibilidad y condiciones?`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Analytics
    if (window.gtag) {
      window.gtag('event', 'pre_notice_whatsapp_click', {
        slug: selected?.slug || 'unknown',
        locale: locale,
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
            {t.title}
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
            {t.body}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppClick}
            className="mb-3 border-amber-600 text-amber-900 hover:bg-amber-100 dark:text-amber-100 dark:hover:bg-amber-900/30"
            aria-label={t.cta}
          >
            {t.cta}
          </Button>
          <div className="flex items-start gap-2">
            <Checkbox
              id="pre-notice-accept"
              checked={checked}
              onCheckedChange={handleCheckChange}
              aria-describedby="pre-notice-text"
            />
            <label
              htmlFor="pre-notice-accept"
              id="pre-notice-text"
              className="text-sm text-amber-900 dark:text-amber-100 cursor-pointer leading-tight"
            >
              {t.accept}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
