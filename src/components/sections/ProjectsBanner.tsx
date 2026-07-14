import { ArrowRight } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';

interface ProjectsBannerProps {
  i18n: Record<string, string>;
  langPrefix: string;
}

export default function ProjectsBanner({ i18n, langPrefix }: ProjectsBannerProps) {
  return (
    <SectionContainer sectionNumber="05" title={i18n.PROJECTS_TITLE} id="projects">
      <p className="text-slate-500 text-sm mb-10 font-mono text-center">{i18n.PROJECTS_SNEAK_PEEK}</p>

      <div className="flex justify-center">
        <a
          href={`${langPrefix}/projects`}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-sm uppercase tracking-wider transition-all duration-300 border border-sky-400/30 bg-sky-400/5 hover:bg-sky-400/15 hover:border-sky-400/60 hover:scale-105 text-sky-400 no-underline"
        >
          {i18n.PROJECTS_VIEW_ALL}
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </SectionContainer>
  );
}
