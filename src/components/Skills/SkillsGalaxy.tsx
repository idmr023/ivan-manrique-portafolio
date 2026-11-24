'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Skill, TechNode } from '@/lib/data';
import { CATEGORY_COLORS } from '@/lib/data';
import { techLevel, softLevel } from '@/lib/skill-levels';
import { run, prefersReducedMotion, scrollToId } from '@/lib/run-store';

type Cat = 'frontend' | 'data' | 'tools';

interface SkillsGalaxyProps {
  skills: Skill[];
  techNodes: TechNode[];
  subtitle: string;
  hint: string;
  labels: { improved: string; improving: string };
  categoryLabels: { frontend: string; data: string; tools: string; soft: string };
  tooltipScenarioLabel: string;
}

interface Planet {
  key: string;
  name: string;
  pct: number;
  ring: number;
  angle0: number;
}

interface SolarSystem {
  cat: Cat;
  color: string;
  avg: number;
  planets: Planet[];
  radii: number[];
}

const CATS: Cat[] = ['frontend', 'tools', 'data'];
const LAYOUT: Record<Cat, { cx: number; cy: number }> = {
  frontend: { cx: 0.17, cy: 0.34 },
  tools: { cx: 0.5, cy: 0.5 },
  data: { cx: 0.83, cy: 0.34 },
};
const TILT = 0.6; // ellipse flattening → orbital plane seen at an angle
const RING_SPEED = [0.16, -0.11, 0.075];
const SOFT_IMPROVED = '#38bdf8';
const SOFT_IMPROVING = '#f472b6';

function buildSystems(techNodes: TechNode[]): SolarSystem[] {
  return CATS.map((cat) => {
    const items = techNodes
      .filter((n) => n.category === cat)
      .map((n) => ({ name: n.name, pct: techLevel(n.name) }))
      .sort((a, b) => b.pct - a.pct);
    const n = items.length;
    const counts = n > 10 ? [3, 4, n - 7] : [Math.max(1, Math.floor(n * 0.4)), n - Math.max(1, Math.floor(n * 0.4))];
    const radii = n > 10 ? [82, 130, 178] : [98, 172];
    const planets: Planet[] = [];
    let i = 0;
    counts.forEach((count, ring) => {
      for (let k = 0; k < count; k++, i++) {
        planets.push({
          key: `${cat}-${items[i].name}`,
          name: items[i].name,
          pct: items[i].pct,
          ring,
          angle0: (k / count) * Math.PI * 2 + ring * 0.7,
        });
      }
    });
    const avg = Math.round(items.reduce((s, x) => s + x.pct, 0) / Math.max(1, n));
    return { cat, color: CATEGORY_COLORS[cat], avg, planets, radii };
  });
}

/** Ring gauge: arc length = mastery percentage. */
function Gauge({ size, pct, color, dot }: { size: number; pct: number; color: string; dot: number }) {
  const r = size / 2 - 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block overflow-visible">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="1.5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle cx={size / 2} cy={size / 2} r={dot / 2 + 3} fill={color} fillOpacity="0.22" />
      <circle cx={size / 2} cy={size / 2} r={dot / 2} fill={color} />
    </svg>
  );
}

/* ====================================================================== */
/* Desktop: solar systems floating directly over the 3D scene              */
/* ====================================================================== */
function Galaxy({ skills, techNodes, subtitle, hint, labels, categoryLabels, tooltipScenarioLabel }: SkillsGalaxyProps) {
  const systems = useMemo(() => buildSystems(techNodes), [techNodes]);
  const fieldRef = useRef<HTMLDivElement>(null);
  const planetEls = useRef(new Map<string, HTMLDivElement>());
  const [dims, setDims] = useState({ w: 1280, h: 720 });
  const [hovered, setHovered] = useState<{ cat: Cat; name: string; pct: number; key: string } | null>(null);
  const [focus, setFocus] = useState<Cat | null>(null);
  const [softHover, setSoftHover] = useState<number | null>(null);
  const hoveredRef = useRef<typeof hovered>(null);
  const focusRef = useRef<Cat | null>(null);
  hoveredRef.current = hovered;
  focusRef.current = focus;

  const scale = Math.max(0.62, Math.min(1.1, dims.w / 1280));

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDims({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // orbit loop — positions written straight to the DOM
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const phases: Record<string, number[]> = {};
    const factor: Record<string, number> = {};
    systems.forEach((s) => {
      phases[s.cat] = s.radii.map(() => 0);
      factor[s.cat] = 1;
    });
    let raf = 0;
    let last = performance.now();
    let px = 0;
    let py = 0;
    let inView = false;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!inView) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const boost = 1 + Math.min(Math.abs(run.velocity) * 0.06, 2.5); // scrolling = running = faster orbits
      px += (run.mouseX * 14 - px) * 0.05;
      py += (run.mouseY * 10 - py) * 0.05;
      const h = hoveredRef.current;
      const f = focusRef.current;

      for (const s of systems) {
        const target = h?.cat === s.cat ? 0 : (reduced ? 0.15 : 1) * boost;
        factor[s.cat] += (target - factor[s.cat]) * 0.08;
        s.radii.forEach((_, r) => (phases[s.cat][r] += dt * RING_SPEED[r] * factor[s.cat]));
        const cx = LAYOUT[s.cat].cx * dims.w;
        const cy = LAYOUT[s.cat].cy * dims.h;
        const dimmed = f && f !== s.cat;

        for (const p of s.planets) {
          const el = planetEls.current.get(p.key);
          if (!el) continue;
          const a = p.angle0 + phases[s.cat][p.ring];
          const rx = s.radii[p.ring] * scale;
          const depth = Math.sin(a); // >0 = in front of the sun
          const x = cx + Math.cos(a) * rx + px * (0.6 + p.ring * 0.4);
          const y = cy + depth * rx * TILT + py * (0.6 + p.ring * 0.4);
          const near = (depth + 1) / 2;
          const isHover = h?.key === p.key;
          const sc = isHover ? 1.3 : 0.82 + near * 0.22;
          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${sc.toFixed(3)})`;
          el.style.opacity = String(isHover ? 1 : (0.72 + near * 0.28) * (dimmed ? 0.15 : 1));
          el.style.zIndex = String(isHover ? 60 : depth > 0 ? 30 : 10);
        }
      }
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { rootMargin: '100px' });
    if (fieldRef.current) io.observe(fieldRef.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [systems, dims, scale]);

  const softPositions = useMemo(
    () => skills.map((_, i) => ({ x: 7 + (i * 86) / Math.max(1, skills.length - 1), y: 88 + (i % 2 === 0 ? -3.2 : 3.2) })),
    [skills]
  );

  const openSkill = (link: string) => {
    if (link.startsWith('#')) scrollToId(link.slice(1));
    else window.open(link, '_blank', 'noopener');
  };

  return (
    <div>
      {/* legend / focus chips */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-2">
        <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {systems.map((s) => (
            <button
              key={s.cat}
              onClick={() => setFocus((f) => (f === s.cat ? null : s.cat))}
              className="hud-chip !text-[10px]"
              style={{
                borderColor: focus === s.cat ? s.color : undefined,
                color: focus === s.cat ? '#fff' : undefined,
                boxShadow: focus === s.cat ? `0 0 18px -4px ${s.color}` : undefined,
              }}
              data-cursor="FOCUS"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              {categoryLabels[s.cat]}
              <span className="tabular-nums" style={{ color: s.color }}>
                {s.avg}%
              </span>
            </button>
          ))}
          <span className="hud-chip !text-[10px] pointer-events-none">
            <span className="w-2 h-2 rounded-full" style={{ background: SOFT_IMPROVED }} /> {labels.improved}
          </span>
          <span className="hud-chip !text-[10px] pointer-events-none">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: SOFT_IMPROVING }} /> {labels.improving}
          </span>
        </div>
      </div>

      {/* the universe — no frame, no background: it lives in the scene */}
      <div ref={fieldRef} className="relative w-full select-none" style={{ height: Math.max(560, 720 * scale) }}>
        <div aria-hidden="true" className="absolute -inset-x-10 -inset-y-6 galaxy-veil" />

        {/* orbits + soft-skill belt lines */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
          {systems.map((s) =>
            s.radii.map((r, i) => (
              <ellipse
                key={`${s.cat}-${i}`}
                cx={LAYOUT[s.cat].cx * dims.w}
                cy={LAYOUT[s.cat].cy * dims.h}
                rx={r * scale}
                ry={r * scale * TILT}
                fill="none"
                stroke={s.color}
                strokeOpacity={focus && focus !== s.cat ? 0.05 : 0.22}
                strokeDasharray="2 7"
                style={{ transition: 'stroke-opacity .4s' }}
              />
            ))
          )}
          <polyline
            points={softPositions.map((p) => `${(p.x / 100) * dims.w},${(p.y / 100) * dims.h}`).join(' ')}
            fill="none"
            stroke="rgba(125,211,252,0.22)"
            strokeDasharray="3 6"
          />
        </svg>

        {/* suns */}
        {systems.map((s) => {
          const h = hovered?.cat === s.cat ? hovered : null;
          const dimmed = focus && focus !== s.cat;
          const size = 104 * scale;
          return (
            <button
              key={s.cat}
              onClick={() => setFocus((f) => (f === s.cat ? null : s.cat))}
              className="absolute rounded-full flex flex-col items-center justify-center text-center transition-opacity duration-500"
              style={{
                left: `${LAYOUT[s.cat].cx * 100}%`,
                top: `${LAYOUT[s.cat].cy * 100}%`,
                width: size,
                height: size,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
                opacity: dimmed ? 0.25 : 1,
                background: `radial-gradient(circle at 35% 30%, ${s.color}55, ${s.color}14 55%, rgba(7,7,12,0.9) 100%)`,
                border: `1px solid ${s.color}88`,
                boxShadow: `0 0 50px -6px ${s.color}aa, inset 0 0 26px ${s.color}33`,
              }}
              data-cursor="FOCUS"
            >
              <span className="absolute inset-[-10px] rounded-full border border-dashed animate-[spin-slow_30s_linear_infinite]" style={{ borderColor: `${s.color}40` }} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={h ? h.key : 'avg'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-center px-1"
                >
                  <span className="font-display font-bold text-white tabular-nums leading-none" style={{ fontSize: 26 * scale }}>
                    {h ? h.pct : s.avg}
                    <span className="text-[0.55em]" style={{ color: s.color }}>%</span>
                  </span>
                  <span className="mt-1 font-mono uppercase tracking-wider text-slate-200 leading-tight" style={{ fontSize: Math.max(7.5, 8.5 * scale) }}>
                    {h ? h.name : categoryLabels[s.cat]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </button>
          );
        })}

        {/* planets */}
        {systems.map((s) =>
          s.planets.map((p) => {
            const dot = (7 + p.pct * 0.11) * scale;
            const size = dot + 14;
            const isHover = hovered?.key === p.key;
            return (
              <div
                key={p.key}
                ref={(el) => {
                  if (el) planetEls.current.set(p.key, el);
                  else planetEls.current.delete(p.key);
                }}
                className="absolute top-0 left-0 will-change-transform"
                style={{ opacity: 0 }}
                onMouseEnter={() => setHovered({ cat: s.cat, name: p.name, pct: p.pct, key: p.key })}
                onMouseLeave={() => setHovered((h) => (h?.key === p.key ? null : h))}
              >
                <div className="relative flex items-center justify-center p-2 -m-2">
                  <Gauge size={size} pct={p.pct} color={s.color} dot={dot} />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 text-center whitespace-nowrap pointer-events-none">
                    <div className="font-mono text-[9.5px] leading-tight transition-colors" style={{ color: isHover ? '#fff' : s.color, textShadow: '0 0 6px rgba(7,7,12,1), 0 0 2px rgba(7,7,12,1)' }}>
                      {p.name}
                    </div>
                    <div className="font-mono text-[9px] tabular-nums text-slate-300/90" style={{ textShadow: '0 0 6px rgba(7,7,12,1)' }}>
                      {p.pct}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* soft-skill star belt */}
        <div className="absolute left-0 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500" style={{ top: '74%' }}>
          ── {categoryLabels.soft}
        </div>
        {skills.map((skill, i) => {
          const improved = skill.state === 'improved';
          const color = improved ? SOFT_IMPROVED : SOFT_IMPROVING;
          const pct = softLevel(skill.id);
          const pos = softPositions[i];
          const open = softHover === skill.id;
          return (
            <div
              key={skill.id}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', zIndex: open ? 80 : 40 }}
              onMouseEnter={() => setSoftHover(skill.id)}
              onMouseLeave={() => setSoftHover((h) => (h === skill.id ? null : h))}
            >
              <button
                onClick={() => openSkill(skill.link)}
                onFocus={() => setSoftHover(skill.id)}
                onBlur={() => setSoftHover(null)}
                className="relative flex items-center justify-center transition-transform duration-200 hover:scale-125"
                data-cursor="GO"
                aria-label={`${skill.name} ${pct}%`}
              >
                <span className={improved ? '' : 'animate-pulse'}>
                  <Gauge size={30 * scale + 6} pct={pct} color={color} dot={(skill.size === 'large' ? 11 : 8) * scale} />
                </span>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[124px] text-center pointer-events-none">
                <div className="font-mono text-[9px] leading-tight text-slate-300" style={{ textShadow: '0 0 6px rgba(7,7,12,1)' }}>
                  {skill.name}
                </div>
                <div className="font-mono text-[9px] tabular-nums" style={{ color }}>
                  {pct}%
                </div>
              </div>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute bottom-full mb-3 w-72 text-left cyber-frame !bg-[#07070c]/95 p-4 pointer-events-none"
                    style={{
                      left: pos.x < 20 ? 0 : pos.x > 80 ? 'auto' : '50%',
                      right: pos.x > 80 ? 0 : 'auto',
                      transform: pos.x < 20 || pos.x > 80 ? 'none' : 'translateX(-50%)',
                      borderColor: `${color}66`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="text-sm font-semibold text-white leading-tight">{skill.name}</h4>
                      <span className="font-display font-bold text-lg tabular-nums" style={{ color }}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1 bg-white/10 mb-3">
                      <div className="h-full" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
                    </div>
                    <span className="inline-block text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 mb-2 border" style={{ color, borderColor: `${color}55`, background: `${color}14` }}>
                      {improved ? labels.improved : labels.improving}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{skill.description}</p>
                    <div className="border-t border-sky-400/10 pt-2">
                      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block mb-1">{tooltipScenarioLabel}</span>
                      <p className="text-xs text-sky-300 font-medium flex items-start gap-1.5">
                        <ChevronRight size={11} className="mt-0.5 shrink-0" />
                        {skill.scenario}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center font-mono text-[10px] text-slate-600 uppercase tracking-[0.25em]">{hint}</p>
    </div>
  );
}

/* ====================================================================== */
/* Mobile: same data as stacked gauges                                     */
/* ====================================================================== */
function Bar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  return (
    <div className="h-1.5 bg-white/[0.07] overflow-hidden">
      <motion.div
        className="h-full"
        style={{ background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 10px ${color}` }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function MobileGalaxy({ skills, techNodes, subtitle, labels, categoryLabels, tooltipScenarioLabel }: SkillsGalaxyProps) {
  const systems = useMemo(() => buildSystems(techNodes), [techNodes]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-8 cyber-frame p-5">
      <p className="font-mono text-xs text-slate-400">{subtitle}</p>

      {systems.map((s) => (
        <div key={s.cat}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-full shrink-0" style={{ background: `radial-gradient(circle at 35% 30%, ${s.color}, ${s.color}22 70%)`, boxShadow: `0 0 22px -2px ${s.color}` }} />
            <h3 className="font-display font-semibold text-white text-lg">{categoryLabels[s.cat]}</h3>
            <span className="ml-auto font-display font-bold tabular-nums text-xl" style={{ color: s.color }}>
              {s.avg}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            {s.planets.map((p, i) => (
              <div key={p.key}>
                <div className="flex justify-between font-mono text-[10px] mb-1">
                  <span className="text-slate-200 truncate pr-2">{p.name}</span>
                  <span className="tabular-nums" style={{ color: s.color }}>{p.pct}%</span>
                </div>
                <Bar pct={p.pct} color={s.color} delay={i * 0.04} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4">── {categoryLabels.soft}</h3>
        <ul className="space-y-3">
          {skills.map((skill) => {
            const improved = skill.state === 'improved';
            const color = improved ? SOFT_IMPROVED : SOFT_IMPROVING;
            const pct = softLevel(skill.id);
            const isOpen = open === skill.id;
            return (
              <li key={skill.id}>
                <button onClick={() => setOpen(isOpen ? null : skill.id)} className="w-full text-left" aria-expanded={isOpen}>
                  <div className="flex justify-between gap-3 text-xs mb-1.5">
                    <span className="text-slate-100">{skill.name}</span>
                    <span className="font-mono tabular-nums shrink-0" style={{ color }}>{pct}%</span>
                  </div>
                  <Bar pct={pct} color={color} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-1 text-xs text-slate-400 leading-relaxed">
                        <span className="inline-block text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 mb-2 border" style={{ color, borderColor: `${color}55` }}>
                          {improved ? labels.improved : labels.improving}
                        </span>
                        <p>{skill.description}</p>
                        <p className="mt-2 text-sky-300">
                          <span className="text-slate-500 font-mono uppercase text-[9px] tracking-wider mr-2">{tooltipScenarioLabel}</span>
                          {skill.scenario}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function SkillsGalaxy(props: SkillsGalaxyProps & { isMobile: boolean }) {
  const { isMobile, ...rest } = props;
  return isMobile ? <MobileGalaxy {...rest} /> : <Galaxy {...rest} />;
}
