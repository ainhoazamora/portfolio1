const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix internal paths with the deployment base (`/portfolio` on GitHub Pages). */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}
