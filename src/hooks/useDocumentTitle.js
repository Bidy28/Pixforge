import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · PixForge` : 'PixForge · Studio de développement web';
    return () => {
      document.title = previous;
    };
  }, [title]);
}
