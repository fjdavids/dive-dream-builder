import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/+525513572569";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full ocean-gradient text-white shadow-lg ocean-shadow hover:ocean-glow smooth-transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
