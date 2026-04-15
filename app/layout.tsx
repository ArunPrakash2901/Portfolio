import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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
    default: 'John Doe — Data & AI Portfolio',
    template: '%s — John Doe',
  },
  description: 'Turning messy data into decisions people trust. A portfolio spanning analytics, machine learning, data engineering, and the full data stack.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: BASE_URL,
    siteName: 'John Doe — Data Portfolio',
    title: 'John Doe — Data & AI Portfolio',
    description: 'Turning messy data into decisions people trust. A portfolio spanning analytics, machine learning, data engineering, and the full data stack.',
    images: [
      {
        url: '/api/og?title=John%20Doe&tag=Data%20%26%20AI%20Portfolio',
        width: 1200,
        height: 630,
        alt: 'John Doe — Data & AI Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe — Data & AI Portfolio',
    description: 'Turning messy data into decisions people trust.',
    images: ['/api/og?title=John%20Doe&tag=Data%20%26%20AI%20Portfolio'],
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
      <body className={`${dmSans.variable} ${dmSerif.variable} font-sans min-h-screen p-4 md:p-8 flex flex-col`}>
        <div className="bg-[#F7F4EF] rounded-xl border-[0.5px] border-[#E0DAD0] flex flex-col overflow-hidden max-w-[1400px] w-full mx-auto shadow-sm">
          
          <div className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999] px-3 py-1.5 bg-[#EFEBE3] border-b-[0.5px] border-[#E0DAD0] flex items-center gap-2">
            nav
          </div>
          
          <header className="flex items-center justify-between px-8 py-4 bg-[#F7F4EF] border-b-[0.5px] border-[#E0DAD0]">
            <Link href="/" className="font-serif text-base text-[#1A1814]">John Doe</Link>
            <nav className="flex items-center gap-7">
              <Link href="/#work" className="text-[13px] text-[#5A5650] hover:text-[#1A1814] transition-colors">Work</Link>
              <Link href="/#sandbox" className="text-[13px] text-[#5A5650] hover:text-[#1A1814] transition-colors">Sandbox</Link>
              <Link href="/#writing" className="text-[13px] text-[#5A5650] hover:text-[#1A1814] transition-colors">Writing</Link>
              <Link href="/resume.pdf" className="text-[13px] text-[#5A5650] hover:text-[#1A1814] transition-colors">Resume</Link>
              <Link href="mailto:contact@johndoe.com" className="text-[12px] text-[#1A1814] border-[0.5px] border-[#1A1814] px-4 py-1.5 rounded-full font-medium hover:bg-[#1A1814] hover:text-white transition-colors">
                Contact me
              </Link>
            </nav>
          </header>

          {children}

          <footer className="bg-[#0F0D0A] px-8 py-9 flex items-center justify-between">
            <span className="font-serif text-lg text-[#F7F4EF]">John Doe</span>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">LinkedIn</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">GitHub</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Kaggle</Link>
              <Link href="#" className="text-xs text-[#5A5650] hover:text-[#F7F4EF] transition-colors">Instagram</Link>
            </div>
            <Link href="mailto:contact@johndoe.com" className="text-[13px] text-[#F7F4EF] border-[0.5px] border-[#5A5650] px-5 py-2 rounded-full hover:bg-white/10 transition-colors">
              Get in touch →
            </Link>
          </footer>

        </div>
      </body>
    </html>
  );
}
