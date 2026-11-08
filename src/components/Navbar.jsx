import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import Button from './ui/Button.jsx';
import { navItems } from '../data/navigation.js';
import useActiveSection from '../hooks/useActiveSection.js';
import useScrolled from '../hooks/useScrolled.js';
import useScrollLock from '../hooks/useScrollLock.js';

const sectionIds = navItems.map((item) => item.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const scrolled = useScrolled();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(isHome ? sectionIds : []);

  useScrollLock(open);

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
    <header
      className={`sticky top-0 z-50 glass transition-colors duration-300 ${
        scrolled || open ? 'border-b hairline' : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-14 max-w-content items-center gap-4 px-6 sm:px-8"
      >
        <Logo className="text-[15px]" />

        <ul className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isHome && activeSection === item.id;
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  aria-current={active ? 'true' : undefined}
                  className={`relative inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium transition duration-300 ease-apple ${
                    active ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-text transition-transform duration-300 ease-apple ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button to="/#contact" className="!min-h-[36px] !px-4 !py-2 !text-[13px]">
              Parlons de votre projet
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text transition hover:bg-surface-2 md:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="animate-sheet-in max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t hairline bg-bg md:hidden"
        >
          <ul className="mx-auto max-w-content px-6">
            {navItems.map((item, index) => (
              <li key={item.label} className="border-b hairline last:border-0">
                <Link
                  to={item.to}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className="animate-sheet-in flex items-center justify-between py-4 text-[17px] font-medium text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-content px-6 py-5">
            <Button to="/#contact" size="lg" className="w-full">
              Parlons de votre projet
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
