'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import SectionContainer from '@/components/ui/SectionContainer';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface AboutProps {
  i18n: Record<string, string>;
}

export default function About({ i18n }: AboutProps) {
  return (
    <SectionContainer sectionNumber="01" title={i18n.ABOUT_TITLE} id="about">
      <motion.div
        className="grid lg:grid-cols-5 gap-10 items-start"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <div className="lg:col-span-3 space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base">
          <motion.p variants={fadeUp}>{i18n.ABOUT_P1}</motion.p>
          <motion.p variants={fadeUp} dangerouslySetInnerHTML={{ __html: i18n.ABOUT_P2 }} />
          <motion.p variants={fadeUp} dangerouslySetInnerHTML={{ __html: i18n.ABOUT_P3 }} />
        </div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="bg-void-lighter/40 border border-sky-400/10 rounded-md p-6 space-y-5">
            <h3 className="text-white font-display font-semibold text-lg flex items-center gap-2">
              <Activity size={20} className="text-sky-400" />
              {i18n.RUNNING_TITLE}
            </h3>
            <p className="text-slate-400 italic text-sm leading-relaxed border-l-2 border-sky-400/30 pl-4">
              {i18n.RUNNING_QUOTE}
            </p>
            <p className="text-slate-500 text-sm">{i18n.RUNNING_DESC}</p>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-sky-400/10">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-sky-400">{i18n.RUNNING_STATS_1}</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{i18n.RUNNING_LABEL_1}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-sky-400">{i18n.RUNNING_STATS_2}</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{i18n.RUNNING_LABEL_2}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-sky-400">{i18n.RUNNING_STATS_3}</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">{i18n.RUNNING_LABEL_3}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
