import type { Metadata } from 'next';
import { Chakra_Petch, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const display = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ivan-manrique-portfolio.vercel.app'),
  title: 'Ivan Manrique | Frontend Dev & Data Analyst',
  description: 'Portafolio profesional de Ivan Manrique — Desarrollador Frontend & Data Analyst especializado en React, Next.js, Python y Data Analysis.',
  keywords: ['Frontend Developer', 'Data Analyst', 'React', 'Next.js', 'Python', 'SQL', 'Tableau', 'Portfolio'],
  authors: [{ name: 'Ivan Daniel Manrique Roa' }],
  openGraph: {
    title: 'Ivan Manrique | Frontend Dev & Data Analyst',
    description: 'Desarrollador Frontend & Data Analyst. Transformo datos en decisiones e ideas en interfaces.',
    type: 'website',
    images: ['/profile.webp'],
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-void text-slate-200 font-sans antialiased">{children}</body>
    </html>
  );
}
