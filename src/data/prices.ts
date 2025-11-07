// Price mapping for all experiences in MXN
export const PRICE_MAP: Record<string, number> = {
  'reef-snorkel': 1800,
  'tres-rios-snorkel': 2500,
  'night-snorkel': 2500,
  'discover-scuba': 5000,
  'local-dive': 3000,
  'padi-scuba-diver': 13000,
  'padi-open-water': 18000,
  'scuba-kids': 1800,
  'pool-demo': 0,
  'hobie-sailing': 4300,
  'hobie-sailing-snorkel': 5500,
  'sailing-lessons': 3100,
  'luxury-catamaran': 8700,
  'jetski-tour': 1700,
  'seabob-session': 1700,
  'surface-supply': 1200,
  'cenote-dive': 14000,
  'cenote-family-snorkel': 13000,
  'manatee-snorkel': 13000,
  'paddleboard-ojo-agua': 600,
  'mexican-panga-fishing': 18000
};

export function getPriceForSlug(slug: string): number {
  if (PRICE_MAP[slug]) return PRICE_MAP[slug];
  
  // Try to parse from DOM if available
  const el = document.querySelector(`[data-exp-price="${slug}"]`) as HTMLElement | null;
  if (el?.dataset.amount) {
    const parsed = Number(el.dataset.amount);
    if (!isNaN(parsed)) return parsed;
  }
  
  // Final fallback
  throw new Error(`Missing price for ${slug}`);
}
