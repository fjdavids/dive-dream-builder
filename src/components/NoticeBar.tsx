import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NoticeBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-3 px-4">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{t.notice.text}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded smooth-transition"
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
