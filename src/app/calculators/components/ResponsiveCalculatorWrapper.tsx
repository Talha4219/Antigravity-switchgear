'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, ArrowRight, Zap, Settings, ShieldCheck,
    BookOpen, Calculator as CalcIcon, ChevronRight,
    ExternalLink, MessageSquare, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';

interface NavLink {
    slug: string;
    title: string;
}

interface ResponsiveCalculatorWrapperProps {
    title: string;
    shortDescription: string;
    formula: React.ReactNode;
    children: React.ReactNode;
    educationalContent: React.ReactNode;
    category?: string;
    faq?: { question: string, answer: string }[];
    prevCalc?: NavLink;
    nextCalc?: NavLink;
    relatedProducts?: { slug: string, title: string, imageUrl?: string }[];
    latestBlogs?: { id: string, slug: string, title: string, date: string, imageId?: string }[];
}

export default function ResponsiveCalculatorWrapper({
    title,
    shortDescription,
    formula,
    children,
    educationalContent,
    category,
    faq,
    prevCalc,
    nextCalc,
    relatedProducts,
    latestBlogs
}: ResponsiveCalculatorWrapperProps) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-background pb-16 md:pb-20"
            >
                {/* Compact Hero Header */}
                <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden py-8 md:py-12 border-b border-white/5">
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.4) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
                        {/* Breadcrumbs */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                        >
                            <Link href="/calculators" className="hover:text-primary transition-colors">Hub</Link>
                            {category && (
                                <>
                                    <ChevronRight size={10} className="text-slate-700" />
                                    <span className="text-slate-400">{category}</span>
                                </>
                            )}
                            <ChevronRight size={10} className="text-slate-700" />
                            <span className="text-primary">{title}</span>
                        </motion.div>

                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <h1 className="text-2xl md:text-3xl font-headline font-bold mb-3 tracking-tight leading-tight text-white">
                                    {title}
                                </h1>
                                <div className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mb-4">
                                    {shortDescription}
                                </div>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge className="bg-primary/20 text-primary border-primary/30 py-0.5 px-2 text-[9px] font-bold tracking-wide uppercase">
                                        Professional Tool
                                    </Badge>
                                    <div className="h-3 w-px bg-white/10 hidden sm:block" />
                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                                        <ShieldCheck size={10} className="text-primary" /> IEC 61439 & NEC 2024
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Main Content - Mobile First */}
                <div className="container max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 -mt-6 md:-mt-8 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-start">

                        {/* Main Column - Full width on mobile */}
                        <main className="lg:col-span-9 space-y-6 md:space-y-8">

                            {/* Calculator Console */}
                            <AnimateOnScroll animation="fade-up">
                                <Card className="shadow-xl border-primary/10 overflow-hidden bg-white dark:bg-card/80 backdrop-blur-sm">
                                    <CardHeader className="bg-primary/5 border-b border-primary/10 py-4 md:py-5 px-4 md:px-6 lg:px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary p-2 rounded-lg shadow-md shadow-primary/20">
                                                <CalcIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base md:text-lg font-headline font-bold tracking-tight">Calculator Console</CardTitle>
                                                <CardDescription className="text-[11px] md:text-xs mt-0.5 font-medium">Verified Engineering Logic</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 md:p-6 lg:p-8">
                                        {children}
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>

                            {/* Educational Content */}
                            <AnimateOnScroll animation="fade-up" delay={0.1}>
                                <div className="bg-card border border-border overflow-hidden rounded-xl md:rounded-2xl shadow-sm">
                                    <div className="flex border-b border-border bg-secondary/20">
                                        <div className="px-3 md:px-4 lg:px-6 py-2.5 md:py-3 bg-card border-r border-border font-bold text-[9px] md:text-[10px] uppercase tracking-wider text-primary flex items-center gap-1.5">
                                            <BookOpen size={12} /> Docs
                                        </div>
                                    </div>

                                    <div className="p-4 md:p-6 lg:p-8">
                                        <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed text-sm">
                                            {educationalContent}
                                        </div>

                                        {faq && faq.length > 0 && (
                                            <div className="mt-8 pt-8 border-t border-border">
                                                <h3 className="text-lg md:text-xl font-headline font-bold mb-4 flex items-center gap-2">
                                                    <Settings className="h-5 w-5 text-primary" /> FAQ
                                                </h3>
                                                <div className="grid gap-3">
                                                    {faq.map((item, idx) => (
                                                        <div key={idx} className="p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-primary/20 transition-all">
                                                            <h4 className="text-foreground font-bold text-sm mb-1.5 flex items-center gap-2">
                                                                <span className="h-1 w-1 rounded-full bg-primary" />
                                                                {item.question}
                                                            </h4>
                                                            <p className="text-muted-foreground text-xs leading-relaxed pl-3">{item.answer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </main>

                        {/* Sidebar - Hidden on mobile, visible on desktop */}
                        <aside className="hidden lg:block lg:col-span-3 space-y-4 lg:sticky lg:top-20">

                            {/* Quick Navigation */}
                            {(prevCalc || nextCalc) && (
                                <div className="grid grid-cols-2 gap-2">
                                    {prevCalc && (
                                        <Link href={`/calculators/${prevCalc.slug}`} className="group p-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-all">
                                            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mb-1.5">
                                                <ArrowLeft size={9} /> Prev
                                            </span>
                                            <div className="text-[11px] font-bold leading-tight line-clamp-2">{prevCalc.title}</div>
                                        </Link>
                                    )}
                                    {nextCalc && (
                                        <Link href={`/calculators/${nextCalc.slug}`} className="group p-3 bg-card border border-border rounded-xl hover:border-primary/30 transition-all text-right">
                                            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mb-1.5 justify-end">
                                                Next <ArrowRight size={9} />
                                            </span>
                                            <div className="text-[11px] font-bold leading-tight line-clamp-2">{nextCalc.title}</div>
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Related Products */}
                            {relatedProducts && relatedProducts.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <Zap size={12} className="text-primary" /> Solutions
                                    </h4>
                                    <div className="grid gap-2">
                                        {relatedProducts.map((prod) => (
                                            <Link key={prod.slug} href={`/products/${prod.slug}`} className="flex items-center gap-3 p-2.5 bg-secondary/30 border border-border/50 rounded-xl hover:bg-secondary/50 transition-colors group">
                                                <div className="h-10 w-10 rounded-lg bg-white border border-border overflow-hidden flex-shrink-0 relative">
                                                    <Image src={prod.imageUrl || '/placeholder-product.jpg'} alt={prod.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs font-bold truncate group-hover:text-primary transition-colors">{prod.title}</div>
                                                    <div className="text-[9px] text-muted-foreground uppercase font-bold flex items-center gap-0.5 mt-0.5">Specs <ExternalLink size={7} /></div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Latest Blogs */}
                            {latestBlogs && latestBlogs.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                        <MessageSquare size={12} className="text-primary" /> Insights
                                    </h4>
                                    <div className="grid gap-2">
                                        {latestBlogs.map((post) => {
                                            const isUrl = typeof post.imageId === 'string' && (post.imageId.startsWith('http://') || post.imageId.startsWith('https://'));
                                            const isApiPath = typeof post.imageId === 'string' && post.imageId.startsWith('/api/images');
                                            const finalImage = (isUrl || isApiPath) ? post.imageId : '/hero-image.png';

                                            return (
                                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block overflow-hidden bg-card border border-border rounded-xl hover:border-primary/20 transition-all group">
                                                    <div className="relative w-full h-24 overflow-hidden">
                                                        <Image
                                                            src={finalImage || '/hero-image.png'}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="p-3">
                                                        <div className="text-[8px] font-bold text-primary mb-1">{post.date}</div>
                                                        <div className="text-xs font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2">{post.title}</div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <Button asChild variant="ghost" className="w-full text-[9px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary h-8">
                                        <Link href="/blog">View Blog <ChevronRight size={10} /></Link>
                                    </Button>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border shadow-2xl z-50">
                    <div className="container px-4 py-3">
                        <div className="flex items-center justify-between gap-2">
                            {prevCalc && (
                                <Link href={`/calculators/${prevCalc.slug}`} className="flex-1 flex items-center gap-2 p-2.5 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                                    <ArrowLeft size={14} className="text-primary flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[8px] font-bold uppercase text-muted-foreground">Previous</div>
                                        <div className="text-xs font-bold truncate">{prevCalc.title}</div>
                                    </div>
                                </Link>
                            )}

                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-3 bg-primary text-white rounded-lg shadow-lg"
                            >
                                <Menu size={18} />
                            </button>

                            {nextCalc && (
                                <Link href={`/calculators/${nextCalc.slug}`} className="flex-1 flex items-center gap-2 p-2.5 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-right">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[8px] font-bold uppercase text-muted-foreground">Next</div>
                                        <div className="text-xs font-bold truncate">{nextCalc.title}</div>
                                    </div>
                                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            />
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="lg:hidden fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
                            >
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Related Content</h3>
                                        <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-secondary rounded-lg">
                                            <ChevronRight size={20} className="rotate-90" />
                                        </button>
                                    </div>

                                    {/* Mobile Products */}
                                    {relatedProducts && relatedProducts.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Solutions</h4>
                                            <div className="grid gap-3">
                                                {relatedProducts.map((prod) => (
                                                    <Link key={prod.slug} href={`/products/${prod.slug}`} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                                                        <div className="h-12 w-12 rounded-lg bg-white border overflow-hidden relative flex-shrink-0">
                                                            <Image src={prod.imageUrl || '/placeholder-product.jpg'} alt={prod.title} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-bold">{prod.title}</div>
                                                            <div className="text-xs text-muted-foreground">View Specs</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Blogs */}
                                    {latestBlogs && latestBlogs.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Latest Insights</h4>
                                            <div className="grid gap-3">
                                                {latestBlogs.map((post) => {
                                                    const isUrl = typeof post.imageId === 'string' && (post.imageId.startsWith('http://') || post.imageId.startsWith('https://'));
                                                    const isApiPath = typeof post.imageId === 'string' && post.imageId.startsWith('/api/images');
                                                    const finalImage = (isUrl || isApiPath) ? post.imageId : '/hero-image.png';

                                                    return (
                                                        <Link key={post.slug} href={`/blog/${post.slug}`} onClick={() => setSidebarOpen(false)} className="block overflow-hidden bg-secondary/30 rounded-xl">
                                                            <div className="relative w-full h-32">
                                                                <Image src={finalImage || '/hero-image.png'} alt={post.title} fill className="object-cover" />
                                                            </div>
                                                            <div className="p-3">
                                                                <div className="text-xs font-bold text-primary mb-1">{post.date}</div>
                                                                <div className="text-sm font-bold line-clamp-2">{post.title}</div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
