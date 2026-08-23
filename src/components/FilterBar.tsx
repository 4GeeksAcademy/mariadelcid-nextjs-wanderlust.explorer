'use client';

type FilterBarProps = {
  queryText: string;
  selectedCategory: string;
  selectedDestination: string;
  categoryOptions: readonly string[];
  destinationOptions: string[];
  allCategoriesValue: string;
  allDestinationsValue: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
};

export const FilterBar = ({
  queryText,
  selectedCategory,
  selectedDestination,
  categoryOptions,
  destinationOptions,
  allCategoriesValue,
  allDestinationsValue,
  onQueryChange,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) => {
  return (
    <section className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:gap-3">
        <label className="flex-1 text-sm font-semibold text-zinc-700">
          Buscar
          <input
            type="text"
            value={queryText}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar experiencias..."
            className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
          />
        </label>

        <label className="text-sm font-semibold text-zinc-700 md:min-w-52">
          Categoría
          <select
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
          >
            <option value={allCategoriesValue}>Todas</option>
            {categoryOptions.map((category) => (
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
            onChange={(event) => onDestinationChange(event.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 px-3 text-sm text-zinc-800 outline-none ring-emerald-300 transition focus:ring"
          >
            <option value={allDestinationsValue}>Todos</option>
            {destinationOptions.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
};
