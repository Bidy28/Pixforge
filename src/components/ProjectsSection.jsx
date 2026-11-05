import { useMemo, useState } from 'react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projectCategories, projects } from '../data/projects.js';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <Section id="realisations">
      <SectionHeading
        eyebrow="Réalisations"
        title="Des projets concrets, livrés pour de vrais besoins"
        description="Sélection de réalisations de notre studio. Chaque fiche détaille le contexte, la solution et la contribution de l’équipe."
      />

      <div role="group" aria-label="Filtrer les réalisations" className="mt-10 flex flex-wrap gap-2">
        {projectCategories.map((category) => {
          const active = filter === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(category.id)}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-medium transition ${
                active
                  ? 'border-accent bg-accent text-accent-contrast'
                  : 'border-border bg-surface text-muted hover:border-accent/50 hover:text-text'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {visibleProjects.length > 0 ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          Aucune réalisation dans cette catégorie pour le moment.
        </p>
      )}
    </Section>
  );
}
