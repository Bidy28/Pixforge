/**
 * Configuration centrale de la marque et des coordonnées.
 * Les valeurs proviennent du fichier .env (voir .env.example).
 * Un champ vide masque automatiquement l'élément correspondant sur le site.
 */
const env = import.meta.env;

export const siteConfig = {
  brandName: 'PixForge',
  description:
    "PixForge est un studio de développement web et de solutions numériques, à Madagascar et à l'international.",
  email: env.VITE_CONTACT_EMAIL || '',
  phone: env.VITE_CONTACT_PHONE || '',
  whatsapp: env.VITE_WHATSAPP_NUMBER || '',
  linkedin: env.VITE_LINKEDIN_URL || '',
  contactEndpoint: env.VITE_CONTACT_ENDPOINT || '',
};

export function getContactChannels() {
  const channels = [];

  if (siteConfig.email) {
    channels.push({
      key: 'email',
      label: 'E-mail',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    });
  }

  if (siteConfig.phone) {
    channels.push({
      key: 'phone',
      label: 'Téléphone',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    });
  }

  if (siteConfig.whatsapp) {
    channels.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      value: 'Écrire sur WhatsApp',
      href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`,
    });
  }

  if (siteConfig.linkedin) {
    channels.push({
      key: 'linkedin',
      label: 'LinkedIn',
      value: 'Profil LinkedIn',
      href: siteConfig.linkedin,
    });
  }

  return channels;
}
