'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import { fadeUp, viewportOnce } from '@/lib/animations';
import type { ExperienceItem } from '@/lib/data';

interface ExperienceProps {
  i18n: Record<string, string>;
  experience: ExperienceItem[];
}

export default function Experience({ i18n, experience }: ExperienceProps) {
  return (
    <SectionContainer sectionNumber="03" title={i18n.EXPERIENCE_TITLE} id="experience">
      <p className="text-slate-500 text-sm mb-8 font-mono">{i18n.EXPERIENCE_SUBTITLE}</p>

      <div className="space-y-5">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.role}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ delay: index * 0.1 }}
            className="bg-void-light/30 border border-sky-400/8 rounded-md p-6 sm:p-8 hover:border-sky-400/20 transition-all duration-200"
          >
            <div className="mb-5">
              <h3 className="text-lg font-display font-semibold text-white">{exp.role}</h3>
              <p className="text-sky-400 text-sm mt-1 font-mono">{exp.period}</p>
            </div>
            <ul className="space-y-3">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <Check size={14} className="text-sky-400/60 mt-1 shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
