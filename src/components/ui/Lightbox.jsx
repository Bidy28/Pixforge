import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import useScrollLock from '../../hooks/useScrollLock.js';

/**
 * Visionneuse plein écran des captures : flèches, clavier, clic sur le fond.
 * Évite d'ouvrir l'image brute dans un nouvel onglet.
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null;
  useScrollLock(open);

  const go = useCallback(
    (step) => {
      if (index === null) return;
      onNavigate((index + step + images.length) % images.length);
    },
    [images.length, index, onNavigate]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go, onClose, open]);

  if (!open) return null;

  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex flex-col bg-black/92 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-4 text-white/80">
        <span className="text-sm tabular-nums">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la visionneuse"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
        <img
          src={image.src}
          alt={image.alt}
          onClick={(event) => event.stopPropagation()}
          className="max-h-full max-w-full rounded-xl object-contain shadow-float"
        />
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center justify-center gap-3 px-5 pb-6"
      >
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Capture précédente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Capture suivante"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <p className="pb-6 text-center text-sm text-white/60">{image.alt}</p>
    </div>
  );
}
