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
      <main className="pt-24">
        <Projects i18n={i18n} projects={projects} />
      </main>
      <Footer i18n={i18n} langPrefix={langPrefix} />
    </>
  );
}
