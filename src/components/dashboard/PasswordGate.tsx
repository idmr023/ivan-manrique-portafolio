'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Terminal } from 'lucide-react';

const PASSWORD = '020403';
const STORAGE_KEY = 'dashboard-auth';

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus();
  }, [unlocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setUnlocked(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setInput('');
      setTimeout(() => setError(false), 600);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-void/60 backdrop-blur-xl border border-sky-400/15 rounded-lg p-8 sm:p-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-sky-400/10 border border-sky-400/25 flex items-center justify-center mb-4">
              <Lock size={22} className="text-sky-400" />
            </div>
            <h1 className="font-display font-bold text-xl text-white tracking-tight">
              Access Required
            </h1>
            <p className="text-slate-500 text-xs font-mono mt-2 tracking-wide">
              // private dashboard
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            animate={
              error
                ? { x: [0, -10, 10, -8, 8, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="relative">
              <Terminal
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400/40"
              />
              <input
                ref={inputRef}
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-void-lighter border border-sky-400/15 rounded-md pl-9 pr-4 py-3 text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all"
                autoComplete="off"
                inputMode="numeric"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neon-400 text-xs font-mono text-center"
                >
                  ✕ Access denied{attempts > 1 ? ` (${attempts} attempts)` : ''}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full bg-sky-400/10 border border-sky-400/25 text-sky-400 font-mono text-sm py-3 rounded-md hover:bg-sky-400/20 hover:border-sky-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-200 tracking-wide"
            >
              &gt; ENTER
            </button>
          </motion.form>
        </div>

        <p className="text-center text-slate-700 text-[10px] font-mono mt-6 tracking-widest uppercase">
          Ivan Manrique — Project Tracker
        </p>
      </motion.div>
    </div>
  );
}
