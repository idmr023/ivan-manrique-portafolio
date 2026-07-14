import { getI18n, type Locale, locales } from '@/i18n';
import { getPortfolioData } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Dashboard from '@/components/sections/Dashboard';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import SkillsSection from '@/components/sections/SkillsSection';
import Contact from '@/components/sections/Contact';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getI18n(locale as Locale);
  const { techNodes, skills, experience, certs } = getPortfolioData(i18n);
  const langPrefix = locale === 'es' ? '' : `/${locale}`;

  const navItems = [
    { id: 'hero', label: i18n.NAV_HOME },
    { id: 'about', label: i18n.NAV_ABOUT },
    { id: 'education', label: i18n.NAV_EDUCATION },
    { id: 'experience', label: i18n.NAV_EXPERIENCE },
    { id: 'projects', label: i18n.PROJECTS_TITLE, href: `${langPrefix}/projects` },
    { id: 'skills', label: i18n.NAV_SKILLS_MAP },
    { id: 'contact', label: i18n.NAV_CONTACT },
  ];

  return (
    <>
      <Navbar locale={locale as Locale} langPrefix={langPrefix} navItems={navItems} />

      <main>
        <Hero i18n={i18n} />
        <Dashboard i18n={i18n} />
        <About i18n={i18n} />
        <Education i18n={i18n} certs={certs} />
        <Experience i18n={i18n} experience={experience} />
        <SkillsSection i18n={i18n} skills={skills} techNodes={techNodes} />
        <Contact i18n={i18n} />
      </main>

      <Footer i18n={i18n} langPrefix={langPrefix} />
    </>
  );
}
