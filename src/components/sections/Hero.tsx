'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download, ArrowDown, Terminal } from 'lucide-react';
import { CV_URL } from '@/lib/constants';
import { run, on, emit, scrollToId } from '@/lib/run-store';
import Magnetic from '@/components/experience/Magnetic';
import ScrambleText from '@/components/experience/ScrambleText';
import CountUp from '@/components/experience/CountUp';
import type { UIStrings } from '@/i18n/ui';

interface HeroProps {
  i18n: Record<string, string>;
  ui: UIStrings;
  projectCount: number;
}

function Letters({ word, delay, ready, className }: { word: string; delay: number; ready: boolean; className?: string }) {
  return (
    <span className={`inline-flex ${className ?? ''}`} aria-hidden="true">
      {[...word].map((ch, i) => (
        <motion.span
          key={i}
          className="hero-letter inline-block"
          initial={{ y: '110%', opacity: 0, rotateX: -80 }}
          animate={ready ? { y: '0%', opacity: 1, rotateX: 0 } : {}}
          transition={{ delay: delay + i * 0.045, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -14, color: '#f472b6', transition: { duration: 0.15 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ i18n, ui, projectCount }: HeroProps) {
  const [ready, setReady] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => v * -18);
  const ty = useTransform(sy, (v) => v * -12);
  const tx2 = useTransform(sx, (v) => v * 30);
  const ty2 = useTransform(sy, (v) => v * 20);

  useEffect(() => {
    if (run.booted) setReady(true);
    const off = on('booted', () => setReady(true));
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      off();
      window.removeEventListener('mousemove', onMove);
    };
  }, [mx, my]);


  return (
    <section
      id="hero"
      data-section="hero"
      className="relative z-10 min-h-[100svh] flex flex-col justify-center px-4 sm:px-6 lg:pl-28 pt-20 pb-28 overflow-hidden"
    >
      {/* readability veil between the 3D scene and the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 70% at 28% 55%, rgba(7,7,11,0.82) 0%, rgba(7,7,11,0.45) 55%, transparent 80%)',
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 sm:hidden bg-[#07070b]/55" />

      {/* HUD corner brackets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-6 sm:inset-10 hidden sm:block">
        <span className="hud-corner top-0 left-0 border-t border-l" />
        <span className="hud-corner top-0 right-0 border-t border-r" />
        <span className="hud-corner bottom-0 left-0 border-b border-l" />
        <span className="hud-corner bottom-0 right-0 border-b border-r" />
        <span className="absolute bottom-3 right-6 font-mono text-[10px] tracking-[0.25em] text-slate-600 hidden lg:block lg:bottom-24">
          LAT -15.36° · LON -75.16°
        </span>
        <span className="absolute bottom-3 left-6 font-mono text-[10px] tracking-[0.25em] text-slate-600">
          SECTOR: MARCONA // START 03:00
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <motion.div style={{ x: tx2, y: ty2 }} className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-emerald-300 border border-emerald-400/30 bg-emerald-400/5 px-3 py-1.5 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {i18n.HERO_BADGE}
          </motion.div>

          <ScrambleText
            as="p"
            text={`> ${i18n.HERO_NAME}`}
            trigger="manual"
            play={ready}
            delay={150}
            className="block font-mono text-sky-300/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
          />
        </motion.div>

        <motion.h1
          style={{ x: tx, y: ty, perspective: 800 }}
          className="font-display font-bold text-white leading-[0.85] tracking-tight select-none"
          aria-label="Ivan Manrique"
        >
          <span className="block overflow-hidden pb-2 text-[18vw] sm:text-[15vw] lg:text-[11.5rem]">
            <Letters word="IVAN" delay={0.25} ready={ready} />
          </span>
          <span className="block overflow-hidden pb-2 text-[15vw] sm:text-[12.5vw] lg:text-[9.5rem] hero-outline">
            <Letters word="MANRIQUE" delay={0.45} ready={ready} />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end"
        >
          <div>
            <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white/90 leading-snug max-w-2xl">
              {i18n.HERO_H1}
            </p>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">{i18n.HERO_H2}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic>
                <button onClick={() => scrollToId('projects')} className="btn-neon" data-cursor="RUN">
                  {i18n.HERO_CTA_PRIMARY}
                  <ArrowDown size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor="CV">
                  <Download size={16} />
                  {i18n.HERO_CTA_SECONDARY}
                </a>
              </Magnetic>
              <button
                onClick={() => emit('terminal:open')}
                className="font-mono text-[11px] text-slate-500 hover:text-sky-300 transition-colors inline-flex items-center gap-2"
              >
                <Terminal size={13} /> {ui.openTerminal} <kbd className="kbd">Ctrl</kbd>
                <kbd className="kbd">K</kbd>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { v: projectCount, s: '', l: ui.projectsCount, c: 'text-sky-300' },
              { v: 1900, s: '+', l: ui.casesCount, c: 'text-neon-400' },
              { v: 35, s: 'K', l: ui.raceCount, c: 'text-amber-300' },
            ].map((m, i) => (
              <div key={i} className="stat-tile" data-cursor="">
                <div className={`font-display font-bold text-2xl sm:text-4xl ${m.c} tabular-nums`}>
                  {ready ? <CountUp to={m.v} /> : 0}
                  {m.s}
                </div>
                <div className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 leading-tight">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500 hover:text-sky-300 transition-colors"
      >
        {ui.scrollToRun}
        <span className="scroll-indicator" />
      </motion.button>
    </section>
  );
}
