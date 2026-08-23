import { FeaturedCarousel } from "../components/FeaturedCarousel";
import { HeroSection } from "../components/HeroSection";
import { experiences } from "../data/experiences";
import type { Experience } from "../types/experience";

export default function Home() {
  const categories = Array.from(new Set(experiences.map((experience) => experience.category)));

  const heroFeatured = experiences.filter((experience) => experience.featured).slice(0, 3);

  const onePerCategory = categories
    .map((category) => experiences.find((experience) => experience.category === category))
    .filter((experience): experience is Experience => Boolean(experience));

  const selectedIds = new Set(onePerCategory.map((experience) => experience.id));
  const featuredPool = experiences.filter(
    (experience) => experience.featured && !selectedIds.has(experience.id),
  );
  const fallbackPool = experiences.filter((experience) => !selectedIds.has(experience.id));

  const carouselExperiences = [...onePerCategory];
  for (const experience of featuredPool) {
    if (carouselExperiences.length >= 10) break;
    carouselExperiences.push(experience);
    selectedIds.add(experience.id);
  }
  for (const experience of fallbackPool) {
    if (carouselExperiences.length >= 10) break;
    if (selectedIds.has(experience.id)) continue;
    carouselExperiences.push(experience);
    selectedIds.add(experience.id);
  }

  const adventureExperiences = experiences.filter((experience) => experience.category === "Aventura");
  const artExperiences = experiences.filter((experience) => experience.category === "Arte");

  return (
    <main className="flex flex-col">
      <HeroSection featuredExperiences={heroFeatured} />
      <FeaturedCarousel sectionId="viajes-top" title="Experiencias destacadas" experiences={carouselExperiences} />
      <FeaturedCarousel title="Experiencias para Aventureros" experiences={adventureExperiences} />
      <FeaturedCarousel title="Experiencias de Arte" experiences={artExperiences} />
    </main>
  );
}
