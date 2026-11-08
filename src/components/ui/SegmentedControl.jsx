/**
 * Contrôle segmenté : un seul choix visible à la fois, repère glissant.
 * Les colonnes sont de largeur égale, le repère se place donc en pourcentage.
 */
export default function SegmentedControl({ label, options, value, onChange }) {
  const count = options.length;
  const index = Math.max(
    0,
    options.findIndex((option) => option.id === value)
  );

  return (
    <div className="no-scrollbar -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <div
        role="group"
        aria-label={label}
        className="relative inline-grid w-max min-w-full grid-flow-col auto-cols-[minmax(7rem,1fr)] gap-0 rounded-full bg-surface-2 p-1"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-surface shadow-card transition-transform duration-500 ease-apple"
          style={{
            width: `calc((100% - 0.5rem) / ${count})`,
            transform: `translateX(calc(${index} * 100%))`,
          }}
        />
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={`relative z-10 inline-flex min-h-[38px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[13px] font-medium transition-colors duration-300 ${
                active ? 'text-text' : 'text-muted hover:text-text'
              }`}
            >
              {option.label}
              {typeof option.count === 'number' && (
                <span className={active ? 'text-muted' : 'text-muted/70'}>{option.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
