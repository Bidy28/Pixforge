import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import { services } from '../data/services.js';

/*
 * Grille asymétrique : les deux premières offres occupent la moitié de la
 * largeur, les trois suivantes un tiers. L'œil hiérarchise sans qu'on l'écrive.
 */
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export default function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="Des solutions adaptées à votre activité"
        description="De la vitrine en ligne à l’outil métier, nous couvrons l’ensemble du cycle de vie de vos projets numériques."
      />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Reveal
              as="li"
              key={service.id}
              delay={index * 60}
              className={`group flex flex-col rounded-4xl border hairline bg-surface p-7 transition duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift sm:p-8 ${
                spans[index] ?? 'lg:col-span-2'
              }`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-text transition duration-500 ease-apple group-hover:scale-105">
                <Icon size={22} aria-hidden="true" />
              </span>

              <h3 className="mt-6 text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{service.description}</p>

              <ul className="mt-6 space-y-2.5 border-t hairline pt-5 text-[15px] text-muted">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
