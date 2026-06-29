import type { Metadata } from 'next';
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

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
    <html lang="es" className={`${inter.variable} ${montserrat.variable} ${jetbrains.variable}`}>
      <body className="bg-void text-slate-200 font-sans antialiased">{children}</body>
    </html>
  );
}
