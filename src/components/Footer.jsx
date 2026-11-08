import { Link } from 'react-router-dom';
import { ArrowUp, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo.jsx';
import { navItems } from '../data/navigation.js';
import { getContactChannels, getSocialLinks, siteConfig } from '../config/site.js';

const socialIcons = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

export default function Footer() {
  const year = new Date().getFullYear();
  const channels = getContactChannels();
  const socials = getSocialLinks();

  return (
    <footer className="border-t hairline bg-bg text-[13px]">
      <div className="mx-auto max-w-content px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-[15px]" />
            <p className="mt-4 max-w-xs leading-relaxed text-muted">{siteConfig.description}</p>

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map((social) => {
                  const Icon = socialIcons[social.key];
                  return (
                    <li key={social.key}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`PixForge sur ${social.label}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline text-muted transition duration-300 ease-apple hover:border-accent hover:text-accent-text"
                      >
                        <Icon size={17} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav aria-label="Liens du pied de page">
            <p className="font-semibold">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-muted transition hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-semibold">Contact</p>
            <ul className="mt-4 space-y-2.5">
              {channels.map((channel) => {
                const external = channel.href.startsWith('http');
                return (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="break-all text-muted transition hover:text-text"
                    >
                      {channel.value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t hairline pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} PixForge. Tous droits réservés.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 self-start transition hover:text-text"
          >
            <ArrowUp size={14} aria-hidden="true" />
            Haut de page
          </button>
        </div>
      </div>
    </footer>
  );
}
