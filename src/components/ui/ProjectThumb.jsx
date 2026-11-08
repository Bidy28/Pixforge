import { Image as ImageIcon } from 'lucide-react';

/**
 * Affiche la première capture du projet ou un emplacement explicite si elle manque.
 * Aucune image générique n'est utilisée à la place d'une capture réelle.
 */
export default function ProjectThumb({ project, className = '' }) {
  const cover = project.screenshots?.[0];

  if (cover) {
    return (
      <img
        src={cover.src}
        alt={cover.alt}
        loading="lazy"
        className={`aspect-[16/10] w-full object-cover object-top ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Capture d’écran à ajouter pour ${project.name}`}
      className={`flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 bg-surface-2 text-muted ${className}`}
    >
      <ImageIcon size={26} aria-hidden="true" />
      <span className="text-sm">Capture d’écran à ajouter</span>
    </div>
  );
}
