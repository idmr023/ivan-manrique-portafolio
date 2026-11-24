'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { run, emit, on } from '@/lib/run-store';
import BootLoader from './BootLoader';
import RunHUD, { type Checkpoint } from './RunHUD';
import CustomCursor from './CustomCursor';
import CommandTerminal from './CommandTerminal';
import type { Locale } from '@/i18n';
import { getUI } from '@/i18n/ui';
import type { Project } from '@/lib/data';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const ACCENTS: Record<string, number> = {
  hero: 0x38bdf8,
  about: 0xf472b6,
  education: 0xf59e0b,
  experience: 0x38bdf8,
  skills: 0xa78bfa,
  projects: 0xf472b6,
  contact: 0x22d3ee,
};

interface ExperienceShellProps {
  locale: Locale;
  i18n: Record<string, string>;
  projects: Project[];
  checkpoints: Checkpoint[];
  projectsHref: string;
}

export default function ExperienceShell({ locale, i18n, projects, checkpoints, projectsHref }: ExperienceShellProps) {
  const ui = getUI(locale);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    let sprintUntil = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      run.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      let dy = y - lastY;
      lastY = y;
      if (performance.now() < sprintUntil) dy = Math.max(Math.abs(dy), 55);
      run.velocity += (dy - run.velocity) * 0.18;
    };
    loop();

    const onMouse = (e: MouseEvent) => {
      run.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      run.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const offSprint = on('sprint', () => {
      sprintUntil = performance.now() + 2600;
    });

    // active section → accent + warp
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.getAttribute('data-section') || 'hero';
          if (run.section === id) continue;
          run.section = id;
          run.accent = ACCENTS[id] ?? 0x38bdf8;
          // partial warp: streaks stay behind the galaxy without drowning its labels
          run.warpTarget = id === 'skills' ? 0.55 : 0;
          emit('section', id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      offSprint();
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Scene3D />
      <div aria-hidden="true" className="fx-vignette" />
      <div aria-hidden="true" className="fx-scanlines" />
      <BootLoader ui={ui} />
      <RunHUD
        ui={ui}
        locale={locale}
        checkpoints={checkpoints}
        projectsHref={projectsHref}
        projectsLabel={i18n.PROJECTS_VIEW_ALL || i18n.PROJECTS_TITLE}
      />
      <CustomCursor />
      <CommandTerminal ui={ui} i18n={i18n} locale={locale} projects={projects} sections={checkpoints} />
    </>
  );
}
