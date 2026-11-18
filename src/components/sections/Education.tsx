'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Award, Lock, Unlock } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import ScrambleText from '@/components/experience/ScrambleText';
import type { Cert } from '@/lib/data';
import type { UIStrings } from '@/i18n/ui';

interface EducationProps {
  i18n: Record<string, string>;
  ui: UIStrings;
  certs: Cert[];
}

const STATUS_COLORS: Record<string, string> = {
  sky: 'text-sky-300 border-sky-400/30 bg-sky-400/10',
  amber: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  violet: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
  emerald: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
};
const DOT_COLORS: Record<string, string> = {
  sky: '#38bdf8',
  amber: '#f59e0b',
  violet: '#a78bfa',
  emerald: '#34d399',
};

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setUnlocked(true)}
      onFocus={() => setUnlocked(true)}
      onClick={() => setUnlocked(true)}
      className={`text-left relative p-5 border transition-all duration-300 overflow-hidden group ${
        unlocked ? 'border-neon-400/40 bg-neon-400/[0.05]' : 'border-sky-400/10 bg-void-light/40'
      }`}
      data-cursor={unlocked ? '' : 'UNLOCK'}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[9px] tracking-[0.25em] text-slate-500">ACH.{String(index + 1).padStart(2, '0')}</span>
        {unlocked ? <Unlock size={14} className="text-neon-400" /> : <Lock size={14} className="text-slate-600" />}
      </div>
      {unlocked ? (
        <ScrambleText
          as="h4"
          text={cert.title}
          trigger="mount"
          hover={false}
          duration={600}
          className="block text-sm font-semibold text-white leading-snug"
        />
      ) : (
        <h4 className="text-sm font-mono text-slate-600 leading-snug select-none">
          {cert.title.replace(/[^\s]/g, '█').slice(0, 42)}
        </h4>
      )}
      <motion.p
        initial={false}
        animate={{ opacity: unlocked ? 1 : 0, height: unlocked ? 'auto' : 0 }}
        className="text-xs text-slate-400 leading-relaxed mt-2 overflow-hidden"
      >
        {cert.desc}
      </motion.p>
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-neon-400 to-sky-400 transition-all duration-700 ${
          unlocked ? 'w-full' : 'w-0'
        }`}
      />
    </motion.button>
  );
}

export default function Education({ i18n, ui, certs }: EducationProps) {
  const cards = [
    { title: i18n.EDUCATION_UTP_TITLE, desc: i18n.EDUCATION_UTP_DESC, status: i18n.EDUCATION_UTP_STATUS, color: 'sky' },
    { title: i18n.EDUCATION_IMPULSA_TITLE, desc: i18n.EDUCATION_IMPULSA_DESC, status: i18n.EDUCATION_IMPULSA_STATUS, color: 'amber' },
    { title: i18n.EDUCATION_ITB_TITLE, desc: i18n.EDUCATION_ITB_DESC, status: i18n.EDUCATION_ITB_STATUS, color: 'violet' },
    { title: i18n.EDUCATION_ETH_TITLE, desc: i18n.EDUCATION_ETH_DESC, status: i18n.EDUCATION_ETH_STATUS, color: 'emerald' },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <SectionContainer sectionNumber="02" title={i18n.EDUCATION_TITLE} id="education" bare>
      <div ref={trackRef} className="relative pl-10 sm:pl-16">
        {/* lap track */}
        <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-[2px] bg-sky-400/10">
          <motion.div className="absolute inset-0 origin-top bg-gradient-to-b from-sky-400 via-amber-400 to-emerald-400" style={{ scaleY: fill }} />
        </div>

        <div className="space-y-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                className="absolute -left-[34px] sm:-left-[47px] top-7 w-4 h-4 rotate-45 border-2 bg-void"
                style={{ borderColor: DOT_COLORS[card.color], boxShadow: `0 0 14px ${DOT_COLORS[card.color]}` }}
              />
              <div
                className="cyber-frame glow-follow p-6 sm:p-7 group"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500">
                    {ui.lap} {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-white flex items-center gap-2 group-hover:text-sky-200 transition-colors">
                    <GraduationCap size={18} style={{ color: DOT_COLORS[card.color] }} />
                    {card.title}
                  </h3>
                  <span className={`sm:ml-auto px-2.5 py-0.5 text-[10px] border w-fit font-mono uppercase tracking-wider ${STATUS_COLORS[card.color]}`}>
                    {card.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap items-baseline gap-3 mb-6">
          <h3 className="text-xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Award size={20} className="text-neon-400" />
            {i18n.CERTIFICATIONS_TITLE}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            {ui.achievements} · {ui.decrypt}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
          {certs.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
