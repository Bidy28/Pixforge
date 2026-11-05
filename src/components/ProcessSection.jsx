import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import { processSteps } from '../data/process.js';

export default function ProcessSection() {
  return (
    <Section id="methodologie" className="bg-surface-2/60">
      <SectionHeading
        eyebrow="Méthodologie"
        title="Une démarche simple, du besoin à la livraison"
        description="Quatre étapes claires pour que vous sachiez toujours où en est votre projet."
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
