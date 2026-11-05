import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Badge from './ui/Badge.jsx';
import ProjectThumb from './ui/ProjectThumb.jsx';
import { projectCategories } from '../data/projects.js';

export default function ProjectCard({ project }) {
  const categoryLabel = projectCategories.find((category) => category.id === project.category)?.label;
  const isDraft = project.status === 'draft';

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      <ProjectThumb project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{categoryLabel}</span>
          {isDraft && <Badge tone="warning">Contenu à compléter</Badge>}
        </div>

        <h3 className="mt-3 text-xl font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.length > 0 ? (
            project.technologies.map((tech) => <Badge key={tech}>{tech}</Badge>)
          ) : (
            <Badge tone="muted">Technologies à confirmer</Badge>
          )}
        </div>

        <Link
          to={`/realisations/${project.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-all hover:gap-3"
        >
          Découvrir le cas
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </li>
  );
}
