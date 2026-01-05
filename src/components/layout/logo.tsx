import { Zap } from 'lucide-react';
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
        'flex items-center gap-2 text-lg font-bold font-headline',
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <Zap className="h-5 w-5" />
      </div>
      <span>EgS</span>
    </Link>
  );
}
