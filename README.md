# PixForge · Portfolio

Site vitrine du studio PixForge. React, Vite, Tailwind CSS, React Router, Lucide React.
Frontend autonome, prêt à être connecté à une API Laravel.

## Prérequis

- Node.js 20 LTS ou supérieur
- npm

## Installation

```bash
npm install
cp .env.example .env   # puis renseigner les coordonnées réelles
```

## Développement

```bash
npm run dev
```

Ouvrir l’adresse affichée (par défaut http://localhost:5173).

## Build de production

```bash
npm run build      # génère le dossier dist/
npm run preview    # teste le build localement (http://localhost:4173)
```

## Déploiement sur O2Switch (hébergement Apache)

1. Lancer `npm run build`.
2. Envoyer le **contenu** du dossier `dist/` dans le répertoire du domaine (ex. `public_html/`).
3. Le fichier `.htaccess` (copié depuis `public/`) gère le routage des pages. Vérifier qu’il est bien présent sur le serveur, car les fichiers cachés sont souvent masqués dans les gestionnaires de fichiers.
4. Remplacer le domaine d’exemple dans `public/robots.txt` et `public/sitemap.xml`, puis relancer le build.

## Configuration

Toutes les coordonnées et intégrations sont dans `.env` (variables `VITE_*`). Un champ vide masque l’élément correspondant.

| Variable | Rôle |
| --- | --- |
| `VITE_CONTACT_EMAIL` | Adresse e-mail affichée et lien `mailto:` |
| `VITE_CONTACT_PHONE` | Téléphone au format international, ex. `+261 34 00 000 00` |
| `VITE_WHATSAPP_NUMBER` | Numéro WhatsApp en format international |
| `VITE_LINKEDIN_URL` | Lien vers le profil ou la page entreprise |
| `VITE_CONTACT_ENDPOINT` | Endpoint POST JSON du formulaire (future API Laravel) |

Les variables `VITE_*` sont intégrées au build : après toute modification de `.env`, relancer `npm run build`.

## Contenus à compléter avant mise en ligne

- `src/data/projects.js` : fiche PeCcS.fr (contexte, problématique, solution, fonctionnalités, technologies confirmées, contributions de chaque membre, captures dans `public/projects/`, URL de démonstration réelle). Passer `status` à `'published'` une fois la fiche complète.
- Ajouter d’autres réalisations dans le même fichier, uniquement avec des informations vérifiables.
- Les tranches de budget sont en champ libre : rien n’est imposé.
- Mentions légales : à ajouter selon le statut juridique de l’activité.
- Présentation des membres de l’équipe : à ajouter uniquement avec leurs noms et rôles validés.

## Formulaire de contact

Sans `VITE_CONTACT_ENDPOINT`, le formulaire valide les champs mais n’envoie rien et affiche un message honnête. Pour le brancher, l’endpoint doit accepter un `POST` en JSON avec `name`, `email`, `company`, `projectType`, `budget`, `message`, et répondre avec un code 2xx en cas de succès. Le contrat est documenté dans `src/components/ContactForm.jsx`.

## Structure

```
src/
  components/   sections et composants (Navbar, Hero, ProjectCard, ContactForm…)
  components/ui/ composants génériques (Button, Badge, Section…)
  config/       configuration de la marque et des contacts
  context/      thème clair / sombre (localStorage + préférence système)
  data/         contenus : services, process, réalisations, navigation
  hooks/        hooks réutilisables
  pages/        Home, ProjectDetail, NotFound
```

## Accessibilité et performance

- Navigation clavier, lien d’évitement, indicateurs de focus visibles.
- Respect de `prefers-reduced-motion` (animations réduites).
- Thème appliqué avant le premier rendu pour éviter le flash.
- Images chargées en différé (`loading="lazy"`).
