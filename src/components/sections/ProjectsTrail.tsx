'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, MousePointer2 } from 'lucide-react';
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

interface TrailCard {
  key: number;
  index: number;
  x: number;
  y: number;
  rot: number;
}

const SPAWN_DIST = 120;
const MAX_CARDS = 6;

export default function ProjectsTrail({ i18n, ui, projects, viewAllHref }: ProjectsTrailProps) {
  const [cards, setCards] = useState<TrailCard[]>([]);
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const nextIndex = useRef(0);
  const keyRef = useRef(0);
  const leaveTimer = useRef<number>(0);

  // floating preview for the roster list
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 250, damping: 25 });
  const spy = useSpring(py, { stiffness: 250, damping: 25 });

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
    const off = on('project:open', (id) => {
      const i = projects.findIndex((p) => p.id === id);
      if (i >= 0) setOpenIndex(i);
    });
    return off;
  }, [projects]);

  const spawn = useCallback(
    (x: number, y: number) => {
      const index = nextIndex.current % projects.length;
      nextIndex.current++;
      const card: TrailCard = { key: keyRef.current++, index, x, y, rot: (Math.random() - 0.5) * 16 };
      setCards((c) => [...c.slice(-(MAX_CARDS - 1)), card]);
      setUnlocked((u) => (u.includes(index) ? u : [...u, index]));
    },
    [projects.length]
  );

  const onFieldMove = (e: React.MouseEvent<HTMLDivElement>) => {
    window.clearTimeout(leaveTimer.current);
    if ((e.target as HTMLElement).closest('[data-trail-card]')) return; // let user reach a card
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (!last.current) {
      last.current = { x, y };
      spawn(x, y);
      return;
    }
    const dx = x - last.current.x;
    const dy = y - last.current.y;
    if (dx * dx + dy * dy > SPAWN_DIST * SPAWN_DIST) {
      last.current = { x, y };
      spawn(x, y);
    }
  };

  const onFieldLeave = () => {
    last.current = null;
    leaveTimer.current = window.setTimeout(() => setCards([]), 1400);
  };

  const nav = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + projects.length) % projects.length)),
    [projects.length]
  );
  const close = useCallback(() => setOpenIndex(null), []);

  const allDone = unlocked.length === projects.length;

  return (
    <SectionContainer sectionNumber="05" title={i18n.PROJECTS_TITLE} id="projects" bare wide kicker={`// ${i18n.PROJECTS_SUBTITLE}`}>
      {/* ---------- Desktop: mouse trail field ---------- */}
      <div
        ref={fieldRef}
        onMouseMove={onFieldMove}
        onMouseLeave={onFieldLeave}
        className="relative hidden md:block h-[78vh] min-h-[560px] cyber-frame overflow-hidden bg-[#05050a]/70 trail-field"
      >
        <div className="absolute inset-0 trail-grid" aria-hidden="true" />

        {/* centre prompt */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <motion.div
            animate={{ opacity: cards.length ? 0.15 : 1, scale: cards.length ? 0.96 : 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <MousePointer2 className="mx-auto mb-4 text-sky-400 animate-bounce" size={22} />
            <div className="font-display font-bold text-5xl lg:text-7xl uppercase tracking-tight trail-outline">
              {ui.moveCursor}
            </div>
            <p className="mt-4 font-mono text-xs text-slate-500 max-w-sm mx-auto">{ui.moveCursorSub}</p>
          </motion.div>
        </div>

        {/* trail cards */}
        <AnimatePresence>
          {cards.map((c, i) => {
            const p = projects[c.index];
            const depth = cards.length - 1 - i;
            return (
              <motion.button
                key={c.key}
                type="button"
                data-trail-card
                data-cursor={ui.open.toUpperCase()}
                onClick={() => setOpenIndex(c.index)}
                className="absolute w-56 lg:w-64 text-left group"
                style={{ left: c.x, top: c.y, zIndex: 10 + i }}
                initial={{ opacity: 0, scale: 0.4, x: '-50%', y: '-40%', rotate: c.rot * 2, filter: 'blur(8px)' }}
                animate={{
                  opacity: 1 - depth * 0.08,
                  scale: 1 - depth * 0.04,
                  x: '-50%',
                  y: '-50%',
                  rotate: c.rot,
                  filter: 'blur(0px)',
                }}
                exit={{ opacity: 0, scale: 0.7, filter: 'blur(6px)', transition: { duration: 0.35 } }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 50 }}
              >
                <div className="cyber-frame overflow-hidden bg-[#07070c] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] group-hover:shadow-[0_0_40px_-5px_rgba(244,114,182,0.6)] transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" draggable={false} />
                    <div className="absolute inset-0 holo-lines opacity-30" />
                    <span className="absolute top-2 left-2 font-mono text-[9px] px-1.5 py-0.5 bg-black/70 text-sky-300 tracking-widest">
                      #{String(c.index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="px-3 py-2 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-white leading-tight line-clamp-1">{p.title}</span>
                    <ArrowUpRight size={14} className="shrink-0 text-neon-400 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* unlocked meter */}
        <div className="absolute bottom-0 inset-x-0 z-[60] px-5 py-3 border-t border-sky-400/10 bg-[#05050a]/85 backdrop-blur flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 shrink-0">
            {allDone ? <span className="text-emerald-300">✔ {ui.allUnlocked}</span> : ui.unlocked}{' '}
            <span className="text-sky-300 tabular-nums">
              {unlocked.length}/{projects.length}
            </span>
          </span>
          <div className="flex-1 flex gap-1">
            {projects.map((p, i) => (
              <button
                key={p.id}
                disabled={!unlocked.includes(i)}
                onClick={() => setOpenIndex(i)}
                title={unlocked.includes(i) ? p.title : '???'}
                className={`h-2 flex-1 transition-all duration-500 ${
                  unlocked.includes(i) ? 'bg-gradient-to-r from-sky-400 to-neon-400 hover:h-3 shadow-[0_0_8px_rgba(56,189,248,0.6)]' : 'bg-sky-400/10'
                }`}
              />
            ))}
          </div>
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
                <span className="absolute top-2 left-2 font-mono text-[9px] px-1.5 py-0.5 bg-black/70 text-sky-300">#{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-4">
                <div className="text-white font-semibold text-sm leading-snug">{p.title}</div>
                <div className="mt-2 font-mono text-[10px] text-slate-500 line-clamp-1">{p.techs}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Roster list with cursor-follow preview ---------- */}
      <div className="mt-14">
        <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          <span>{ui.roster}</span>
          <a href={viewAllHref} className="text-sky-300 hover:text-white transition-colors inline-flex items-center gap-1">
            {ui.viewAll} <ArrowUpRight size={12} />
          </a>
        </div>
        <ul
          className="border-t border-sky-400/10"
          onMouseMove={(e) => {
            px.set(e.clientX);
            py.set(e.clientY);
          }}
          onMouseLeave={() => setHoverRow(null)}
        >
          {projects.map((p, i) => (
            <li key={p.id}>
              <button
                onClick={() => setOpenIndex(i)}
                onMouseEnter={() => setHoverRow(i)}
                className="roster-row w-full grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4rem_1fr_1fr_auto] items-center gap-4 py-4 sm:py-5 border-b border-sky-400/10 text-left"
                data-cursor={ui.open.toUpperCase()}
              >
                <span className="font-mono text-xs text-slate-600 roster-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-base sm:text-2xl font-semibold text-slate-300 roster-title leading-tight">{p.title}</span>
                <span className="hidden sm:block font-mono text-[10px] text-slate-600 truncate">{p.techs}</span>
                <ArrowUpRight size={18} className="text-slate-600 roster-arrow" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* preview that follows the cursor */}
      <Portal>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:block"
        style={{ x: spx, y: spy }}
      >
        <AnimatePresence>
          {hoverRow !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="w-72 aspect-[4/3] -translate-x-1/2 -translate-y-[115%] overflow-hidden cyber-frame bg-black"
            >
              {projects.map((p, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  src={p.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                  style={{ opacity: hoverRow === i ? 1 : 0, transform: hoverRow === i ? 'scale(1)' : 'scale(1.15)' }}
                />
              ))}
              <div className="absolute inset-0 holo-lines opacity-30" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </Portal>

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
