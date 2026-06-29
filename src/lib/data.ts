export interface Skill {
  id: number;
  name: string;
  state: 'improved' | 'improving';
  scenario: string;
  description: string;
  link: string;
  x: number;
  y: number;
  size: 'large' | 'normal';
}

export interface TechNode {
  name: string;
  category: 'frontend' | 'data' | 'tools';
  x: number;
  y: number;
}

export interface Project {
  title: string;
  problem: string;
  desc: string;
  result: string;
  techs: string;
  image: string;
  demo: string;
  repo: string;
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  period: string;
  bullets: string[];
}

export interface Cert {
  title: string;
  desc: string;
}

export interface DockItem {
  id: string;
  label: string;
}

export const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#38bdf8',
  data: '#f472b6',
  tools: '#f59e0b',
};

export const CATEGORY_COLORS_RGBA: Record<string, string> = {
  frontend: 'rgba(56, 189, 248, ',
  data: 'rgba(244, 114, 182, ',
  tools: 'rgba(245, 158, 11, ',
};

function generateTechNodes(
  items: string,
  category: 'frontend' | 'data' | 'tools',
  centerX: number,
  centerY: number,
  spreadX: number,
  spreadY: number
): TechNode[] {
  const techs = items.split(' | ');
  return techs.map((name, i) => {
    const angle = (i / techs.length) * Math.PI * 2;
    const r = 0.45 + 0.55 * ((i % 3) / 2);
    return {
      name,
      category,
      x: Math.max(3, Math.min(97, centerX + spreadX * r * Math.cos(angle))),
      y: Math.max(5, Math.min(95, centerY + spreadY * r * Math.sin(angle))),
    };
  });
}

export function getPortfolioData(i18n: Record<string, string>) {
  const techNodes: TechNode[] = [
    ...generateTechNodes(i18n.SKILLS_FRONTEND_ITEMS, 'frontend', 15, 20, 10, 13),
    ...generateTechNodes(i18n.SKILLS_DATA_ITEMS, 'data', 82, 20, 10, 13),
    ...generateTechNodes(i18n.SKILLS_TOOLS_ITEMS, 'tools', 50, 88, 28, 5),
  ];

  const skills: Skill[] = [
    { id: 1, name: i18n.SKILL_1_NAME, state: 'improved', scenario: i18n.SKILL_1_SCENARIO, description: i18n.SKILL_1_DESC, link: '#experience', x: 20, y: 42, size: 'large' },
    { id: 2, name: i18n.SKILL_2_NAME, state: 'improved', scenario: i18n.SKILL_2_SCENARIO, description: i18n.SKILL_2_DESC, link: '#education', x: 78, y: 40, size: 'normal' },
    { id: 3, name: i18n.SKILL_3_NAME, state: 'improving', scenario: i18n.SKILL_3_SCENARIO, description: i18n.SKILL_3_DESC, link: 'https://www.linkedin.com/in/ivan-daniel-manrique-roa-978a29187', x: 50, y: 70, size: 'normal' },
    { id: 4, name: i18n.SKILL_4_NAME, state: 'improved', scenario: i18n.SKILL_4_SCENARIO, description: i18n.SKILL_4_DESC, link: '#about', x: 12, y: 65, size: 'normal' },
    { id: 5, name: i18n.SKILL_5_NAME, state: 'improved', scenario: i18n.SKILL_5_SCENARIO, description: i18n.SKILL_5_DESC, link: '#projects', x: 72, y: 55, size: 'large' },
    { id: 6, name: i18n.SKILL_6_NAME, state: 'improving', scenario: i18n.SKILL_6_SCENARIO, description: i18n.SKILL_6_DESC, link: 'https://www.linkedin.com/in/ivan-daniel-manrique-roa-978a29187', x: 90, y: 68, size: 'normal' },
    { id: 7, name: i18n.SKILL_7_NAME, state: 'improved', scenario: i18n.SKILL_7_SCENARIO, description: i18n.SKILL_7_DESC, link: '#experience', x: 48, y: 38, size: 'large' },
    { id: 8, name: i18n.SKILL_8_NAME, state: 'improved', scenario: i18n.SKILL_8_SCENARIO, description: i18n.SKILL_8_DESC, link: '#experience', x: 38, y: 58, size: 'normal' },
  ];

  const projects: Project[] = [
    {
      title: i18n.PROJ_RIPNEL_TITLE,
      problem: i18n.PROJ_RIPNEL_PROBLEM,
      desc: i18n.PROJ_RIPNEL_DESC,
      result: i18n.PROJ_RIPNEL_RESULT,
      techs: i18n.PROJ_RIPNEL_TECHS,
      image: i18n.PROJ_RIPNEL_IMAGE,
      demo: i18n.PROJ_RIPNEL_DEMO,
      repo: i18n.PROJ_RIPNEL_REPO,
      featured: true,
    },
    {
      title: i18n.PROJ_COMMERCIAL_BI_TITLE,
      problem: i18n.PROJ_COMMERCIAL_BI_PROBLEM,
      desc: i18n.PROJ_COMMERCIAL_BI_DESC,
      result: i18n.PROJ_COMMERCIAL_BI_RESULT,
      techs: i18n.PROJ_COMMERCIAL_BI_TECHS,
      image: i18n.PROJ_COMMERCIAL_BI_IMAGE,
      demo: i18n.PROJ_COMMERCIAL_BI_DEMO,
      repo: i18n.PROJ_COMMERCIAL_BI_REPO,
      featured: false,
    },
    {
      title: i18n.PROJ_CX_METRICS_TITLE,
      problem: i18n.PROJ_CX_METRICS_PROBLEM,
      desc: i18n.PROJ_CX_METRICS_DESC,
      result: i18n.PROJ_CX_METRICS_RESULT,
      techs: i18n.PROJ_CX_METRICS_TECHS,
      image: i18n.PROJ_CX_METRICS_IMAGE,
      demo: i18n.PROJ_CX_METRICS_DEMO,
      repo: i18n.PROJ_CX_METRICS_REPO,
      featured: false,
    },
    {
      title: i18n.PROJ_SOCIAL_EDA_TITLE,
      problem: i18n.PROJ_SOCIAL_EDA_PROBLEM,
      desc: i18n.PROJ_SOCIAL_EDA_DESC,
      result: i18n.PROJ_SOCIAL_EDA_RESULT,
      techs: i18n.PROJ_SOCIAL_EDA_TECHS,
      image: i18n.PROJ_SOCIAL_EDA_IMAGE,
      demo: i18n.PROJ_SOCIAL_EDA_DEMO,
      repo: i18n.PROJ_SOCIAL_EDA_REPO,
      featured: false,
    },
    {
      title: i18n.PROJ_LAW_FIRM_TITLE,
      problem: i18n.PROJ_LAW_FIRM_PROBLEM,
      desc: i18n.PROJ_LAW_FIRM_DESC,
      result: i18n.PROJ_LAW_FIRM_RESULT,
      techs: i18n.PROJ_LAW_FIRM_TECHS,
      image: i18n.PROJ_LAW_FIRM_IMAGE,
      demo: i18n.PROJ_LAW_FIRM_DEMO,
      repo: i18n.PROJ_LAW_FIRM_REPO,
      featured: false,
    },
  ];

  const experience: ExperienceItem[] = [
    {
      role: i18n.EXP_RIPNEL_ROLE,
      period: i18n.EXP_RIPNEL_PERIOD,
      bullets: [i18n.EXP_RIPNEL_1, i18n.EXP_RIPNEL_2, i18n.EXP_RIPNEL_3, i18n.EXP_RIPNEL_4],
    },
    {
      role: i18n.EXP_TP_ROLE,
      period: i18n.EXP_TP_PERIOD,
      bullets: [i18n.EXP_TP_1, i18n.EXP_TP_2, i18n.EXP_TP_3, i18n.EXP_TP_4],
    },
  ];

  const certs: Cert[] = [
    { title: i18n.CERT_IBM_TITLE, desc: i18n.CERT_IBM_DESC },
    { title: i18n.CERT_GOOGLE_TITLE, desc: i18n.CERT_GOOGLE_DESC },
    { title: i18n.CERT_ORACLE_TITLE, desc: i18n.CERT_ORACLE_DESC },
  ];

  const dockItems: DockItem[] = [
    { id: 'hero', label: i18n.NAV_HOME },
    { id: 'about', label: i18n.NAV_ABOUT },
    { id: 'education', label: i18n.NAV_EDUCATION },
    { id: 'experience', label: i18n.NAV_EXPERIENCE },
    { id: 'projects', label: i18n.PROJECTS_TITLE },
    { id: 'skills', label: i18n.NAV_SKILLS_MAP },
    { id: 'contact', label: i18n.NAV_CONTACT },
  ];

  return { techNodes, skills, projects, experience, certs, dockItems };
}
