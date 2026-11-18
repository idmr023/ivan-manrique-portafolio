'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';
import { run, on, emit, scrollToId, RACE_KM } from '@/lib/run-store';
import type { Locale } from '@/i18n';
import type { UIStrings } from '@/i18n/ui';

export interface Checkpoint {
  id: string;
  label: string;
}

interface RunHUDProps {
  ui: UIStrings;
  locale: Locale;
  checkpoints: Checkpoint[];
  projectsHref: string;
  projectsLabel: string;
}

const LANGS: { code: Locale; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

function formatPace(secPerKm: number) {
  const m = Math.floor(secPerKm / 60);
  const s = Math.floor(secPerKm % 60);
  return `${m}'${String(s).padStart(2, '0')}"`;
}

export default function RunHUD({ ui, locale, checkpoints, projectsHref, projectsLabel }: RunHUDProps) {
  const distRef = useRef<HTMLSpanElement>(null);
  const paceRef = useRef<HTMLSpanElement>(null);
  const bpmRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const ecgRef = useRef<SVGPolylineElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState('hero');
  const [kms, setKms] = useState<Record<string, number>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (run.booted) setBooted(true);
    const offBoot = on('booted', () => setBooted(true));
    const offSection = on('section', (id) => setActive(String(id)));
    return () => {
      offBoot();
      offSection();
    };
  }, []);

  // checkpoint km positions from real layout
  useEffect(() => {
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next: Record<string, number> = {};
      for (const cp of checkpoints) {
        const el = document.getElementById(cp.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        next[cp.id] = Math.min(RACE_KM, Math.max(0, (top / Math.max(1, max)) * RACE_KM));
      }
      setKms(next);
    };
    compute();
    const id = window.setTimeout(compute, 1200);
    window.addEventListener('resize', compute);
    const offBoot = on('booted', compute);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', compute);
      offBoot();
    };
  }, [checkpoints]);

  // telemetry loop
  useEffect(() => {
    let raf = 0;
    let bpm = 64;
    let speedN = 0;
    const ecg: number[] = new Array(40).fill(10);
    let phase = 0;
    let lastClock = '';
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const v = Math.min(1, Math.abs(run.velocity) / 40);
      speedN += (v - speedN) * 0.05;
      const targetBpm = 64 + speedN * 112 + run.progress * 18;
      bpm += (targetBpm - bpm) * 0.02;
      const pace = 450 - speedN * 255; // 7'30" → 3'15"

      if (distRef.current) distRef.current.textContent = (run.progress * RACE_KM).toFixed(2);
      if (paceRef.current) paceRef.current.textContent = formatPace(pace);
      if (bpmRef.current) bpmRef.current.textContent = String(Math.round(bpm));
      if (runnerRef.current) runnerRef.current.style.top = `${run.progress * 100}%`;
      if (railRef.current) railRef.current.style.transform = `scaleY(${run.progress})`;

      // ECG line
      phase += bpm / 60 / 60;
      if (phase >= 1) phase -= 1;
      const beat = phase < 0.06 ? -8 : phase < 0.1 ? 9 : phase < 0.14 ? -3 : 0;
      ecg.shift();
      ecg.push(10 + beat + (Math.random() - 0.5) * 0.8);
      if (ecgRef.current) ecgRef.current.setAttribute('points', ecg.map((y, i) => `${i * 2},${y}`).join(' '));

      const d = new Date();
      const c = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      if (c !== lastClock && clockRef.current) {
        clockRef.current.textContent = c;
        lastClock = c;
      }
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const langHref = (code: Locale) => (code === 'es' ? '/' : `/${code}`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: booted ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hud-root"
    >
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="relative flex items-center justify-between px-4 sm:px-6 h-14 bg-gradient-to-b from-[#07070b]/90 via-[#07070b]/50 to-transparent">
          <button
            onClick={() => scrollToId('hero')}
            className="pointer-events-auto font-display font-bold text-white text-lg tracking-wider flex items-center gap-2"
            data-cursor="HOME"
          >
            <span className="text-sky-400">IM</span>
            <span className="text-slate-600">//</span>
            <span className="text-neon-400">OS</span>
            <span className="hidden sm:inline font-mono text-[10px] text-slate-500 font-normal tracking-widest ml-2">
              <span ref={clockRef}>--:--:--</span> · LIMA
            </span>
          </button>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            <span className="w-8 h-px bg-sky-400/30" />
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sky-300"
              >
                {ui.checkpoint} · {checkpoints.find((c) => c.id === active)?.label ?? ''}
              </motion.span>
            </AnimatePresence>
            <span className="w-8 h-px bg-sky-400/30" />
          </div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <a
              href={projectsHref}
              className="hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-sky-300 transition-colors px-2 py-1"
            >
              {projectsLabel} ↗
            </a>
            <button
              onClick={() => emit('terminal:open')}
              className="hud-chip"
              aria-label={ui.openTerminal}
              data-cursor="CMD"
            >
              <Terminal size={13} />
              <span className="hidden sm:inline">Ctrl K</span>
            </button>
            <div className="hud-chip !gap-0 !p-0">
              {LANGS.map((l) => (
                <a
                  key={l.code}
                  href={langHref(l.code)}
                  className={`px-2 py-1 text-[10px] font-mono transition-colors ${
                    locale === l.code ? 'text-sky-300 bg-sky-400/10' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <button
              className="hud-chip lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Checkpoint rail — desktop */}
      <nav
        aria-label="Checkpoints"
        className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start"
        style={{ height: '56vh' }}
      >
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-sky-400/15">
          <div ref={railRef} className="absolute inset-0 origin-top bg-gradient-to-b from-sky-400 to-neon-400" style={{ transform: 'scaleY(0)' }} />
        </div>
        <div ref={runnerRef} className="absolute left-0 -translate-y-1/2" style={{ top: '0%' }}>
          <span className="block w-[11px] h-[11px] rotate-45 border border-white bg-neon-400 shadow-[0_0_12px_#f472b6]" />
        </div>
        {checkpoints.map((cp, i) => {
          const km = kms[cp.id] ?? (i / Math.max(1, checkpoints.length - 1)) * RACE_KM;
          const isActive = active === cp.id;
          return (
            <button
              key={cp.id}
              onClick={() => scrollToId(cp.id)}
              className="group absolute left-0 flex items-center gap-3 -translate-y-1/2"
              style={{ top: `${(km / RACE_KM) * 100}%` }}
              data-cursor="GO"
            >
              <span
                className={`block w-[11px] h-[11px] rounded-full border transition-all ${
                  isActive ? 'border-sky-300 bg-sky-400 shadow-[0_0_10px_#38bdf8]' : 'border-sky-400/40 bg-void'
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all px-2 py-1 bg-void/90 border border-sky-400/20 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                <span className="text-sky-400/70">{km.toFixed(1)}K</span> · {cp.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile checkpoint menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-14 inset-x-3 z-50 lg:hidden hud-panel p-2"
          >
            {checkpoints.map((cp) => (
              <button
                key={cp.id}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId(cp.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 font-mono text-xs uppercase tracking-widest ${
                  active === cp.id ? 'text-sky-300' : 'text-slate-400'
                }`}
              >
                <span>{cp.label}</span>
                <span className="text-slate-600">{(kms[cp.id] ?? 0).toFixed(1)} KM</span>
              </button>
            ))}
            <a href={projectsHref} className="block px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-neon-400">
              {projectsLabel} ↗
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Telemetry */}
      <div className="fixed bottom-4 left-4 sm:left-6 lg:left-auto lg:right-6 z-40 pointer-events-none">
        <div className="hud-panel px-3 py-2 sm:px-4 sm:py-3 flex items-end gap-4 sm:gap-6 font-mono">
          <div>
            <div className="hud-label">{ui.distance}</div>
            <div className="text-white text-sm sm:text-lg tabular-nums leading-none">
              <span ref={distRef}>0.00</span>
              <span className="text-slate-500 text-[10px] ml-1">/ {RACE_KM}K</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="hud-label">{ui.pace}</div>
            <div className="text-sky-300 text-lg tabular-nums leading-none">
              <span ref={paceRef}>7&apos;30&quot;</span>
            </div>
          </div>
          <div>
            <div className="hud-label flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-400 animate-pulse" /> {ui.bpm}
            </div>
            <div className="flex items-center gap-2">
              <span ref={bpmRef} className="text-neon-400 text-sm sm:text-lg tabular-nums leading-none">
                64
              </span>
              <svg width="78" height="20" viewBox="0 0 78 20" className="hidden sm:block">
                <polyline ref={ecgRef} fill="none" stroke="#f472b6" strokeWidth="1.2" points="" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
