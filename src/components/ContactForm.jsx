import { useState } from 'react';
import Button from './ui/Button.jsx';
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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Adresse e-mail invalide.';
  if (!values.projectType) errors.projectType = 'Choisissez un type de projet.';
  if (values.message.trim().length < 20) {
    errors.message = 'Décrivez votre besoin en quelques phrases (20 caractères minimum).';
  }
  return errors;
}

function inputClass(hasError) {
  return `mt-2 w-full rounded-lg border bg-bg px-4 py-3 text-text placeholder:text-muted/60 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
    hasError ? 'border-red-500' : 'border-border'
  }`;
}

function Field({ id, label, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? ' *' : ' (facultatif)'}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

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
    if (Object.keys(found).length > 0) return;

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

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
      aria-describedby="form-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nom" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field id="email" label="Adresse e-mail" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass(errors.email)}
          />
        </Field>

        <Field id="company" label="Entreprise">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange}
            className={inputClass(false)}
          />
        </Field>

        <Field id="projectType" label="Type de projet" required error={errors.projectType}>
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy('projectType')}
            className={inputClass(errors.projectType)}
          >
            <option value="">Sélectionnez un type de projet</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field id="budget" label="Budget indicatif" className="sm:col-span-2">
          <input
            id="budget"
            name="budget"
            type="text"
            value={values.budget}
            onChange={handleChange}
            placeholder="Ex. : une fourchette ou un montant approximatif"
            className={inputClass(false)}
          />
        </Field>

        <Field id="message" label="Description du besoin" required error={errors.message} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            className={inputClass(errors.message)}
          />
        </Field>
      </div>

      {/* Champ piège : masqué aux visiteurs, rempli uniquement par les robots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} />
      </div>

      <div id="form-status" role="status" aria-live="polite" className="mt-6 empty:hidden">
        {status === 'success' && (
          <p className="rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent">
            Merci. Votre demande a bien été envoyée, nous revenons vers vous rapidement.
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            L’envoi a échoué. Réessayez dans quelques instants ou contactez-nous directement.
          </p>
        )}
        {status === 'unconfigured' && (
          <p className="rounded-lg border border-border px-4 py-3 text-sm text-muted">
            L’envoi automatique du formulaire est temporairement indisponible. Merci de nous écrire directement par
            e-mail ou sur WhatsApp, via les coordonnées ci-contre.
          </p>
        )}
      </div>

      <Button type="submit" disabled={status === 'sending'} className="mt-6 w-full sm:w-auto">
        {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </Button>
    </form>
  );
}
