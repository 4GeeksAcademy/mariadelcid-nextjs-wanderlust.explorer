import type { Experience } from '../types/experience';
import { ExperienceCard } from './ExperienceCard';

type FeaturedCarouselProps = {
  title: string;
  experiences: Experience[];
  sectionId?: string;
};

export const FeaturedCarousel = ({ title, experiences, sectionId }: FeaturedCarouselProps) => {
  return (
    <section id={sectionId} className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Nuestra Seleccion</p>
          <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">{title}</h2>
        </div>
        <p className="hidden text-sm text-zinc-500 md:block">Desliza para descubrir mas</p>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="flex w-max snap-x snap-mandatory gap-4">
          {experiences.map((experience) => (
            <div key={experience.id} className="w-64 shrink-0">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
