import { ArrowRight } from 'lucide-react';
import Button from './ui/Button.jsx';
import DashboardMockup from './DashboardMockup.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Studio de développement web
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Nous transformons vos idées en solutions numériques performantes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Sites web, applications métier et solutions sur mesure : PixForge accompagne les entreprises dans la
            conception et le développement de leurs projets numériques.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/#realisations" variant="secondary">
              Découvrir nos réalisations
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/#contact">Parlons de votre projet</Button>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
