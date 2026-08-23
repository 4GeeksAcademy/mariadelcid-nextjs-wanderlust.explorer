import Link from 'next/link';
import { categorySlug } from './categorySlug';

type FooterProps = {
  categories: string[];
};

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M13.5 8.5V6.8c0-.8.5-1.3 1.3-1.3h1.7V2.2h-2.8c-2.7 0-4.2 1.6-4.2 4.2v2.1H7v3.4h2.5v9h4v-9H16l.4-3.4h-2.9z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M14.7 3h2.8c.2 1.7 1.3 3.2 2.9 3.8v2.9c-1.2 0-2.4-.4-3.4-1v6.1c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .7 0 1 .1v3c-.3-.1-.7-.2-1-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3z" />
      </svg>
    ),
  },
];

export const Footer = ({ categories }: FooterProps) => {
  return (
    <footer id="contacto" className="bg-zinc-950 text-zinc-200">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Wanderlust Labs
          </Link>
          <p className="max-w-xs text-sm text-zinc-400">
            Descubriendo experiencias unicas en cada rincon del planeta.
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Categorias</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/experiencias?category=${categorySlug(category)}`}
                  className="text-zinc-300 transition hover:text-emerald-300"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="sobre-nosotros">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Contacto</h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <Link href="mailto:hola@wanderlustlabs.com" className="hover:text-emerald-300">
                hola@wanderlustlabs.com
              </Link>
            </li>
            <li>
              <Link href="tel:+34910000000" className="hover:text-emerald-300">
                +34 910 000 000
              </Link>
            </li>
            <li>Atencion: Lun - Vie, 9:00 a 18:00</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-zinc-300 transition hover:text-emerald-300">
                Terminos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="#" className="text-zinc-300 transition hover:text-emerald-300">
                Politica de Privacidad
              </Link>
            </li>
            <li>
              <Link href="#" className="text-zinc-300 transition hover:text-emerald-300">
                Politica de Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
