'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Server, ShieldCheck, Activity } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

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
        <AdvancedCalculatorWrapper
            title="Switchgear Transformer Sizing Calculator"
            shortDescription="The Transformer Sizing Calculator is designed to help engineers select the right transformer capacity for their switchgear and distribution systems."
            formula={<code>kVA<sub>rec</sub> &ge; (Load * DF) * (1 + Growth)</code>}
            educationalContent={
                <div className="space-y-4">
                    <p>Accurate transformer sizing prevents overloading, reduces energy losses, and ensures reliable power distribution. It considers the total connected load and the diversity factor (simultaneity).</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><Activity size={18} className="text-primary" /> Diversity Factor</h4>
                        <p className="text-sm">In most systems, not all loads run at 100% capacity at the same time. The Diversity Factor accounts for this, preventing over-capitalization on oversized transformers.</p>
                    </div>
                    <p>This calculator is an essential tool for industrial switchgear design, enabling efficient planning and safe operation of electrical systems.</p>
                </div>
            }
            faq={[
                { question: "What is a safe diversity factor?", answer: "Industrial plants usually range from 0.7 to 0.9 depending on the number of non-coincident loads." },
                { question: "How much expansion should I plan for?", answer: "Typical engineering practice suggests 20% to 30% for future-proofing industrial infrastructure." }
            ]}
        >
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
        </AdvancedCalculatorWrapper>
    );
}
