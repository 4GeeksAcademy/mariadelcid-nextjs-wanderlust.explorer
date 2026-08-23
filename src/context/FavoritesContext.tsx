'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';

type FavoritesContextValue = {
  favoriteIds: string[];
  hasMounted: boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const STORAGE_KEY = 'wanderlust-favorites';

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

type FavoritesProviderProps = {
  children: React.ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      if (!storedValue) {
        setHasMounted(true);
        return;
      }

      const parsed = JSON.parse(storedValue);
      if (Array.isArray(parsed)) {
        setFavoriteIds(parsed.filter((item): item is string => typeof item === 'string'));
      }
    } finally {
      setHasMounted(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasMounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds, hasMounted]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }, []);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const value = useMemo(
    () => ({ favoriteIds, hasMounted, toggleFavorite, isFavorite }),
    [favoriteIds, hasMounted, toggleFavorite, isFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites debe utilizarse dentro de FavoritesProvider');
  }

  return context;
};
