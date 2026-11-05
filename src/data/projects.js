/**
 * Réalisations affichées sur le site.
 *
 * Règles :
 * - Ne renseigner que des informations réelles et vérifiables.
 * - Un champ vide affiche un message « à compléter » au lieu d'un contenu inventé.
 * - demoUrl : uniquement une URL réelle et accessible. Laisser vide sinon.
 * - Les captures d'écran vont dans src/data/Projet/<Dossier>/ et sont référencées via shots().
 */

// Vite importe toutes les captures et fournit leur URL finale (hashée au build).
const shotFiles = import.meta.glob('./Projet/**/*.png', { eager: true, import: 'default' });

/** Construit la liste des captures d'un dossier : [['fichier.png', 'texte alternatif'], ...] */
function shots(folder, entries) {
  return entries.map(([file, alt]) => {
    const src = shotFiles[`./Projet/${folder}/${file}`];
    if (!src) throw new Error(`Capture introuvable : Projet/${folder}/${file}`);
    return { src, alt };
  });
}
export const projectCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Sites web' },
  { id: 'metier', label: 'Applications métier' },
  { id: 'app', label: 'Applications web' },
  { id: 'api', label: 'API et backend' },
];

export const projects = [
  // {
  //   slug: 'peccs-fr',
  //   name: 'PeCcS.fr',
  //   category: 'web', // À confirmer
  //   status: 'draft', // Passer à 'published' une fois la fiche complétée
  //   summary: 'Projet freelance réalisé à deux. Présentation à compléter avec les informations réelles du besoin.',
  //   context: '', // Contexte et type de client (sans information confidentielle)
  //   problem: '', // Problème à résoudre
  //   solution: '', // Solution développée
  //   features: [], // Ex. : ['Gestion des comptes', 'Tableau de bord']
  //   technologies: [], // Uniquement après confirmation, ex. : ['React', 'Laravel']
  //   contributions: [], // Ex. : [{ member: 'Nom', description: 'Contribution précise' }]
  //   screenshots: [], // Ex. : [{ src: '/projects/peccs-1.jpg', alt: 'Page d’accueil de PeCcS.fr' }]
  //   demoUrl: '', // Ex. : 'https://peccs.fr' (URL réelle uniquement)
  // },
  {
    slug: 'pixclinic',
    name: 'PixClinic',
    category: 'metier', // À confirmer
    status: 'draft',
    summary:
      'Logiciel de gestion de clinique : rendez-vous, dossiers patients, praticiens, consultations, facturation et paiements.',
    context:
      'Les cliniques et cabinets médicaux pluridisciplinaires jonglent au quotidien entre l’accueil des patients, l’agenda de plusieurs praticiens, le suivi médical et la facturation auprès des patients et des assureurs. PixClinic a été conçu pour réunir toute cette activité dans un seul outil, utilisable aussi bien par l’accueil que par les médecins.',
    problem:
      'Agendas papier ou tableurs, dossiers éparpillés, factures suivies à la main : l’équipe perd du temps à ressaisir les mêmes informations, les retards de paiement passent inaperçus et il est difficile d’avoir une vue claire de la journée (patients en salle d’attente, annulations, admissibilité des assurances à vérifier).',
    solution:
      'Nous avons développé une application web centralisée qui accompagne tout le parcours patient. Le tableau de bord présente en un coup d’œil les rendez-vous du jour, la salle d’attente, le taux de présence et la facturation du mois, avec une liste de tâches et des alertes (assurance qui expire, facture impayée). Le praticien saisit motif, signes vitaux, notes, prescriptions et suivi dans un écran de consultation clair, puis signe la consultation. La facturation, le suivi des paiements et les rapports d’activité découlent directement de ces données, sans double saisie. Les accès sont adaptés au rôle de chaque utilisateur (médecin, accueil, administration).',
    features: [
      'Tableau de bord du jour : rendez-vous, salle d’attente, taux de présence, facturation du mois',
      'Tâches du jour et alertes automatiques (assurance qui expire, facture impayée)',
      'Dossiers patients et fiches administratives',
      'Planning des rendez-vous par praticien, y compris téléconsultations et urgences',
      'Écran de consultation : motif, signes vitaux, notes, prescriptions, suivi et signature',
      'Journal horodaté de chaque consultation',
      'Facturation, suivi des paiements et relances',
      'Rapports d’activité et paramétrage de la clinique',
      'Accès selon le rôle de l’utilisateur',
    ],
    technologies: ['React', 'Laravel', 'MySQL'],
    contributions: [],
    screenshots: shots('Clinique', [
      ['pixclinic_01_tableau_de_bord.png', 'PixClinic : tableau de bord avec rendez-vous du jour et alertes'],
      ['pixclinic_02_patients.png', 'PixClinic : liste des patients'],
      ['pixclinic_03_planning.png', 'PixClinic : planning des rendez-vous'],
      ['pixclinic_04_fiche_administrative.png', 'PixClinic : fiche administrative d’un patient'],
      ['pixclinic_05_praticiens.png', 'PixClinic : gestion des praticiens'],
      ['pixclinic_06_consultation.png', 'PixClinic : écran de consultation'],
      ['pixclinic_07_facturation.png', 'PixClinic : facturation'],
      ['pixclinic_08_paiements.png', 'PixClinic : suivi des paiements'],
      ['pixclinic_09_rapports.png', 'PixClinic : rapports d’activité'],
      ['pixclinic_10_parametres.png', 'PixClinic : paramètres'],
    ]),
    demoUrl: '',
  },
  {
    slug: 'pixgestion',
    name: 'PixGestion',
    category: 'metier', // À confirmer
    status: 'draft',
    summary:
      'Application de gestion commerciale : produits, stocks, caisse, ventes, devis et factures.',
    context:
      'Les commerces de proximité, épiceries et petits distributeurs ont besoin de vendre vite au comptoir tout en gardant le contrôle de leur stock et de leur chiffre d’affaires. PixGestion a été pensé pour ces structures, avec une prise en charge native de l’Ariary et des paiements par Mobile Money.',
    problem:
      'Ventes notées sur un cahier, stock compté à la main, ruptures découvertes trop tard, devis et factures préparés séparément : le gérant n’a pas de vision fiable de sa marge ni de la valeur de son stock, et le passage en caisse est lent aux heures d’affluence.',
    solution:
      'Nous avons conçu une application de gestion commerciale complète, du catalogue produits à la facture. La caisse existe en deux versions : une version bureau et une version tactile, optimisée pour les tablettes, avec recherche ou scan de produit, filtres par catégorie, ticket en temps réel et encaissement en espèces ou en Mobile Money. Chaque vente met à jour le stock automatiquement, et le tableau de bord affiche chiffre d’affaires, nombre de ventes, marge estimée, valeur du stock et produits sous le seuil d’alerte. Devis, factures, clients et fournisseurs sont gérés dans le même outil.',
    features: [
      'Tableau de bord : chiffre d’affaires, nombre de ventes, marge estimée, valeur du stock',
      'Catalogue produits avec fiches détaillées',
      'Suivi du stock et alertes de rupture ou de seuil bas',
      'Caisse bureau et caisse tactile pour tablette',
      'Encaissement en espèces et en Mobile Money',
      'Création de ventes et historique des transactions',
      'Devis et factures',
      'Gestion des clients et des fournisseurs',
      'Rapports d’activité',
    ],
    technologies: ['React', 'Laravel', 'MySQL'],
    contributions: [],
    screenshots: shots('PixGestion', [
      ['pixgestion_tableau_de_bord_seul.png', 'PixGestion : tableau de bord avec chiffre d’affaires et alertes de stock'],
      ['pixgestion_03_produits_liste.png', 'PixGestion : liste des produits'],
      ['pixgestion_04_produit_fiche.png', 'PixGestion : fiche produit'],
      ['pixgestion_10_caisse_desktop.png', 'PixGestion : caisse en version bureau'],
      ['pixgestion_10_caisse_tactile.png', 'PixGestion : caisse en version tactile'],
      ['pixgestion_11_vente_creation.png', 'PixGestion : création d’une vente'],
      ['pixgestion_12_ventes_historique.png', 'PixGestion : historique des ventes'],
      ['pixgestion_13_devis_liste.png', 'PixGestion : liste des devis'],
      ['pixgestion_14_facture_detail.png', 'PixGestion : détail d’une facture'],
    ]),
    demoUrl: '',
  },
  {
    slug: 'pixrh',
    name: 'PixRH',
    category: 'metier', // À confirmer
    status: 'draft',
    summary:
      'Logiciel de gestion des ressources humaines : personnel, contrats, congés, paie, recrutement et documents.',
    context:
      'Pour une PME, la gestion du personnel repose souvent sur une seule personne qui doit suivre les contrats, les congés, la paie, les recrutements et les documents administratifs. PixRH a été conçu pour donner à cette personne un outil unique et fiable, qui l’alerte sur ce qui doit être traité.',
    problem:
      'Informations réparties entre tableurs, courriels et dossiers papier, demandes de congé suivies à la main, paie préparée sans contrôle automatique : le risque d’erreur et d’oubli est élevé (certificat médical non reçu, relevé d’emploi à émettre, heures supplémentaires non approuvées).',
    solution:
      'Nous avons développé un logiciel RH qui centralise tout le cycle de vie du salarié. Le tableau de bord met en avant l’effectif, la masse salariale, les absences du jour, les postes ouverts et une liste d’actions requises classées par priorité et par échéance. La paie se prépare par période : les heures sont importées du pointage, les retenues sont calculées, et l’outil signale les anomalies avant la transmission à la banque. Il génère ensuite les bulletins de paie. Contrats, congés, calendrier de présence, recrutement, documents et rapports RH complètent l’ensemble.',
    features: [
      'Tableau de bord RH : effectif, masse salariale, absences, postes ouverts, demandes à traiter',
      'Actions requises classées par priorité et par échéance',
      'Dossiers du personnel, profils salariés et départements',
      'Gestion des contrats de travail',
      'Congés, absences et calendrier de présence',
      'Préparation de la paie avec contrôles avant transmission à la banque',
      'Bulletins de paie et historique des périodes',
      'Suivi du recrutement et des candidats',
      'Documents du personnel et rapports RH',
    ],
    technologies: ['React', 'Laravel', 'MySQL'],
    contributions: [],
    screenshots: shots('RH', [
      ['pixrh_01_tableau_de_bord.png', 'PixRH : tableau de bord RH avec actions requises et congés du jour'],
      ['pixrh_02_liste_personnel.png', 'PixRH : liste du personnel'],
      ['pixrh_03_profil_salarie.png', 'PixRH : profil d’un salarié'],
      ['pixrh_04_departements.png', 'PixRH : départements'],
      ['pixrh_05_contrats.png', 'PixRH : contrats'],
      ['pixrh_06_conges_absences.png', 'PixRH : congés et absences'],
      ['pixrh_07_calendrier_presence.png', 'PixRH : calendrier de présence'],
      ['pixrh_08_preparation_paie.png', 'PixRH : préparation de la paie'],
      ['pixrh_09_bulletin_de_paie.png', 'PixRH : bulletin de paie'],
      ['pixrh_10_recrutement.png', 'PixRH : recrutement'],
      ['pixrh_11_documents_personnel.png', 'PixRH : documents du personnel'],
      ['pixrh_12_rapports_rh.png', 'PixRH : rapports RH'],
    ]),
    demoUrl: '',
  },
];
