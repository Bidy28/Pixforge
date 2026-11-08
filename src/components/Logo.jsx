import { Link } from 'react-router-dom';

/*
 * Monogramme identique au favicon et aux fichiers de public/brand/ :
 * hampe + panse elliptique, contreforme ronde, règle de remplissage evenodd.
 */
const MARK_PATH =
  'M333,224 H437 V800 H333 Z M437,224 A254,179 0 0 1 437,582 Z M437,403 A75,75 0 1 1 587,403 A75,75 0 1 1 437,403 Z';

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="PixForge, retour à l’accueil"
      className={`inline-flex items-center gap-2 font-semibold tracking-tight text-text transition hover:opacity-70 ${className}`}
    >
      <svg viewBox="0 0 1024 1024" aria-hidden="true" className="h-7 w-7 shrink-0">
        <rect width="1024" height="1024" rx="229" className="fill-accent" />
        <path d={MARK_PATH} fillRule="evenodd" className="fill-white" />
      </svg>
      <span>
        Pix<span className="font-normal text-muted">Forge</span>
      </span>
    </Link>
  );
}
