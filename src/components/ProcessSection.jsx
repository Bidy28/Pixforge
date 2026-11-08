import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import { processSteps } from '../data/process.js';

export default function ProcessSection() {
  return (
    <Section id="methodologie" className="bg-surface-2">
      <SectionHeading
        eyebrow="Méthode"
        title="Du premier échange à la mise en ligne"
        description="Quatre étapes claires pour que vous sachiez toujours où en est votre projet."
      />

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* Fil conducteur entre les étapes, sur grand écran uniquement. */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block"
        />

        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.title} delay={index * 100} className="relative">
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-accent-text ring-1 ring-border">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tabular-nums text-muted md:mt-6">
                  Étape {index + 1}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
