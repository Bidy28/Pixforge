import { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import Button from './ui/Button.jsx';
import Reveal from './ui/Reveal.jsx';
import { siteConfig } from '../config/site.js';

/**
 * Contrat d'intégration (à brancher sur l'API Laravel plus tard) :
 * POST siteConfig.contactEndpoint, Content-Type application/json,
 * corps : { name, email, company, projectType, budget, message }.
 * Réponse 2xx = succès. Tout autre code = erreur affichée à l'utilisateur.
 * Sans endpoint configuré, aucun envoi n'est simulé.
 */
const projectTypes = [
  'Site vitrine',
  'Site professionnel',
  'Application métier',
  'Tableau de bord',
  'API et backend',
  'Maintenance ou évolution',
  'Automatisation',
  'Autre',
];

const MESSAGE_MIN = 20;

const initialValues = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
  website: '', // champ piège anti-spam, masqué
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Indiquez votre nom.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Adresse e-mail invalide.';
  }
  if (!values.projectType) errors.projectType = 'Choisissez un type de projet.';
  if (values.message.trim().length < MESSAGE_MIN) {
    errors.message = `Décrivez votre besoin en quelques phrases (${MESSAGE_MIN} caractères minimum).`;
  }
  return errors;
}

/* Champ à étiquette flottante : l'intitulé reste lisible même une fois le champ rempli. */
const fieldBase =
  'peer w-full rounded-2xl border bg-bg px-4 pb-2.5 pt-7 text-[15px] text-text outline-none transition duration-200';

function Field({ id, label, error, hint, filled, variant = 'input', className = '', children }) {
  const floating = variant === 'input';

  return (
    <div
      className={`group relative ${className}`}
      data-filled={filled ? 'true' : 'false'}
    >
      <div className="relative">
        {children}

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 text-[15px] text-muted transition-all duration-200 ease-apple group-focus-within:text-[11px] group-data-[filled=true]:text-[11px] ${
            floating
              ? 'top-1/2 -translate-y-1/2 group-focus-within:top-2.5 group-focus-within:translate-y-0 group-data-[filled=true]:top-2.5 group-data-[filled=true]:translate-y-0'
              : 'top-2.5 text-[11px]'
          }`}
        >
          {label}
        </label>

        {variant === 'select' && (
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        )}
      </div>

      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 pl-1 text-[13px] text-red-600 dark:text-red-400"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 pl-1 text-[13px] text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

const statusStyles = {
  success: 'bg-accent-soft text-accent-text',
  error: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  unconfigured: 'border hairline text-muted',
};

const statusIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  unconfigured: Info,
};

const statusMessages = {
  success: 'Merci. Votre demande est bien arrivée, nous revenons vers vous rapidement.',
  error: 'L’envoi a échoué. Réessayez dans quelques instants ou contactez-nous directement.',
  unconfigured:
    'L’envoi automatique est temporairement indisponible. Écrivez-nous par e-mail ou sur WhatsApp, via les coordonnées ci-contre.',
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | unconfigured

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.website) return; // robot probable

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Amène directement le visiteur au premier champ à corriger.
      const [first] = Object.keys(found);
      document.getElementById(first)?.focus();
      return;
    }

    if (!siteConfig.contactEndpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const { website, ...payload } = values;
      const response = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setValues(initialValues);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const describedBy = (name, extra) => (errors[name] ? `${name}-error` : extra);

  const inputClass = (name) =>
    `${fieldBase} ${
      errors[name]
        ? 'border-red-400 focus:border-red-500'
        : 'hairline focus:border-accent focus:ring-4 focus:ring-accent/15'
    }`;

  const remaining = Math.max(0, MESSAGE_MIN - values.message.trim().length);
  const StatusIcon = statusIcons[status];

  return (
    <Reveal
      as="form"
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="form-status"
      className="rounded-4xl border hairline bg-surface p-7 shadow-card sm:p-9"
    >
      <p className="text-[13px] text-muted">
        Les champs indiqués <span className="font-medium text-text">facultatif</span> peuvent rester
        vides.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Votre nom" error={errors.name} filled={values.name !== ''}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass('name')}
          />
        </Field>

        <Field id="email" label="Adresse e-mail" error={errors.email} filled={values.email !== ''}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass('email')}
          />
        </Field>

        <Field id="company" label="Entreprise (facultatif)" filled={values.company !== ''}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            className={inputClass('company')}
          />
        </Field>

        <Field
          id="projectType"
          label="Type de projet"
          error={errors.projectType}
          filled
          variant="select"
        >
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy('projectType')}
            className={`${inputClass('projectType')} appearance-none pr-11 ${
              values.projectType === '' ? 'text-muted' : ''
            }`}
          >
            <option value="">Sélectionnez un type de projet</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="budget"
          label="Budget indicatif (facultatif)"
          hint="Une fourchette suffit, rien n’est imposé."
          filled={values.budget !== ''}
          className="sm:col-span-2"
        >
          <input
            id="budget"
            name="budget"
            type="text"
            value={values.budget}
            onChange={handleChange}
            aria-describedby={describedBy('budget', 'budget-hint')}
            className={inputClass('budget')}
          />
        </Field>

        <Field
          id="message"
          label="Votre besoin"
          error={errors.message}
          hint={
            remaining > 0
              ? `Encore ${remaining} caractère${remaining > 1 ? 's' : ''} pour décrire votre besoin.`
              : 'Merci, c’est assez clair pour commencer.'
          }
          filled={values.message !== ''}
          variant="area"
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message', 'message-hint')}
            className={`${inputClass('message')} resize-y`}
          />
        </Field>
      </div>

      {/* Champ piège : masqué aux visiteurs, rempli uniquement par les robots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div id="form-status" role="status" aria-live="polite" className="mt-6 empty:hidden">
        {StatusIcon && statusMessages[status] && (
          <p
            className={`flex items-start gap-2.5 rounded-2xl px-4 py-3.5 text-[15px] ${statusStyles[status]}`}
          >
            <StatusIcon size={17} aria-hidden="true" className="mt-0.5 shrink-0" />
            {statusMessages[status]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === 'sending'}
        className="mt-7 w-full sm:w-auto"
      >
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </Button>
    </Reveal>
  );
}
