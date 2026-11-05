import { ExternalLink, Mail, MessageCircle, Phone } from 'lucide-react';
import Section from './ui/Section.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import ContactForm from './ContactForm.jsx';
import { getContactChannels } from '../config/site.js';

const icons = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  linkedin: ExternalLink,
};

export default function ContactSection() {
  const channels = getContactChannels();

  return (
    <Section id="contact" className="bg-surface-2/60">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Vous avez un projet en tête ? Parlons-en."
            description="Présentez-nous votre besoin. Nous étudierons votre projet et reviendrons vers vous pour discuter des prochaines étapes."
          />

          {channels.length > 0 && (
            <ul className="mt-10 space-y-3">
              {channels.map((channel) => {
                const Icon = icons[channel.key];
                const external = channel.href.startsWith('http');
                return (
                  <li key={channel.key}>
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition hover:border-accent/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted">{channel.label}</span>
                        <span className="block break-all font-medium">{channel.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
