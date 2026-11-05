import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { navItems } from '../data/navigation.js';
import { getContactChannels, siteConfig } from '../config/site.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const channels = getContactChannels();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <Logo className="text-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
        </div>

        <nav aria-label="Liens du pied de page">
          <p className="text-sm font-semibold">Navigation</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-muted transition hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-2">
            {channels.map((channel) => {
              const external = channel.href.startsWith('http');
              return (
                <li key={channel.key}>
                  <a
                    href={channel.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="break-all text-sm text-muted transition hover:text-text"
                  >
                    {channel.value}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-muted sm:px-8">
          © {year} PixForge. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
