'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Copy, Check, Linkedin, Github } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import Magnetic from '@/components/experience/Magnetic';
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import type { UIStrings } from '@/i18n/ui';

interface ContactProps {
  i18n: Record<string, string>;
  ui: UIStrings;
}

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Contact({ i18n, ui }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      if (timeRef.current) timeRef.current.textContent = formatTime(performance.now() - start);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <SectionContainer sectionNumber="06" title={ui.finish} id="contact" bare>
      <div className="relative cyber-frame overflow-hidden bg-[#05050a]/75">
        {/* checkered finish banner */}
        <div className="h-6 finish-checker" aria-hidden="true" />

        <div className="relative px-6 py-14 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 finish-glow" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-slate-500"
          >
            35.00 KM · {ui.yourTime}: <span ref={timeRef} className="text-amber-300 tabular-nums">00:00:00</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 font-display font-bold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] glitch-hover"
          >
            {i18n.CONTACT_TITLE}
          </motion.h3>
          <p className="relative mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">{i18n.CONTACT_SUBTITLE}</p>

          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="btn-neon text-base !px-8 !py-4" data-cursor="MAIL">
                <Mail size={18} />
                {i18n.CONTACT_CTA_PRIMARY}
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={copy} className="btn-ghost !py-4" data-cursor="COPY">
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                {copied ? ui.copied : ui.copyEmail}
              </button>
            </Magnetic>
            <Magnetic>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-4 !border-neon-400/40 !text-neon-300" data-cursor="CV">
                <Download size={16} />
                {i18n.CONTACT_CTA_SECONDARY}
              </a>
            </Magnetic>
          </div>

          <div className="relative mt-10 flex items-center justify-center gap-6">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label={i18n.SMB_LINKEDIN} className="social-btn">
              <Linkedin size={18} />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label={i18n.SMB_GITHUB} className="social-btn">
              <Github size={18} />
            </a>
            <span className="font-mono text-xs text-slate-500 select-all">{EMAIL}</span>
          </div>
        </div>

        <div className="h-6 finish-checker" aria-hidden="true" />
      </div>
    </SectionContainer>
  );
}
