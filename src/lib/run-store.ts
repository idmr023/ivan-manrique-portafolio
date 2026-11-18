/**
 * Tiny mutable store shared by the "run" experience (3D scene, HUD, cursor).
 * Values that change every frame live in `run` and are read inside rAF loops,
 * so React never re-renders per frame. Low-frequency events use `emit/on`.
 */

export const RACE_KM = 35; // Marcona desert race distance

export const run = {
  /** 0..1 page scroll progress */
  progress: 0,
  /** smoothed scroll velocity in px/frame (signed) */
  velocity: 0,
  /** normalised mouse position, -1..1 */
  mouseX: 0,
  mouseY: 0,
  /** 0..1 – how much the scene should go "hyperspace" (skills section) */
  warp: 0,
  warpTarget: 0,
  /** current section id */
  section: 'hero',
  /** true once the boot loader has finished */
  booted: false,
  /** accent hue the scene lerps to, per section */
  accent: 0x38bdf8,
};

type Handler = (payload?: unknown) => void;
const handlers = new Map<string, Set<Handler>>();

export function on(event: string, fn: Handler) {
  if (!handlers.has(event)) handlers.set(event, new Set());
  handlers.get(event)!.add(fn);
  return () => {
    handlers.get(event)?.delete(fn);
  };
}

export function emit(event: string, payload?: unknown) {
  handlers.get(event)?.forEach((fn) => fn(payload));
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}
