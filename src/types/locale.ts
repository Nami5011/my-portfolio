export const defaultLocale = 'en';
export const locales = ['en', 'ja'];

export enum Locale {
  EN = 'en',
  JA = 'ja',
}
export interface LocaleItem {
  id: Locale;
  name: string;
}
export const statuses: Record<Locale, LocaleItem> = {
  [Locale.EN]: {
    id: Locale.EN,
    name: 'English',
  },
  [Locale.JA]: {
    id: Locale.JA,
    name: 'Japanese',
  },
};
