import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import { services } from '../data/services.js';

export default function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="Des solutions adaptées à votre activité"
        description="De la vitrine en ligne à l’outil métier, nous couvrons l’ensemble du cycle de vie de vos projets numériques."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li
              key={service.id}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
