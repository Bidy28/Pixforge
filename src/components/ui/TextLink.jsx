import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/** Lien bleu suivi d'un chevron : le repère d'action le plus léger de l'interface. */
export default function TextLink({ to, href, className = '', children, ...props }) {
  const classes = `group inline-flex items-center gap-1 text-[15px] font-medium text-accent-text transition hover:underline ${className}`;

  const content = (
    <>
      {children}
      <ChevronRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
