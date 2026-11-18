'use client';

import { useEffect, useRef } from 'react';
import { isTouchDevice } from '@/lib/run-store';

/**
 * Crosshair reticle cursor. Grows over interactive elements and shows the
 * element's `data-cursor` label (e.g. "OPEN", "VIEW").
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.documentElement.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      );
      const text = el?.dataset.cursor ?? '';
      if (el && el.matches('input, textarea')) {
        targetScale = 0.6;
        label.textContent = '';
      } else if (el) {
        targetScale = text ? 2.6 : 1.8;
        label.textContent = text;
      } else {
        targetScale = 1;
        label.textContent = '';
      }
      ring.classList.toggle('is-active', !!el);
    };
    const onDown = () => (targetScale *= 0.8);
    const onUp = () => (targetScale /= 0.8);
    const onLeave = () => {
      shown = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[400] hidden md:block">
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }}>
        <span className="cursor-tick cursor-tick-t" />
        <span className="cursor-tick cursor-tick-b" />
        <span className="cursor-tick cursor-tick-l" />
        <span className="cursor-tick cursor-tick-r" />
      </div>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
