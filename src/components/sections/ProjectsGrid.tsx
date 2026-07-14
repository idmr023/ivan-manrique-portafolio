'use client';

import { ArrowRight } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import type { Project } from '@/lib/data';

interface ProjectsGridProps {
  i18n: Record<string, string>;
  projects: Project[];
  langPrefix: string;
}

const GRID_IDS = ['ripnel', 'commercial-bi', 'cx-metrics', 'social-eda'];

export default function ProjectsGrid({ i18n, projects, langPrefix }: ProjectsGridProps) {
  const gridProjects = projects.filter((p) => GRID_IDS.includes(p.id));

  return (
    <SectionContainer sectionNumber="05" title={i18n.PROJECTS_TITLE} id="projects">
      <p className="text-slate-500 text-sm mb-10 font-mono text-center">{i18n.PROJECTS_SUBTITLE}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {gridProjects.map((proj) => (
          <a
            key={proj.id}
            href={`${langPrefix}/projects`}
            className="group relative aspect-[4/3] bg-void-lighter border border-sky-400/8 rounded-md overflow-hidden block transition-all duration-500 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <span className="text-sm font-mono text-white tracking-wide">{proj.title}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href={`${langPrefix}/projects`}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-wider transition-all duration-300 border border-sky-400/20 hover:border-sky-400/40 hover:bg-sky-400/5 text-sky-400 no-underline"
        >
          {i18n.PROJECTS_VIEW_ALL}
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </SectionContainer>
  );
}
