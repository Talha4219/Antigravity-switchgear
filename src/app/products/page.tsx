
import Link from 'next/link';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allCategories } from '@/lib/product-data';
import ProductCatalog from '@/components/products/product-catalog';
import * as motion from 'framer-motion/client';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';

export const metadata = {
    title: 'Product Catalog | EgSwitchGear',
    description: 'Explore our complete range of industrial switchgear, automation, and power distribution solutions.',
};

export default function ProductsIndexPage() {
    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-primary py-16 text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern-grid.png')] opacity-10" />
                <div className="container relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-headline font-bold mb-4"
                    >
                        Product Catalog
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-primary-foreground/80 max-w-2xl mx-auto"
                    >
                        Browse our comprehensive range of industrial electrical solutions, from power panels to solar systems.
                    </motion.p>
                </div>
            </div>

            <div className="container py-12 px-4 md:px-6">
                <ProductCatalog categories={allCategories} />
            </div>

            <div className="container py-12 border-t mt-12 text-center overflow-hidden">
                <AnimateOnScroll animation="scale-up">
                    <h3 className="text-2xl font-bold mb-4">Can't ensure what you need?</h3>
                    <p className="text-muted-foreground mb-8 text-lg">Our engineering team can help select the right solution for your project.</p>
                    <Button size="lg" asChild className="px-8 font-bold">
                        <Link href="/contact">Contact Engineering Team</Link>
                    </Button>
                </AnimateOnScroll>
            </div>
        </div>
    );
}
