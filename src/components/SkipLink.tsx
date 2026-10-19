import { getTranslations } from 'next-intl/server';

// First focusable element on every page: lets keyboard and screen reader users jump past the header.
export async function SkipLink() {
  const t = await getTranslations('nav');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-blueti focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-gold"
    >
      {t('skipToContent')}
    </a>
  );
}
