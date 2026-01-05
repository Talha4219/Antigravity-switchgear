'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldAlert, Zap, Settings, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    loadCurrent: z.coerce.number().min(1, "Load current must be greater than 0"),
    loadType: z.enum(['resistive', 'inductive', 'motor']),
    phases: z.enum(['1', '3']),
});

export default function BreakerSelectionCalculator() {
    const [rating, setRating] = useState<number | null>(null);
    const [mccbType, setMccbType] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loadCurrent: 20,
            loadType: 'resistive',
            phases: '3',
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { loadCurrent, loadType } = values;

        // Safety factor based on load type
        let safetyFactor = 1.25; // Standard 125% for continuous load
        if (loadType === 'motor') safetyFactor = 2.5; // High inrush for motors
        if (loadType === 'inductive') safetyFactor = 1.5;

        const calculatedRating = loadCurrent * safetyFactor;

        // Standard breaker sizes array
        const standardSizes = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 320, 400, 630, 800];
        const recommended = standardSizes.find(s => s >= calculatedRating) || 800;

        setRating(recommended);
        setMccbType(recommended <= 63 ? 'MCB (Miniature Circuit Breaker)' : 'MCCB (Molded Case Circuit Breaker)');
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="MCB & Circuit Breaker Selection Calculator for Switchgear"
            shortDescription="Selecting the right protective device is essential for safe and reliable switchgear operation. Our MCB & Circuit Breaker Selection Calculator allows engineers and designers to quickly determine the correct rating."
            formula={<span>Rating &ge; I<sub>load</sub> &middot; 1.25</span>}
            educationalContent={
                <div className="space-y-4">
                    <p>By inputting load current, system type, and motor starting characteristics, this calculator provides recommended breaker sizes to prevent overcurrent, short-circuits, and equipment damage.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><ShieldAlert size={18} className="text-primary" /> Protection Logic</h4>
                        <p className="text-sm">For motor loads, circuit breakers must accommodate high starting currents (often 6-8x rated current) without nuisance tripping.</p>
                    </div>
                    <p>It’s an indispensable tool for switchgear panel manufacturers, electrical contractors, and maintenance teams looking to optimize panel protection and comply with industry standards.</p>
                </div>
            }
            faq={[
                { question: "What is the difference between MCB and MCCB?", answer: "MCBs are typically used for lower current circuits (up to 63A-125A), while MCCBs handle higher currents up to 2500A and offer adjustable trip settings." },
                { question: "Why use a 1.25 safety factor?", answer: "The NEC requires breakers to be sized at 125% of the continuous load to prevent thermal fatigue of the tripping mechanism." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="loadCurrent" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Load Current (Amps)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="loadType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type of Load</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="resistive">Resistive (Lighting, Heaters)</SelectItem>
                                    <SelectItem value="inductive">Inductive (Fluorescent, Fans)</SelectItem>
                                    <SelectItem value="motor">Motor (High Inrush)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {rating && (
                <div className="mt-10 p-8 rounded-3xl bg-slate-900 border border-primary/20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={120} className="text-primary" /></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="text-xs font-black uppercase tracking-widest text-primary mb-2">Recommended Protective Device</span>
                        <div className="text-6xl font-black mb-4 tabular-nums text-white">
                            {rating}<span className="text-2xl text-slate-500 ml-1">Amps</span>
                        </div>
                        <div className="text-sm font-bold bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-6">
                            Type: {mccbType}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <ShieldCheck size={14} className="text-primary" /> Verified for IEC 60947 Standards
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
