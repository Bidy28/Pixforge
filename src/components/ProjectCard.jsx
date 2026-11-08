import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Badge from './ui/Badge.jsx';
import Reveal from './ui/Reveal.jsx';
import ProjectThumb from './ui/ProjectThumb.jsx';
import { projectCategories } from '../data/projects.js';

const MAX_TECHNOLOGIES = 3;

export default function ProjectCard({ project, delay = 0 }) {
  const categoryLabel = projectCategories.find(
    (category) => category.id === project.category
  )?.label;
  const shown = project.technologies.slice(0, MAX_TECHNOLOGIES);
  const extra = project.technologies.length - shown.length;

  return (
    <Reveal as="li" delay={delay} className="flex">
      {/* Toute la carte est cliquable : pas de petit lien à viser. */}
      <Link
        to={`/realisations/${project.slug}`}
        className="group flex w-full flex-col overflow-hidden rounded-4xl border hairline bg-surface transition duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="overflow-hidden">
          <ProjectThumb
            project={project}
            className="transition duration-700 ease-apple group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-7">
          {categoryLabel && (
            <span className="text-[13px] font-medium text-muted">{categoryLabel}</span>
          )}

          <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {shown.length > 0 ? (
              <>
                {shown.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
                {extra > 0 && <Badge>+{extra}</Badge>}
              </>
            ) : (
              <Badge tone="muted">Technologies à confirmer</Badge>
            )}
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[15px] font-medium text-accent-text">
            Découvrir le cas
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 ease-apple group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
