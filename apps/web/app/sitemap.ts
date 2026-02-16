import type { MetadataRoute } from 'next';
import { VALID_SECTIONS, SECTION_ITEMS } from './docs/route-config';

const BASE_URL = 'https://thesage.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: today, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/docs`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/llms.txt`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/llms-full.txt`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/docs/api.json`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Section pages (e.g. /docs/actions, /docs/forms, etc.)
  const sectionPages: MetadataRoute.Sitemap = VALID_SECTIONS.map((section) => ({
    url: `${BASE_URL}/docs/${section}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: section === 'components' ? 0.9 : 0.8,
  }));

  // Sub-pages (e.g. /docs/actions/button, /docs/forms/input, etc.)
  const subPages: MetadataRoute.Sitemap = [];
  for (const [section, items] of Object.entries(SECTION_ITEMS)) {
    for (const item of items) {
      subPages.push({
        url: `${BASE_URL}/docs/${section}/${item}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...sectionPages, ...subPages];
}
