'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Package, Newspaper, Tag, ArrowRight, ShieldCheck, Factory, Wrench, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simple debounce hook implementation if not available
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export function NavSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounceValue(query, 300);
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    const handleResultClick = (url: string) => {
        router.push(url);
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div ref={containerRef} className="relative flex items-center">
            <div className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isOpen ? "w-[200px] sm:w-[320px] lg:w-[400px] opacity-100 mr-2" : "w-0 opacity-0"
            )}>
                <form onSubmit={handleSearch} className="w-full relative">
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products, blog, etc..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="h-10 w-full pr-10 bg-muted/40 border-slate-200/60 rounded-xl focus-visible:ring-primary/20 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                        ) : query ? (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={14} />
                            </button>
                        ) : null}
                    </div>
                </form>

                {/* Dropdown Results */}
                {isOpen && query.length >= 2 && (
                    <div className="absolute top-[calc(100%+8px)] right-0 w-[300px] sm:w-[400px] bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                        {results.length > 0 ? (
                            <div className="p-2 space-y-1">
                                {results.map((result) => (
                                    <button
                                        key={result.id}
                                        onClick={() => handleResultClick(result.url)}
                                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                                    >
                                        <div className={cn(
                                            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                            result.type === 'product' ? "bg-blue-50 text-blue-500" :
                                                result.type === 'blog' ? "bg-orange-50 text-orange-500" :
                                                    result.type === 'category' ? "bg-indigo-50 text-indigo-500" :
                                                        result.type === 'certification' ? "bg-emerald-50 text-emerald-500" :
                                                            result.type === 'industry' ? "bg-purple-50 text-purple-500" :
                                                                result.type === 'service' ? "bg-rose-50 text-rose-500" :
                                                                    "bg-slate-50 text-slate-500"
                                        )}>
                                            {result.type === 'product' ? <Package size={18} /> :
                                                result.type === 'blog' ? <Newspaper size={18} /> :
                                                    result.type === 'category' ? <Tag size={18} /> :
                                                        result.type === 'certification' ? <ShieldCheck size={18} /> :
                                                            result.type === 'industry' ? <Factory size={18} /> :
                                                                result.type === 'service' ? <Wrench size={18} /> :
                                                                    <Info size={18} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-slate-900 truncate">{result.title}</p>
                                            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                                                {result.type} • {result.type === 'product' ? result.category : result.date || 'Site Page'}
                                            </p>
                                        </div>
                                        <ArrowRight size={14} className="text-slate-300 group-hover:text-primary transition-colors translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </button>
                                ))}
                            </div>
                        ) : !isLoading && (
                            <div className="p-8 text-center">
                                <Search size={24} className="mx-auto text-slate-200 mb-2" />
                                <p className="text-sm font-medium text-slate-400">No results found for "{query}"</p>
                            </div>
                        )}
                        <div className="p-3 bg-slate-50/80 border-t border-slate-100">
                            <Button
                                variant="ghost"
                                className="w-full h-8 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
                                onClick={handleSearch}
                            >
                                View all results
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "h-10 w-10 rounded-xl transition-all",
                    isOpen ? "bg-primary text-white scale-90" : "text-foreground/70 hover:bg-accent"
                )}
                aria-label="Toggle Search"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
        </div>
    );
}
