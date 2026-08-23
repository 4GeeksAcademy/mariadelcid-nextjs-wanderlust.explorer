import Link from 'next/link';
import type { Experience } from '../types/experience';

type FeaturedTripCardProps = {
  experience: Experience;
};

export const FeaturedTripCard = ({ experience }: FeaturedTripCardProps) => {
  return (
    <Link
      href={`/experiencias/${experience.id}`}
      aria-label={`Explorar ${experience.title}`}
      className="relative block h-48 overflow-hidden rounded-2xl border border-white/40 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{ backgroundImage: `url(${experience.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 space-y-2 p-3 text-white">
        <h3 className="text-sm font-semibold leading-snug">{experience.title}</h3>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold">{experience.price} €</span>
          <span className="inline-flex rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-zinc-900 transition hover:bg-white">
            Explorar
          </span>
        </div>
      </div>
    </Link>
  );
};
