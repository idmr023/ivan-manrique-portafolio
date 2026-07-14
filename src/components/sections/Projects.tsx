'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Check, AlertCircle, TrendingUp } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import { fadeUpLg } from '@/lib/animations';

import type { Project } from '@/lib/data';

interface ProjectsProps {
  i18n: Record<string, string>;
  projects: Project[];
}

type CategoryKey = 'all' | 'dataAnalysis' | 'portafolios' | 'businessManagement';

interface CategoryConfig {
  label: string;
  color: string;
  ids: string[];
}

const projectCategories: Record<string, CategoryConfig> = {
  dataAnalysis: {
    label: '(Análisis de Datos)',
    color: '#f472b6',
    ids: ['commercial-bi', 'cx-metrics', 'social-eda'],
  },
  portafolios: {
    label: '(Portafolios)',
    color: '#38bdf8',
    ids: ['law-firm'],
  },
  businessManagement: {
    label: '(Sistemas de Gestión Comercial)',
    color: '#f59e0b',
    ids: ['ripnel', 'ollas-comunes'],
  },
};

export default function Projects({ i18n, projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    const cat = projectCategories[activeCategory];
    if (!cat) return projects;
    return projects.filter((proj) => cat.ids.includes(proj.id));
  }, [activeCategory, projects]);

  const tabBase = 'px-6 py-2.5 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 border focus:outline-none focus:ring-2';
  const tabInactive = 'border-sky-400/20 hover:border-sky-400/40 hover:bg-sky-400/5 hover:scale-105 focus:ring-sky-400/50';
  const tabActiveColor = 'border-white/30 scale-105';

  return (
    <SectionContainer sectionNumber="04" title={i18n.PROJECTS_TITLE} id="projects">
      <p className="text-slate-500 text-sm mb-10 font-mono text-center">{i18n.PROJECTS_SUBTITLE}</p>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        <button
          onClick={() => setActiveCategory('all')}
          className={`${tabBase} ${activeCategory === 'all' ? tabActiveColor : tabInactive}`}
          style={{
            color: activeCategory === 'all' ? '#fff' : '#94a3b8',
            backgroundColor: activeCategory === 'all' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(8, 8, 12, 0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Todos
        </button>
        {Object.entries(projectCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as CategoryKey)}
            className={`${tabBase} ${activeCategory === key ? tabActiveColor : tabInactive}`}
            style={{ 
              color: activeCategory === key ? category.color : `${category.color}80`,
              backgroundColor: activeCategory === key ? `${category.color}15` : 'rgba(8, 8, 12, 0.6)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, index) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-[42%] shrink-0">
                <div className="aspect-[4/3] bg-void-lighter border border-sky-400/8 rounded-md overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="w-full lg:w-[58%]">
                {proj.featured && (
                  <span className="inline-block text-xs font-mono uppercase tracking-wide px-2.5 py-1 rounded bg-sky-400/10 text-sky-400 border border-sky-400/20 mb-3">
                    ★ {i18n.PROJECTS_LABEL_FEATURED}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-5 tracking-tight leading-snug">
                  {proj.title}
                </h3>

                <div className="border-l-2 border-amber-400/50 bg-amber-400/5 pl-4 py-2.5 mb-4 rounded-r">
                  <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest block mb-1 flex items-center gap-1">
                    <AlertCircle size={10} />
                    {i18n.PROJECTS_LABEL_PROBLEM}
                  </span>
                  <p className="text-slate-400 text-sm leading-relaxed">{proj.problem}</p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{proj.desc}</p>

                <div className="mb-5">
                  <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest block mb-2">
                    {i18n.PROJECTS_LABEL_STACK}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {proj.techs.split(' | ').map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded bg-sky-400/5 text-sky-400/80 border border-sky-400/15 font-mono transition-colors hover:border-sky-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-l-2 border-sky-400/50 bg-sky-400/5 pl-4 py-2.5 mb-5 rounded-r">
                  <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest block mb-1 flex items-center gap-1">
                    <TrendingUp size={10} />
                    {i18n.PROJECTS_LABEL_RESULT}
                  </span>
                  <p className="text-sky-300 text-sm font-medium flex items-center gap-2">
                    <Check size={14} />
                    {proj.result}
                  </p>
                </div>

                <div className="flex gap-5">
                  {proj.demo !== '#' && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-400 hover:text-sky-300 font-medium no-underline flex items-center gap-1.5 transition-colors"
                    >
                      {i18n.PROJECTS_LABEL_DEMO}
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {proj.repo !== '#' && (
                    <a
                      href={proj.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-500 hover:text-slate-300 font-medium no-underline flex items-center gap-1.5 transition-colors"
                    >
                      <Github size={14} />
                      {i18n.PROJECTS_LABEL_REPO}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}
