/**
 * Enveloppe un bloc pour le faire apparaître au défilement.
 * L'animation est pilotée par le hook useReveal (voir src/hooks/useReveal.js).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, ...props }) {
  return (
    <Tag
      data-reveal=""
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      className={className}
      {...props}
    />
  );
}
