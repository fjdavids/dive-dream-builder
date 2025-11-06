import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/allExperiences';
import { Button } from '@/components/ui/button';

const ASSET_VER = "20251106b";

const categories = [
  { id: 'all', label: { en: 'All Experiences', es: 'Todas las Experiencias' } },
  { id: 'snorkeling', label: { en: 'Snorkeling', es: 'Snorkel' } },
  { id: 'diving', label: { en: 'Diving', es: 'Buceo' } },
  { id: 'sailing', label: { en: 'Sailing', es: 'Navegación' } },
  { id: 'pool', label: { en: 'Pool Activities', es: 'Actividades en Piscina' } },
  { id: 'trips', label: { en: 'Special Trips', es: 'Viajes Especiales' } },
];

export default function Experiences() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredExperiences = selectedCategory === 'all'
    ? experiences
    : experiences.filter(exp => exp.category === selectedCategory);

  // Unique image mapping per experience slug (no duplicates)
  const imageMap: Record<string, string> = {
    'reef-snorkel': `/images/experiences/reef-snorkel-divelife.jpg?v=${ASSET_VER}`,
    'tres-rios': `/images/experiences/tres-rios-snorkel-divelife.jpg?v=${ASSET_VER}`,
    'night-snorkel': `/images/experiences/night-snorkel-divelife.jpg?v=${ASSET_VER}`,
    'discover-scuba-diving': `/images/experiences/dsd-discover-scuba-diver.jpg?v=${ASSET_VER}`,
    'local-dive': `/images/experiences/local-dive-divelife.jpg?v=${ASSET_VER}`,
    'scuba-diver': `/images/experiences/padi-scuba-diver-divelife.jpg?v=${ASSET_VER}`,
    'open-water': `/images/experiences/padi-open-water-divelife.jpg?v=${ASSET_VER}`,
    'scuba-kids': `/images/experiences/scuba-kids-divelife.jpg?v=${ASSET_VER}`,
    'hobie-sailing': `/images/experiences/hobie-sailing-divelife.jpg?v=${ASSET_VER}`,
    'hobie-sailing-snorkel': `/images/experiences/hobie-sailing-snorkel-divelife.jpg?v=${ASSET_VER}`,
    'sailing-lessons': `/images/experiences/sailing-lessons-divelife.jpg?v=${ASSET_VER}`,
    'luxury-sailing': `/images/experiences/luxury-sailing-catamaran.jpg?v=${ASSET_VER}`,
    'jet-ski': `/images/experiences/jetski-divelife.jpg?v=${ASSET_VER}`,
    'seabob': `/images/experiences/seabob-scooter-divelife.jpg?v=${ASSET_VER}`,
    'surface-supply': `/images/experiences/surface-supply-snuba.jpg?v=${ASSET_VER}`,
    'cenote-dive': `/images/experiences/cenote-dive-divelife.jpg?v=${ASSET_VER}`,
    'cozumel-dive': `/images/experiences/cozumel-dive-divelife.jpg?v=${ASSET_VER}`,
    'cenote-family': `/images/experiences/cenote-family-snorkel-divelife.jpg?v=${ASSET_VER}`,
    'manatee-snorkeling': `/images/experiences/manatee-snorkeling-divelife.jpg?v=${ASSET_VER}`,
    'paddleboard': `/images/experiences/paddleboard-ojo-agua-eaglerays.jpg?v=${ASSET_VER}`,
    'panga-fishing': `/images/experiences/mexican-panga-fishing.jpg?v=${ASSET_VER}`,
  };

  const getImageForExperience = (slug: string) => {
    return imageMap[slug] || `/images/experiences/dsd-discover-scuba-diver.jpg?v=${ASSET_VER}`;
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 ocean-gradient-soft">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'en' ? 'Ocean Experiences' : 'Experiencias Oceánicas'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Explore our full range of diving, snorkeling, sailing and water adventures. From beginner-friendly experiences to advanced expeditions.'
              : 'Explora nuestra gama completa de buceo, snorkel, navegación y aventuras acuáticas. Desde experiencias para principiantes hasta expediciones avanzadas.'}
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'ocean-gradient' : ''}
              >
                {category.label[language]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredExperiences.map((exp) => {
              const image = getImageForExperience(exp.slug);
              
              return (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  title={exp.title[language]}
                  slug={exp.slug}
                  image={image}
                  duration={exp.duration}
                  level={exp.level[language]}
                  minAge={exp.minAge}
                  price={exp.price}
                />
              );
            })}
          </div>

          {filteredExperiences.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                {language === 'en' 
                  ? 'No experiences found in this category.'
                  : 'No se encontraron experiencias en esta categoría.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
