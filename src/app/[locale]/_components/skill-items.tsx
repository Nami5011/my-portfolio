'use client';
import SkillItemCircle from './skill-item-circle';
import skillListData from '@/data/skills.json';
import type { Skill } from '@/types/skills';
import { useIsMobile } from '@/hooks/use-mobile';

const skillList = skillListData as Record<string, Skill>;

export default function SkillItems() {
  const isMobile = useIsMobile();
  const filteredList = Object.values(skillList)
    .filter((item) => !isMobile || (isMobile && item.mb_flg))
    .sort((a, b) => a.order - b.order);

  // Split the list into groups
  const lineLength = isMobile ? 5 : 8;
  const groups: Skill[][] = [];
  [...Array(Math.ceil(filteredList.length / lineLength)).keys()].forEach((i) => {
    const start = i * lineLength;
    const end = start + lineLength;
    const group = filteredList.slice(start, end);
    groups.push(group);
  });

  return (
    <SkillInnerBg>
      {groups.map((group, groupIndex) => {
        const isEven = groupIndex % 2 === 0;
        return (
          <SkillLineWrapper key={groupIndex} isEven={isEven}>
            {group.map((item) => (
              <SkillItemCircle
                key={item.name}
                name={item.name}
                categories={item.categories}
                src={`/images/skills/${item.image_file}`}
              />
            ))}
          </SkillLineWrapper>
        );
      })}
    </SkillInnerBg>
  );
}

function SkillInnerBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="xxs-px-2 px-4">
      <div className="w-full mx-auto max-w-90 md:max-w-216 flex justify-center flex-wrap gap-0 md:gap-2 lg:gap-0 bg-skill rounded-[24px] px-3 xxs-px-2 py-4 md:p-8">
        {children}
      </div>
    </div>
  );
}

function SkillLineWrapper({ children, isEven }: { children: React.ReactNode; isEven: boolean }) {
  return (
    <div
      className={`max-w-80 md:max-w-full w-full mx-auto flex gap-x-1 md:gap-x-2 lg:gap-x-4 
        ${isEven ? 'justify-start md:justify-center lg:justify-start' : 'justify-end md:justify-center lg:justify-end'}`}
    >
      {children}
    </div>
  );
}
