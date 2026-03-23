import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import ThemeSwitcher from '@/components/ui/shared/header/theme-switcher';
import { getLocale, getTranslations } from 'next-intl/server';
import SkillItemFilterSquare from './_components/skill-item-square-filter';
import SkillItemSquare from './_components/skill-item-square';
import { Locale } from '@/types/locale';
import FV from './_components/fv';
import { Metadata } from 'next';
import About from './_components/about';
import Skills from './_components/skills';
import glass_filters from '@/data/glass_filters.json';
import GlassFilter from './_components/glass-filter';
import RecentWork from './_components/recent-work';

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
  console.log(locale);
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
    </main>
  );
}
