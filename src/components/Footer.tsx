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
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">DIVELIFE.MX</h3>
            <p className="text-sm text-muted-foreground">
              {t.footer.padi}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.footer.address}<br />
              {t.footer.addressSub}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold">{t.footer.contact}</h4>
            <div className="space-y-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2 text-sm hover:text-primary smooth-transition"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary smooth-transition"
              >
                <MessageCircle className="h-4 w-4" />
                {t.footer.whatsapp}
              </a>
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className="flex items-center gap-2 text-sm hover:text-primary smooth-transition"
              >
                <Mail className="h-4 w-4" />
                {EMAIL_CONTACT}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/experiences" className="text-sm hover:text-primary smooth-transition">
                {t.nav.experiences}
              </Link>
              <Link to="/location" className="text-sm hover:text-primary smooth-transition">
                {t.nav.location}
              </Link>
              <Link to="/about" className="text-sm hover:text-primary smooth-transition">
                {t.nav.about}
              </Link>
              <Link to="/faqs" className="text-sm hover:text-primary smooth-transition">
                {t.nav.faqs}
              </Link>
              <Link to="/contact" className="text-sm hover:text-primary smooth-transition">
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Policies & Social */}
          <div className="space-y-4">
            <h4 className="font-bold">{t.footer.policies}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/policies/cancellation" className="text-sm hover:text-primary smooth-transition">
                {t.footer.cancellation}
              </Link>
              <Link to="/policies/terms" className="text-sm hover:text-primary smooth-transition">
                {t.footer.terms}
              </Link>
              <Link to="/policies/privacy" className="text-sm hover:text-primary smooth-transition">
                {t.footer.privacy}
              </Link>
            </nav>
            
            <div className="pt-4">
              <h4 className="font-bold mb-3">{t.footer.social}</h4>
              <div className="flex gap-3">
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground smooth-transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground smooth-transition"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
