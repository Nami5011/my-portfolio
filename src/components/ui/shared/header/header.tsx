import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import ThemeSwitcher from '@/components/ui/shared/header/theme-switcher';
import { getLocale, getTranslations } from 'next-intl/server';
import { Locale } from '@/types/locale';
import SwitchLanguageLink from './switch-language-link';

export default async function Header() {
  const locale = await getLocale();
  // const locale = useLocale();
  const t = await getTranslations('Header');

  return (
    <header className="sticky w-full h-12.5 top-0 left-0 flex justify-center bg-white dark:bg-gray-c z-100 shadow-sm">
      <div className="w-full max-w-270 mx-auto px-4 lg2:px-0 flex items-center gap-4">
        <Link href="/" className="h-full flex items-center">
          <Image
            className="dark:hidden w-25 h-auto"
            src="/images/logo.svg"
            alt="Nami Sawada Portfolio"
            width={75}
            height={24}
            priority
          />
          <Image
            className="hidden dark:block w-25 h-auto"
            src="/images/logo_dark.svg"
            alt="Nami Sawada Portfolio"
            width={75}
            height={24}
            priority
          />
        </Link>
        <div className="hidden ml-auto md:flex items-center h-full">
          <Link
            href="/contact"
            className="px-4 h-full flex items-center text-[14px] hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
          >
            {t('contact')}
          </Link>
          {locale === Locale.EN && (
            <Link
              href="/resume"
              className="px-4 h-full flex items-center text-[14px] hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('resume')}
            </Link>
          )}
          <SwitchLanguageLink />
        </div>
        <ThemeSwitcher className="hidden md:flex" />
      </div>
    </header>
  );
}
