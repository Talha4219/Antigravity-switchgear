'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Server, ShieldCheck, Activity } from 'lucide-react';

const formSchema = z.object({
    totalLoad: z.coerce.number().min(0.1, "Load must be greater than 0"),
    diversityFactor: z.coerce.number().min(0.1, "DF must be > 0").max(1, "DF cannot exceed 1"),
    futureExpansion: z.coerce.number().min(0, "Growth must be positive"),
});

export default function TransformerSizingAdvanced() {
    const [recommendation, setRecommendation] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            totalLoad: 450,
            diversityFactor: 0.8,
            futureExpansion: 20
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { totalLoad, diversityFactor, futureExpansion } = values;

        const peakLoad = totalLoad * diversityFactor;
        const requiredKva = peakLoad * (1 + (futureExpansion / 100));

        // Standard transformer ratings (kVA)
        const standardRatings = [10, 16, 25, 31.5, 50, 63, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500];
        const recommended = standardRatings.find(r => r >= requiredKva) || standardRatings[standardRatings.length - 1];

        setRecommendation(recommended);
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <>
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="totalLoad" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Connected Load (kVA)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="diversityFactor" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Diversity Factor (0-1)</FormLabel>
                            <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="futureExpansion" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Future Expansion (%)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {recommendation && (
                <div className="mt-10 p-10 rounded-[3rem] bg-indigo-950 text-white text-center relative overflow-hidden group border-b-8 border-primary">
                    <Server className="absolute top-0 right-0 p-12 opacity-5 -scale-x-100" size={200} />
                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic mb-6 block">Standard Rating Recommendation</span>
                        <div className="text-7xl md:text-8xl font-black mb-4 tabular-nums text-white group-hover:scale-105 transition-transform">
                            {recommendation}
                        </div>
                        <div className="text-2xl font-bold opacity-40 uppercase tracking-widest italic">kVA Transformer</div>
                        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold bg-white/5 border border-white/10 px-6 py-2 rounded-full w-fit mx-auto backdrop-blur-sm">
                            <ShieldCheck size={14} className="text-primary" /> Sized for Efficiency & Longevity
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
