'use client';

import Link from 'next/link';
import { FavoriteButton } from './FavoriteButton';
import type { Experience } from '../types/experience';

type ExperienceCardProps = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const locationSeed = `${experience.city}-${experience.country}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  return (
    <article className="relative snap-start h-80 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/experiencias/${experience.id}`}
        aria-label={`Ver detalle de ${experience.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      />
      <FavoriteButton
        experienceId={experience.id}
        preventLinkNavigation
        className="absolute right-3 top-3 z-20 bg-white/95"
      />
      <div className="flex h-full flex-col">
        <img
          src={`https://picsum.photos/seed/${locationSeed}/600/400`}
          alt={experience.title}
          className="h-36 w-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {experience.category}
            </span>
            <span className="text-xs font-medium text-zinc-500">⭐ {experience.rating.toFixed(1)}</span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900">{experience.title}</h3>
          <p className="line-clamp-2 text-sm text-zinc-600">{experience.description}</p>
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>
              {experience.city}, {experience.country}
            </span>
            <span>{experience.duration}</span>
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-2">
            <span className="text-sm font-semibold text-zinc-900">Desde {experience.price} €</span>
            <span className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white">
              Ver detalle
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
