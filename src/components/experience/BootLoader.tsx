'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { run, emit, prefersReducedMotion } from '@/lib/run-store';
import type { UIStrings } from '@/i18n/ui';

const SEEN_KEY = 'ivanos-booted';

/** Full-screen terminal boot sequence with a pixel runner on the progress track. */
export default function BootLoader({ ui }: { ui: UIStrings }) {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}
    const fast = seen || prefersReducedMotion();
    const lineDelay = fast ? 45 : 210;
    const timers: number[] = [];
    document.documentElement.style.overflow = 'hidden';

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setProgress(100);
      setDone(true);
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      timers.push(
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = '';
          run.booted = true;
          emit('booted');
        }, fast ? 250 : 650)
      );
    };

    ui.bootLines.forEach((line, i) => {
      timers.push(
        window.setTimeout(() => {
          setLines((l) => [...l, line]);
          setProgress(Math.round(((i + 1) / ui.bootLines.length) * 100));
          if (i === ui.bootLines.length - 1) timers.push(window.setTimeout(finish, fast ? 80 : 380));
        }, 260 + i * lineDelay + (fast ? 0 : Math.random() * 60))
      );
    });

    const skip = () => {
      setLines(ui.bootLines);
      finish();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      document.documentElement.style.overflow = '';
    };
  }, [ui]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[300] bg-[#050507] text-sky-300 font-mono flex items-center justify-center px-4"
          exit={{ clipPath: 'inset(50% 0 50% 0)', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          style={{ clipPath: 'inset(0% 0 0% 0)' }}
        >
          <div className="boot-scanlines" />
          <div className="w-full max-w-2xl relative">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-4 uppercase tracking-[0.25em]">
              <span>{ui.bootTitle}</span>
              <span className="hidden sm:inline">tty0</span>
            </div>

            <div className="min-h-[220px] sm:min-h-[260px] text-[11px] sm:text-sm leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  <span className="text-neon-400">❯ </span>
                  <span className={i === lines.length - 1 ? 'text-white' : 'text-sky-300/80'}>{l}</span>
                </div>
              ))}
              {!done && <span className="inline-block w-2 h-4 bg-sky-400 align-middle animate-cursor-blink ml-1" />}
            </div>

            {/* Progress "running track" */}
            <div className="mt-8">
              <div className="relative h-10">
                <div
                  className="absolute bottom-2 transition-[left] duration-200 ease-out"
                  style={{ left: `calc(${progress}% - 14px)` }}
                >
                  <PixelRunner />
                </div>
              </div>
              <div className="relative h-[6px] bg-sky-400/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-400 to-neon-400 transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%`, boxShadow: '0 0 14px rgba(56,189,248,0.8)' }}
                />
                <div className="absolute inset-0 boot-track-dashes" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-slate-500">
                <span>0 KM</span>
                <span className="text-sky-300 tabular-nums">{String(progress).padStart(3, '0')}%</span>
                <span>35 KM</span>
              </div>
            </div>

            <div className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-slate-600">
              {done ? <span className="text-neon-400 animate-pulse">{ui.bootGo}</span> : ui.bootSkip}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PixelRunner() {
  return (
    <svg width="28" height="28" viewBox="0 0 14 14" className="pixel-runner" shapeRendering="crispEdges">
      <g className="pr-frame-a" fill="#38bdf8">
        <rect x="7" y="0" width="3" height="3" />
        <rect x="6" y="3" width="3" height="4" />
        <rect x="9" y="4" width="3" height="1" />
        <rect x="4" y="4" width="2" height="1" />
        <rect x="5" y="7" width="2" height="3" />
        <rect x="3" y="10" width="2" height="2" />
        <rect x="8" y="7" width="2" height="2" />
        <rect x="10" y="9" width="2" height="3" />
      </g>
      <g className="pr-frame-b" fill="#f472b6">
        <rect x="7" y="0" width="3" height="3" />
        <rect x="6" y="3" width="3" height="4" />
        <rect x="9" y="5" width="2" height="1" />
        <rect x="5" y="5" width="1" height="2" />
        <rect x="6" y="7" width="2" height="5" />
        <rect x="8" y="8" width="2" height="2" />
        <rect x="9" y="10" width="2" height="2" />
      </g>
    </svg>
  );
}
