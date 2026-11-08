import { Link } from 'react-router-dom';

/* Boutons en forme de pilule : une action principale, le reste en retrait. */
const variants = {
  primary: 'bg-accent text-accent-contrast hover:brightness-110 active:brightness-95',
  secondary:
    'border hairline bg-surface/80 text-text backdrop-blur hover:bg-surface-2 active:bg-surface-2',
  quiet: 'text-accent-text hover:bg-accent-soft/70',
};

const sizes = {
  md: 'min-h-[44px] px-5 py-2.5 text-[15px]',
  lg: 'min-h-[52px] px-7 py-3.5 text-base',
};

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'transition duration-300 ease-apple disabled:cursor-not-allowed disabled:opacity-50',
    sizes[size],
    variants[variant],
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
