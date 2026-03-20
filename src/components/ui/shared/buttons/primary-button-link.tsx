import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function PrimaryButtonLink({
  href,
  message,
  className = '',
}: {
  href: string;
  message: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'bg-primary text-white-c flex items-center justify-center rounded-[10px] transition-background duration-200 hover:bg-primary-hover',
        className,
      )}
    >
      {message}
    </Link>
  );
}
