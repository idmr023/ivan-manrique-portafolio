'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionContainer from '@/components/ui/SectionContainer';
import type { ExperienceItem } from '@/lib/data';

interface ExperienceProps {
  i18n: Record<string, string>;
  experience: ExperienceItem[];
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

function slug(role: string) {
  return role.split(',').pop()!.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function Experience({ i18n, experience }: ExperienceProps) {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState(0);
  const [typed, setTyped] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const exp = experience[tab];
  const command = `git log --author="ivan" --branch=${slug(exp.role)}`;

  // type the command, then print commits one by one
  useEffect(() => {
    if (!inView) return;
    setTyped('');
    setShown(0);
    let i = 0;
    const timers: number[] = [];
    const typeNext = () => {
      i++;
      setTyped(command.slice(0, i));
      if (i < command.length) timers.push(window.setTimeout(typeNext, 18));
      else
        exp.bullets.forEach((_, b) =>
          timers.push(window.setTimeout(() => setShown(b + 1), 250 + b * 320))
        );
    };
    timers.push(window.setTimeout(typeNext, 200));
    return () => timers.forEach(clearTimeout);
  }, [inView, tab, command, exp.bullets]);

  return (
    <SectionContainer sectionNumber="03" title={i18n.EXPERIENCE_TITLE} id="experience" bare kicker={`// ${i18n.EXPERIENCE_SUBTITLE}`}>
      <div ref={ref} className="cyber-frame bg-[#05050a]/85 font-mono overflow-hidden">
        {/* window chrome + tabs */}
        <div className="flex items-stretch border-b border-sky-400/15 overflow-x-auto">
          <div className="flex items-center gap-2 px-4 border-r border-sky-400/10 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400/80" />
          </div>
          {experience.map((e, i) => (
            <button
              key={e.role}
              onClick={() => setTab(i)}
              className={`relative px-4 sm:px-5 py-3 text-[11px] sm:text-xs whitespace-nowrap transition-colors ${
                tab === i ? 'text-white bg-sky-400/[0.06]' : 'text-slate-500 hover:text-slate-300'
              }`}
              data-cursor="TAB"
            >
              ~/{slug(e.role)}
              {tab === i && (
                <motion.span layoutId="exp-tab" className="absolute inset-x-0 bottom-0 h-[2px] bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-8 text-[12px] sm:text-sm min-h-[420px]">
          <div className="text-slate-300 break-all">
            <span className="text-emerald-400">ivan@marcona</span>
            <span className="text-slate-500">:</span>
            <span className="text-sky-400">~/{slug(exp.role)}</span>
            <span className="text-slate-500">$ </span>
            {typed}
            {typed.length < command.length && <span className="inline-block w-2 h-4 bg-sky-400 align-middle animate-cursor-blink ml-0.5" />}
          </div>

          {typed.length === command.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 mb-6">
              <div className="font-display text-xl sm:text-2xl text-white font-semibold">{exp.role}</div>
              <div className="text-sky-300 text-xs mt-1">
                <span className="text-slate-500">Date: </span>
                {exp.period}
              </div>
            </motion.div>
          )}

          <ul className="space-y-4">
            {exp.bullets.slice(0, shown).map((b, i) => (
              <motion.li
                key={`${tab}-${i}`}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="group grid grid-cols-[auto_1fr] gap-x-3 hover:bg-sky-400/[0.04] -mx-2 px-2 py-1 transition-colors"
              >
                <span className="text-amber-300/90 select-none">
                  <span className="text-slate-600">commit</span> {hash(b)}
                </span>
                <span className="col-start-2 text-slate-300 font-sans leading-relaxed group-hover:text-white transition-colors">
                  <span className="text-emerald-400 font-mono mr-2">✔</span>
                  {b}
                </span>
              </motion.li>
            ))}
          </ul>

          {shown === exp.bullets.length && shown > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-slate-500 text-xs">
              (END) · {exp.bullets.length} commits ·{' '}
              {experience.length > 1 && (
                <button
                  onClick={() => setTab((tab + 1) % experience.length)}
                  className="text-sky-400 hover:text-sky-300 underline-offset-4 hover:underline"
                >
                  git checkout {slug(experience[(tab + 1) % experience.length].role)} →
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
