import Image from 'next/image';
import Link from 'next/link';
import { FavoriteButton } from '../../../components/FavoriteButton';
import { experiences } from '../../../data/experiences';

type ExperiencePageProps = {
  params: Promise<{ id: string }>;
};

const formatPrice = (price: number): string => `${price} €`;

const difficultyLabels: Record<'facil' | 'moderado' | 'dificil', string> = {
  facil: 'Facil',
  moderado: 'Moderado',
  dificil: 'Dificil',
};

export default async function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Experiencia no encontrada</h1>
          <p className="mt-2 text-sm text-zinc-600">
            No existe una experiencia con el id solicitado.
          </p>
          <Link
            href="/experiencias"
            className="mt-5 inline-flex rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Volver a experiencias
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f5efe4]">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="overflow-hidden border border-zinc-800/30 bg-white shadow-sm">
            <Image
              src={experience.imageUrl}
              alt={experience.title}
              width={1200}
              height={900}
              className="h-[320px] w-full object-cover md:h-[520px]"
              priority
            />
          </div>

          <article className="space-y-5 bg-[#f5efe4] p-1 md:p-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
              {experience.category} · {experience.city}, {experience.country}
            </p>

            <div className="flex items-start justify-between gap-3">
              <h1 className="text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">
                {experience.title}
              </h1>
              <FavoriteButton experienceId={experience.id} showLabel className="shrink-0" />
            </div>

            <p className="max-w-prose text-base leading-relaxed text-zinc-700 md:text-lg">
              {experience.description}
            </p>

            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-300/80 bg-white p-4 md:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Precio</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{formatPrice(experience.price)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Duracion</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{experience.duration}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Rating</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">⭐ {experience.rating.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Resenas</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{experience.reviewCount}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Destino</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{experience.country}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zinc-500">Ciudad</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">{experience.city}</p>
              </div>
            </div>

            {experience.difficulty && (
              <p className="text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">Dificultad:</span>{' '}
                {difficultyLabels[experience.difficulty]}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-zinc-600">
              Imagen: <span className="break-all">{experience.imageUrl}</span>
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Reservar experiencia
              </button>
              <Link
                href="/experiencias"
                className="inline-flex rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Volver al catalogo
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-zinc-300/80">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold leading-tight text-zinc-900 md:text-4xl">
              Descubre {experience.country}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-700 md:text-base">
              Esta experiencia en {experience.city} combina momentos autenticos, guia local y rincones memorables.
              Es una propuesta ideal para quienes quieren conocer {experience.country} desde una mirada mas cercana,
              con una duracion de {experience.duration.toLowerCase()} y una valoracion de {experience.rating.toFixed(1)} sobre 5.
            </p>

            <dl className="grid grid-cols-1 gap-3 rounded-2xl border border-zinc-300/80 bg-white p-4 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-zinc-500">Categoria</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">{experience.category}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-zinc-500">Precio base</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">{formatPrice(experience.price)}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-zinc-500">Pais</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">{experience.country}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-zinc-500">Ciudad</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">{experience.city}</dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden border border-zinc-800/20 bg-white shadow-sm">
            <Image
              src={experience.imageUrl}
              alt={`${experience.title} en ${experience.city}`}
              width={1100}
              height={900}
              className="h-[260px] w-full object-cover md:h-[420px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}