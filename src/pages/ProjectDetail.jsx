import { useState } from 'react';
import { ArrowLeft, Check, ExternalLink, Maximize2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Lightbox from '../components/ui/Lightbox.jsx';
import ProjectThumb from '../components/ui/ProjectThumb.jsx';
import NotFound from './NotFound.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { projectCategories, projects } from '../data/projects.js';

/** Bloc de texte long, séparé du précédent par un simple filet. */
function Block({ title, children }) {
  return (
    <Reveal as="section" className="border-t hairline pt-10">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}

function Placeholder({ children = 'À compléter.' }) {
  return <p className="italic text-muted/70">{children}</p>;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useDocumentTitle(project?.name ?? 'Page introuvable');

  if (!project) return <NotFound />;

  const categoryLabel = projectCategories.find(
    (category) => category.id === project.category
  )?.label;
  const isExternalDemo = project.demoUrl.startsWith('http');

  return (
    <article>
      <header className="mx-auto max-w-content px-6 pb-12 pt-10 sm:px-8 sm:pt-14">
        <Link
          to="/#realisations"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition hover:text-text"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Toutes les réalisations
        </Link>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          {categoryLabel && (
            <Reveal>
              <p className="text-sm font-semibold text-accent-text">{categoryLabel}</p>
            </Reveal>
          )}

          <Reveal delay={60}>
            <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.05] text-balance sm:text-6xl">
              {project.name}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {project.summary}
            </p>
          </Reveal>

          <Reveal
            delay={180}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {isExternalDemo && (
              <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Voir la démonstration
                <ExternalLink size={16} aria-hidden="true" />
              </Button>
            )}
            <Button to="/#contact" variant="secondary" size="lg">
              Discuter d’un projet similaire
            </Button>
          </Reveal>
        </div>

        {/* Première capture en grand : on voit le produit avant de le lire. */}
        <Reveal delay={240} className="mt-14">
          <button
            type="button"
            onClick={() => project.screenshots.length > 0 && setLightboxIndex(0)}
            disabled={project.screenshots.length === 0}
            className="group relative block w-full overflow-hidden rounded-4xl border hairline bg-surface shadow-float disabled:cursor-default"
          >
            <ProjectThumb
              project={project}
              className="!aspect-auto transition duration-700 ease-apple group-hover:scale-[1.01]"
            />
            {project.screenshots.length > 0 && (
              <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[13px] font-medium text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                <Maximize2 size={13} aria-hidden="true" />
                Agrandir
              </span>
            )}
          </button>
        </Reveal>
      </header>

      <div className="mx-auto max-w-3xl space-y-10 px-6 pb-8 sm:px-8">
        <Block title="Contexte">
          {project.context ? <p>{project.context}</p> : <Placeholder />}
        </Block>

        <Block title="Problématique">
          {project.problem ? <p>{project.problem}</p> : <Placeholder />}
        </Block>

        <Block title="Solution développée">
          {project.solution ? <p>{project.solution}</p> : <Placeholder />}
        </Block>

        <Block title="Fonctionnalités principales">
          {project.features.length > 0 ? (
            <ul className="space-y-3.5 text-base">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span>{feature}</span>
                </li>
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
                  <Badge tone="accent">{tech}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <Placeholder>Technologies à confirmer.</Placeholder>
          )}
        </Block>
      </div>

      <section className="mx-auto max-w-content px-6 pb-8 sm:px-8">
        <Reveal className="border-t hairline pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Captures d’écran</h2>
          {project.screenshots.length > 0 ? (
            <>
              <p className="mt-2 text-[15px] text-muted">
                Cliquez sur une capture pour l’agrandir.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.screenshots.map((shot, index) => (
                  <li key={shot.src}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group block w-full overflow-hidden rounded-3xl border hairline bg-surface text-left transition duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift"
                    >
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top transition duration-700 ease-apple group-hover:scale-[1.04]"
                      />
                      <span className="block px-4 py-3 text-[13px] leading-snug text-muted">
                        {shot.alt}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 text-lg italic text-muted/70">Captures d’écran à ajouter.</p>
          )}
        </Reveal>
      </section>

      {/* Appel à l'action de fin de page : le visiteur n'a pas à remonter. */}
      <section className="mx-auto max-w-content px-6 py-20 sm:px-8">
        <Reveal className="rounded-4xl bg-surface-2 px-8 py-14 text-center sm:px-14">
          <h2 className="text-[1.75rem] font-semibold leading-tight text-balance sm:text-4xl">
            Un besoin proche de celui-ci ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            Présentez-nous votre contexte : nous vous dirons comment nous l’aborderions.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/#contact" size="lg">
              Parlons de votre projet
            </Button>
          </div>
        </Reveal>
      </section>

      <Lightbox
        images={project.screenshots}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </article>
  );
}
