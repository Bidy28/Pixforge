const tones = {
  default: 'bg-accent-soft text-accent',
  muted: 'border border-border text-muted',
  warning:
    'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
};

export default function Badge({ tone = 'default', children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
