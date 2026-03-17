import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ja'],
  localePrefix: 'as-needed',
  localeDetection: false, // Rely on the URL
  defaultLocale: 'en'
});
