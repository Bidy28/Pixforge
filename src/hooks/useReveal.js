import { useEffect } from 'react';

/**
 * Révèle les éléments marqués `data-reveal` quand ils entrent dans le champ de vision.
 *
 * Le CSS ne masque les éléments que si la classe `reveal-ready` est présente sur
 * <html> : sans JavaScript, ou si l'API n'existe pas, tout reste visible.
 */
export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement;

    // Sans observateur, on retire l'armement posé par le script d'index.html :
    // mieux vaut un contenu visible sans animation qu'un contenu invisible.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      root.classList.remove('reveal-ready');
      return undefined;
    }

    root.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    const observe = (node) => {
      if (node.nodeType !== 1) return;
      if (node.hasAttribute('data-reveal')) observer.observe(node);
      node.querySelectorAll?.('[data-reveal]').forEach((child) => observer.observe(child));
    };

    observe(document.body);

    // Les filtres et les changements de page ajoutent des éléments après coup.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observe));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
