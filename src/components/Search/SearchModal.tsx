import { useState, useEffect, useRef, useCallback } from 'react';

interface SearchItem {
  label: string;
  section: string;
  href: string;
  keywords: string[];
}

interface SearchModalProps {
  i18n: Record<string, string>;
  currentLocale: string;
}

const SEARCH_INDEX: SearchItem[] = [
  { label: 'Início / Hero', section: 'hero', href: '#hero', keywords: ['home', 'início', 'inicio', 'topo', 'hero'] },
  { label: 'Sobre mim', section: 'about', href: '#about', keywords: ['sobre', 'about', 'história', 'historia', 'runner', 'corredor', 'disciplina', 'ultramaratona', 'marcona'] },
  { label: 'Experiência Profissional', section: 'experience', href: '#experience', keywords: ['experiência', 'experiencia', 'trabalho', 'carreira', 'profissional', 'ripnel', 'teleperformance', 'erp'] },
  { label: 'Projetos em Destaque', section: 'projects', href: '#projects', keywords: ['projetos', 'projetos', 'projects', 'portfolio', 'portfólio', 'portifolio', 'case', 'dashboard', 'python'] },
  { label: 'Habilidades & Tecnologias', section: 'skills', href: '#skills', keywords: ['habilidades', 'skills', 'tecnologia', 'tech', 'stack', 'react', 'python', 'sql', 'tableau', 'frontend', 'dados'] },
  { label: 'Formação & Conquistas', section: 'education', href: '#education', keywords: ['formação', 'formacao', 'educação', 'educacao', 'utp', 'impulsa', 'certificação', 'certificacao', 'universidade'] },
  { label: 'Contato', section: 'contact', href: '#contact', keywords: ['contato', 'contact', 'falar', 'email', 'linkedin', 'contratar', 'vaga'] },
];

export default function SearchModal({ i18n, currentLocale }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filter = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matches = SEARCH_INDEX.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.section.toLowerCase().includes(lower) ||
        item.keywords.some((kw) => kw.includes(lower))
    );
    setResults(matches);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    filter(query);
  }, [query, filter]);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    const base = currentLocale === 'es' ? '' : `/${currentLocale}`;
    window.location.href = `${base}/${item.href}`;
  };

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface border border-magneto-800/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-magneto-800/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-magneto-400">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder={i18n.SEARCH_PLACEHOLDER || 'Pesquisar...'}
            className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-lighter border border-magneto-800/50 text-xs text-gray-400 font-mono">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {results.length === 0 && query.trim() !== '' && (
            <div className="px-5 py-8 text-center text-gray-500 text-sm">
              {i18n.SEARCH_EMPTY || 'Nenhum resultado encontrado.'}
            </div>
          )}
          {results.length === 0 && query.trim() === '' && (
            <div className="px-5 py-8 text-center text-gray-500 text-sm">
              <p className="mb-2">{i18n.SEARCH_HINT || 'Pressione Ctrl+K para buscar'}</p>
              <p className="text-xs text-gray-600">Digite para encontrar seções do portfólio</p>
            </div>
          )}
          {results.map((item, index) => (
            <button
              key={item.section}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
                index === selectedIndex
                  ? 'bg-magneto-700/30 text-white'
                  : 'text-gray-300 hover:bg-surface-lighter'
              }`}
            >
              <span className="text-xs text-magneto-400 font-mono uppercase w-20 shrink-0">
                {item.section}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="px-5 py-2.5 border-t border-magneto-800/30 flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-lighter border border-magneto-800/50 font-mono">↑↓</kbd>
            Navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-lighter border border-magneto-800/50 font-mono">↵</kbd>
            Selecionar
          </span>
        </div>
      </div>
    </div>
  );
}
