import Button from '../components/ui/Button.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page introuvable');

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Erreur 404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Page introuvable</h1>
      <p className="mt-4 text-muted">La page demandée n’existe pas ou a été déplacée.</p>
      <div className="mt-8">
        <Button to="/">Retour à l’accueil</Button>
      </div>
    </section>
  );
}
