import { useMemo, useState } from 'react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import SegmentedControl from './ui/SegmentedControl.jsx';
import Reveal from './ui/Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projectCategories, projects } from '../data/projects.js';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all');

  // Un filtre vide n'apprend rien au visiteur : on n'affiche que ceux qui ont du contenu.
  const options = useMemo(
    () =>
      projectCategories
        .map((category) => ({
          ...category,
          count:
            category.id === 'all'
              ? projects.length
              : projects.filter((project) => project.category === category.id).length,
        }))
        .filter((category) => category.count > 0),
    []
  );

  const visibleProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <Section id="realisations">
      <SectionHeading
        eyebrow="Réalisations"
        title="Des projets concrets, livrés pour de vrais besoins"
        description="Chaque fiche détaille le contexte, la solution développée et les technologies employées."
      />

      {options.length > 2 && (
        <Reveal className="mt-12 flex justify-center">
          <SegmentedControl
            label="Filtrer les réalisations"
            options={options}
            value={filter}
            onChange={setFilter}
          />
        </Reveal>
      )}

      {visibleProjects.length > 0 ? (
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 60} />
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-4xl border border-dashed hairline p-12 text-center text-muted">
          Aucune réalisation dans cette catégorie pour le moment.
        </p>
      )}
    </Section>
  );
}
