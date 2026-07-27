import test from 'node:test';
import assert from 'node:assert/strict';
import {
  contactCategories,
  contentCollections,
  featureFlags,
  launchStatuses,
  publicUnits,
  units,
  unitsBySlug,
} from '../src/data/siteContent.js';
import { buildInstitutionalContactUrl } from '../src/lib/contact.js';

test('todas las iniciativas consumen un estado institucional completo', () => {
  assert.equal(publicUnits.length, 3);

  for (const unit of publicUnits) {
    assert.ok(unit.path.startsWith('/'));
    assert.ok(unit.descriptor);
    assert.ok(unit.status.label);
    assert.equal(typeof unit.status.icon, 'string');
    assert.equal(unit.status.publicAvailability, false);
    assert.equal(unit.publicAvailability, false);
    assert.equal(typeof unit.acceptsProjectInquiries, 'boolean');
    assert.equal(unit.processesOperations, false);
    assert.equal(unit.acceptsFunds, false);
    assert.match(unit.lastReviewedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(unit.focusAreas.length > 0);
    assert.ok(unit.limits.length > 0);
    assert.ok(unit.seo.title);
    assert.ok(unit.seo.description);
  }
});

test('Forge recibe consultas, Prospect está en desarrollo y Commerce es conceptual', () => {
  assert.equal(unitsBySlug.forge.status.id, 'consultation');
  assert.equal(unitsBySlug.forge.acceptsProjectInquiries, true);
  assert.equal(unitsBySlug.prospect.status.id, 'development');
  assert.equal(unitsBySlug.prospect.acceptsProjectInquiries, true);
  assert.equal(unitsBySlug.commerce.status.id, 'concept');
  assert.equal(unitsBySlug.commerce.acceptsProjectInquiries, false);
  assert.equal(unitsBySlug.commerce.path, '/commerce');
});

test('estados futuros quedan preparados y solo el contacto comercial está habilitado', () => {
  assert.equal(launchStatuses['internal-pilot'].publicAvailability, false);
  assert.equal(launchStatuses.available.publicAvailability, true);
  assert.equal(featureFlags.commercialContact, true);
  assert.equal(featureFlags.publicRegistration, false);
  assert.equal(featureFlags.waitlist, false);
  assert.equal(featureFlags.leadForm, false);
  assert.equal(featureFlags.payments, false);
  assert.equal(featureFlags.privateArea, false);
});

test('CRM, automatización y reporting pertenecen a Prospect', () => {
  const prospectContent = JSON.stringify(unitsBySlug.prospect).toLowerCase();
  const forgeContent = JSON.stringify(unitsBySlug.forge).toLowerCase();

  assert.match(prospectContent, /crm/);
  assert.match(prospectContent, /automatización/);
  assert.match(prospectContent, /reporting/);
  assert.doesNotMatch(forgeContent, /\bcrm\b/);
  assert.doesNotMatch(forgeContent, /\breporting\b/);
});

test('el contacto conserva categoría y origen sin prometer contratación', () => {
  assert.deepEqual(
    contactCategories.map((category) => category.id),
    ['general', 'press', 'partnerships'],
  );

  const url = buildInstitutionalContactUrl({
    categoryId: 'press',
    page: '/contacto',
  });
  const message = decodeURIComponent(url.split('?text=')[1]);

  assert.match(message, /sitio institucional/);
  assert.match(message, /Página de origen: \/contacto/);
  assert.match(message, /consulta de prensa/);
  assert.doesNotMatch(message, /contratar|presupuesto|demo/i);

  const projectUrl = buildInstitutionalContactUrl({
    categoryId: 'general',
    page: '/forge',
  });
  const projectMessage = decodeURIComponent(projectUrl.split('?text=')[1]);
  assert.match(projectMessage, /idea|consulta|proyecto/i);
});

test('las colecciones futuras permanecen vacías y no generan páginas públicas', () => {
  assert.equal(units.length, 3);
  assert.deepEqual(contentCollections.updates, []);
  assert.deepEqual(contentCollections.cases, []);
  assert.deepEqual(contentCollections.resources, []);
});
