'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Coins, Zap, Activity, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    power: z.coerce.number().min(0.1, "Power must be greater than 0"),
    hours: z.coerce.number().min(1, "Hours must be > 0").max(24, "Max 24h per day"),
    rate: z.coerce.number().min(0.01, "Rate must be > 0"),
    days: z.coerce.number().min(1, "Days must be > 0").max(366, "Max 366 days"),
});

export default function EnergyCostCalculator() {
    const [results, setResults] = useState<{ kwh: number, cost: number } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            power: 10,
            hours: 8,
            rate: 35,
            days: 30
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { power, hours, rate, days } = values;
        const kwh = power * hours * days;
        const cost = kwh * rate;
        setResults({ kwh, cost });
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Switchgear Energy Consumption Calculator"
            shortDescription="The Switchgear Energy Consumption Calculator provides a simple way to estimate electrical energy usage and costs for industrial and commercial switchgear panels."
            formula={<code>Cost = P * t * Rate</code>}
            educationalContent={
                <div className="space-y-4">
                    <p>By entering load power, operating hours, and electricity rate, the calculator outputs total energy consumed in kWh and the estimated operating cost.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><Coins size={18} className="text-primary" /> Financial Optimization</h4>
                        <p className="text-sm">This tool is especially useful for facility managers and engineers looking to plan power budgets and identify energy-intensive equipment.</p>
                    </div>
                    <p>It also helps in identifying energy-intensive equipment and improving overall system efficiency by quantifying potential savings from power factor correction or equipment upgrades.</p>
                </div>
            }
            faq={[
                { question: "Is this for Single Phase?", answer: "It works for both, as long as you input the total Real Power (kW)." },
                { question: "Does it include demand charges?", answer: "No, this calculates direct energy consumption cost. Utility bills may include additional fixed or peak-demand charges." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="power" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Load Power (kW)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="hours" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Operating Hours/Day</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="days" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration (Days)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="rate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit Rate (Currency/kWh)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {results && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-slate-900 text-white relative border border-white/10 group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform"><Zap size={80} className="text-primary" /></div>
                        <span className="text-xs font-black uppercase tracking-widest text-primary">Energy Consumption</span>
                        <div className="text-xl font-black my-2 tabular-nums">{results.kwh.toLocaleString()}</div>
                        <div className="text-sm font-bold opacity-50 uppercase tracking-tighter">Total kWh</div>
                    </div>
                    <div className="p-8 rounded-3xl bg-primary text-white relative shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-20"><Coins size={80} /></div>
                        <span className="text-xs font-black uppercase tracking-widest opacity-70">Estimated Total Cost</span>
                        <div className="text-sm font-bold opacity-70 uppercase tracking-tighter italic">Based on user rate</div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
