'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import ScrambleText from '@/components/experience/ScrambleText';

interface SectionContainerProps {
  sectionNumber: string;
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  /** render children without the framed panel */
  bare?: boolean;
  /** small mono line under the title */
  kicker?: string;
  wide?: boolean;
}

/**
 * Section shell: checkpoint header ("CP.01 ── title") + cyber frame whose
 * border glow follows the cursor (CSS vars --mx/--my).
 */
export default function SectionContainer({
  sectionNumber,
  title,
  id,
  children,
  className = '',
  bare = false,
  kicker,
  wide = false,
}: SectionContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} data-section={id} className={`relative z-10 px-4 sm:px-6 lg:pl-28 py-24 sm:py-32 ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`${wide ? 'max-w-7xl' : 'max-w-6xl'} mx-auto`}
      >
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-sky-400/70">
            <span className="px-1.5 py-0.5 border border-sky-400/30 text-sky-300">CP.{sectionNumber}</span>
            <motion.span
              className="h-px flex-1 origin-left bg-gradient-to-r from-sky-400/50 via-neon-400/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="text-slate-600 hidden sm:inline">#{id}</span>
          </div>
          <ScrambleText
            as="h2"
            text={title}
            className="mt-5 block font-display font-bold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] glitch-hover"
          />
          {kicker && <p className="mt-4 font-mono text-xs sm:text-sm text-slate-500 max-w-2xl">{kicker}</p>}
        </header>

        {bare ? (
          children
        ) : (
          <div
            className="cyber-frame glow-follow p-6 sm:p-8 lg:p-10"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }}
          >
            {children}
          </div>
        )}
      </motion.div>
    </section>
  );
}
