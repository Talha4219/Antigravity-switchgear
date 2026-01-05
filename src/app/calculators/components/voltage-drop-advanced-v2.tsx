'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingDown, Activity, InfoIcon, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    current: z.coerce.number().min(1, "Current must be greater than 0"),
    length: z.coerce.number().min(1, "Length must be greater than 0"),
    area: z.coerce.number().min(1.5, "Size must be standard"),
    material: z.enum(['copper', 'aluminum']),
    voltage: z.coerce.number().min(110, "Voltage must be standard"),
});

export default function VoltageDropAdvanced() {
    const [result, setResult] = useState<{ drop: number, percent: number } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current: 50,
            length: 100,
            area: 16,
            material: 'copper',
            voltage: 400
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { current, length, area, material, voltage } = values;
        const resistivity = material === 'copper' ? 0.0178 : 0.0285;

        // V_drop = (2 * L * I * rho) / Area
        const drop = (2 * length * current * resistivity) / area;
        const percent = (drop / voltage) * 100;

        setResult({ drop, percent });
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Voltage Drop Calculator for Switchgear Systems"
            shortDescription="The Voltage Drop Calculator allows engineers and electricians to ensure that voltage levels remain within safe limits across switchgear systems and electrical panels."
            formula={<code>V<sub>drop</sub> = (2 * L * I * &rho;) / Area</code>}
            educationalContent={
                <div className="space-y-4">
                    <p>Excessive voltage drop can cause equipment malfunction, energy loss, and safety hazards. This calculator estimates voltage drop based on cable length, load current, conductor size, and material.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><TrendingDown size={18} className="text-primary" /> Efficiency Impact</h4>
                        <p className="text-sm">High voltage drop leads to significant $I^2R$ power losses in cables, generating heat and increasing electricity bills.</p>
                    </div>
                    <p>Perfect for industrial switchgear, distribution panels, and long cable runs, it helps in proper cable selection, system design optimization, and compliance with electrical codes.</p>
                </div>
            }
            faq={[
                { question: "What is a 'safe' limit?", answer: "Generally under 3% for critical power and lighting, and 5% for general purpose power." },
                { question: "Does material affect it?", answer: "Yes, Aluminum has ~60% the conductivity of Copper, resulting in higher voltage drop for the same size." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField control={form.control} name="current" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current (Amps)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="length" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Run Length (m)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="area" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conductor Size (mm²)</FormLabel>
                            <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="material" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Material</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="copper">Copper</SelectItem>
                                    <SelectItem value="aluminum">Aluminum</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {result && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                        <div className="relative z-10">
                            <span className="text-xs font-black uppercase tracking-widest text-primary">Voltage Drop</span>
                            <div className="text-3xl font-black my-2 tabular-nums">{result.drop.toFixed(2)}V</div>
                            <div className="text-sm font-bold opacity-50">Total Potential Loss</div>
                        </div>
                    </div>
                    <div className={`p-8 rounded-3xl border-4 transition-colors text-center ${result.percent > 3 ? 'border-red-500/30 bg-red-50' : 'border-primary/20 bg-primary/5'}`}>
                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Percentage Drop</span>
                        <div className={`text-3xl font-black my-2 tabular-nums ${result.percent > 3 ? 'text-red-600' : 'text-primary'}`}>{result.percent.toFixed(1)}%</div>
                        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-tight">
                            {result.percent > 3 ? '🚨 System Over Limit' : <><ShieldCheck size={14} /> System Efficient</>}
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
