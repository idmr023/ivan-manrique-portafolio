'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { CV_URL } from '@/lib/constants';

interface HeroProps {
  i18n: Record<string, string>;
}

export default function Hero({ i18n }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-12">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(56,189,248,0.10) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 60% 40% at 75% 70%, rgba(244,114,182,0.07) 0%, transparent 55%), ' +
            '#08080c',
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden"
        style={{ perspective: '400px', perspectiveOrigin: '50% 0%' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'rotateX(65deg) scale(1.5)',
            transformOrigin: 'bottom',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 80%)',
          }}
        />
      </div>

      {/* Geometric: floating wireframe triangles */}
      <motion.div
        className="absolute top-[18%] left-[8%] hidden sm:block"
        animate={{ y: [0, -25, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '35px solid transparent',
            borderRight: '35px solid transparent',
            borderBottom: '60px solid rgba(56,189,248,0.12)',
            filter: 'drop-shadow(0 0 12px rgba(56,189,248,0.25))',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[10%] hidden sm:block"
        animate={{ y: [0, 18, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderTop: '44px solid rgba(244,114,182,0.10)',
            filter: 'drop-shadow(0 0 10px rgba(244,114,182,0.2))',
          }}
        />
      </motion.div>

      {/* Geometric: concentric circles */}
      <motion.div
        className="absolute top-[22%] right-[15%]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative" style={{ width: '90px', height: '90px' }}>
          <div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: 'rgba(56,189,248,0.2)', boxShadow: '0 0 20px rgba(56,189,248,0.08)' }}
          />
          <div
            className="absolute inset-[25%] rounded-full border"
            style={{ borderColor: 'rgba(56,189,248,0.15)' }}
          />
          <div className="absolute inset-[45%] rounded-full" style={{ background: 'rgba(56,189,248,0.3)' }} />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[18%] hidden sm:block"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="relative" style={{ width: '70px', height: '70px' }}>
          <div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: 'rgba(244,114,182,0.2)', boxShadow: '0 0 15px rgba(244,114,182,0.08)' }}
          />
          <div
            className="absolute inset-[30%] rounded-full border"
            style={{ borderColor: 'rgba(244,114,182,0.15)' }}
          />
        </div>
      </motion.div>

      {/* Geometric: thin diagonal neon lines */}
      <div
        className="absolute top-0 h-full w-px"
        style={{
          left: '25%',
          background: 'linear-gradient(to bottom, transparent, rgba(56,189,248,0.12) 40%, rgba(56,189,248,0.12) 60%, transparent)',
        }}
      />
      <div
        className="absolute top-0 h-full w-px"
        style={{
          left: '75%',
          background: 'linear-gradient(to bottom, transparent, rgba(244,114,182,0.08) 40%, rgba(244,114,182,0.08) 60%, transparent)',
        }}
      />

      {/* Rotating ring — top right */}
      <motion.div
        className="absolute top-[35%] right-[6%] hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="rounded-full border border-dashed"
          style={{
            width: '120px',
            height: '120px',
            borderColor: 'rgba(56,189,248,0.1)',
          }}
        />
      </motion.div>

      {/* Central text container — full width, black transparent */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
        style={{
          background: 'rgba(8, 8, 12, 0.55)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(56, 189, 248, 0.15)',
          borderBottom: '1px solid rgba(244, 114, 182, 0.10)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sky-400/70 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-6"
          >
            {i18n.HERO_NAME}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            {i18n.HERO_H1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-slate-400 text-[11px] sm:text-sm max-w-xl mx-auto mt-6 leading-relaxed"
          >
            {i18n.HERO_H2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8"
          >
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-400/10 hover:bg-sky-400/20 text-sky-400 border border-sky-400/25 hover:border-sky-400/50 text-sm font-medium px-6 py-3 rounded-md transition-all no-underline font-mono"
            >
              <Download size={16} />
              {i18n.HERO_CTA_SECONDARY}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
