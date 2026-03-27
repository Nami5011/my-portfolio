'use client';
import { cn } from '@/lib/utils';
import { useMenuStore } from '@/store/use-menu-store';
import { Link, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Locale } from '@/types/locale';
import ThemeSwitcher from './theme-switcher';
import { ChevronRight } from 'lucide-react';

export default function MobileMenu() {
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'md:hidden fixed top-12.5 left-0 w-full h-[calc(100vh-50px)] bg-gray-c z-50 flex-col items-center justify-start pt-10',
        isMenuOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="bg-white dark:bg-background rounded-[8px] py-4 w-full max-w-80 text-[16px]">
        <Link
          href="/"
          className="h-12.5 w-full px-4 flex items-center justify-between hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
          onClick={() => setIsMenuOpen(false)}
        >
          <span>{t('home')}</span>
          <ChevronRight className="size-5 text-menu-border" />
        </Link>
        <hr className="mx-4 border-t border-menu-border" />
        <Link
          href="/contact"
          className="h-12.5 w-full px-4 flex items-center justify-between hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
          onClick={() => setIsMenuOpen(false)}
        >
          <span>{t('contact')}</span>
          <ChevronRight className="size-5 text-menu-border" />
        </Link>
        <hr className="mx-4 border-t border-menu-border" />
        {locale === Locale.EN && (
          <Link
            href="/resume"
            className="h-12.5 w-full px-4 flex items-center justify-between hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{t('resume')}</span>
            <ChevronRight className="size-5 text-menu-border" />
          </Link>
        )}
        <hr className="mx-4 border-t border-menu-border" />
        <Link
          href={pathname}
          className="h-12.5 w-full px-4 flex items-center justify-between hover:bg-gray-100 transition-background duration-200 dark:hover:bg-gray-800"
          locale={locale === Locale.EN ? Locale.JA : Locale.EN}
          onClick={() => setIsMenuOpen(false)}
        >
          <span>{t('switchLanguage')}</span>
          <ChevronRight className="size-5 text-menu-border" />
        </Link>
        <hr className="mx-4 border-t border-menu-border" />
        <div className="h-12.5 px-4 w-full flex justify-between items-center ">
          <span>{t('appearance')}</span>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
