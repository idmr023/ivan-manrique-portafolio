'use client';

import { motion } from 'framer-motion';
import { Mail, Download } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { CV_URL, EMAIL } from '@/lib/constants';

interface ContactProps {
  i18n: Record<string, string>;
}

export default function Contact({ i18n }: ContactProps) {
  return (
    <SectionContainer sectionNumber="06" title={i18n.CONTACT_TITLE} id="contact">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="text-center"
      >
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 tracking-tight">
          {i18n.CONTACT_TITLE}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
          {i18n.CONTACT_SUBTITLE}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-sky-400/10 hover:bg-sky-400/20 text-sky-400 border border-sky-400/30 hover:border-sky-400/50 font-semibold px-8 py-3.5 rounded-md transition-all no-underline text-base w-full sm:w-auto justify-center font-mono"
          >
            <Mail size={18} />
            {i18n.CONTACT_CTA_PRIMARY}
          </a>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neon-400/30 text-neon-400 hover:bg-neon-400/10 font-medium px-8 py-3.5 rounded-md transition-all no-underline text-base w-full sm:w-auto justify-center font-mono"
          >
            <Download size={18} />
            {i18n.CONTACT_CTA_SECONDARY}
          </a>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
