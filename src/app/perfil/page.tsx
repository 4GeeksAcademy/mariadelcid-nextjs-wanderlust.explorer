'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExperienceCard } from '../../components/ExperienceCard';
import { useFavorites } from '../../context/FavoritesContext';
import { experiences } from '../../data/experiences';

const userProfile = {
  name: 'Lucia Herrera',
  email: 'lucia.herrera@wanderlustlabs.com',
  memberSince: '21 de enero de 2024',
  avatarUrl: '/foto-avatar-cuenta-de-perfil.png',
};

const livedExperiences = [
  { id: 'trekking-de-acantilados-en-bergen', hiredAt: '15 de marzo de 2025' },
  { id: 'ruta-de-bares-ocultos-en-cusco', hiredAt: '8 de octubre de 2025' },
] as const;

type LivedExperienceCard = {
  experience: (typeof experiences)[number];
  hiredAt: string;
};

export default function ProfilePage() {
  const { favoriteIds } = useFavorites();

  const livedExperienceCards = livedExperiences.reduce<LivedExperienceCard[]>((acc, entry) => {
      const experience = experiences.find((item) => item.id === entry.id);
      if (experience) {
        acc.push({ experience, hiredAt: entry.hiredAt });
      }
      return acc;
    }, []);

  return (
    <main className="bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={userProfile.avatarUrl}
                alt={`Avatar de ${userProfile.name}`}
                width={96}
                height={96}
                className="h-20 w-20 rounded-full border border-zinc-200 object-cover md:h-24 md:w-24"
              />
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 md:text-3xl">{userProfile.name}</h1>
                <p className="text-sm text-zinc-600">{userProfile.email}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Miembro desde {userProfile.memberSince}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left md:min-w-72">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Favoritos guardados
              </p>
              <p className="mt-1 text-3xl font-bold text-emerald-800">{favoriteIds.length}</p>
              <Link
                href="/favoritos"
                className="mt-2 inline-flex text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
              >
                Ver mis favoritos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Historial</p>
            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">Experiencias vividas</h2>
          </div>
          <p className="text-xs text-zinc-500 md:text-sm">2 contrataciones recientes</p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {livedExperienceCards.map(({ experience, hiredAt }) => (
            <div key={experience.id} className="w-full max-w-64">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Contratada el {hiredAt}
              </p>
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
