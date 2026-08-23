'use client';

import type { MouseEvent } from 'react';
import { useFavorites } from '../context/FavoritesContext';

type FavoriteButtonProps = {
  experienceId: string;
  className?: string;
  showLabel?: boolean;
  preventLinkNavigation?: boolean;
};

export const FavoriteButton = ({
  experienceId,
  className = '',
  showLabel = false,
  preventLinkNavigation = false,
}: FavoriteButtonProps) => {
  const { hasMounted, isFavorite, toggleFavorite } = useFavorites();
  const favorite = hasMounted ? isFavorite(experienceId) : false;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (preventLinkNavigation) {
      event.preventDefault();
      event.stopPropagation();
    }
    toggleFavorite(experienceId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorite}
      aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        favorite
          ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
          : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100'
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
          fill={favorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showLabel && <span>{favorite ? 'Guardada' : 'Guardar'}</span>}
    </button>
  );
};
