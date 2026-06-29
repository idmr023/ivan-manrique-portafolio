'use client';

import { useEffect, useRef, useState } from 'react';
import type { Skill, TechNode } from '@/lib/data';
import { CATEGORY_COLORS } from '@/lib/data';

interface TerminalSkillsProps {
  skills: Skill[];
  techNodes: TechNode[];
  title: string;
  subtitle: string;
  labels: { improved: string; improving: string };
  categoryLabels: { frontend: string; data: string; tools: string; soft: string };
  terminalLabels: {
    execute: string;
    reexecute: string;
    ready: string;
    summary: string;
  };
}

interface OutputLine {
  id: number;
  text: string;
  color: string;
  prefix: string;
  prefixColor: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  badgeBorder?: string;
  charSpeed: number;
  lineDelay: number;
  bold?: boolean;
  dim?: boolean;
}

const C = {
  frontend: '#38bdf8',
  data: '#f472b6',
  tools: '#f59e0b',
  soft: '#7dd3fc',
  prompt: '#38bdf8',
  text: '#e2e8f0',
  dim: '#64748b',
  improved: '#38bdf8',
  improving: '#f472b6',
};

export default function TerminalSkills({
  skills,
  techNodes,
  title,
  subtitle,
  labels,
  categoryLabels,
  terminalLabels,
}: TerminalSkillsProps) {
  const [executionCount, setExecutionCount] = useState(0);
  const [completedLines, setCompletedLines] = useState<OutputLine[]>([]);
  const [currentLine, setCurrentLine] = useState<OutputLine | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const buildLines = (): OutputLine[] => {
    const lines: OutputLine[] = [];
    let id = 0;

    lines.push({
      id: id++, text: 'ivans_skills --list', color: C.prompt,
      prefix: '$ ', prefixColor: C.prompt,
      charSpeed: 35, lineDelay: 350, bold: true,
    });

    lines.push({ id: id++, text: '', color: C.dim, prefix: '', prefixColor: C.dim, charSpeed: 0, lineDelay: 100 });

    const cats = [
      { label: categoryLabels.frontend, color: C.frontend, items: techNodes.filter(n => n.category === 'frontend').map(n => n.name) },
      { label: categoryLabels.data, color: C.data, items: techNodes.filter(n => n.category === 'data').map(n => n.name) },
      { label: categoryLabels.tools, color: C.tools, items: techNodes.filter(n => n.category === 'tools').map(n => n.name) },
    ];

    for (const cat of cats) {
      lines.push({
        id: id++, text: `[${cat.label.toUpperCase()}]`, color: cat.color,
        prefix: '', prefixColor: cat.color,
        charSpeed: 20, lineDelay: 150, bold: true,
      });

      for (const item of cat.items) {
        lines.push({
          id: id++, text: item, color: cat.color,
          prefix: '  → ', prefixColor: cat.color,
          charSpeed: 8, lineDelay: 25, dim: true,
        });
      }

      lines.push({ id: id++, text: '', color: C.dim, prefix: '', prefixColor: C.dim, charSpeed: 0, lineDelay: 80 });
    }

    lines.push({
      id: id++, text: `[${categoryLabels.soft.toUpperCase()}]`, color: C.soft,
      prefix: '', prefixColor: C.soft,
      charSpeed: 20, lineDelay: 150, bold: true,
    });

    for (const skill of skills) {
      const improved = skill.state === 'improved';
      lines.push({
        id: id++, text: skill.name, color: C.text,
        prefix: '  ● ', prefixColor: improved ? C.improved : C.improving,
        badge: improved ? labels.improved : labels.improving,
        badgeColor: improved ? C.improved : C.improving,
        badgeBg: improved ? 'rgba(56,189,248,0.10)' : 'rgba(244,114,182,0.10)',
        badgeBorder: improved ? 'rgba(56,189,248,0.25)' : 'rgba(244,114,182,0.25)',
        charSpeed: 12, lineDelay: 60,
      });
    }

    lines.push({ id: id++, text: '', color: C.dim, prefix: '', prefixColor: C.dim, charSpeed: 0, lineDelay: 120 });

    const summary = terminalLabels.summary
      .replace('{skills}', String(skills.length))
      .replace('{techs}', String(techNodes.length));
    lines.push({
      id: id++, text: summary, color: C.dim,
      prefix: '  ', prefixColor: C.dim,
      charSpeed: 8, lineDelay: 300,
    });

    return lines;
  };

  useEffect(() => {
    if (executionCount === 0) return;

    const allLines = buildLines();
    let lineIdx = 0;
    let charIdx = 0;
    setIsTyping(true);
    setIsComplete(false);
    setCompletedLines([]);
    setCurrentLine(null);
    setTypedChars(0);

    const tick = () => {
      if (lineIdx >= allLines.length) {
        setCurrentLine(null);
        setIsTyping(false);
        setIsComplete(true);
        return;
      }

      const line = allLines[lineIdx];

      if (line.charSpeed === 0) {
        setCompletedLines(prev => [...prev, line]);
        lineIdx++;
        timeoutRef.current = setTimeout(tick, line.lineDelay);
        return;
      }

      if (charIdx === 0) {
        setCurrentLine(line);
      }

      if (charIdx <= line.text.length) {
        setTypedChars(charIdx);
        charIdx++;
        timeoutRef.current = setTimeout(tick, line.charSpeed);
      } else {
        setCompletedLines(prev => [...prev, line]);
        setCurrentLine(null);
        setTypedChars(0);
        lineIdx++;
        charIdx = 0;
        timeoutRef.current = setTimeout(tick, line.lineDelay);
      }
    };

    tick();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionCount]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [completedLines, typedChars, currentLine]);

  const handleExecute = () => {
    if (isTyping) return;
    setExecutionCount(c => c + 1);
  };

  const hasExecuted = executionCount > 0;

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-slate-500 text-xs max-w-sm mx-auto font-mono">{subtitle}</p>
      </div>

      <div className="w-full max-w-md mx-auto bg-[#06060a] border border-sky-400/15 rounded-md overflow-hidden shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-void-light/60 border-b border-sky-400/10">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] text-slate-500 font-mono ml-2">ivan@portfolio: ~ — bash</span>
        </div>

        <div
          ref={bodyRef}
          className="term-body p-4 h-[380px] overflow-y-auto font-mono text-[11px] leading-[1.7]"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#1a1a2e transparent' }}
        >
          {!hasExecuted && (
            <>
              <div className="flex items-center">
                <span style={{ color: C.prompt }}>$ </span>
                <span style={{ color: C.prompt, fontWeight: 600 }}>ivans_skills --list</span>
                <span className="animate-cursor-blink ml-0.5" style={{ color: C.prompt }}>█</span>
              </div>
              <div className="mt-2" style={{ color: C.dim }}>
                // {terminalLabels.ready}
              </div>
            </>
          )}

          {hasExecuted && (
            <div className="space-y-0.5">
              {completedLines.map((line) => (
                <div key={line.id} className="whitespace-pre-wrap break-words flex items-baseline">
                  {line.prefix && <span style={{ color: line.prefixColor }}>{line.prefix}</span>}
                  {line.text && (
                    <span
                      style={{
                        color: line.color,
                        fontWeight: line.bold ? 600 : 400,
                        opacity: line.dim ? 0.75 : 1,
                      }}
                    >
                      {line.text}
                    </span>
                  )}
                  {line.badge && (
                    <span
                      className="text-[8px] px-1.5 py-0.5 ml-auto border whitespace-nowrap shrink-0 rounded"
                      style={{
                        color: line.badgeColor,
                        background: line.badgeBg,
                        borderColor: line.badgeBorder,
                      }}
                    >
                      {line.badge}
                    </span>
                  )}
                </div>
              ))}

              {currentLine && (
                <div className="whitespace-pre-wrap break-words flex items-baseline">
                  {currentLine.prefix && <span style={{ color: currentLine.prefixColor }}>{currentLine.prefix}</span>}
                  <span
                    style={{
                      color: currentLine.color,
                      fontWeight: currentLine.bold ? 600 : 400,
                      opacity: currentLine.dim ? 0.75 : 1,
                    }}
                  >
                    {currentLine.text.substring(0, typedChars)}
                    <span className="animate-cursor-blink">█</span>
                  </span>
                </div>
              )}

              {isComplete && (
                <div className="flex items-center mt-1">
                  <span style={{ color: C.prompt }}>$ </span>
                  <span className="animate-cursor-blink" style={{ color: C.prompt }}>█</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-void-light/60 border-t border-sky-400/10">
          <button
            onClick={handleExecute}
            disabled={isTyping}
            className={`w-full py-2.5 px-4 rounded font-mono text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isTyping
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                : 'bg-sky-400/10 text-sky-400 border border-sky-400/30 hover:bg-sky-400/20 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-400/10'
            }`}
          >
            {isTyping ? (
              <>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                ...
              </>
            ) : isComplete ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                {terminalLabels.reexecute}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {terminalLabels.execute}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
