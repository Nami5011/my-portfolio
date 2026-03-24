import { getLocale, getTranslations } from 'next-intl/server';
import FV from './_components/fv';
import { Metadata } from 'next';
import About from './_components/about';
import Skills from './_components/skills';
import glass_filters from '@/data/glass_filters.json';
import GlassFilter from './_components/glass-filter';
import RecentWork from './_components/recent-work';
import Contact from './_components/contact';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage');
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Home() {
  const locale = await getLocale();
  // const locale = useLocale();
  const t = await getTranslations('HomePage');
  // const t = useTranslations('HomePage');

  return (
    <main className="bg-background">
      <FV />
      <About />

      {glass_filters.map((item) => (
        <GlassFilter key={item.id} id={item.id} href={item.href} />
      ))}

      <Skills />
      <RecentWork />
      <Contact />
    </main>
  );
}
