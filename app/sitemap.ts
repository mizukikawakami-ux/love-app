import type { MetadataRoute } from 'next';
import { ALL_SLUGS } from '@/lib/slug';

const BASE = 'https://love-app-1.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticUrls: MetadataRoute.Sitemap = [
        { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ];

    const typeUrls: MetadataRoute.Sitemap = ALL_SLUGS.map((slug) => ({
        url: `${BASE}/type/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const compatUrls: MetadataRoute.Sitemap = [];
    for (const a of ALL_SLUGS) for (const b of ALL_SLUGS) {
        compatUrls.push({
            url: `${BASE}/compatibility/${a}/${b}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
        });
    }

    return [...staticUrls, ...typeUrls, ...compatUrls];
}
