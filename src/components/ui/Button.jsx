import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-accent text-accent-contrast shadow-sm hover:opacity-90',
  secondary: 'border border-border bg-surface text-text hover:border-accent hover:text-accent',
};

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;

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
