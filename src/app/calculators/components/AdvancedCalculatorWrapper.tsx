'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, ArrowRight, Zap, Settings, ShieldCheck, Activity,
    Info, BookOpen, Calculator as CalcIcon, ChevronRight,
    ExternalLink, MessageSquare, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateOnScroll from '@/components/animations/animate-on-scroll';

interface NavLink {
    slug: string;
    title: string;
}

interface AdvancedCalculatorWrapperProps {
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

export default function AdvancedCalculatorWrapper({
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
}: AdvancedCalculatorWrapperProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-background pb-20 selection:bg-primary/20"
            >
                {/* Immersive Hero Header */}
                <section className="bg-slate-950 text-white relative overflow-hidden py-12 md:py-20 border-b border-white/5">
                    {/* Technical Node Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.3) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }}
                    />
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 opacity-40" />

                    <div className="container relative z-10 px-6 max-w-7xl mx-auto">
                        {/* Improved Breadcrumbs / Back Link */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-500"
                        >
                            <Link href="/calculators" className="hover:text-primary transition-colors">Engineering Hub</Link>
                            {category && (
                                <>
                                    <ChevronRight size={10} className="text-slate-700" />
                                    <span className="text-slate-400">{category}</span>
                                </>
                            )}
                            <ChevronRight size={10} className="text-slate-700" />
                            <span className="text-primary italic">{title}</span>
                        </motion.div>

                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold mb-4 tracking-tight leading-tight text-white">
                                    {title}
                                </h1>
                                <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mb-6">
                                    {shortDescription}
                                </p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Badge className="bg-primary/20 text-primary border-primary/30 py-0.5 px-3 text-[9px] font-bold tracking-wider uppercase">
                                        Professional Engineering Tool
                                    </Badge>
                                    <div className="h-4 w-px bg-white/10 hidden sm:block" />
                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                                        <ShieldCheck size={12} className="text-primary" /> Standards: IEC 61439 & NEC 2024
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Main Content Layout */}
                <div className="container max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-start">

                        {/* Left Column: Calculator Core & Education */}
                        <main className="lg:col-span-9 xl:col-span-9 space-y-8 md:space-y-8">
                            <AnimateOnScroll animation="fade-up">
                                <Card className="shadow-2xl border-primary/10 overflow-hidden bg-white/80 dark:bg-card/60 backdrop-blur-xl">
                                    <CardHeader className="bg-primary/5 border-b border-primary/10 py-5 md:py-6 px-6 md:px-8 lg:px-10 flex-row justify-between items-center">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="bg-primary p-2.5 md:p-3 rounded-xl shadow-lg shadow-primary/20">
                                                <CalcIcon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base md:text-lg lg:text-xl font-headline font-bold tracking-tight">Calculator Console</CardTitle>
                                                <CardDescription className="text-slate-500 text-[11px] md:text-xs mt-0.5 font-medium">Verified Engineering Logic</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 md:p-8 lg:p-10">
                                        {children}
                                    </CardContent>
                                </Card>
                            </AnimateOnScroll>

                            {/* Educational Section with Tabs Style */}
                            <AnimateOnScroll animation="fade-up" delay={0.2}>
                                <div className="bg-card border border-border overflow-hidden rounded-2xl md:rounded-[2rem] shadow-sm">
                                    {/* Tabs Header */}
                                    <div className="flex border-b border-border bg-secondary/20">
                                        <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-card border-r border-border font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                            <BookOpen size={14} /> Documentation
                                        </div>
                                        <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                                            <History size={14} /> Version 2.0.4
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-8 lg:p-10">
                                        <div className="prose prose-sm max-w-none text-foreground/85 leading-relaxed text-sm md:text-base">
                                            {educationalContent}
                                        </div>

                                        {faq && faq.length > 0 && (
                                            <div className="mt-16 pt-12 border-t border-border">
                                                <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2.5">
                                                    <Settings className="h-6 w-6 text-primary" /> Engineering Support (FAQ)
                                                </h3>
                                                <div className="grid gap-4">
                                                    {faq.map((item, idx) => (
                                                        <div key={idx} className="group p-5 rounded-2xl bg-secondary/20 border border-transparent hover:border-primary/20 transition-all">
                                                            <h4 className="text-foreground font-bold text-base mb-2 flex items-center gap-2">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                                {item.question}
                                                            </h4>
                                                            <p className="text-muted-foreground text-sm leading-relaxed pl-3.5">{item.answer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </main>

                        {/* Right Column: Sticky Sidebar & Internal Linking */}
                        <aside className="lg:col-span-3 xl:col-span-3 space-y-6 md:space-y-8 lg:sticky lg:top-24">

                            {/* Internal Linking: Next/Prev Calculators */}
                            <div className="grid grid-cols-2 gap-4">
                                {prevCalc && (
                                    <Link href={`/calculators/${prevCalc.slug}`} className="group p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mb-2">
                                            <ArrowLeft size={10} /> Previous
                                        </span>
                                        <div className="text-xs font-bold leading-tight line-clamp-2">{prevCalc.title}</div>
                                    </Link>
                                )}
                                {nextCalc && (
                                    <Link href={`/calculators/${nextCalc.slug}`} className="group p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all text-right">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mb-2 justify-end">
                                            Next <ArrowRight size={10} />
                                        </span>
                                        <div className="text-xs font-bold leading-tight line-clamp-2">{nextCalc.title}</div>
                                    </Link>
                                )}
                            </div>

                            {/* Related Products Section */}
                            {relatedProducts && relatedProducts.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic flex items-center gap-2">
                                        <Zap size={14} className="text-primary" /> Related Solutions
                                    </h4>
                                    <div className="grid gap-3">
                                        {relatedProducts.map((prod) => (
                                            <Link key={prod.slug} href={`/products/${prod.slug}`} className="flex items-center gap-4 p-3 bg-secondary/30 border border-border/50 rounded-2xl hover:bg-secondary/50 transition-colors group">
                                                <div className="h-12 w-12 rounded-xl bg-white border border-border overflow-hidden flex-shrink-0 relative">
                                                    <Image src={prod.imageUrl || '/placeholder-product.jpg'} alt={prod.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs font-bold truncate group-hover:text-primary transition-colors">{prod.title}</div>
                                                    <div className="text-[9px] text-muted-foreground uppercase font-black flex items-center gap-1 mt-0.5">Specifications Available <ExternalLink size={8} /></div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Latest Blogs Section */}
                            {latestBlogs && latestBlogs.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic flex items-center gap-2">
                                        <MessageSquare size={14} className="text-primary" /> Technical Insights
                                    </h4>
                                    <div className="grid gap-3">
                                        {latestBlogs.map((post) => {
                                            // Resolve image URL using the same logic as blog pages
                                            const isUrl = typeof post.imageId === 'string' && (post.imageId.startsWith('http://') || post.imageId.startsWith('https://'));
                                            const isApiPath = typeof post.imageId === 'string' && post.imageId.startsWith('/api/images');
                                            const finalImage = (isUrl || isApiPath) ? post.imageId : '/hero-image.png';

                                            return (
                                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block overflow-hidden bg-card border border-border rounded-2xl hover:border-primary/20 transition-all group">
                                                    <div className="relative w-full h-32 overflow-hidden">
                                                        <Image
                                                            src={finalImage || '/hero-image.png'}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="text-[9px] font-bold text-primary mb-1">{post.date}</div>
                                                        <div className="text-xs font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2">{post.title}</div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <Button asChild variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                                        <Link href="/blog">Visit Engineering Blog <ChevronRight size={12} /></Link>
                                    </Button>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

