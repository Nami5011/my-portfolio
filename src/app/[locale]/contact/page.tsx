import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ContactForm } from './_components/contact-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ContactPage');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Home() {
  const t = await getTranslations('ContactPage');

  return (
    <main className="bg-background min-h-[calc(100vh-5rem)] bg-[url(/images/contact_form_bg.svg)] dark:bg-[url(/images/contact_form_bg_dark.svg)] bg-cover flex flex-col items-center py-10 md:py-15 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{t('title')}</h1>
      <p className="text-sm md:text-lg mb-8 max-w-xl text-center">{t('description')}</p>
      <ContactForm />
    </main>
  );
}
