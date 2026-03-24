import PrimaryButtonLink from '@/components/ui/shared/buttons/primary-button-link';
import { cn } from '@/lib/utils';
import { Locale } from '@/types/locale';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Contact() {
  const t = await getTranslations('HomePage.cta_bottom');
  const locale = await getLocale();

  return (
    <section
      className={cn(
        'w-full flex items-center justify-center',
        'bg-yellow-c bg-[url(/images/contact_bg_mb.svg)] dark:bg-[url(/images/contact_bg_mb_dark.svg)]',
        'md:bg-[url(/images/contact_bg.svg)] md:dark:bg-[url(/images/contact_bg_dark.svg)]',
        'bg-no-repeat bg-center bg-size-[120%_auto] md:bg-size-[auto_100%] lg:bg-cover',
      )}
    >
      <div className=" max-w-270 w-full px-4 pt-20 pb-25 md:pt-20 md:pb-25">
        <h2
          className={cn(
            'text-[40px] md:text-[64px] font-onest font-bold leading-none mb-4 whitespace-pre-line',
            locale === Locale.JA && 'font-noto-sans-jp leading-[1.1] md:text-[60px]',
          )}
        >
          {t('heading')}
        </h2>
        <p
          className={cn(
            'text-[24px] mb-6 md:mb-8 leading-[1.1]',
            locale === Locale.JA && 'text-[20px] leading-[1.2]',
          )}
        >
          {t('description')}
        </p>
        <PrimaryButtonLink
          href="/contact"
          message={t('send_message')}
          className="w-62.5 h-11.5 md:h-14 text-[18px] md:text-[22px]"
        />
      </div>
    </section>
  );
}
