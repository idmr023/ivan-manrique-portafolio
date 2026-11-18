'use client';

import { useEffect, useState } from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import SkillsUniverse from '@/components/Skills/SkillsUniverse';
import TerminalSkills from '@/components/Skills/TerminalSkills';
import type { Skill, TechNode } from '@/lib/data';

interface SkillsSectionProps {
  i18n: Record<string, string>;
  skills: Skill[];
  techNodes: TechNode[];
  warpLabel?: string;
}

export default function SkillsSection({ i18n, skills, techNodes, warpLabel = '' }: SkillsSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const skillsProps = {
    skills,
    techNodes,
    title: i18n.SKILLS_MAP_TITLE,
    subtitle: i18n.SKILLS_MAP_SUBTITLE,
    hint: i18n.SKILLS_MAP_HINT,
    labels: {
      improved: i18n.SKILLS_MAP_LABEL_IMPROVED,
      improving: i18n.SKILLS_MAP_LABEL_IMPROVING,
    },
    categoryLabels: {
      frontend: i18n.SKILLS_MAP_CATEGORY_FRONTEND,
      data: i18n.SKILLS_MAP_CATEGORY_DATA,
      tools: i18n.SKILLS_MAP_CATEGORY_TOOLS,
      soft: i18n.SKILLS_MAP_CATEGORY_SOFT,
    },
    tooltipScenarioLabel: i18n.SKILLS_MAP_TOOLTIP_SCENARIO,
    terminalLabels: {
      execute: i18n.SKILLS_TERMINAL_EXECUTE,
      reexecute: i18n.SKILLS_TERMINAL_REEXECUTE,
      ready: i18n.SKILLS_TERMINAL_READY,
      summary: i18n.SKILLS_TERMINAL_SUMMARY,
    },
  };

  return (
    <div className="relative">
      {/* warp tunnel intro: background scene switches to hyperspace in this section */}
      <div aria-hidden="true" className="relative z-10 flex items-center justify-center gap-4 px-6 pt-10 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-violet-300/80">
        <span className="h-px w-10 sm:w-24 bg-gradient-to-r from-transparent to-violet-400/60" />
        <span className="text-center animate-terminal-flicker">{warpLabel}</span>
        <span className="h-px w-10 sm:w-24 bg-gradient-to-l from-transparent to-violet-400/60" />
      </div>
      <SectionContainer sectionNumber="04" title={i18n.SKILLS_MAP_TITLE} id="skills" wide>
        {isMobile ? (
          <TerminalSkills {...skillsProps} />
        ) : (
          <SkillsUniverse {...skillsProps} />
        )}
      </SectionContainer>
    </div>
  );
}
