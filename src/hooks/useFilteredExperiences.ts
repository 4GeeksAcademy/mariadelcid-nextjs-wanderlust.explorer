'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { experiences } from '../data/experiences';
import { categorySlug } from '../components/categorySlug';

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

export const useFilteredExperiences = () => {
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

      const matchesCategory = selectedCategory === ALL_CATEGORIES || experience.category === selectedCategory;
      const matchesDestination = selectedDestination === ALL_DESTINATIONS || experience.country === selectedDestination;

      return matchesTitle && matchesCategory && matchesDestination;
    });
  }, [queryText, selectedCategory, selectedDestination]);

  return {
    filteredExperiences,
    queryText,
    selectedCategory,
    selectedDestination,
    destinationOptions,
    updateParam,
    categoryOptions: CATEGORY_OPTIONS,
    allCategoriesValue: ALL_CATEGORIES,
    allDestinationsValue: ALL_DESTINATIONS,
  };
};
