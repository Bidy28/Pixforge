import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import Button from './ui/Button.jsx';
import { navItems } from '../data/navigation.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  // Ferme le menu mobile à chaque navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  // Ferme le menu avec la touche Échap.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo className="text-xl" />

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="text-sm font-medium text-muted transition hover:text-text">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button to="/#contact" className="!py-2.5">
              Discutons de votre projet
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-text md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-bg md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-border last:border-0">
                <Link to={item.to} className="block py-4 text-base font-medium text-text">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Button to="/#contact" className="w-full">
                Discutons de votre projet
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
