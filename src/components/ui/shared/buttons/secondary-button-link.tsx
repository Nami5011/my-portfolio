import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function SecondaryButtonLink({
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
        'border border-secondary text-secondary flex items-center justify-center rounded-[12px] transition-background duration-200 hover:bg-secondary-hover',
        className,
      )}
    >
      {message}
    </Link>
  );
}
