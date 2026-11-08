import { ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import ContactForm from './ContactForm.jsx';
import { getContactChannels } from '../config/site.js';

const icons = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
};

export default function ContactSection() {
  const channels = getContactChannels();

  return (
    <Section id="contact" className="bg-surface-2">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Vous avez un projet en tête ? Parlons-en."
            description="Décrivez votre besoin en quelques lignes. Nous revenons vers vous avec les prochaines étapes."
          />

          {channels.length > 0 && (
            <Reveal delay={80} className="mt-10">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                Ou directement
              </p>
              <ul className="mt-4 overflow-hidden rounded-3xl border hairline bg-surface">
                {channels.map((channel) => {
                  const Icon = icons[channel.key];
                  const external = channel.href.startsWith('http');
                  return (
                    <li key={channel.key} className="border-b hairline last:border-0">
                      <a
                        href={channel.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 px-5 py-4 transition hover:bg-surface-2"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                          <Icon size={16} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] text-muted">{channel.label}</span>
                          <span className="block break-all font-medium">{channel.value}</span>
                        </span>
                        <ChevronRight
                          size={17}
                          aria-hidden="true"
                          className="shrink-0 text-muted transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
