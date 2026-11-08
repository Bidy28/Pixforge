# Éléments de marque PixForge

Monogramme construit géométriquement (hampe + panse elliptique, contreforme ronde).
Bleu de marque : `#0071e3`, dégradé `#1e8bff` → `#0059cc`.

| Fichier | Usage |
| --- | --- |
| `pixforge-avatar-1024.png` | Photo de profil (WhatsApp, LinkedIn, Google) — carré plein, sûr au recadrage circulaire |
| `pixforge-icon-1024.png` | Icône d'application, coins arrondis, fond transparent |
| `pixforge-avatar.svg` | Version vectorielle du carré plein |
| `pixforge-icon.svg` | Version vectorielle à coins arrondis |
| `pixforge-mark.svg` | Lettre seule, prend la couleur du texte (`currentColor`) |
| `social/linkedin-couverture-4200x700.png` | Couverture de la page LinkedIn |
| `social/facebook-couverture-1702x630.png` | Couverture de la Page Facebook (851×315 en double définition) |

Mise en place des comptes : voir `docs/reseaux-sociaux.md`.

Le favicon du site (`public/favicon.svg`) reprend le même tracé.

## Régénérer les PNG

Le tracé est entièrement paramétré (taille, épaisseur de hampe, contreforme) :

```bash
node scripts/generate-logo.cjs public/brand            # logos et avatars
python scripts/generate-social.py public/brand/social  # bannières
```

Modifier `SIZE` en tête de `scripts/generate-logo.cjs` pour une autre définition.
