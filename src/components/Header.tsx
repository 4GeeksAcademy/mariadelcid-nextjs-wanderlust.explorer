'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NavMenu } from './NavMenu';
import { SearchBar } from './SearchBar';

type HeaderProps = {
  categories: string[];
};

export const Header = ({ categories }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const showHeaderSearch = pathname !== '/experiencias';
  const logoSrc = '/Logo-Wanderlust.png';

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="rounded-lg border border-zinc-200 p-2 text-zinc-700"
              aria-label="Abrir navegacion"
            >
              ☰
            </button>
            <Link href="/" aria-label="Wanderlust Labs">
              <Image
                src={logoSrc}
                alt="Wanderlust Labs"
                width={450}
                height={96}
                className="h-[72px] w-auto"
                priority
              />
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-3 md:hidden">
            <NavMenu categories={categories} mobile />
          </div>
        )}

        {showHeaderSearch && (
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        )}

        <div className={`hidden md:grid md:items-center md:gap-6 ${showHeaderSearch ? 'md:grid-cols-[auto_minmax(380px,560px)_1fr]' : 'md:grid-cols-[auto_1fr]'}`}>
          <div className="flex items-center">
            <Link href="/" aria-label="Wanderlust Labs">
              <Image
                src={logoSrc}
                alt="Wanderlust Labs"
                width={510}
                height={108}
                className="h-[84px] w-auto"
                priority
              />
            </Link>
          </div>
          {showHeaderSearch && (
            <div className="justify-self-center w-full">
              <SearchBar />
            </div>
          )}
          <div className="justify-self-end">
            <NavMenu categories={categories} />
          </div>
        </div>
      </div>
    </header>
  );
};
