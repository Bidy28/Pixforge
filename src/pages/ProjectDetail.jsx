import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import ProjectThumb from '../components/ui/ProjectThumb.jsx';
import NotFound from './NotFound.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { projectCategories, projects } from '../data/projects.js';

function Block({ title, className = '', children }) {
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function Placeholder({ children = 'À compléter.' }) {
  return <p className="italic text-muted/80">{children}</p>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  useDocumentTitle(project?.name ?? 'Page introuvable');

  if (!project) return <NotFound />;

  const categoryLabel = projectCategories.find((category) => category.id === project.category)?.label;
  const isDraft = project.status === 'draft';
  const isExternalDemo = project.demoUrl.startsWith('http');

  return (
    <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Link to="/#realisations" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-text">
        <ArrowLeft size={16} aria-hidden="true" />
        Retour aux réalisations
      </Link>

      <header className="mt-6">
        {categoryLabel && (
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{categoryLabel}</p>
        )}
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{project.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {isExternalDemo && (
            <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Voir la démonstration
              <ExternalLink size={16} aria-hidden="true" />
            </Button>
          )}
          <Button to="/#contact" variant="secondary">
            Discuter d’un projet similaire
          </Button>
        </div>
      </header>

      {/* {isDraft && (
        <p className="mt-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          Cette fiche contient des sections à compléter avant publication.
        </p>
      )} */}

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <ProjectThumb project={project} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Block title="Contexte">{project.context ? <p>{project.context}</p> : <Placeholder />}</Block>

        <Block title="Problématique">{project.problem ? <p>{project.problem}</p> : <Placeholder />}</Block>

        <Block title="Solution développée" className="md:col-span-2">
          {project.solution ? <p>{project.solution}</p> : <Placeholder />}
        </Block>

        <Block title="Fonctionnalités principales">
          {project.features.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : (
            <Placeholder>Fonctionnalités à compléter.</Placeholder>
          )}
        </Block>

        <Block title="Technologies">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder>Technologies à confirmer.</Placeholder>
          )}
        </Block>

        {/* <Block title="Contribution de l’équipe" className="md:col-span-2">
          {project.contributions.length > 0 ? (
            <ul className="space-y-4">
              {project.contributions.map((item) => (
                <li key={item.member}>
                  <p className="font-medium text-text">{item.member}</p>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder>Répartition des contributions à compléter.</Placeholder>
          )}
        </Block> */}

        <Block title="Captures d’écran" className="md:col-span-2">
          {project.screenshots.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <a
                  key={shot.src}
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border border-border transition hover:border-accent/50"
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full object-cover" />
                </a>
              ))}
            </div>
          ) : (
            <Placeholder>Captures d’écran à ajouter.</Placeholder>
          )}
        </Block>
      </div>
    </article>
  );
}
