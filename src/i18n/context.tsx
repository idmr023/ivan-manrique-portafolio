'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Locale } from '@/i18n';

const I18nContext = createContext<Record<string, string>>({});

export function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: Record<string, string>;
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={messages}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
