'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n';

interface NavbarProps {
  locale: Locale;
  langPrefix: string;
  navItems: { id: string; label: string }[];
}

export default function Navbar({ locale, langPrefix, navItems }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const langs: { code: Locale; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'pt', label: 'PT' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-blur border-b border-sky-400/8' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-evenly h-12 gap-2 overflow-x-auto whitespace-nowrap [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[10px] sm:text-xs text-slate-400 hover:text-sky-400 transition-colors font-mono uppercase tracking-wider no-underline shrink-0"
            >
              {item.label}
            </a>
          ))}

          <div className="flex items-center gap-0.5 shrink-0 border-l border-sky-400/10 pl-2 ml-1">
            {langs.map((l) => (
              <a
                key={l.code}
                href={l.code === 'es' ? '/' : `/${l.code}`}
                className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded transition-colors no-underline font-mono ${
                  locale === l.code
                    ? 'text-sky-400'
                    : 'text-slate-600 hover:text-slate-300'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
