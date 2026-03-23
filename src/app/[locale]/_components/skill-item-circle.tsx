'use client';

import { getChromeFlg } from '@/hooks/use-browser';
import { cn } from '@/lib/utils';
import { useSkillFilterStore } from '@/store/skill-filter';
import { useEffect, useState } from 'react';

export default function SkillItemCircle({
  name,
  categories,
  src,
}: {
  name: string;
  categories: string[];
  src: string;
}) {
  const [isChrome, setIsChrome] = useState(false);
  useEffect(() => {
    setIsChrome(getChromeFlg());
  }, []);

  const hoveredCategory = useSkillFilterStore((s) => s.hoveredCategory);
  const isHighlighted = hoveredCategory !== null && categories.includes(hoveredCategory);
  const isCategoryHovered = hoveredCategory !== null;

  return (
    <div
      className={cn(
        `skill-item-circle group/item w-13.75 h-13.75 md:w-20 md:h-20 rounded-full p-px 
        bg-[url(/images/skill_item_border.svg)] bg-no-repeat bg-cover bg-center
        shadow-[0_0_6px_0_rgba(0,0,0,0.16)] cursor-pointer
        hover:scale-[1.8] hover:z-50 transition-all! duration-300!`,
        isCategoryHovered && isHighlighted && 'scale-[1.1]',
        isCategoryHovered && !isHighlighted && 'scale-[0.6] opacity-50',
        !isChrome && 'bg-white', // Backdrop-filter Fallback for non-Chrome browsers
      )}
    >
      <div className="w-full h-full rounded-full flex justify-center items-center flex-col group-hover/item:backdrop-filter-[url(#liquidGlassCircle)] relative">
        <div
          className="bg-center bg-no-repeat bg-contain w-9 md:w-12.5 h-full flex items-center justify-center"
          style={{
            backgroundImage: `url(${src})`,
          }}
        >
          <span
            className={`w-[200%] h-max 
            opacity-0 group-hover/item:opacity-100 scale-0 group-hover/item:scale-100 
            transition-all duration-300 
            text-center font-bold text-sm -skew-x-15 mix-blend-difference bg-gray-500 bg-clip-text text-transparent`}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}
