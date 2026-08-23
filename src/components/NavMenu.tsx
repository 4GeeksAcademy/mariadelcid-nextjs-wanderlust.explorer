'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type NavMenuProps = {
  categories: string[];
  mobile?: boolean;
};

export const NavMenu = ({ categories, mobile = false }: NavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryHref = (category: string) => `/experiencias?category=${encodeURIComponent(category)}`;
  const profileAvatarSrc = '/foto-avatar-cuenta-de-perfil.png';

  if (mobile) {
    return (
      <nav aria-label="Navegacion principal movil" className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/experiencias" className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800">
            Experiencias
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-800"
            aria-label="Abrir categorias"
          >
            <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
          </button>
        </div>
        {isOpen && (
          <ul className="space-y-1 rounded-xl bg-zinc-50 p-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={categoryHref(category)}
                  className="block rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-emerald-50"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link href="/#viajes-top" className="block rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800">
          Viajes Top
        </Link>
        <Link href="/favoritos" className="block rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800">
          Favoritos
        </Link>
        <Link href="/#sobre-nosotros" className="block rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800">
          Sobre Nosotros
        </Link>
        <Link href="/#contacto" className="block rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800">
          Contacto
        </Link>
        <Link
          href="/perfil"
          aria-label="Ir al perfil"
          className="inline-flex h-11 w-11 items-center justify-center self-end rounded-full border border-zinc-200 bg-white"
        >
          <Image
            src={profileAvatarSrc}
            alt="Avatar de usuario"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>
      </nav>
    );
  }

  return (
    <nav aria-label="Navegacion principal" className="hidden items-center gap-5 md:flex">
      <div
        className="relative flex items-center gap-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/experiencias" className="text-sm font-semibold text-zinc-800 transition hover:text-emerald-700">
          Experiencias
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-zinc-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          aria-label="Abrir categorias"
        >
          ▾
        </button>
        {isOpen && (
          <div className="absolute left-0 top-9 z-30 min-w-52 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
            {categories.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-emerald-50"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link href="/#viajes-top" className="text-sm font-semibold text-zinc-800 transition hover:text-emerald-700">
        Viajes Top
      </Link>
      <Link href="/favoritos" className="text-sm font-semibold text-zinc-800 transition hover:text-emerald-700">
        Favoritos
      </Link>
      <Link href="/#sobre-nosotros" className="text-sm font-semibold text-zinc-800 transition hover:text-emerald-700">
        Sobre Nosotros
      </Link>
      <Link href="/#contacto" className="text-sm font-semibold text-zinc-800 transition hover:text-emerald-700">
        Contacto
      </Link>
      <Link
        href="/perfil"
        aria-label="Ir al perfil"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white"
      >
        <Image
          src={profileAvatarSrc}
          alt="Avatar de usuario"
          width={34}
          height={34}
          className="h-[34px] w-[34px] rounded-full object-cover"
        />
      </Link>
    </nav>
  );
};
