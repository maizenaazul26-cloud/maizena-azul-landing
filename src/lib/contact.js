import { contactCategories, WHATSAPP_NUMBER } from '../data/siteContent.js';

export function buildInstitutionalContactUrl({ categoryId = 'general', page = '/' } = {}) {
  const category =
    contactCategories.find((candidate) => candidate.id === categoryId) || contactCategories[0];
  const message = [
    'Hola, me contacto desde el sitio institucional de Blue Sky Group.',
    `Página de origen: ${page}.`,
    `Motivo: ${category.intent}.`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
