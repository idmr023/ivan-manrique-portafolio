import spanish from './es.json';
import english from './en.json';
import portuguese from './pt.json';

export type Locale = 'es' | 'en' | 'pt';

export const locales: Locale[] = ['es', 'en', 'pt'];

const messages: Record<Locale, Record<string, string>> = {
  es: spanish,
  en: english,
  pt: portuguese,
};

export function getI18n(locale: Locale): Record<string, string> {
  return messages[locale] ?? spanish;
}
