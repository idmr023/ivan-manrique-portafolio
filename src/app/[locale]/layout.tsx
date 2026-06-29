import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, getI18n, type Locale } from '@/i18n';
import { I18nProvider } from '@/i18n/context';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const i18n = getI18n(locale as Locale);
  return {
    title: i18n.WEBPAGE_TITLE,
    description: i18n.HERO_H2,
    openGraph: {
      title: i18n.WEBPAGE_TITLE,
      description: i18n.HERO_H2,
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const messages = getI18n(locale as Locale);

  return (
    <I18nProvider messages={messages} locale={locale as Locale}>
      {children}
    </I18nProvider>
  );
}
