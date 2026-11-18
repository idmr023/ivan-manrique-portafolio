'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X, Star } from 'lucide-react';
import type { Project } from '@/lib/data';

interface ProjectModalProps {
  project: Project | null;
  index: number;
  total: number;
  i18n: Record<string, string>;
  closeLabel: string;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}

export default function ProjectModal({ project, index, total, i18n, closeLabel, onClose, onNav }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [project, onClose, onNav]);

  const hasDemo = project && project.demo && project.demo !== '#';
  const hasRepo = project && project.repo && project.repo !== '#';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-8 bg-black/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto term-body cyber-frame bg-[#07070c]/95"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-sky-400/15 bg-[#07070c]/95 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              <span className="text-sky-300">
                PRJ.{String(index + 1).padStart(2, '0')} <span className="text-slate-600">/ {String(total).padStart(2, '0')}</span>
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => onNav(-1)} className="hud-chip" aria-label="prev">←</button>
                <button onClick={() => onNav(1)} className="hud-chip" aria-label="next">→</button>
                <button onClick={onClose} className="hud-chip" aria-label={closeLabel} data-cursor="ESC">
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="relative bg-black/40 aspect-video lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 holo-lines opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#07070c]/60" />
                {project.featured && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-amber-400/15 border border-amber-400/40 text-amber-300">
                    <Star size={11} /> {i18n.PROJECTS_LABEL_FEATURED}
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-8">
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">{project.title}</h3>

                <div className="mt-6 space-y-5 text-sm leading-relaxed">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neon-400 mb-1.5">// {i18n.PROJECTS_LABEL_PROBLEM}</div>
                    <p className="text-slate-300">{project.problem}</p>
                  </div>
                  <p className="text-slate-400">{project.desc}</p>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-1.5">// {i18n.PROJECTS_LABEL_RESULT}</div>
                    <p className="text-slate-200">{project.result}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-400 mb-2">// {i18n.PROJECTS_LABEL_STACK}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techs.split('|').map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-sky-200 border border-sky-400/25 bg-sky-400/5">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {(hasDemo || hasRepo) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {hasDemo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-neon" data-cursor="LIVE">
                        <ExternalLink size={15} /> {i18n.PROJECTS_LABEL_DEMO}
                      </a>
                    )}
                    {hasRepo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor="CODE">
                        <Github size={15} /> {i18n.PROJECTS_LABEL_REPO}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
