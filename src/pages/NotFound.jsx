import Button from '../components/ui/Button.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Page introuvable');

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-accent-text">Erreur 404</p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
        Cette page n’existe pas
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        Le lien est peut-être incomplet, ou la page a été déplacée.
      </p>
      <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
        <Button to="/" size="lg">
          Retour à l’accueil
        </Button>
        <TextLink to="/#contact" className="text-base">
          Nous écrire
        </TextLink>
      </div>
    </section>
  );
}
