import { useEffect, useRef, useState } from 'react';

export interface Skill {
  id: number;
  name: string;
  state: 'improved' | 'improving';
  scenario: string;
  description: string;
  link: string;
  x: number;
  y: number;
  size: 'large' | 'normal';
}

export interface TechNode {
  name: string;
  category: 'frontend' | 'data' | 'tools';
  x: number;
  y: number;
}

interface SkillsUniverseProps {
  skills: Skill[];
  techNodes: TechNode[];
  title: string;
  subtitle: string;
  hint: string;
  labels: { improved: string; improving: string };
  categoryLabels: { frontend: string; data: string; tools: string; soft: string };
  tooltipScenarioLabel: string;
}

interface BgStar {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#508edc',
  data: '#22c55e',
  tools: '#f59e0b',
};

const CATEGORY_COLORS_RGBA: Record<string, string> = {
  frontend: 'rgba(80, 142, 220, ',
  data: 'rgba(34, 197, 94, ',
  tools: 'rgba(245, 158, 11, ',
};

export default function SkillsUniverse({
  skills,
  techNodes,
  title,
  subtitle,
  hint,
  labels,
  categoryLabels,
  tooltipScenarioLabel,
}: SkillsUniverseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [hoveredTech, setHoveredTech] = useState<TechNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let bgStars: BgStar[] = [];

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      generateStars(rect.width, rect.height);
    };

    const generateStars = (w: number, h: number) => {
      bgStars = [];
      const count = Math.floor((w * h) / 5000);
      for (let i = 0; i < count; i++) {
        bgStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.2 + 0.3,
          baseAlpha: Math.random() * 0.4 + 0.08,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawConstellations = (w: number, h: number) => {
      const categories = ['frontend', 'data', 'tools'];
      for (const cat of categories) {
        const nodes = techNodes.filter((n) => n.category === cat);
        if (nodes.length < 2) continue;

        const pixels = nodes.map((n) => ({ x: (n.x / 100) * w, y: (n.y / 100) * h }));

        for (let i = 0; i < pixels.length; i++) {
          const distances: { idx: number; dist: number }[] = [];
          for (let j = 0; j < pixels.length; j++) {
            if (i === j) continue;
            const dx = pixels[i].x - pixels[j].x;
            const dy = pixels[i].y - pixels[j].y;
            distances.push({ idx: j, dist: Math.sqrt(dx * dx + dy * dy) });
          }
          distances.sort((a, b) => a.dist - b.dist);
          const neighbors = distances.slice(0, 2);
          for (const nb of neighbors) {
            ctx!.beginPath();
            ctx!.moveTo(pixels[i].x, pixels[i].y);
            ctx!.lineTo(pixels[nb.idx].x, pixels[nb.idx].y);
            ctx!.strokeStyle = CATEGORY_COLORS_RGBA[cat] + '0.15)';
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }
    };

    let frame = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const nebula1 = ctx.createRadialGradient(w * 0.25, h * 0.25, 0, w * 0.25, h * 0.25, w * 0.5);
      nebula1.addColorStop(0, 'rgba(80, 142, 220, 0.05)');
      nebula1.addColorStop(1, 'rgba(11, 20, 36, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      const nebula2 = ctx.createRadialGradient(w * 0.78, h * 0.28, 0, w * 0.78, h * 0.28, w * 0.45);
      nebula2.addColorStop(0, 'rgba(34, 197, 94, 0.04)');
      nebula2.addColorStop(1, 'rgba(11, 20, 36, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      const nebula3 = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, w * 0.4);
      nebula3.addColorStop(0, 'rgba(245, 158, 11, 0.03)');
      nebula3.addColorStop(1, 'rgba(11, 20, 36, 0)');
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, w, h);

      drawConstellations(w, h);

      for (const star of bgStars) {
        const alpha = star.baseAlpha + Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.max(0, alpha)})`;
        ctx.fill();
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isMobile, techNodes]);

  const handleClick = (link: string) => {
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  if (isMobile) {
    const frontendTechs = techNodes.filter((n) => n.category === 'frontend').map((n) => n.name);
    const dataTechs = techNodes.filter((n) => n.category === 'data').map((n) => n.name);
    const toolsTechs = techNodes.filter((n) => n.category === 'tools').map((n) => n.name);

    return (
      <div className="space-y-6">
        <div className="text-center mb-4">
          <span className="text-magneto-400 text-sm font-mono uppercase tracking-widest">// {title}</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 tracking-tight">{title}</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {[
            { label: categoryLabels.frontend, color: 'cyan', items: frontendTechs },
            { label: categoryLabels.data, color: 'green', items: dataTechs },
            { label: categoryLabels.tools, color: 'amber', items: toolsTechs },
          ].map((cat) => (
            <div key={cat.label} className="bg-surface border border-magneto-800/40 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-${cat.color}-400`} />
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 text-xs rounded bg-magneto-900/30 text-gray-300 border border-magneto-800/30 font-mono">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-magneto-400" />
            {categoryLabels.soft}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => handleClick(skill.link)}
                className="text-left bg-surface border border-magneto-800/40 rounded-lg p-4 hover:border-magneto-600/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${skill.state === 'improved' ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                  <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                </div>
                <span className={`inline-block text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded mb-2 ${skill.state === 'improved' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'}`}>
                  {skill.state === 'improved' ? labels.improved : labels.improving}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{skill.description}</p>
                <p className="text-xs text-magneto-400 font-medium flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  {skill.scenario}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-6">
      <span className="text-magneto-400 text-sm font-mono uppercase tracking-widest">// {title}</span>
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 tracking-tight">{title}</h2>
      <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">{subtitle}</p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS.frontend, boxShadow: `0 0 6px ${CATEGORY_COLORS.frontend}` }} />
          {categoryLabels.frontend}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS.data, boxShadow: `0 0 6px ${CATEGORY_COLORS.data}` }} />
          {categoryLabels.data}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS.tools, boxShadow: `0 0 6px ${CATEGORY_COLORS.tools}` }} />
          {categoryLabels.tools}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
          {labels.improved}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-glow" />
          {labels.improving}
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full mt-6 mx-auto bg-surface border border-magneto-800/40 rounded-lg overflow-hidden"
        style={{ height: '620px' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Tech constellation nodes */}
        {techNodes.map((node) => {
          const color = CATEGORY_COLORS[node.category];
          const isHovered = hoveredTech?.name === node.name && hoveredTech?.category === node.category;
          return (
            <div
              key={`${node.category}-${node.name}`}
              className="absolute group cursor-default"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredTech(node)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div
                className="rounded-full transition-all duration-200"
                style={{
                  width: isHovered ? '8px' : '5px',
                  height: isHovered ? '8px' : '5px',
                  background: color,
                  boxShadow: `0 0 ${isHovered ? '16px' : '8px'} ${color}, 0 0 ${isHovered ? '24px' : '12px'} ${CATEGORY_COLORS_RGBA[node.category]}0.2)`,
                }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 mt-1.5 text-[9px] font-mono whitespace-nowrap transition-all duration-200 select-none"
                style={{
                  opacity: isHovered ? 1 : 0.7,
                  color: isHovered ? '#ffffff' : color,
                  textShadow: isHovered ? 'none' : `0 0 4px ${CATEGORY_COLORS_RGBA[node.category]}0.4)`,
                }}
              >
                {node.name}
              </span>
            </div>
          );
        })}

        {/* Soft skill stars */}
        {skills.map((skill) => {
          const isImproved = skill.state === 'improved';
          const starSize = skill.size === 'large' ? 14 : 10;
          const glowSize = skill.size === 'large' ? 40 : 28;
          return (
            <div
              key={skill.id}
              className="absolute cursor-pointer group"
              style={{ left: `${skill.x}%`, top: `${skill.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => handleClick(skill.link)}
            >
              <div
                className={`relative rounded-full transition-transform group-hover:scale-125 ${isImproved ? 'bg-cyan-400' : 'bg-amber-400 animate-pulse-glow'}`}
                style={{
                  width: `${starSize}px`,
                  height: `${starSize}px`,
                  boxShadow: isImproved
                    ? `0 0 ${glowSize}px rgba(34, 211, 238, 0.7), 0 0 ${glowSize * 1.5}px rgba(34, 211, 238, 0.3)`
                    : `0 0 ${glowSize}px rgba(251, 191, 36, 0.5), 0 0 ${glowSize * 1.5}px rgba(251, 191, 36, 0.2)`,
                }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 mt-1.5 text-[9px] font-medium whitespace-nowrap select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: isImproved ? 'rgba(103, 232, 249, 1)' : 'rgba(252, 211, 77, 1)' }}
              >
                {skill.name}
              </span>

              {hoveredSkill?.id === skill.id && (
                <div
                  className="absolute z-40 rounded-lg p-4 shadow-2xl shadow-black/80 w-64 text-left border-2"
                  style={{
                    background: '#0B1424',
                    borderColor: isImproved ? 'rgba(34, 211, 238, 0.5)' : 'rgba(251, 191, 36, 0.5)',
                    left: '50%',
                    top: skill.y > 60 ? 'auto' : 'calc(100% + 12px)',
                    bottom: skill.y > 60 ? 'calc(100% + 12px)' : 'auto',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${isImproved ? 'bg-cyan-400' : 'bg-amber-400'}`} />
                    <h4 className="text-sm font-semibold text-white leading-tight">{skill.name}</h4>
                  </div>
                  <span className={`inline-block text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded mb-2 ${isImproved ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'}`}>
                    {isImproved ? labels.improved : labels.improving}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{skill.description}</p>
                  <div className="border-t border-magneto-800/40 pt-2">
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wide block mb-1">{tooltipScenarioLabel}</span>
                    <p className="text-xs text-magneto-400 font-medium flex items-center gap-1.5 hover:text-magneto-300 transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                      {skill.scenario}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-gray-600 font-mono">
          {hint}
        </p>
      </div>
    </div>
  );
}
