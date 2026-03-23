import { getTranslations } from 'next-intl/server';
import SkillCategory from './skill-category';
import SkillItems from './skill-items';
import { SkillCategory as Category } from '@/types/skill-category';

export default async function Skills() {
  const t = await getTranslations('HomePage');

  return (
    <section
      className={`bg-light-blue-c w-full py-10 md:py-20 
      bg-[url('/images/skill_bg_mb.svg')] dark:bg-[url('/images/skill_bg_mb_dark.svg')] 
      bg-center bg-cover md:bg-[url('/images/skill_bg.svg')] md:dark:bg-[url('/images/skill_bg_dark.svg')]`}
    >
      <div className="px-4">
        <h2 className="font-onest font-semibold text-4xl leading-none text-center mb-4">
          {t('skills.heading')}
        </h2>
        <p className="max-w-121 text-[16px] leading-[1.2] text-center mb-8 mx-auto">
          {t('skills.description')}
        </p>
      </div>

      <SkillCategoryList />
      <SkillItems />
    </section>
  );
}

function SkillCategoryList() {
  return (
    <div className="hidden w-full md:flex justify-center items-center gap-4 z-4 mb-8">
      <SkillCategory categoryName={Category.FRONTEND} />
      <SkillCategory categoryName={Category.BACKEND} />
      <SkillCategory categoryName={Category.DESIGN} />
    </div>
  );
}
