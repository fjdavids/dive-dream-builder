import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface DiveLifeMapProps {
  height?: string;
  zoom?: number;
}

export default function DiveLifeMap({ height = '500px', zoom = 13 }: DiveLifeMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const locations = [
    {
      name: language === 'en' ? 'Kanai Complex' : 'Complejo Kanai',
      description: language === 'en' 
        ? 'DiveLife operates inside Kanai — Direct access for residents'
        : 'DiveLife opera dentro de Kanai — Acceso directo para residentes',
      coords: [20.6296, -87.0739] as [number, number], // Approximate Kanai location
      googleMapsUrl: 'https://maps.google.com/?q=20.6296,-87.0739',
    },
    {
      name: language === 'en' ? 'Grand Velas Riviera Maya' : 'Grand Velas Riviera Maya',
      description: language === 'en'
        ? 'DiveLife operates inside Grand Velas — On-site for guests'
        : 'DiveLife opera dentro de Grand Velas — En el lugar para huéspedes',
      coords: [20.6878, -87.0472] as [number, number], // Grand Velas location
      googleMapsUrl: 'https://maps.google.com/?q=20.6878,-87.0472',
    },
    {
      name: language === 'en' ? 'Playa del Carmen' : 'Playa del Carmen',
      description: language === 'en'
        ? 'External guest pick-up area — Available on request'
        : 'Área de pick-up para huéspedes externos — Disponible bajo solicitud',
      coords: [20.6270, -87.0739] as [number, number], // Playa del Carmen center
      googleMapsUrl: 'https://maps.google.com/?q=20.6270,-87.0739',
    },
  ];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current).setView([20.6500, -87.0600], zoom);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers
    locations.forEach((location) => {
      const marker = L.marker(location.coords).addTo(map);
      
      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold mb-1">${location.name}</h3>
          <p class="text-sm text-muted-foreground mb-2">${location.description}</p>
          <a 
            href="${location.googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            ${language === 'en' ? 'Open in Google Maps' : 'Abrir en Google Maps'}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    // Fit bounds to show all markers
    const bounds = L.latLngBounds(locations.map(loc => loc.coords));
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [language, zoom]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden ocean-shadow">
      <div ref={containerRef} style={{ height, width: '100%' }} />
      {!mapRef.current && (
        <div 
          style={{ height }} 
          className="flex items-center justify-center bg-muted"
        >
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? 'Loading map...' : 'Cargando mapa...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
