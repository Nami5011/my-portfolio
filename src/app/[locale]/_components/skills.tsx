import { getTranslations } from 'next-intl/server';
import SkillCategory from './skill-category';
import SkillItems from './skill-items';
import { SkillCategory as Category } from '@/types/skill-category';
import H2 from './h2';

export default async function Skills() {
  const t = await getTranslations('HomePage');

  return (
    <section
      className={`bg-light-blue-c w-full py-10 md:py-20 
      bg-[url('/images/skill_bg_mb.svg')] dark:bg-[url('/images/skill_bg_mb_dark.svg')] 
      bg-center bg-cover md:bg-[url('/images/skill_bg.svg')] md:dark:bg-[url('/images/skill_bg_dark.svg')]`}
    >
      <div className="px-4">
        <H2 h2={t('skills.heading')} description={t('skills.description')} />
      </div>

      <SkillCategoryList />
      <SkillItems />
    </section>
  );
}

function SkillCategoryList() {
  return (
    <div className="hidden w-full md:flex justify-center items-center gap-4 mb-8">
      <SkillCategory categoryName={Category.FRONTEND} />
      <SkillCategory categoryName={Category.BACKEND} />
      <SkillCategory categoryName={Category.DESIGN} />
    </div>
  );
}
