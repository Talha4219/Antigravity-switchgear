'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Server, Zap, ShieldCheck, Activity } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    power: z.coerce.number().min(0.1, "Power must be greater than 0"),
    powerType: z.enum(['kw', 'kva']),
    voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
    pf: z.coerce.number().min(0.1, "PF must be > 0").max(1, "PF cannot exceed 1"),
    phases: z.enum(['1', '3']),
});

export default function LoadCurrentAdvanced() {
    const [current, setCurrent] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            power: 100,
            powerType: 'kw',
            voltage: 400,
            pf: 0.85,
            phases: '3'
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { power, powerType, voltage, pf, phases } = values;

        let kva = powerType === 'kva' ? power : power / pf;
        let amps = 0;

        if (phases === '3') {
            amps = (kva * 1000) / (voltage * Math.sqrt(3));
        } else {
            amps = (kva * 1000) / voltage;
        }

        setCurrent(amps);
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Switchgear Load Current Calculator"
            shortDescription="The Load Current Calculator is designed to help engineers and electricians calculate the total current drawn by a load or electrical panel."
            formula={<code>I = P / (&radic;3 * V * PF)</code>}
            educationalContent={
                <div className="space-y-4">
                    <p>Proper load current calculation ensures correct cable sizing, protection device selection, and reliable operation of industrial and commercial switchgear panels.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><Activity size={18} className="text-primary" /> Why Accuracy Matters</h4>
                        <p className="text-sm">Underestimating load current leads to nuisance tripping and overheating, while overestimating adds unnecessary cost to cable and breaker selection.</p>
                    </div>
                    <p>This tool is essential for switchgear designers, electrical contractors, and maintenance engineers to ensure optimal system performance and avoid overloads.</p>
                </div>
            }
            faq={[
                { question: "kW vs kVA?", answer: "kW is 'Real Power' (work done), while kVA is 'Apparent Power' (total power supplied including reactive component)." },
                { question: "What is a typical Power Factor?", answer: "Industrial motors usually operate between 0.7 and 0.9. Improving this saves cost (see PFI tools)." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField control={form.control} name="power" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Load Power</FormLabel>
                            <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="powerType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="kw">Actual Power (kW)</SelectItem>
                                    <SelectItem value="kva">Apparent Power (kVA)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="voltage" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voltage (V)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="pf" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Power Factor (cos φ)</FormLabel>
                            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phases" render={({ field }) => (
                        <FormItem>
                            <FormLabel>System Phase</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Single Phase (1Φ)</SelectItem>
                                    <SelectItem value="3">Three Phase (3Φ)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {current !== null && (
                <div className="mt-10 p-10 rounded-3xl bg-slate-950 text-white relative overflow-hidden border border-white/10 shadow-3xl">
                    <div className="absolute top-0 right-0 p-10 opacity-5"><Server size={180} className="text-primary rotate-12" /></div>
                    <div className="relative z-10 text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary italic">Full Load Current</span>
                        <div className="text-7xl md:text-8xl font-black my-6 tabular-nums text-white drop-shadow-2xl">
                            {current.toFixed(1)} <span className="text-3xl font-bold opacity-30">Amps</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1.5 uppercase font-black text-[10px] tracking-widest bg-primary/5">
                                <ShieldCheck size={12} className="mr-2" /> Engineered for Precision
                            </Badge>
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
