import { getI18n, type Locale, locales } from '@/i18n';
import { getUI } from '@/i18n/ui';
import { getPortfolioData } from '@/lib/data';
import Footer from '@/components/layout/Footer';
import ExperienceShell from '@/components/experience/ExperienceShell';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsTrail from '@/components/sections/ProjectsTrail';
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
  const ui = getUI(locale as Locale);
  const { techNodes, skills, projects, experience, certs } = getPortfolioData(i18n);
  const langPrefix = locale === 'es' ? '' : `/${locale}`;
  const projectsHref = `/${locale}/projects`;

  const checkpoints = [
    { id: 'hero', label: i18n.NAV_HOME },
    { id: 'about', label: i18n.NAV_ABOUT },
    { id: 'education', label: i18n.NAV_EDUCATION },
    { id: 'experience', label: i18n.NAV_EXPERIENCE },
    { id: 'skills', label: i18n.NAV_SKILLS_MAP },
    { id: 'projects', label: i18n.PROJECTS_TITLE },
    { id: 'contact', label: i18n.NAV_CONTACT },
  ];

  return (
    <>
      <ExperienceShell
        locale={locale as Locale}
        i18n={i18n}
        projects={projects}
        checkpoints={checkpoints}
        projectsHref={projectsHref}
      />

      <main className="relative z-10 overflow-x-clip">
        <Hero i18n={i18n} ui={ui} projectCount={projects.length} />
        <About i18n={i18n} ui={ui} />
        <Education i18n={i18n} ui={ui} certs={certs} />
        <Experience i18n={i18n} experience={experience} />
        <SkillsSection i18n={i18n} skills={skills} techNodes={techNodes} warpLabel={ui.warp} />
        <ProjectsTrail i18n={i18n} ui={ui} projects={projects} viewAllHref={projectsHref} />
        <Contact i18n={i18n} ui={ui} />
      </main>

      <Footer i18n={i18n} langPrefix={langPrefix} />
    </>
  );
}
