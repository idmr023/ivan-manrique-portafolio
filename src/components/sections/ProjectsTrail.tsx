'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import ProjectModal from './ProjectModal';
import Portal from '@/components/experience/Portal';
import { on } from '@/lib/run-store';
import type { Project } from '@/lib/data';
import type { UIStrings } from '@/i18n/ui';

interface ProjectsTrailProps {
  i18n: Record<string, string>;
  ui: UIStrings;
  projects: Project[];
  viewAllHref: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Projects as running-track lanes: every project is a narrow lane,
 * hovering (or focusing) a lane expands it and reveals the project.
 */
export default function ProjectsTrail({ i18n, ui, projects, viewAllHref }: ProjectsTrailProps) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const off = on('project:open', (id) => {
      const i = projects.findIndex((p) => p.id === id);
      if (i >= 0) {
        setActive(i);
        setOpenIndex(i);
      }
    });
    return off;
  }, [projects]);

  const nav = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [projects.length]
  );
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <SectionContainer sectionNumber="05" title={i18n.PROJECTS_TITLE} id="projects" bare wide kicker={`// ${i18n.PROJECTS_SUBTITLE}`}>
      {/* ---------- Desktop: track lanes ---------- */}
      <div className="hidden md:block">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          <span>{ui.moveCursorSub}</span>
          <span className="tabular-nums text-sky-300">
            {pad(active + 1)} <span className="text-slate-600">/ {pad(projects.length)}</span>
          </span>
        </div>

        <div className="flex gap-1.5 h-[70vh] min-h-[520px] max-h-[720px]">
          {projects.map((p, i) => {
            const isActive = i === active;
            const techs = p.techs.split('|').map((t) => t.trim());
            return (
              <button
                key={p.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setOpenIndex(i)}
                data-cursor={isActive ? ui.open.toUpperCase() : undefined}
                aria-label={p.title}
                aria-expanded={isActive}
                className={`lane relative min-w-0 overflow-hidden text-left border bg-[#07070c] ${
                  isActive ? 'border-neon-400/60' : 'border-sky-400/15 hover:border-sky-400/40'
                }`}
                style={{ flex: isActive ? '7 1 0%' : '1 1 0%' }}
              >
                {/* image keeps a fixed width so it does not rescale while the lane grows */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-[720px] max-w-none object-cover"
                />
                <div
                  className="absolute inset-0 bg-[#05050a] transition-opacity duration-500"
                  style={{ opacity: isActive ? 0 : 0.78 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] from-25% via-[#05050a]/80 via-45% to-transparent to-75%" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#05050a]/90 to-transparent" />

                {/* lane number */}
                <span
                  className={`absolute top-3 left-3 font-display font-bold text-xl tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-neon-400' : 'text-sky-300/80'
                  }`}
                >
                  {pad(i + 1)}
                </span>
                {p.featured && isActive && <Star size={12} className="absolute top-4 right-3 text-amber-300" aria-hidden="true" />}

                {/* collapsed: vertical title */}
                <span
                  className="absolute bottom-4 left-1/2 max-h-[70%] -translate-x-1/2 rotate-180 overflow-hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-slate-300 transition-opacity duration-300 [writing-mode:vertical-rl]"
                  style={{ opacity: isActive ? 0 : 1 }}
                  aria-hidden="true"
                >
                  {p.title}
                </span>

                {/* expanded: project brief (fixed width so text never reflows) */}
                <div
                  className="absolute bottom-0 left-0 w-[min(520px,60vw)] p-6 transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0, transitionDelay: isActive ? '180ms' : '0ms' }}
                  aria-hidden={!isActive}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-400">
                    KM {pad(i + 1)} · PRJ.{pad(i + 1)}
                  </div>
                  <h3 className="mt-2 font-display font-bold text-2xl lg:text-3xl text-white leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3">{p.result || p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {techs.slice(0, 5).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono text-sky-200 border border-sky-400/25 bg-[#05050a]/80">
                        {t}
                      </span>
                    ))}
                    {techs.length > 5 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-slate-400">+{techs.length - 5}</span>
                    )}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white">
                    {ui.open} <ArrowUpRight size={14} className="text-neon-400" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* track progress */}
        <div className="mt-2 h-0.5 bg-sky-400/15" aria-hidden="true">
          <div
            className="h-full w-full origin-left bg-neon-400 transition-transform duration-500"
            style={{ transform: `scaleX(${(active + 1) / projects.length})` }}
          />
        </div>
      </div>

      {/* ---------- Mobile: swipe carousel ---------- */}
      <div className="md:hidden">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-3">{ui.tapToOpen} →</p>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none]">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpenIndex(i)}
              className="snap-center shrink-0 w-[78vw] text-left cyber-frame overflow-hidden bg-[#07070c]"
            >
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-2 left-2 font-mono text-[9px] px-1.5 py-0.5 bg-black/70 text-sky-300">#{pad(i + 1)}</span>
              </div>
              <div className="p-4">
                <div className="text-white font-semibold text-sm leading-snug">{p.title}</div>
                <div className="mt-2 font-mono text-[10px] text-slate-500 line-clamp-1">{p.techs}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <a href={viewAllHref} className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-300 hover:text-white transition-colors inline-flex items-center gap-1">
          {ui.viewAll} <ArrowUpRight size={12} />
        </a>
      </div>

      <Portal>
        <ProjectModal
          project={openIndex !== null ? projects[openIndex] : null}
          index={openIndex ?? 0}
          total={projects.length}
          i18n={i18n}
          closeLabel={ui.close}
          onClose={close}
          onNav={nav}
        />
      </Portal>
    </SectionContainer>
  );
}
