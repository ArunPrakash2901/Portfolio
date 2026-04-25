export function isAmbientBackgroundRoute(pathname) {
  return /^\/(projects|experiments|writing)\/[^/]+\/?$/.test(pathname);
}
