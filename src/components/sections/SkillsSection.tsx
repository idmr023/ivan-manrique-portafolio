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
}

export default function SkillsSection({ i18n, skills, techNodes }: SkillsSectionProps) {
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
    <div className="py-16">
      <SectionContainer sectionNumber="05" title={i18n.SKILLS_MAP_TITLE} id="skills">
        {isMobile ? (
          <TerminalSkills {...skillsProps} />
        ) : (
          <SkillsUniverse {...skillsProps} />
        )}
      </SectionContainer>
    </div>
  );
}
