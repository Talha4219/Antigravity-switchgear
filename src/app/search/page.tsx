'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, Newspaper, Tag, ArrowRight, Loader2, ShieldCheck, Factory, Wrench, Info } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function SearchResultsContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (!query) {
        return (
            <div className="container py-20 text-center">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900">Search our website</h1>
                <p className="text-slate-500 mt-2">Enter a keyword in the search bar above to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="container py-12 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Search Results</h1>
                    <p className="text-slate-500 mt-1">
                        Found {results.length} results for <span className="text-primary font-semibold">"{query}"</span>
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : results.length > 0 ? (
                <div className="grid gap-4">
                    {results.map((result) => (
                        <Card key={result.id} className="group overflow-hidden border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                            <Link href={result.url} className="flex flex-col sm:flex-row sm:items-center gap-6 p-6">
                                <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                    result.type === 'product' ? "bg-blue-50 text-blue-500" :
                                        result.type === 'blog' ? "bg-orange-50 text-orange-500" :
                                            result.type === 'category' ? "bg-indigo-50 text-indigo-500" :
                                                result.type === 'certification' ? "bg-emerald-50 text-emerald-500" :
                                                    result.type === 'industry' ? "bg-purple-50 text-purple-500" :
                                                        result.type === 'service' ? "bg-rose-50 text-rose-500" :
                                                            "bg-slate-50 text-slate-500"
                                )}>
                                    {result.type === 'product' ? <Package size={28} /> :
                                        result.type === 'blog' ? <Newspaper size={28} /> :
                                            result.type === 'category' ? <Tag size={28} /> :
                                                result.type === 'certification' ? <ShieldCheck size={28} /> :
                                                    result.type === 'industry' ? <Factory size={28} /> :
                                                        result.type === 'service' ? <Wrench size={28} /> :
                                                            <Info size={28} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                                            result.type === 'product' ? "bg-blue-100/50 text-blue-600" :
                                                result.type === 'blog' ? "bg-orange-100/50 text-orange-600" :
                                                    result.type === 'category' ? "bg-indigo-100/50 text-indigo-600" :
                                                        result.type === 'certification' ? "bg-emerald-100/50 text-emerald-600" :
                                                            result.type === 'industry' ? "bg-purple-100/50 text-purple-600" :
                                                                result.type === 'service' ? "bg-rose-100/50 text-rose-600" :
                                                                    "bg-slate-100/50 text-slate-600"
                                        )}>
                                            {result.type}
                                        </span>
                                        {result.category && (
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                • {result.category}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{result.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">
                                        {result.type === 'product' ? 'Technical switchgear solution engineered for safety and reliability.' :
                                            result.type === 'blog' ? `Expert insights and industry updates from ${result.date}.` :
                                                `Explore our specialized range of ${result.title} products.`}
                                    </p>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Search size={32} className="text-slate-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">No results found</h2>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                        We couldn't find anything matching your search. Please check your spelling or try more general terms.
                    </p>
                    <Button variant="outline" className="mt-6 rounded-xl" onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <SearchResultsContent />
        </Suspense>
    );
}
