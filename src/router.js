export const ROUTES = Object.freeze({
  home: '/',
  forge: '/forge',
  prospect: '/prospect',
  commerce: '/commerce',
  status: '/estado-y-alcance',
  contact: '/contacto',
  privacy: '/privacidad',
  terms: '/terminos',
});

const knownPaths = new Set(Object.values(ROUTES));

export function normalizePath(pathname = '/') {
  if (!pathname || pathname === '/') return '/';
  const normalized = pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  return normalized || '/';
}

export function resolveRoute(pathname) {
  const path = normalizePath(pathname);
  if (knownPaths.has(path)) return path;
  return 'not-found';
}

export function getLegacyRedirect(pathname, hash) {
  if (normalizePath(pathname) !== '/') return null;
  if (hash === '#forge') return ROUTES.forge;
  if (hash === '#prospect') return ROUTES.prospect;
  if (hash === '#commerce') return ROUTES.commerce;
  return null;
}

export function isPlainLeftClick(event) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
