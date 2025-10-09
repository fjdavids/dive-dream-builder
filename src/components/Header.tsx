import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const WHATSAPP_LINK = "https://wa.me/+525513572569";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/experiences', label: t.nav.experiences },
    { path: '/location', label: t.nav.location },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/divelife-logo.png" 
            alt="DiveLife – PADI 5-Star Dive Center" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium smooth-transition hover:text-primary",
                isActive(link.path) ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 border rounded-full p-1">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium smooth-transition",
                language === 'en' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium smooth-transition",
                language === 'es' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              ES
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>

          <Button 
            size="sm" 
            className="ocean-gradient"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
          >
            {t.nav.bookNow}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-lg smooth-transition",
                  isActive(link.path) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-2 px-4 py-2">
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  "flex-1 px-3 py-2 rounded-lg text-sm font-medium smooth-transition",
                  language === 'en' ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={cn(
                  "flex-1 px-3 py-2 rounded-lg text-sm font-medium smooth-transition",
                  language === 'es' ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                Español
              </button>
            </div>

            <Button variant="outline" asChild className="gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>

            <Button 
              className="ocean-gradient"
              onClick={() => {
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }, 100);
              }}
            >
              {t.nav.bookNow}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
