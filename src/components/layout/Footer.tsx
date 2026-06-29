'use client';

import { Linkedin, Github, Mail } from 'lucide-react';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '@/lib/constants';

interface FooterProps {
  i18n: Record<string, string>;
  langPrefix: string;
}

export default function Footer({ i18n, langPrefix }: FooterProps) {
  return (
    <footer className="border-t border-sky-400/10 py-10 px-4 sm:px-6 pb-20 lg:pb-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <a
            href={langPrefix || '/'}
            className="text-white font-display font-bold text-lg no-underline"
          >
            <span className="text-sky-400">&lt;</span>IM<span className="text-sky-400">/&gt;</span>
          </a>
          <p className="text-slate-600 text-xs mt-1 font-mono">
            {i18n.FOOTER_TEXT} &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-sky-400 transition-colors"
            aria-label={i18n.SMB_LINKEDIN}
          >
            <Linkedin size={20} />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-sky-400 transition-colors"
            aria-label={i18n.SMB_GITHUB}
          >
            <Github size={20} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-slate-500 hover:text-sky-400 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
