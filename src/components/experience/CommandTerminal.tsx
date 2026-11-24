'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { on, emit, run, scrollToId } from '@/lib/run-store';
import { CV_URL, CV_FILENAME, EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import type { Locale } from '@/i18n';
import type { UIStrings } from '@/i18n/ui';
import type { Project } from '@/lib/data';

interface Line {
  id: number;
  kind: 'in' | 'out' | 'err' | 'ok';
  text: ReactNode;
}

interface CommandTerminalProps {
  ui: UIStrings;
  i18n: Record<string, string>;
  locale: Locale;
  projects: Project[];
  sections: { id: string; label: string }[];
}

const SECTION_CMDS = ['hero', 'about', 'education', 'experience', 'skills', 'projects', 'contact'];

export default function CommandTerminal({ ui, i18n, locale, projects, sections }: CommandTerminalProps) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const push = useCallback((kind: Line['kind'], text: ReactNode) => {
    setLines((l) => [...l, { id: idRef.current++, kind, text }]);
  }, []);

  const COMMANDS: Record<string, string> = {
    help: 'list commands',
    whoami: 'who is running this',
    ls: 'list sections / projects (ls projects)',
    goto: 'goto <section>',
    open: 'open <project-id>',
    stack: 'print tech stack',
    cv: 'download resume',
    email: 'copy email',
    github: 'open github',
    linkedin: 'open linkedin',
    lang: 'lang <es|en|pt>',
    sprint: 'sprint burst 🏃',
    warp: 'toggle warp drive',
    stats: 'race telemetry',
    clear: 'clear screen',
    exit: 'close terminal',
  };

  const execute = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push('in', input);
      if (!input) return;
      setHistory((h) => [input, ...h].slice(0, 30));
      const [cmd, ...args] = input.split(/\s+/);
      const arg = args.join(' ').toLowerCase();
      const c = cmd.toLowerCase();

      if (SECTION_CMDS.includes(c)) {
        push('ok', `→ jumping to #${c}`);
        setOpen(false);
        setTimeout(() => scrollToId(c), 150);
        return;
      }

      switch (c) {
        case 'help':
          push(
            'out',
            <div className="grid grid-cols-[110px_1fr] gap-x-4">
              {Object.entries(COMMANDS).map(([k, v]) => (
                <div key={k} className="contents">
                  <span className="text-sky-300">{k}</span>
                  <span className="text-slate-500">{v}</span>
                </div>
              ))}
              <span className="col-span-2 mt-2 text-slate-500">
                shortcuts: <span className="text-sky-300">{SECTION_CMDS.join(' · ')}</span>
              </span>
            </div>
          );
          break;
        case 'whoami':
          push('out', `${i18n.HERO_NAME} — ${i18n.HERO_H2}`);
          break;
        case 'ls':
          if (arg.startsWith('proj')) {
            projects.forEach((p, i) =>
              push('out', `${String(i + 1).padStart(2, '0')}  ${p.id.padEnd(22, ' ')} ${p.title}`)
            );
            push('out', <span className="text-slate-500">→ open &lt;project-id&gt;</span>);
          } else {
            sections.forEach((s) => push('out', `/${s.id.padEnd(14, ' ')} ${s.label}`));
          }
          break;
        case 'goto': {
          const target = sections.find((s) => s.id === arg || s.label.toLowerCase() === arg);
          if (target) {
            push('ok', `→ jumping to #${target.id}`);
            setOpen(false);
            setTimeout(() => scrollToId(target.id), 150);
          } else push('err', `goto: section not found "${arg}". try: ls`);
          break;
        }
        case 'open': {
          const p = projects.find((x) => x.id === arg) ?? projects[Number(arg) - 1];
          if (p) {
            push('ok', `→ opening ${p.title}`);
            setOpen(false);
            setTimeout(() => emit('project:open', p.id), 150);
          } else push('err', `open: project not found "${arg}". try: ls projects`);
          break;
        }
        case 'stack':
          push('out', <span><span className="text-sky-300">frontend</span> {i18n.SKILLS_FRONTEND_ITEMS}</span>);
          push('out', <span><span className="text-neon-400">data</span> {i18n.SKILLS_DATA_ITEMS}</span>);
          push('out', <span><span className="text-amber-400">tools</span> {i18n.SKILLS_TOOLS_ITEMS}</span>);
          break;
        case 'cv':
        case 'resume':
          push('ok', `→ downloading ${CV_FILENAME}...`);
          {
            const a = document.createElement('a');
            a.href = CV_URL;
            a.download = CV_FILENAME;
            a.click();
          }
          break;
        case 'email':
          navigator.clipboard?.writeText(EMAIL).then(
            () => push('ok', `${EMAIL} ✓ ${ui.copied}`),
            () => push('out', EMAIL)
          );
          break;
        case 'github':
          window.open(GITHUB_URL, '_blank', 'noopener');
          push('ok', '→ github.com/idmr023');
          break;
        case 'linkedin':
          window.open(LINKEDIN_URL, '_blank', 'noopener');
          push('ok', '→ linkedin');
          break;
        case 'lang':
          if (['es', 'en', 'pt'].includes(arg)) {
            push('ok', `→ switching locale to ${arg}`);
            window.location.href = arg === 'es' ? '/' : `/${arg}`;
          } else push('err', `lang: expected es | en | pt (current: ${locale})`);
          break;
        case 'sprint':
          push('ok', 'SPRINT MODE ▸▸▸ go go go');
          emit('sprint');
          break;
        case 'warp':
          run.warpTarget = run.warpTarget > 0.5 ? 0 : 1;
          push('ok', `warp drive ${run.warpTarget ? 'ENGAGED' : 'disengaged'}`);
          break;
        case 'stats':
          push('out', `distance  ${(run.progress * 35).toFixed(2)} km / 35 km`);
          push('out', `section   #${run.section}`);
          push('out', `velocity  ${Math.abs(run.velocity).toFixed(1)} px/f`);
          break;
        case 'sudo':
          if (arg.includes('hire')) {
            push('ok', 'permission granted. opening mail client...');
            window.location.href = `mailto:${EMAIL}?subject=Hola%20Ivan`;
          } else push('err', 'sudo: nice try 😏 — try "sudo hire ivan"');
          break;
        case 'clear':
          setLines([]);
          break;
        case 'exit':
        case 'q':
          setOpen(false);
          break;
        default:
          push('err', `command not found: ${c}. type "help"`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n, locale, projects, push, sections, ui]
  );

  useEffect(() => {
    const offOpen = on('terminal:open', () => setOpen(true));
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.matches?.('input, textarea');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      offOpen();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      if (lines.length === 0) {
        push('out', <span className="text-slate-500">IVAN//OS shell · {ui.terminalHint}</span>);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const complete = () => {
    const [cmd, ...rest] = value.split(' ');
    if (rest.length === 0) {
      const all = [...Object.keys(COMMANDS), ...SECTION_CMDS];
      const match = all.find((k) => k.startsWith(cmd.toLowerCase()));
      if (match) setValue(match + ' ');
    } else if (cmd === 'open') {
      const m = projects.find((p) => p.id.startsWith(rest.join(' ')));
      if (m) setValue(`open ${m.id}`);
    } else if (cmd === 'goto') {
      const m = sections.find((s) => s.id.startsWith(rest.join(' ')));
      if (m) setValue(`goto ${m.id}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-full max-w-2xl mt-16 sm:mt-0 cyber-frame bg-[#06060a]/95 font-mono text-[12px] sm:text-[13px]"
            role="dialog"
            aria-label="Terminal"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-sky-400/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neon-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400/80" />
                <span className="ml-3 text-slate-500 text-[11px]">ivan@marcona: ~</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white text-[11px]">
                ESC
              </button>
            </div>
            <div
              ref={bodyRef}
              className="term-body h-[52vh] sm:h-[380px] overflow-y-auto px-4 py-3 space-y-1"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((l) => (
                <div
                  key={l.id}
                  className={
                    l.kind === 'in'
                      ? 'text-white'
                      : l.kind === 'err'
                      ? 'text-neon-400'
                      : l.kind === 'ok'
                      ? 'text-emerald-400'
                      : 'text-slate-300 whitespace-pre-wrap'
                  }
                >
                  {l.kind === 'in' && <span className="text-sky-400">❯ </span>}
                  {l.text}
                </div>
              ))}
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  execute(value);
                  setValue('');
                  setHIndex(-1);
                }}
              >
                <span className="text-sky-400 mr-2">❯</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      complete();
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const i = Math.min(history.length - 1, hIndex + 1);
                      if (history[i] !== undefined) {
                        setHIndex(i);
                        setValue(history[i]);
                      }
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const i = hIndex - 1;
                      setHIndex(Math.max(-1, i));
                      setValue(i >= 0 ? history[i] : '');
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-white caret-sky-400"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="command"
                />
              </form>
            </div>
            <div className="px-4 py-2 border-t border-sky-400/10 text-[10px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
              {['help', 'ls projects', 'goto skills', 'sprint', 'warp', 'sudo hire ivan'].map((s) => (
                <button key={s} onClick={() => execute(s)} className="hover:text-sky-300 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
