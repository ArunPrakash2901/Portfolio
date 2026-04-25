import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunpk.ai';
export const SITE_HOST = new URL(SITE_URL).host;
export const SITE_LOCALE = 'en_AU';
export const PERSON_NAME = 'Arun Krishnasamy';
export const PERSON_ROLE = 'Data & AI Professional';
export const PERSON_LOCATION = 'Melbourne, Australia';
export const SITE_NAME = 'Arun Krishnasamy — Data & AI Portfolio';
export const SITE_TITLE = 'Arun Krishnasamy — Data & AI Portfolio';
export const SITE_DESCRIPTION =
  'Turning messy data into decisions people trust. A portfolio spanning analytics, machine learning, data engineering, and the full data stack.';
export const SOCIAL_LINKS = [
  'https://www.linkedin.com/in/apkrishnasamy/',
  'https://github.com/ArunPrakash2901',
  'https://www.kaggle.com/lethargicmaster',
];
export const GLOBAL_KEYWORDS = [
  'Arun Krishnasamy',
  'data portfolio',
  'data analytics',
  'machine learning',
  'data engineering',
  'Melbourne data professional',
];

type MetadataTitle = string | { absolute: string };

type BuildMetadataOptions = {
  title: MetadataTitle;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  ogTag?: string;
  category?: string;
  keywords?: string[];
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

function getTitleText(title: MetadataTitle) {
  return typeof title === 'string' ? title : title.absolute;
}

export function buildOgImageUrl(title: string, tag: string) {
  const params = new URLSearchParams({ title, tag });
  return `/api/og?${params.toString()}`;
}

export const DEFAULT_OG_IMAGE = buildOgImageUrl(PERSON_NAME, 'Data & AI Portfolio');

export function toAbsoluteUrl(url: string) {
  return new URL(url, SITE_URL).toString();
}

export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function normalizeFlexibleDate(value?: string) {
  if (!value) return undefined;
  if (/^\d{4}$/.test(value)) return `${value}-01-01`;
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return value;
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const titleText = getTitleText(options.title);
  const keywords = Array.from(
    new Set([...GLOBAL_KEYWORDS, ...(options.keywords ?? [])])
  );
  const image =
    options.image ?? buildOgImageUrl(titleText, options.ogTag ?? 'Portfolio');

  const openGraph: Metadata['openGraph'] =
    options.type === 'article'
      ? {
          type: 'article',
          locale: SITE_LOCALE,
          url: options.path,
          siteName: SITE_NAME,
          title: titleText,
          description: options.description,
          publishedTime: options.publishedTime,
          authors: options.authors ?? [PERSON_NAME],
          tags: options.keywords,
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: options.imageAlt ?? titleText,
            },
          ],
        }
      : {
          type: 'website',
          locale: SITE_LOCALE,
          url: options.path,
          siteName: SITE_NAME,
          title: titleText,
          description: options.description,
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: options.imageAlt ?? titleText,
            },
          ],
        };

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: options.path,
    },
    category: options.category ?? 'technology',
    keywords,
    robots: options.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: options.description,
      images: [image],
    },
  };
}
