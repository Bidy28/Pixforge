import { Check } from 'lucide-react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import Badge from './ui/Badge.jsx';

const values = [
  'Collaboration',
  'Rigueur technique',
  'Communication',
  'Développement sur mesure',
  'Attention au métier',
];
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
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="À propos"
            title="Une équipe de développeurs, une seule exigence : la qualité"
            description="PixForge réunit des compétences complémentaires — interfaces, back-end, bases de données — pour concevoir des solutions adaptées aux besoins de chaque client."
          />

          <Reveal delay={80} className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {values.map((value) => (
                <li key={value}>
                  <Badge tone="muted">{value}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-10">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
              Technologies principales
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Badge tone="accent">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          delay={200}
          id="pourquoi"
          className="scroll-mt-24 rounded-4xl border hairline bg-surface p-8 shadow-card sm:p-10"
        >
          <h3 className="text-xl font-semibold tracking-tight">Pourquoi nous choisir ?</h3>
          <ul className="mt-7 space-y-5">
            {whyUs.map((item) => (
              <li key={item} className="flex gap-3.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                  <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
