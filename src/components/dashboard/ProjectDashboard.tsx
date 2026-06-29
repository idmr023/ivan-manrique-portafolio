'use client';

import { motion } from 'framer-motion';
import { LogOut, TrendingUp, CheckCircle2, Circle, Clock, Zap } from 'lucide-react';
import {
  trackedProjects,
  STATUS_LABELS,
  STATUS_COLORS,
  CATEGORY_LABELS,
  type TrackedProject,
  type ProjectStatus,
} from '@/lib/projects-tracker';
import PasswordGate from './PasswordGate';

const STATUS_ICONS: Record<ProjectStatus, typeof CheckCircle2> = {
  completed: CheckCircle2,
  'in-progress': TrendingUp,
  planning: Clock,
  'not-started': Circle,
};

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="relative h-1.5 bg-void-lighter rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="h-full rounded-full relative"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 10px ${color}40`,
        }}
      >
        {progress > 0 && progress < 100 && (
          <div
            className="absolute right-0 top-0 bottom-0 w-1 animate-pulse"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        )}
      </motion.div>
    </div>
  );
}

function ProjectCard({ proj, index }: { proj: TrackedProject; index: number }) {
  const Icon = STATUS_ICONS[proj.status];
  const color = STATUS_COLORS[proj.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-void/40 backdrop-blur-sm border border-sky-400/8 rounded-lg p-5 hover:border-sky-400/20 transition-colors duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <Icon size={15} style={{ color }} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm leading-tight">
              {proj.name}
            </h3>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
              {CATEGORY_LABELS[proj.category]}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span
            className="font-display font-bold text-2xl leading-none"
            style={{ color }}
          >
            {proj.progress}
          </span>
          <span className="text-xs text-slate-600 font-mono">%</span>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar progress={proj.progress} color={color} />
      </div>

      <div className="mb-3">
        <span
          className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ background: `${color}10`, color, border: `1px solid ${color}25` }}
        >
          {STATUS_LABELS[proj.status]}
        </span>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed mb-2 font-medium">
        <span className="text-slate-600 font-mono text-[10px]">→ </span>
        {proj.currentTask}
      </p>
      <p className="text-slate-500 text-[11px] leading-relaxed">
        {proj.notes}
      </p>

      <div className="mt-4 pt-3 border-t border-sky-400/5 flex items-center justify-between">
        <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
          {proj.updatedAt}
        </span>
        <span className="text-[9px] font-mono text-slate-700 group-hover:text-slate-600 transition-colors">
          #{proj.id}
        </span>
      </div>
    </motion.div>
  );
}

function StatsBar({ projects }: { projects: TrackedProject[] }) {
  const completed = projects.filter((p) => p.status === 'completed').length;
  const inProgress = projects.filter((p) => p.status === 'in-progress').length;
  const notStarted = projects.filter((p) => p.status === 'not-started' || p.status === 'planning').length;
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

  const stats = [
    { label: 'Total', value: projects.length, color: '#38bdf8' },
    { label: 'En progreso', value: inProgress, color: '#38bdf8' },
    { label: 'Completados', value: completed, color: '#4ade80' },
    { label: 'Por iniciar', value: notStarted, color: '#f59e0b' },
    { label: 'Promedio', value: `${avgProgress}%`, color: '#f472b6' },
  ];

  return (
    <div className="flex flex-wrap gap-3 sm:gap-6 mb-10">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="font-display font-bold text-lg" style={{ color: s.color }}>
            {s.value}
          </span>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function DashboardContent() {
  const sorted = [...trackedProjects].sort((a, b) => b.progress - a.progress);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-sky-400/10 border border-sky-400/25 flex items-center justify-center">
                <Zap size={18} className="text-sky-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-white tracking-tight">
                  Project Tracker
                </h1>
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                  // private dashboard — ivan manrique
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('dashboard-auth');
                window.location.reload();
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-neon-400 transition-colors px-3 py-1.5 rounded-md border border-sky-400/8 hover:border-neon-400/20"
            >
              <LogOut size={12} />
              EXIT
            </button>
          </div>
        </header>

        <StatsBar projects={trackedProjects} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sorted.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-sky-400/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-700 tracking-widest uppercase">
            Last updated: 2026-06-29
          </span>
          <span className="text-[10px] font-mono text-slate-700 tracking-widest uppercase">
            {trackedProjects.length} projects tracked
          </span>
        </footer>
      </div>
    </div>
  );
}

export default function ProjectDashboard() {
  return (
    <PasswordGate>
      <DashboardContent />
    </PasswordGate>
  );
}
