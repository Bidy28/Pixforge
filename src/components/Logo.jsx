import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="PixForge, retour à l’accueil"
      className={`inline-flex items-center font-extrabold tracking-tight text-text ${className}`}
    >
      <span>Pix</span>
      <span className="ml-1 font-medium text-accent">Forge</span>
    </Link>
  );
}
