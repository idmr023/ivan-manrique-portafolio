'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface SectionContainerProps {
  sectionNumber: string;
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  sectionNumber,
  title,
  id,
  children,
  className = '',
}: SectionContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id={id} className={`px-4 sm:px-6 py-24 ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <span className="text-sky-400/50 text-xs font-mono tracking-widest uppercase">
            <span className="text-slate-700">//</span> {sectionNumber}. {title}
          </span>
        </div>

        <div className="bg-void/25 backdrop-blur-sm border border-sky-400/8 rounded-md p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:border-sky-400/15">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
