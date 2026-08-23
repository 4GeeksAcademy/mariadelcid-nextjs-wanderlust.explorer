'use client';

import Link from 'next/link';
import { ExperienceCard } from '../../components/ExperienceCard';
import { useFavorites } from '../../context/FavoritesContext';
import { experiences } from '../../data/experiences';

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favoriteExperiences = experiences.filter((experience) => favoriteIds.includes(experience.id));

  return (
    <main className="bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
          <h1 className="text-3xl font-bold text-zinc-900 md:text-4xl">Mis favoritos</h1>
          <p className="mt-2 text-sm text-zinc-600 md:text-base">
            Tus experiencias guardadas para planear tu proxima aventura.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
        {favoriteExperiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-8 text-center">
            <p className="text-sm font-medium text-zinc-600">
              Aún no has guardado ninguna experiencia como favorita.
            </p>
            <Link
              href="/experiencias"
              className="mt-4 inline-flex rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Explorar experiencias
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
