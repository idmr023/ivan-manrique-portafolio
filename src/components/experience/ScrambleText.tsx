'use client';

import { useCallback, useEffect, useRef, useState, type ElementType } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ$%&';

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** start when element enters viewport (default) */
  trigger?: 'view' | 'mount' | 'manual';
  /** re-scramble on hover */
  hover?: boolean;
  /** external toggle for manual trigger */
  play?: boolean;
  duration?: number;
  delay?: number;
}

/** Decodes text from random glyphs, terminal style. */
export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  trigger = 'view',
  hover = true,
  play,
  duration = 900,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [out, setOut] = useState(text);
  const rafRef = useRef(0);
  const started = useRef(false);

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const chars = [...text];
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * chars.length);
      let s = '';
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (i < reveal || c === ' ') s += c;
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [text, duration]);

  useEffect(() => {
    setOut(text);
  }, [text]);

  useEffect(() => {
    if (trigger === 'mount') {
      const id = window.setTimeout(scramble, delay);
      return () => window.clearTimeout(id);
    }
    if (trigger === 'view') {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            window.setTimeout(scramble, delay);
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [trigger, scramble, delay]);

  useEffect(() => {
    if (trigger === 'manual' && play) {
      const id = window.setTimeout(scramble, delay);
      return () => window.clearTimeout(id);
    }
  }, [trigger, play, scramble, delay]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={text}
      onMouseEnter={hover ? scramble : undefined}
    >
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}
