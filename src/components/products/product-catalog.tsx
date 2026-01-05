'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import * as motion from 'framer-motion/client';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';

interface Category {
    group: string;
    items: string[];
}

interface ProductCatalogProps {
    categories: Category[];
}

export default function ProductCatalog({ categories }: ProductCatalogProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;

        const query = searchQuery.toLowerCase();
        return categories.map(category => {
            // Check if group name matches
            const groupMatches = category.group.toLowerCase().includes(query);

            // Filter items that match
            const matchingItems = category.items.filter(item =>
                item.toLowerCase().includes(query)
            );

            if (groupMatches) {
                return category; // Show all items if group matches
            } else if (matchingItems.length > 0) {
                return {
                    ...category,
                    items: matchingItems
                };
            }
            return null;
        }).filter((cat): cat is Category => cat !== null);
    }, [categories, searchQuery]);

    const totalResults = useMemo(() => {
        return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
    }, [filteredCategories]);

    return (
        <div className="grid gap-12">
            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl mx-auto mb-16 w-full relative"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search products (e.g., LT Panels, Cable Trays)..."
                        className="pl-10 h-12 shadow-sm rounded-full border-primary/20 focus-visible:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {searchQuery && (
                    <p className="absolute -bottom-8 left-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-1">
                        Found {totalResults} {totalResults === 1 ? 'product' : 'products'} matching "{searchQuery}"
                    </p>
                )}
            </motion.div>

            {filteredCategories.length > 0 ? (
                <div className="grid gap-12">
                    {filteredCategories.map((category, idx) => (
                        <section key={idx} className="scroll-mt-24" id={category.group.toLowerCase().replace(/\s+/g, '-')}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-10 w-2 bg-accent rounded-full" />
                                <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground">{category.group}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.items.map((item, itemIdx) => {
                                    const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
                                    return (
                                        <AnimateOnScroll key={itemIdx} delay={itemIdx % 3 * 0.1} animation="fade-up">
                                            <Link href={`/products/${slug}`} className="group h-full block">
                                                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 group-hover:-translate-y-1">
                                                    <CardHeader className="pb-3 px-6 pt-6">
                                                        <CardTitle className="text-lg font-semibold flex items-center justify-between gap-2">
                                                            <span className="line-clamp-2">{item}</span>
                                                            <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="px-6 pb-6 pt-0">
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                            Reliable and IEC-compliant {item.toLowerCase()} solutions for enterprise-grade power infrastructure.
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            <Badge variant="secondary" className="text-[10px] font-medium uppercase tracking-wider bg-primary/5 text-primary border-primary/10">IEC Standard</Badge>
                                                            <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider">Customizable</Badge>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </AnimateOnScroll>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
                    <div className="inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4">
                        <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                    <p className="text-muted-foreground">We couldn't find any results matching "{searchQuery}". Try a different term.</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-primary font-semibold hover:underline"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
}
