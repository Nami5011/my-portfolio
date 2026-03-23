'use client';

import { cn } from '@/lib/utils';
import { useSkillFilterStore } from '@/store/skill-filter';

export default function SkillCategory({ categoryName }: { categoryName: string }) {
  const groupName = `group/${categoryName}`;
  const setHoveredCategory = useSkillFilterStore((s) => s.setHoveredCategory);
  return (
    <div
      className={cn(
        'w-25 h-10 rounded-[100px] p-px shadow-[0_0_6px_0_rgba(0,0,0,0.25)] cursor-pointer',
        'bg-[url(/images/skill_category_border.svg)] bg-no-repeat bg-cover bg-center',
        'transition-all! duration-300!',
        'hover:scale-[1.2] hover:bg-[rgba(255,255,255,0.3)] hover:shadow-[0_0_8px_0_rgba(0,0,0,0.4)]',
        groupName,
      )}
      onMouseEnter={() => setHoveredCategory(categoryName)}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="w-full h-full rounded-[100px] flex items-center justify-center backdrop-filter-[url(#liquidGlassCategory)]">
        {categoryName}
      </div>
    </div>
  );
}
