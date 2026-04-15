import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://johndoe.dev';

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
        <div className="bg-[#F7F4EF] rounded-xl border-[0.5px] border-[#E0DAD0] flex flex-col overflow-visible max-w-[1400px] w-full mx-auto shadow-sm relative">

          <NavBar />

          {children}

          <footer className="bg-[#0F0D0A] px-8 py-9 flex items-center justify-between">
            <span className="font-serif text-lg text-[#F7F4EF]">Arun Krishnasamy</span>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">LinkedIn</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">GitHub</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Kaggle</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Instagram</Link>
            </div>
            <Link href="mailto:contact@arun.dev" className="text-[13px] text-[#F7F4EF] border-[0.5px] border-[#5A5650] px-5 py-2 rounded-full hover:bg-white/10 transition-colors">
              Get in touch →
            </Link>
          </footer>

        </div>
      </body>
    </html>
  );
}
