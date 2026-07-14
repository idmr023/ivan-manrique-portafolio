import { getI18n, type Locale, locales } from '@/i18n';
import { getPortfolioData } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Projects from '@/components/sections/Projects';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getI18n(locale as Locale);
  const { projects } = getPortfolioData(i18n);
  const langPrefix = locale === 'es' ? '' : `/${locale}`;

  const navItems = [
    { id: 'hero', label: i18n.NAV_HOME, href: langPrefix || '/' },
    { id: 'projects', label: i18n.PROJECTS_TITLE },
  ];

  return (
    <>
      <Navbar locale={locale as Locale} langPrefix={langPrefix} navItems={navItems} />
      <main className="relative overflow-hidden">
        {/* Decorative cyberpunk neon shapes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Neon circle top-right */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 0, 170, 0.4) 0%, transparent 70%)',
            }}
          />
          {/* Neon circle bottom-left */}
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
            }}
          />
          {/* Diagonal cyan line */}
          <div
            className="absolute top-1/4 left-0 w-full h-px opacity-10"
            style={{
              background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
              transform: 'rotate(-15deg)',
            }}
          />
          {/* Small decorative triangle */}
          <div
            className="absolute top-20 left-1/4 w-0 h-0 opacity-[0.08]"
            style={{
              borderLeft: '20px solid transparent',
              borderRight: '20px solid transparent',
              borderBottom: '35px solid #00ff00',
            }}
          />
          {/* Small decorative triangle rotated */}
          <div
            className="absolute bottom-32 right-1/4 w-0 h-0 opacity-[0.06]"
            style={{
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '25px solid #ff00aa',
              transform: 'rotate(180deg)',
            }}
          />
        </div>

        {/* Title section */}
        <section className="pt-32 pb-8 px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className="text-5xl sm:text-7xl font-display font-bold tracking-tight"
              style={{
                color: '#e2e8f0',
                textShadow: '0 0 40px rgba(56, 189, 248, 0.3), 0 0 80px rgba(56, 189, 248, 0.1)',
              }}
            >
              {i18n.PROJECTS_TITLE}
            </h1>
          </div>
        </section>

        {/* Projects content */}
        <section className="pb-24 px-0 relative">
          <Projects i18n={i18n} projects={projects} standalone />
        </section>
      </main>
      <Footer i18n={i18n} langPrefix={langPrefix} />
    </>
  );
}
