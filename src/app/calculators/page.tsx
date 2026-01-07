'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Target,
  Cpu,
  Lightbulb,
  ShieldCheck,
  LayoutGrid,
  FilterX,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculatorData, type CalculatorInfo } from '@/lib/calculators';

const CATEGORIES = [
  'All Tools',
  'System Analysis',
  'Power Distribution',
  'Cabling & Containment',
  'Lighting & Safety',
  'Renewable Energy',
] as const;

const CATEGORY_DESCRIPTIONS: Record<typeof CATEGORIES[number], string> = {
  'All Tools': 'Browse our complete suite of professional electrical engineering calculators.',
  'System Analysis': 'Analyze fault currents, power factors, and load requirements for safe system design.',
  'Power Distribution': 'Size transformers, breakers, and distribution equipment for optimal performance.',
  'Cabling & Containment': 'Calculate cable sizes, tray fills, and containment requirements per NEC standards.',
  'Lighting & Safety': 'Design emergency lighting, illuminance levels, and arc flash protection systems.',
  'Renewable Energy': 'Size solar panels, batteries, and renewable energy systems for off-grid applications.'
};

export default function CalculatorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All Tools');

  const filteredCalculators = useMemo(() => {
    return calculatorData.filter((calc) => {
      const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Tools' || calc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map(cat => ({
      name: cat,
      count: cat === 'All Tools'
        ? calculatorData.length
        : calculatorData.filter(c => c.category === cat).length
    }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32 border-b border-primary/10">
        {/* Technical Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59,130,246,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 text-primary-foreground/90 bg-primary/10 backdrop-blur-sm tracking-widest uppercase text-[10px] font-black italic">
              Engineering Excellence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-8 tracking-tighter leading-tight">
              State-of-the-Art <br />
              <span className="text-primary italic">Electrical Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Access 12 professional-grade calculators engineered for precision. From complex fault analysis to NEC-compliant cable sizing—optimized for speed and accuracy.
            </p>

            {/* Search Bar Container */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-primary/20 blur-2xl group-focus-within:bg-primary/30 transition-all rounded-full" />
              <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 transition-all">
                <Search className="ml-4 h-6 w-6 text-slate-500 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search engineering tools (e.g. 'Fault', 'Cable', 'Voltage')..."
                  className="border-0 bg-transparent focus-visible:ring-0 text-white text-lg h-14 placeholder:text-slate-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="hidden md:flex rounded-xl px-8 font-bold h-12 shadow-lg shadow-primary/20">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16 md:py-24 -mt-16 container relative z-20">
        <div className="flex flex-col gap-12">

          {/* Category Filter Pills */}
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categoriesWithCounts.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card/50 backdrop-blur-sm text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                    }`}
                >
                  {cat.name}
                  <span className={`ml-2 text-[10px] opacity-60 font-mono`}>[{cat.count}]</span>
                </button>
              ))}
            </div>
            {/* Category Description for SEO */}
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              {CATEGORY_DESCRIPTIONS[activeCategory]}
            </p>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCalculators.length > 0 ? (
                filteredCalculators.map((calc, idx) => (
                  <motion.div
                    key={calc.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <Link href={`/calculators/${calc.slug}`} className="group h-full block">
                      <Card className="h-full border-primary/5 bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-2 group overflow-hidden relative flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/15 transition-colors duration-700" />

                        <CardHeader className="flex-row items-start gap-4 space-y-0 p-8">
                          <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:rotate-3">
                            <calc.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="secondary" className="mb-2 text-[8px] uppercase tracking-tighter opacity-70 group-hover:opacity-100 font-black">
                              {calc.category}
                            </Badge>
                            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors leading-tight tracking-tight">
                              {calc.title}
                            </CardTitle>
                          </div>
                        </CardHeader>

                        <CardContent className="px-8 pb-8 flex-grow flex flex-col">
                          <div className="text-muted-foreground text-base leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                            {calc.description}
                          </div>

                          <div className="pt-6 border-t border-border/50 flex items-center justify-between group-hover:border-primary/20 transition-colors">
                            <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                              TOOL CODE: {calc.slug.toUpperCase()}
                            </span>
                            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                              Access Tool <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center space-y-4"
                >
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/30 mb-4 border border-border">
                    <FilterX className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold">No calculators match your search</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your filters or search terms for electrical components, standards, or ratings.
                  </p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('All Tools'); }} className="mt-4">
                    Clear all filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 border-t border-border">
        <div className="container">
          <div className="bg-slate-950 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-[url('/pattern-grid.png')] opacity-5 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-6">Need a custom engineering solution?</h2>
              <p className="text-slate-400 text-lg mb-10 font-medium">
                Our calculators provide professional estimations. For mission-critical industrial switchgear design, contact our engineering team for IEC-certified technical consultation and custom panel fabrication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-14 px-10 font-bold rounded-2xl shadow-xl shadow-primary/30" asChild>
                  <Link href="/contact">Request Technical Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 font-bold rounded-2xl border-white/10 hover:bg-white/5 text-white" asChild>
                  <Link href="/products">Browse Switchgear Products</Link>
                </Button>
              </div>
              <p className="mt-8 text-xs text-slate-500 italic">
                Explore our <Link href="/products/lt-panels" className="underline hover:text-primary">LT Panels</Link>, <Link href="/products/ats-amf-panels" className="underline hover:text-primary">ATS/AMF Systems</Link>, <Link href="/products/pfi-plant" className="underline hover:text-primary">PFI Plants</Link>, and our advanced <Link href="/manufacturing" className="underline hover:text-primary font-bold">Manufacturing Facility</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
