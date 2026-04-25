import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Shell from '@/components/Shell';
import {
  DEFAULT_OG_IMAGE,
  GLOBAL_KEYWORDS,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/seo';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
});

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F7F4EF',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — Arun Krishnasamy',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    {
      name: PERSON_NAME,
      url: SITE_URL,
    },
  ],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: 'technology',
  keywords: GLOBAL_KEYWORDS,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans min-h-screen p-4 md:p-8 flex flex-col bg-[#F7F4EF]`}>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}
