'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Cta() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold">
          Ready to Power Your Project?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Our team of experts is ready to help you find the perfect switchgear solution for your needs. Contact us today for a personalized quote and expert consultation.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
