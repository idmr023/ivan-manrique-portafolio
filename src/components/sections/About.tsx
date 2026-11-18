'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Activity } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import type { UIStrings } from '@/i18n/ui';

interface AboutProps {
  i18n: Record<string, string>;
  ui: UIStrings;
}

const ELEVATION =
  'M0,120 C30,118 50,96 80,100 C110,104 120,70 150,74 C180,78 190,110 220,104 C250,98 262,48 300,52 C338,56 345,92 375,88 C405,84 415,30 450,36 C485,42 490,86 520,80 C550,74 565,96 600,92';

function HoloCard({ ui }: { ui: UIStrings }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  const glareX = useTransform(sry, [-15, 15], ['0%', '100%']);
  const glare = useTransform(
    glareX,
    (g) => `linear-gradient(115deg, transparent 20%, rgba(56,189,248,0.18) ${g}, transparent 80%)`
  );

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[320px] aspect-[3/4] [transform-style:preserve-3d]"
      style={{ rotateX: srx, rotateY: sry, perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 26);
        rx.set(-py * 26);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      data-cursor="SCAN"
    >
      <div className="absolute inset-0 cyber-frame overflow-hidden holo-card">
        <Image
          src="/profile.webp"
          alt="Ivan Manrique"
          fill
          sizes="320px"
          className="object-cover opacity-85 mix-blend-luminosity holo-img"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-sky-400/10" />
        <div className="absolute inset-0 holo-lines" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glare }}
        />
        <div className="holo-scan" />
        <div className="absolute top-3 left-3 right-3 flex justify-between font-mono text-[9px] tracking-widest text-sky-300/80 uppercase">
          <span>{ui.idCard}</span>
          <span>#IDMR-023</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] leading-relaxed text-slate-300 [transform:translateZ(40px)]">
          <div className="flex justify-between">
            <span className="text-slate-500">CLASS</span>
            <span>DEV + DATA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">ORIGIN</span>
            <span>LIMA, PE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">STATUS</span>
            <span className="text-emerald-300">● RUNNING</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ElevationProfile({ ui }: { ui: UIStrings }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const draw = useSpring(useTransform(scrollYProgress, [0.1, 0.7], [0, 1]), { stiffness: 80, damping: 20 });

  useMotionValueEvent(draw, 'change', (v) => {
    const p = pathRef.current;
    const d = dotRef.current;
    if (!p || !d) return;
    const len = p.getTotalLength();
    const pt = p.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    d.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
  });

  return (
    <div ref={ref} className="mt-6">
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-slate-500 mb-2">
        <span>{ui.elevation}</span>
        <span>0K ─ 35K</span>
      </div>
      <svg viewBox="0 0 600 140" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="elevFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 50, 80, 110].map((y) => (
          <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(56,189,248,0.08)" strokeDasharray="2 6" />
        ))}
        <path d={`${ELEVATION} L600,140 L0,140 Z`} fill="url(#elevFill)" />
        <path d={ELEVATION} fill="none" stroke="rgba(244,114,182,0.15)" strokeWidth="2" />
        <motion.path
          ref={pathRef}
          d={ELEVATION}
          fill="none"
          stroke="#f472b6"
          strokeWidth="2.5"
          style={{ pathLength: draw, filter: 'drop-shadow(0 0 6px #f472b6)' }}
        />
        <g ref={dotRef} transform="translate(0 120)">
          <circle r="9" fill="rgba(56,189,248,0.2)" className="animate-ping origin-center" />
          <circle r="4.5" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function About({ i18n, ui }: AboutProps) {
  return (
    <SectionContainer sectionNumber="01" title={i18n.ABOUT_TITLE} id="about">
      <motion.div
        className="grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <HoloCard ui={ui} />
        </motion.div>

        <div>
          <div className="space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base about-copy">
            <motion.p variants={fadeUp}>{i18n.ABOUT_P1}</motion.p>
            <motion.p variants={fadeUp} dangerouslySetInnerHTML={{ __html: i18n.ABOUT_P2 }} />
            <motion.p variants={fadeUp} dangerouslySetInnerHTML={{ __html: i18n.ABOUT_P3 }} />
          </div>

          <motion.div variants={fadeUp} className="mt-10 relative border border-neon-400/20 bg-neon-400/[0.03] p-5 sm:p-6">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-neon-400 to-transparent" />
            <h3 className="text-white font-display font-semibold text-lg flex items-center gap-2">
              <Activity size={20} className="text-neon-400" />
              {i18n.RUNNING_TITLE}
            </h3>
            <p className="mt-3 text-slate-300 italic text-sm leading-relaxed border-l-2 border-neon-400/40 pl-4">
              {i18n.RUNNING_QUOTE}
            </p>
            <p className="mt-3 text-slate-500 text-sm">{i18n.RUNNING_DESC}</p>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                [i18n.RUNNING_STATS_1, i18n.RUNNING_LABEL_1],
                [i18n.RUNNING_STATS_2, i18n.RUNNING_LABEL_2],
                [i18n.RUNNING_STATS_3, i18n.RUNNING_LABEL_3],
              ].map(([v, l]) => (
                <div key={l} className="stat-tile !p-3">
                  <div className="text-xl sm:text-2xl font-display font-bold text-neon-400">{v}</div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono leading-tight">{l}</div>
                </div>
              ))}
            </div>

            <ElevationProfile ui={ui} />
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
