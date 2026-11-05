import { Globe, LayoutDashboard, Server, Wrench, Workflow } from 'lucide-react';

export const services = [
  {
    id: 'sites',
    icon: Globe,
    title: 'Développement de sites web',
    description: 'Des sites clairs, rapides et pensés pour informer vos visiteurs et les convaincre de vous contacter.',
    items: [
      'Sites vitrines',
      'Sites professionnels',
      'Interfaces responsive',
      "Intégration de formulaires et d'API",
    ],
  },
  {
    id: 'apps',
    icon: LayoutDashboard,
    title: 'Applications web sur mesure',
    description: 'Des outils construits autour de vos processus, et non l’inverse.',
    items: [
      'Applications de gestion',
      'Tableaux de bord',
      'Gestion de stock et de ventes',
      'Gestion des utilisateurs et des données',
    ],
  },
  {
    id: 'backend',
    icon: Server,
    title: 'Backend et API',
    description: 'Une base solide, sécurisée et documentée pour vos applications et vos futurs développements.',
    items: [
      'Développement avec Laravel',
      'Conception d’API REST',
      'Modélisation de bases de données',
      'Authentification et gestion des accès',
    ],
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance et amélioration',
    description: 'Votre application reste fiable et évolue avec votre activité.',
    items: ['Correction de bugs', 'Ajout de fonctionnalités', 'Optimisation', 'Accompagnement technique'],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automatisation et outils métier',
    description: 'Moins de tâches manuelles, des informations centralisées et des rapports fiables.',
    items: [
      'Digitalisation des tâches répétitives',
      'Centralisation des informations',
      'Génération de rapports',
      'Adaptation des processus existants',
    ],
  },
];
