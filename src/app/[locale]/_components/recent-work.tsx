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
import { Locale } from '@/types/locale';
import SecondaryButtonLink from '@/components/ui/shared/buttons/secondary-button-link';
import { useRef } from 'react';

const skillList = skillListData as Record<string, Skill>;
const recent_work = recentWorkData as RecentWorkType[];

export default function RecentWork() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const { ref, shiftPixels } = useMousePosition();

  return (
    <section ref={ref} className={`w-full py-10 md:py-20 overflow-hidden`}>
      <div className="px-4 mb-4 md:mb-13">
        <H2 h2={t('recent_work.heading')} description={t('recent_work.description')} />
      </div>
      <div className="w-full md:w-max mx-auto grid grid-cols-1 justify-center md:grid-cols-2 gap-4 px-4">
        {recent_work.map((work, index) => (
          <WorkCardWrapper key={index} work={work}>
            {(expanded, setExpanded) => (
              <>
                <Skills skills={work.skills} index={index} shiftPixels={shiftPixels} />

                <h3 className="text-[16px] font-bold leading-[1.2] ">{t(work.title)}</h3>
                {t(work.company_name) && (
                  <p className="text-[16px] font-bold leading-[1.2]">{t(work.company_name)}</p>
                )}
                <WorkDescription
                  description={t(work.description)}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
                {work.link_url && work.link_title && (
                  <a
                    href={work.link_url}
                    className="text-[14px] mt-2 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {work.link_title}
                  </a>
                )}
              </>
            )}
          </WorkCardWrapper>
        ))}
      </div>
    </section>
  );
}

function WorkCardWrapper({
  work,
  children,
}: {
  work: RecentWorkType;
  children: (
    expanded: boolean,
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={cn(
        `w-full aspect-370/260 md:aspect-auto md:w-77.25 md:h-83.5 rounded-[6px] relative
      shadow-[0_0_10px_0_rgba(131,131,131,0.50)] dark:shadow-[0_0_10px_0_rgba(150,150,150,0.50)]
      bg-position-[top_center] bg-no-repeat bg-cover 
      group/card`,
      )}
      style={{
        backgroundImage: `url(/images/recent_work/${work.image_file})`,
      }}
    >
      <div
        className={cn(
          'w-full h-full rounded-[5px] p-4',
          'flex flex-col justify-end',
          'transition-all! duration-300!',
          'md:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.95)_100%)]',
          'md:dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.95)_100%)]',
          expanded
            ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.80)_50%,rgba(255,255,255,0.95)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.95)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.95)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.95)_100%)]',
          'md:group-hover/card:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.80)_50%,rgba(255,255,255,0.95)_100%)]',
          'md:dark:group-hover/card:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.80)_50%,rgba(0,0,0,0.95)_100%)]',
        )}
      >
        {children(expanded, setExpanded)}
      </div>
    </div>
  );
}

function Skills({
  skills,
  index,
  shiftPixels,
}: {
  skills: string[];
  index: number;
  shiftPixels: { x: number; y: number };
}) {
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
            className="md:relative transition-all! duration-75!"
            style={{
              top: shiftPixels.y,
              left: shiftPixels.x,
            }}
          />
        );
      })}
    </div>
  );
}

function WorkDescription({
  description,
  expanded,
  setExpanded,
}: {
  description: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!description) return null;
  const t = useTranslations('HomePage.recent_work');

  return (
    <>
      <p
        className={cn(
          'text-[14px] leading-[1.2] whitespace-pre-line mt-2 md:max-h-[2.1rem] overflow-hidden! transition-all! duration-800!',
          'md:line-clamp-2',
          'md:group-hover/card:max-h-75 md:group-hover/card:line-clamp-none',
          !expanded ? 'line-clamp-2' : 'line-clamp-none',
        )}
        onClick={() => setExpanded(true)}
      >
        {description}
      </p>
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="block md:hidden text-[14px] leading-[1.2] cursor-pointer border-none bg-transparent underline text-left text-gray-800 dark:text-gray-300 mt-0.5"
        >
          {t('show_more')}
        </button>
      )}
    </>
  );
}

const useMousePosition = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [shiftPixels, setShiftPixels] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const bounds = ref.current.getBoundingClientRect();
        // Calculate position relative to the element's top-left corner
        const position = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        };
        const positionPercentageX = position.x / bounds.width;
        const positionPercentageY = position.y / bounds.height;
        // Shift range: -10px to +10px based on mouse position
        const shiftX = Math.round(10 - positionPercentageX * 20);
        const shiftY = Math.round(10 - positionPercentageY * 20);
        if (shiftX !== shiftPixels.x || shiftY !== shiftPixels.y) {
          setShiftPixels({
            x: shiftX,
            y: shiftY,
          });
        }
      }
    };

    const element = ref.current as HTMLElement | null;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return { ref, shiftPixels: shiftPixels };
};
