'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { experiences } from '../data/experiences';
import { ExperienceCard } from './ExperienceCard';
import { categorySlug } from './categorySlug';

const CATEGORY_OPTIONS = [
  'Aventura',
  'Gastronomía',
  'Cultura',
  'Naturaleza',
  'Bienestar',
  'Vida nocturna',
  'Arte',
  'Historia',
] as const;

const ALL_CATEGORIES = 'all';
const ALL_DESTINATIONS = 'all';

const resolveCategory = (category: string): string => {
  if (!category) return ALL_CATEGORIES;

  const exactMatch = CATEGORY_OPTIONS.find((option) => option === category);
  if (exactMatch) return exactMatch;

  const slugMatch = CATEGORY_OPTIONS.find((option) => categorySlug(option) === category.toLowerCase());
  return slugMatch ?? ALL_CATEGORIES;
};

export const ExperiencesCatalogPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryText = searchParams.get('q') ?? '';
  const selectedCategory = resolveCategory(searchParams.get('category') ?? '');
  const destinationOptions = useMemo(
    () => Array.from(new Set(experiences.map((experience) => experience.country))).sort((a, b) => a.localeCompare(b)),
    [],
  );
  const selectedDestinationParam = searchParams.get('destination') ?? '';
  const selectedDestination = destinationOptions.includes(selectedDestinationParam)
    ? selectedDestinationParam
    : ALL_DESTINATIONS;

  const updateParam = (key: 'q' | 'category' | 'destination', value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value.trim()) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredExperiences = useMemo(() => {
    const hasQuery = queryText.trim().length > 0;

    return experiences.filter((experience) => {
      let matchesTitle = true;

      if (hasQuery) {
        try {
          matchesTitle = new RegExp(queryText, 'i').test(experience.title);
        } catch {
          matchesTitle = true;
        }
      }

      const matchesCategory =
        selectedCategory === ALL_CATEGORIES || experience.category === selectedCategory;

      const matchesDestination =
        selectedDestination === ALL_DESTINATIONS || experience.country === selectedDestination;

      return matchesTitle && matchesCategory && matchesDestination;
    });
  }, [queryText, selectedCategory, selectedDestination]);

  return (
    <main className="bg-zinc-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:gap-3">
          <label className="flex-1 text-sm font-semibold text-zinc-700">
            Buscar
            <input
              type="text"
              value={queryText}
              onChange={(event) => updateParam('q', event.target.value)}
              placeholder="Buscar experiencias..."
              className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
            />
          </label>

          <label className="text-sm font-semibold text-zinc-700 md:min-w-52">
            Categoría
            <select
              value={selectedCategory}
              onChange={(event) =>
                updateParam(
                  'category',
                  event.target.value === ALL_CATEGORIES ? '' : event.target.value,
                )
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
            >
              <option value={ALL_CATEGORIES}>Todas</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-zinc-700 md:min-w-52">
            Destino
            <select
              value={selectedDestination}
              onChange={(event) =>
                updateParam(
                  'destination',
                  event.target.value === ALL_DESTINATIONS ? '' : event.target.value,
                )
              }
              className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
            >
              <option value={ALL_DESTINATIONS}>Todos</option>
              {destinationOptions.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
        {filteredExperiences.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-8 text-center text-sm font-medium text-zinc-600">
            No se encontraron experiencias con esos criterios.
          </p>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
