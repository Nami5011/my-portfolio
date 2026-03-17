import { defaultLocale, locales } from '@/types/locale';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: locales,
  localePrefix: 'as-needed',
  localeDetection: false, // Rely on the URL
  defaultLocale: defaultLocale,
});
