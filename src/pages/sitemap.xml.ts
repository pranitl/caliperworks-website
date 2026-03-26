import type { APIRoute } from 'astro';
import { publicRoutes, siteConfig } from '../data/site';

export const GET: APIRoute = () => {
  const lastModified = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
  .map(
    (route) => `  <url>
    <loc>${new URL(route, siteConfig.siteUrl).toString()}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
