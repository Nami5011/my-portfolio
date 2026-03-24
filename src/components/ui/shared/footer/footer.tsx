import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function Footer() {
  return (
    <footer className="w-full pt-6 pb-7 md:h-20 md:p-0">
      <div className="w-full h-full max-w-270 mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <Link href="/" className="h-max flex items-center mb-2 md:mb-0">
          <Image
            className="dark:hidden w-25 h-auto"
            src="/images/logo.svg"
            alt="Nami Sawada Portfolio"
            width={75}
            height={24}
            priority
          />
          <Image
            className="hidden dark:block w-25 h-auto"
            src="/images/logo_dark.svg"
            alt="Nami Sawada Portfolio"
            width={75}
            height={24}
            priority
          />
        </Link>
        <Links />
        <p className="text-[14px]">
          &copy; {new Date().getFullYear()} Nami Sawada. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Links() {
  return (
    <div className="flex gap-2 w-max">
      <Link href="https://github.com/Nami5011" target="_blank" rel="noopener noreferrer">
        <Image
          className="dark:invert w-auto h-7.5 object-contain"
          src="/images/footer/github.svg"
          alt="GitHub"
          width={30}
          height={30}
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/nami-sawada-28801b2a3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:hidden w-auto h-7.5 object-contain"
          src="/images/footer/linkedin.svg"
          alt="LinkedIn"
          width={30}
          height={30}
        />
        <Image
          className="hidden dark:block w-auto h-7.5 object-contain"
          src="/images/footer/linkedin_dark.svg"
          alt="LinkedIn"
          width={30}
          height={30}
        />
      </Link>
      <Link href="https://codepen.io/namisawada" target="_blank" rel="noopener noreferrer">
        <Image
          className="dark:invert w-auto h-7.5 object-contain"
          src="/images/footer/codepen.svg"
          alt="CodePen"
          width={30}
          height={30}
        />
      </Link>
    </div>
  );
}
