import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations('HomePage');

  return (
    <section className="md:max-w-225 w-full mx-auto flex justify-between items-start gap-4 flex-col py-10 md:py-20 md:flex-row px-4 lg:px-0">
      <div className="w-full md:w-auto">
        <h2 className="font-onest text-4xl md:text-5xl font-medium leading-none mb-2">
          {t('about.name')}
        </h2>
        <p className="text-2xl md:text-[28px] leading-none mb-4">{t('about.occupation')}</p>
        <div className="w-full md:w-97.5 h-72 bg-gray-300">Photo here</div>
      </div>
      <div className="md:max-w-95">
        <p className="text-[16px] whitespace-pre-line leading-[1.2]">{t('about.description')}</p>
      </div>
    </section>
  );
}
