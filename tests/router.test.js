import test from 'node:test';
import assert from 'node:assert/strict';
import { getLegacyRedirect, normalizePath, resolveRoute, ROUTES } from '../src/router.js';

test('normaliza rutas conocidas y trailing slash', () => {
  assert.equal(normalizePath('/forge/'), '/forge');
  assert.equal(resolveRoute('/prospect/'), ROUTES.prospect);
  assert.equal(resolveRoute('/commerce/'), ROUTES.commerce);
  assert.equal(resolveRoute('/estado-y-alcance'), ROUTES.status);
  assert.equal(resolveRoute('/terminos'), ROUTES.terms);
  assert.equal(resolveRoute('/ruta-inexistente'), 'not-found');
});

test('redirige hashes históricos solo desde la home', () => {
  assert.equal(getLegacyRedirect('/', '#forge'), '/forge');
  assert.equal(getLegacyRedirect('/', '#prospect'), '/prospect');
  assert.equal(getLegacyRedirect('/', '#commerce'), '/commerce');
  assert.equal(getLegacyRedirect('/contacto', '#forge'), null);
  assert.equal(getLegacyRedirect('/', '#que-es'), null);
});
