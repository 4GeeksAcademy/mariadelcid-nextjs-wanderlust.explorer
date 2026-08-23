'use client';

import { useState } from 'react';

export const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="flex w-full items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-left text-sm text-zinc-500 shadow-sm transition hover:border-emerald-300 md:max-w-xl"
        aria-label="Abrir buscador"
      >
        <span aria-hidden="true">🔎</span>
        <span className="truncate">¿Dónde te gustaría ir?</span>
      </button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-emerald-200 bg-white p-3 shadow-lg md:max-w-2xl">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.6fr_1fr_1fr_auto] md:items-end">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          ¿Dónde te gustaría ir?
          <input
            type="text"
            placeholder="Destino o ciudad"
            className="h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 outline-none ring-emerald-300 transition focus:ring"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Fecha de salida
          <input
            type="date"
            className="h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 outline-none ring-emerald-300 transition focus:ring"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Numero de pasajeros
          <input
            type="number"
            min={1}
            defaultValue={2}
            className="h-10 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-700 outline-none ring-emerald-300 transition focus:ring"
          />
        </label>
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="h-10 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
