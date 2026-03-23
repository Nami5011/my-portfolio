'use client';

import { useLocale, useTranslations } from 'next-intl';
import H2 from './h2';
import recentWorkData from '@/data/recent_work.json';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import SkillItemSquare from './skill-item-square';
import skillListData from '@/data/skills.json';
import { Skill } from '@/types/skills';
import { RecentWork as RecentWorkType } from '@/types/recent_work';
import { useState, useEffect } from 'react';
import PrimaryButtonLink from '@/components/ui/shared/buttons/primary-button-link';
import { Locale } from '@/types/locale';

const skillList = skillListData as Record<string, Skill>;
const recent_work = recentWorkData as RecentWorkType[];

export default function RecentWork() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <section className={`w-full py-10 md:py-20 overflow-hidden`}>
      <div className="px-4 mb-13">
        <H2 h2={t('recent_work.heading')} description={t('recent_work.description')} />
      </div>
      <div className="w-full md:w-max mx-auto grid grid-cols-1 justify-center md:grid-cols-2 gap-4 px-4">
        {recent_work.map((work, index) => (
          <WorkCardWrapper key={index} work={work}>
            <Skills skills={work.skills} index={index} />

            <h3 className="text-[16px] font-bold leading-[1.2]">{t(work.title)}</h3>
            <p className="text-[16px] font-bold mb-2 leading-[1.2]">{t(work.company_name)}</p>
            <p className="text-[14px] leading-[1.2]">{t(work.description)}</p>
            <Link url={work.link_url} title={work.link_title} />
          </WorkCardWrapper>
        ))}
      </div>
      {locale === Locale.EN && (
        <PrimaryButtonLink
          href="/contact"
          message={t('recent_work.see_resume')}
          className="w-62.5 h-11.5 md:h-14 text-[16px] md:text-xl mx-auto mt-13"
        />
      )}
    </section>
  );
}

function WorkCardWrapper({ work, children }: { work: RecentWorkType; children: React.ReactNode }) {
  const { theme = 'light' } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const className = cn(
    `w-full aspect-370/260 md:aspect-auto md:w-77.25 md:h-83.5 rounded-[6px] p-4 shadow-[0_0_6px_0_rgba(131,131,131,0.30)] dark:shadow-[0_0_6px_0_rgba(0,0,0,0.30)] relative
      bg-position-[top_center] bg-no-repeat 
      flex flex-col justify-end`,
    work.link_url &&
      'md:hover:scale-105 md:hover:shadow-[0_0_8px_0_rgba(131,131,131,0.45)] transition-all! duration-300!',
  );

  if (!mounted) {
    return (
      <div
        className={className}
        style={{
          backgroundImage: `url(/images/recent_work/${work.image_file})`,
          backgroundSize: 'cover',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={
        theme === 'light'
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.95) 100%), url(/images/recent_work/${work.image_file})`,
              backgroundSize: '110% 100%, cover',
            }
          : {
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.95) 100%), url(/images/recent_work/${work.image_file})`,
              backgroundSize: '110% 100%, cover',
            }
      }
    >
      {children}
    </div>
  );
}

function Skills({ skills, index }: { skills: string[]; index: number }) {
  return (
    <div
      className={cn(
        'md:absolute h-6 w-full md:w-49 md:h-32 flex md:flex-col items-start justify-end place-content-start md:justify-start flex-nowrap md:flex-wrap gap-1 md:gap-2 grow',
        index < 2 ? 'md:-top-6.5' : 'md:top-3',
        (index + 1) % 2 === 0 ? 'md:-right-25.5' : 'md:-left-25.5',
      )}
    >
      {skills.map((skill, skillIndex) => {
        const skillData = skillList[skill];
        if (!skillData) return null;

        return (
          <SkillItemSquare
            src={`/images/skills/${skillData.image_file}`}
            name={skillData.name}
            key={skillIndex}
            spaceFlg={skillData.padding_flg}
          />
        );
      })}
    </div>
  );
}

function Link({ url, title }: { url: string; title: string }) {
  if (!url) return null;
  return (
    <>
      <a href={url} className="absolute inset-0" target="_blank" rel="noopener noreferrer">
        <span className="sr-only">{title}</span>
      </a>
      <a
        href={url}
        className="text-[14px] mt-2 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </>
  );
}
