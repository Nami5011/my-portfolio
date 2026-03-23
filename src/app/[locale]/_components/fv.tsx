import { getTranslations } from 'next-intl/server';
import PrimaryButtonLink from '@/components/ui/shared/buttons/primary-button-link';

export default async function FV() {
  const t = await getTranslations('HomePage');

  return (
    <section className="w-full h-[80vh] md:h-screen flex justify-center flex-col -mt-12.5 bg-[#D0EEF3] dark:bg-[#0B343B]">
      <div className="w-full max-w-270 mx-auto px-4 lg2:px-0">
        <h1 className="font-onest max-w-xs text-[40px] md:text-[64px] font-extrabold leading-[120%] tracking-[-0.5%] whitespace-pre mb-4 md:mb-6">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl font-medium whitespace-pre-line mb-8 md:mb-12">
          {t('subtitle1')}
          <span className="text-2xl md:text-3xl">{t('subtitle2')}</span>
          {t('subtitle3')}
        </p>
        <PrimaryButtonLink
          href="/contact"
          message={t('contact')}
          className="font-medium w-44.5 h-14 text-xl md:text-[22px] md:tracking-[2%]"
        />
      </div>
    </section>
  );
}
