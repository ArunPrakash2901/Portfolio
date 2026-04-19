import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Shell from '@/components/Shell';

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arun.dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Arun Krishnasamy — Data & AI Portfolio',
    template: '%s — Arun Krishnasamy',
  },
  description: 'Turning messy data into decisions people trust. A portfolio spanning analytics, machine learning, data engineering, and the full data stack.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: BASE_URL,
    siteName: 'Arun Krishnasamy — Data Portfolio',
    title: 'Arun Krishnasamy — Data & AI Portfolio',
    description: 'Turning messy data into decisions people trust. A portfolio spanning analytics, machine learning, data engineering, and the full data stack.',
    images: [
      {
        url: '/api/og?title=Arun%20Krishnasamy&tag=Data%20%26%20AI%20Portfolio',
        width: 1200,
        height: 630,
        alt: 'Arun Krishnasamy — Data & AI Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arun Krishnasamy — Data & AI Portfolio',
    description: 'Turning messy data into decisions people trust.',
    images: ['/api/og?title=Arun%20Krishnasamy&tag=Data%20%26%20AI%20Portfolio'],
  },
  robots: {
    index: true,
    follow: true,
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
