import { ChevronDown } from 'lucide-react';
import Button from './ui/Button.jsx';
import TextLink from './ui/TextLink.jsx';
import Reveal from './ui/Reveal.jsx';
import DashboardMockup from './DashboardMockup.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Halo discret derrière le titre, pour centrer le regard. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[460px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(var(--accent)/0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-content px-6 pb-20 pt-20 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-sm font-semibold tracking-tight text-accent-text">
              Studio de développement web
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-3 text-[2.5rem] font-semibold leading-[1.05] text-balance sm:text-6xl lg:text-[4.25rem]">
              Vos idées, transformées en logiciels qui tournent.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Sites web, applications métier et API sur mesure. Nous concevons, développons et
              accompagnons vos projets numériques de bout en bout.
            </p>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <Button to="/#contact" size="lg" className="w-full sm:w-auto">
              Parlons de votre projet
            </Button>
            <TextLink to="/#realisations" className="text-base">
              Voir nos réalisations
            </TextLink>
          </Reveal>
        </div>

        <Reveal delay={320} className="relative mt-16 sm:mt-20">
          <DashboardMockup />
        </Reveal>

        <div className="mt-14 flex justify-center">
          <a
            href="#services"
            aria-label="Aller à la section Services"
            className="animate-float-hint inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:text-text"
          >
            <ChevronDown size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
