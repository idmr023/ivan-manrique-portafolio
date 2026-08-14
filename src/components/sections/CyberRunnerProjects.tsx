'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { ExternalLink, Github, ChevronDown, Star } from 'lucide-react';
import type { Project } from '@/lib/data';

interface CyberRunnerProjectsProps {
  i18n: Record<string, string>;
  projects: Project[];
}

/* Deterministic skyline data so SSR/CSR render identically */
const FAR_BUILDINGS = [
  { left: 2, w: 8, h: 30, o: 0.5 },
  { left: 12, w: 6, h: 22, o: 0.45 },
  { left: 20, w: 10, h: 38, o: 0.55 },
  { left: 33, w: 7, h: 26, o: 0.5 },
  { left: 43, w: 9, h: 34, o: 0.6 },
  { left: 55, w: 6, h: 24, o: 0.5 },
  { left: 63, w: 11, h: 42, o: 0.6 },
  { left: 77, w: 7, h: 28, o: 0.5 },
  { left: 87, w: 9, h: 36, o: 0.6 },
];

const MID_BUILDINGS = [
  { left: 6, w: 9, h: 40, glow: '#38bdf8' },
  { left: 18, w: 7, h: 30, glow: '#f472b6' },
  { left: 30, w: 11, h: 48, glow: '#38bdf8' },
  { left: 46, w: 8, h: 34, glow: '#f472b6' },
  { left: 58, w: 12, h: 52, glow: '#38bdf8' },
  { left: 73, w: 9, h: 38, glow: '#f472b6' },
  { left: 86, w: 8, h: 44, glow: '#38bdf8' },
];

const NEAR_BUILDINGS = [
  { left: 2, w: 16, h: 55, glow: '#f472b6' },
  { left: 24, w: 13, h: 42, glow: '#38bdf8' },
  { left: 42, w: 15, h: 60, glow: '#f472b6' },
  { left: 62, w: 12, h: 46, glow: '#38bdf8' },
  { left: 80, w: 16, h: 58, glow: '#f472b6' },
];

function RunnerAvatar() {
  return (
    <div className="relative" style={{ width: 64, height: 104 }}>
      {/* head */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full border-2 border-cyan-400 bg-cyan-400/20"
        style={{ boxShadow: '0 0 14px rgba(34,211,238,0.6), inset 0 0 6px rgba(34,211,238,0.4)' }}
      />
      {/* torso */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-9 border border-cyan-400/70 bg-cyan-400/15"
        style={{
          clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
          boxShadow: '0 0 10px rgba(34,211,238,0.35)',
        }}
      />
      {/* front arm */}
      <div className="absolute left-1/2 top-7 animate-run-arm" style={{ left: 'calc(50% - 10px)', transformOrigin: 'top center' }}>
        <div
          className="w-1.5 h-8 rounded bg-cyan-400"
          style={{ boxShadow: '0 0 6px rgba(34,211,238,0.8)' }}
        />
      </div>
      {/* back arm */}
      <div className="absolute left-1/2 top-7 animate-run-arm-rev" style={{ left: 'calc(50% + 8px)', transformOrigin: 'top center' }}>
        <div className="w-1.5 h-8 rounded bg-cyan-400/70" />
      </div>
      {/* back leg */}
      <div className="absolute left-1/2 animate-run-leg-rev" style={{ left: 'calc(50% - 9px)', top: 58, transformOrigin: 'top center' }}>
        <div
          className="w-2 h-11 rounded-b bg-cyan-400/70"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}
        />
      </div>
      {/* front leg */}
      <div className="absolute left-1/2 animate-run-leg" style={{ left: 'calc(50% + 6px)', top: 58, transformOrigin: 'top center' }}>
        <div
          className="w-2 h-11 rounded-b bg-cyan-400"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)', boxShadow: '0 0 6px rgba(34,211,238,0.8)' }}
        />
      </div>
      {/* ground glow */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full blur-sm bg-cyan-400/40"
        style={{ boxShadow: '0 0 18px rgba(34,211,238,0.6)' }}
      />
    </div>
  );
}

function Building({
  left,
  w,
  h,
  glow,
  dim,
}: {
  left: number;
  w: number;
  h: number;
  glow: string;
  dim?: boolean;
}) {
  return (
    <div
      className="absolute bottom-0"
      style={{
        left: `${left}%`,
        width: `${w}%`,
        height: `${h}%`,
        background: dim
          ? 'linear-gradient(to top, rgba(14,14,22,0.98), rgba(20,20,34,0.55))'
          : `linear-gradient(to top, rgba(10,10,16,0.98), rgba(20,20,34,0.7))`,
        borderTop: `1px solid ${glow}${dim ? '33' : '55'}`,
        boxShadow: dim ? 'none' : `0 0 24px ${glow}22`,
        backgroundImage: dim
          ? undefined
          : `repeating-linear-gradient(0deg, ${glow}30 0 2px, transparent 2px 9px), repeating-linear-gradient(90deg, ${glow}30 0 2px, transparent 2px 9px)`,
      }}
    />
  );
}

export default function CyberRunnerProjects({ i18n, projects }: CyberRunnerProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const count = projects.length;
  const total = count + 1; // intro + one terminal per project

  const [activeRaw, setActiveRaw] = useState(-1);
  const [isIntro, setIsIntro] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const segment = v * total;
    setActiveRaw(Math.floor(segment) - 1);
    setIsIntro(segment < 1);
  });

  const activeIndex = Math.min(Math.max(activeRaw, 0), count - 1);

  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-52%']);
  const roadY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const speedOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.9, 1], [0, 0.55, 0.55, 0]);
  const bobY = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 2 * count) * 5);
  const swayX = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 2 * count) * 8);
  const runnerGlow = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0.15, 1, 1, 0.15]);

  const intro = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `${total * 100}vh` }}
      aria-label={i18n.PROJECTS_TITLE}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-void">
        {/* ---- Sky / backdrop ---- */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 90%, rgba(56,189,248,0.16) 0%, transparent 60%), ' +
              'linear-gradient(to top, #08080c 0%, #0c0c16 45%, #10101c 100%)',
          }}
        />
        <motion.div className="absolute inset-x-0 bottom-0 h-[70%]" style={{ y: farY }}>
          {FAR_BUILDINGS.map((b, i) => (
            <Building key={i} left={b.left} w={b.w} h={b.h} glow="#38bdf8" dim />
          ))}
        </motion.div>
        <motion.div className="absolute inset-x-0 bottom-0 h-[65%]" style={{ y: midY }}>
          {MID_BUILDINGS.map((b, i) => (
            <Building key={i} left={b.left} w={b.w} h={b.h} glow={b.glow} />
          ))}
        </motion.div>
        <motion.div className="absolute inset-x-0 bottom-0 h-[58%]" style={{ y: nearY }}>
          {NEAR_BUILDINGS.map((b, i) => (
            <Building key={i} left={b.left} w={b.w} h={b.h} glow={b.glow} />
          ))}
        </motion.div>

        {/* ---- Road ---- */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[22%]"
          style={{ y: roadY }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, #050508 0%, #0a0a12 55%, rgba(8,8,12,0) 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(34,211,238,0.9), #f472b6, transparent)',
              boxShadow: '0 0 18px rgba(34,211,238,0.6)',
            }}
          />
          <div
            className="absolute inset-0 animate-road-scroll"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0 80px, rgba(34,211,238,0.28) 80px 96px)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))',
            }}
          />
        </motion.div>

        {/* ---- Speed lines ---- */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: speedOpacity }}
        >
          {[10, 30, 55, 75].map((top, i) => (
            <div
              key={i}
              className="absolute h-px animate-speed-line"
              style={{
                top: `${top}%`,
                left: `${20 + i * 14}%`,
                width: 90,
                background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)',
                boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </motion.div>

        {/* ---- Scanline overlay ---- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-24 animate-scan-line bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 120px rgba(8,8,12,0.9)' }}
        />

        {/* ---- HUD top-left ---- */}
        <div className="absolute top-6 left-4 sm:left-6 font-mono text-[10px] sm:text-xs tracking-widest uppercase z-20">
          <span className="text-slate-600">// </span>
          <span className="text-cyan-400">{i18n.PROJECTS_TITLE}</span>
        </div>
        <div className="absolute top-6 right-4 sm:right-6 font-mono text-[10px] sm:text-xs tracking-widest uppercase z-20 text-right">
          <span className="text-slate-600">TERMINAL </span>
          {isIntro ? (
            <span className="text-cyan-400">00/{String(count).padStart(2, '0')}</span>
          ) : (
            <span className="text-neon-400">
              {String(activeIndex + 1).padStart(2, '0')}/{String(count).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* ---- Progress rail (terminals) ---- */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20">
          <span className="text-slate-600 text-[9px] font-mono tracking-widest rotate-180 [writing-mode:vertical-rl]">
            RUN
          </span>
          {projects.map((_, i) => {
            const passed = !isIntro && activeIndex > i;
            const active = !isIntro && activeIndex === i;
            return (
              <div
                key={i}
                className="relative w-1.5 h-8 rounded-full transition-all duration-300"
                style={{
                  background: active
                    ? 'linear-gradient(to bottom, #f472b6, #38bdf8)'
                    : passed
                      ? 'rgba(244,114,182,0.6)'
                      : 'rgba(56,189,248,0.15)',
                  boxShadow: active
                    ? '0 0 12px rgba(244,114,182,0.8), 0 0 20px rgba(56,189,248,0.5)'
                    : 'none',
                }}
              />
            );
          })}
        </div>

        {/* ---- Runner ---- */}
        <motion.div
          className="absolute z-20"
          style={{
            bottom: '20%',
            left: '50%',
            y: bobY,
            x: swayX,
          }}
        >
          <motion.div className="relative -translate-x-1/2" style={{ opacity: runnerGlow }}>
            <RunnerAvatar />
          </motion.div>
        </motion.div>

        {/* ---- Terminal card ---- */}
        <AnimatePresence>
          {!isIntro && (
            <motion.div
              key={activeIndex}
              className="absolute z-30 inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 px-4 sm:px-6 md:px-0 md:right-[6%] md:w-[420px] pointer-events-none"
              initial={{ opacity: 0, x: 80, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="pointer-events-auto relative rounded-md p-5 sm:p-6 border"
                style={{
                  background: 'rgba(8,8,14,0.72)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(34,211,238,0.35)',
                  boxShadow:
                    '0 0 24px rgba(34,211,238,0.25), 0 0 60px rgba(244,114,182,0.12), inset 0 0 30px rgba(56,189,248,0.05)',
                }}
              >
                {/* corner accents */}
                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-cyan-400/80" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-neon-400/80" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-neon-400/80" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-cyan-400/80" />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                    TERMINAL 0{activeIndex + 1}
                  </span>
                  {intro?.featured && (
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neon-400 flex items-center gap-1">
                      <Star size={10} />
                      {i18n.PROJECTS_LABEL_FEATURED}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-display font-semibold text-white mb-4 leading-tight">
                  {intro?.title}
                </h3>

                {intro && (
                  <div className="mb-4 rounded overflow-hidden border border-cyan-400/15 aspect-[4/3] relative">
                    <img
                      src={intro.image}
                      alt={intro.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(8,8,14,0.9), transparent 45%)',
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-40 animate-terminal-flicker"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, rgba(34,211,238,0.18) 0 1px, transparent 1px 4px)',
                      }}
                    />
                  </div>
                )}

                {intro && (
                  <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-3 font-mono">
                    <span className="text-slate-500">problem&gt;</span> {intro.problem}
                  </p>
                )}

                {intro && (
                  <div className="border-l-2 border-cyan-400/50 bg-cyan-400/5 pl-3 py-2 rounded-r mb-4">
                    <span className="text-[9px] text-cyan-400 font-mono uppercase tracking-widest block mb-1">
                      result
                    </span>
                    <p className="text-cyan-200 text-xs leading-relaxed">{intro.result}</p>
                  </div>
                )}

                {intro && (
                  <div className="mb-4">
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block mb-2">
                      {i18n.PROJECTS_LABEL_STACK}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {intro.techs.split(' | ').map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] rounded bg-cyan-400/5 text-cyan-400/80 border border-cyan-400/15 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {intro && (
                  <div className="flex gap-5 pt-3 border-t border-cyan-400/10">
                    {intro.demo !== '#' && (
                      <a
                        href={intro.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium no-underline flex items-center gap-1.5 transition-colors"
                      >
                        {i18n.PROJECTS_LABEL_DEMO}
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {intro.repo !== '#' && (
                      <a
                        href={intro.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-300 font-medium no-underline flex items-center gap-1.5 transition-colors"
                      >
                        <Github size={12} />
                        {i18n.PROJECTS_LABEL_REPO}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Intro overlay ---- */}
        <AnimatePresence>
          {isIntro && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center pointer-events-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-cyan-400/60 font-mono text-xs tracking-[0.4em] uppercase mb-4">
                {i18n.PROJECTS_SUBTITLE}
              </span>
              <h2
                className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight"
                style={{
                  textShadow: '0 0 40px rgba(56,189,248,0.35), 0 0 80px rgba(244,114,182,0.15)',
                }}
              >
                {i18n.PROJECTS_TITLE}
              </h2>
              <p className="mt-6 font-mono text-xs sm:text-sm text-slate-400 tracking-widest uppercase flex items-center gap-2 animate-pulse-glow">
                <ChevronDown size={16} className="text-neon-400" />
                scroll para correr
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
