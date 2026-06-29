'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import IconBox from '@/components/ui/IconBox';
import { fadeUp, viewportOnce } from '@/lib/animations';
import type { Cert } from '@/lib/data';

interface EducationProps {
  i18n: Record<string, string>;
  certs: Cert[];
}

export default function Education({ i18n, certs }: EducationProps) {
  const cards = [
    { title: i18n.EDUCATION_UTP_TITLE, desc: i18n.EDUCATION_UTP_DESC, status: i18n.EDUCATION_UTP_STATUS, statusColor: 'sky' as const },
    { title: i18n.EDUCATION_IMPULSA_TITLE, desc: i18n.EDUCATION_IMPULSA_DESC, status: i18n.EDUCATION_IMPULSA_STATUS, statusColor: 'amber' as const },
  ];

  return (
    <SectionContainer sectionNumber="02" title={i18n.EDUCATION_TITLE} id="education">
      <div className="space-y-4 mb-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={{ delay: index * 0.1 }}
            className="bg-void-light/30 border border-sky-400/8 rounded-md p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 hover:border-sky-400/20 transition-all duration-200"
          >
            <IconBox icon={GraduationCap} />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="text-lg font-display font-semibold text-white">{card.title}</h3>
                <span
                  className={`px-2.5 py-0.5 text-xs rounded border w-fit font-mono ${
                    card.statusColor === 'sky'
                      ? 'bg-sky-400/10 text-sky-400 border-sky-400/20'
                      : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                  }`}
                >
                  {card.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-display font-bold text-white mb-6 tracking-tight flex items-center gap-2">
          <Award size={18} className="text-neon-400" />
          {i18n.CERTIFICATIONS_TITLE}
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {certs.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: index * 0.1 }}
              className="bg-void-light/30 border border-neon-400/8 rounded-md p-5 hover:border-neon-400/25 transition-all duration-200"
            >
              <h4 className="text-sm font-semibold text-white mb-2 leading-snug">{cert.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
