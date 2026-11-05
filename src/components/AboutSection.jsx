import { Check } from 'lucide-react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Badge from './ui/Badge.jsx';

const values = ['Collaboration', 'Rigueur technique', 'Communication', 'Développement sur mesure', 'Attention au métier'];
const technologies = ['React', 'Laravel', 'JavaScript', 'API REST', 'Bases de données SQL'];
const whyUs = [
  'Des solutions adaptées au besoin réel.',
  'Un échange direct avec l’équipe qui développe votre projet.',
  'Une approche progressive du projet.',
  'Un code structuré et maintenable.',
  'Un accompagnement après la livraison, selon le contrat.',
];

export default function AboutSection() {
  return (
    <Section id="a-propos">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="À propos"
            title="Une équipe de développeurs, une seule exigence : la qualité"
            description="PixForge réunit une équipe de développeurs aux compétences complémentaires (interfaces, back-end, bases de données) pour concevoir des solutions numériques adaptées aux besoins de chaque client."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {values.map((value) => (
              <li key={value}>
                <Badge tone="muted">{value}</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted">Technologies principales</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="pourquoi" className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="text-xl font-semibold">Pourquoi nous choisir ?</h3>
          <ul className="mt-6 space-y-4">
            {whyUs.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check size={14} aria-hidden="true" />
                </span>
                <span className="leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
