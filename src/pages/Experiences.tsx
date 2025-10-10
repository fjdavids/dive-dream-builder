import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ExperienceCard from '@/components/ExperienceCard';
import { experiences } from '@/data/allExperiences';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-diving.jpg';
import sailingImage from '@/assets/sailing.jpg';
import snorkelingImage from '@/assets/snorkeling-family.jpg';
import cenoteImage from '@/assets/cenote.jpg';

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

  // Mapping experiences to images
  const getImageForExperience = (slug: string) => {
    if (slug.includes('snorkel') || slug.includes('manatee')) return snorkelingImage;
    if (slug.includes('sailing') || slug.includes('catamaran') || slug.includes('hobie')) return sailingImage;
    if (slug.includes('cenote')) return cenoteImage;
    return heroImage;
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
