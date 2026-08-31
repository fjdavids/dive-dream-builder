import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP_LINK = "https://wa.me/+525513572569";
const IG_URL = "https://www.instagram.com/divelife.mx/";
const FB_URL = "https://www.facebook.com/divelife.mx";
const EMAIL_CONTACT = "info@divelife.mx";
const PHONE = "+52 55 1357 2569";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="surface-ocean">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl tracking-tight">DIVELIFE.MX</h3>
            <p className="text-sm text-ivory/70">
              {t.footer.padi}
            </p>
            <p className="text-sm text-ivory/70">
              {t.footer.address}<br />
              {t.footer.addressSub}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="eyebrow">{t.footer.contact}</h4>
            <div className="space-y-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-ivory smooth-transition"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-ivory smooth-transition"
              >
                <MessageCircle className="h-4 w-4" />
                {t.footer.whatsapp}
              </a>
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className="flex items-center gap-2 text-sm text-ivory/80 hover:text-ivory smooth-transition"
              >
                <Mail className="h-4 w-4" />
                {EMAIL_CONTACT}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="eyebrow">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/experiences" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.nav.experiences}
              </Link>
              <Link to="/location" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.nav.location}
              </Link>
              <Link to="/about" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.nav.about}
              </Link>
              <Link to="/faqs" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.nav.faqs}
              </Link>
              <Link to="/contact" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Policies & Social */}
          <div className="space-y-4">
            <h4 className="eyebrow">{t.footer.policies}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/cancellation-policy" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.footer.cancellation}
              </Link>
              <Link to="/terms-conditions" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.footer.terms}
              </Link>
              <Link to="/privacy-policy" className="text-sm text-ivory/80 hover:text-ivory smooth-transition">
                {t.footer.privacy}
              </Link>
            </nav>
            
            <div className="pt-4">
              <h4 className="eyebrow mb-3">{t.footer.social}</h4>
              <div className="flex gap-3">
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-sm border border-ivory/25 text-ivory/85 hover:border-ivory hover:text-ivory smooth-transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-sm border border-ivory/25 text-ivory/85 hover:border-ivory hover:text-ivory smooth-transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/15 text-sm text-ivory/60">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
