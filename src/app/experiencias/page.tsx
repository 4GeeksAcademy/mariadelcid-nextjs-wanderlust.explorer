import { Suspense } from 'react';
import { ExperiencesCatalogPage } from '../../components/ExperiencesCatalogPage';

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl px-4 py-10">
          <p className="text-sm text-zinc-600">Cargando experiencias...</p>
        </main>
      }
    >
      <ExperiencesCatalogPage />
    </Suspense>
  );
}
