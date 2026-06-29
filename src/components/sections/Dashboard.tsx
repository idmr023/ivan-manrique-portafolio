'use client';

import { motion } from 'framer-motion';

interface DashboardProps {
  i18n: Record<string, string>;
}

export default function Dashboard({ i18n }: DashboardProps) {
  const metrics = [
    { value: '5', label: i18n.PROJECTS_TITLE, color: 'text-sky-400' },
    { value: '1900+', label: i18n.EXP_TP_1?.split(' ').slice(-2).join(' ') || 'Cases', color: 'text-neon-400' },
    { value: '35km', label: i18n.RUNNING_LABEL_1, color: 'text-sky-400' },
  ];

  return (
    <section className="px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10"
      >
        <div className="text-center">
          <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Developer</p>
          <p className="text-lg font-display font-bold text-white mt-0.5">Ivan Manrique</p>
        </div>

        <div className="w-px h-12 bg-sky-400/10 hidden sm:block" />

        <div className="flex gap-6 sm:gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className={`text-2xl font-display font-bold ${m.color}`}>{m.value}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 max-w-[80px]">{m.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
