import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Arun Portfolio',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F4EF',
    theme_color: '#F7F4EF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
