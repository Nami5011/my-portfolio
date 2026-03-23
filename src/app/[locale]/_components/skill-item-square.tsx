import { useEffect, useState } from 'react';
import { getChromeFlg } from '@/hooks/use-browser';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function SkillItemSquare({
  src,
  name,
  spaceFlg,
}: {
  src: string;
  name: string;
  spaceFlg: boolean;
}) {
  const [isChrome, setIsChrome] = useState(false);
  useEffect(() => {
    setIsChrome(getChromeFlg());
  }, []);

  return (
    <div
      className={cn(
        'size-6 md:size-15 rounded-[6px] p-px bg-[url(/images/skill_item_border2.svg)] bg-no-repeat bg-cover bg-center shadow-[0_0_6px_0_rgba(0,0,0,0.16)]',
        !isChrome && 'bg-white', // Backdrop-filter Fallback for non-Chrome browsers
      )}
    >
      <div className="w-full h-full rounded-[5px] flex items-center justify-center overflow-hidden dark:bg-[rgba(255,255,255,0.60)] backdrop-filter-[url(#liquidGlassSquare)]">
        <Image
          src={src}
          alt={name}
          width={58}
          height={58}
          className={cn(
            'object-contain object-center',
            spaceFlg ? 'size-5.25 md:size-13.5' : 'w-5.5 md:w-14.5 h-auto',
          )}
        />
      </div>
    </div>
  );
}
