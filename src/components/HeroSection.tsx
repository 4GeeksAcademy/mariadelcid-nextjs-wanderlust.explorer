import Link from 'next/link';
import type { Experience } from '../types/experience';
import { FeaturedTripCard } from './FeaturedTripCard';

type HeroSectionProps = {
  featuredExperiences: Experience[];
};

export const HeroSection = ({ featuredExperiences }: HeroSectionProps) => {
  return (
    <section className="bg-emerald-950/5 pb-8 md:pb-14">
      <div className="relative overflow-hidden md:min-h-[78vh]">
        <img
          src="/MachuPichu-Hero.png"
          alt="Machu Picchu"
          className="h-[70vh] w-full object-cover md:h-[82vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/75 via-emerald-900/45 to-transparent" />

        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl items-center px-4">
          <div className="max-w-xl space-y-5 text-white">
            <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Wanderlust Labs
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Viaja para coleccionar historias irrepetibles
            </h1>
            <p className="text-sm text-emerald-50 md:text-lg">
              Descubre rincones extraordinarios, guarda experiencias autenticas y diseña aventuras hechas a tu medida.
            </p>
            <Link
              href="/#viajes-top"
              className="inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-900 transition hover:bg-amber-300 md:text-base"
            >
              Encuentra tu experiencia perfecta
            </Link>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 hidden w-[340px] -translate-y-1/2 space-y-4 md:block">
          {featuredExperiences.slice(0, 3).map((experience) => (
            <FeaturedTripCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>

      <div className="mx-auto -mt-10 grid max-w-7xl gap-3 px-4 md:hidden">
        {featuredExperiences.slice(0, 3).map((experience) => (
          <FeaturedTripCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
};
