import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-headline',
        className
      )}
    >
      <div className="relative h-10 w-32 md:h-12 md:w-40">
        <Image
          src="/logo.png"
          alt="Evergreen Switchgear Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
