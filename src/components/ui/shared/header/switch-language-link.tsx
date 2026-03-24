'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Locale } from '@/types/locale';
import { Link, usePathname } from '@/i18n/navigation';

export default function SwitchLanguageLink() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      className="px-4 h-full flex items-center text-[14px] hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
      locale={locale === Locale.EN ? Locale.JA : Locale.EN}
    >
      {t('switchLanguage')}
    </Link>
  );
}
