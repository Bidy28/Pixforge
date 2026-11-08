const tones = {
  default: 'bg-surface-2 text-muted',
  accent: 'bg-accent-soft text-accent-text',
  muted: 'border hairline text-muted',
  warning: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
};

export default function Badge({ tone = 'default', children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
