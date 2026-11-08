import { useEffect, useState } from 'react';

/**
 * Renvoie l'identifiant de la section visible, pour indiquer dans la barre de
 * navigation où le visiteur se trouve.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) {
      setActive('');
      return undefined;
    }

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const [best] = [...visible.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1]);

        setActive(best ? best[0] : '');
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
