'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, InfoIcon, Info, TrendingUp } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    systemType: z.enum(['dc', 'ac1', 'ac3']),
    voltage: z.coerce.number().min(0.1, "Voltage must be greater than 0"),
    current: z.coerce.number().min(0.1, "Current must be greater than 0"),
    powerFactor: z.coerce.number().min(0, "PF cannot be negative").max(1, "PF cannot exceed 1"),
});

export default function VoltsToKWCalculator() {
    const [result, setResult] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            systemType: 'ac3',
            voltage: 400,
            current: 10,
            powerFactor: 0.85,
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { systemType, voltage, current, powerFactor } = values;
        let kw = 0;

        if (systemType === 'dc') {
            kw = (voltage * current) / 1000;
        } else if (systemType === 'ac1') {
            kw = (voltage * current * powerFactor) / 1000;
        } else if (systemType === 'ac3') {
            kw = (voltage * current * powerFactor * Math.sqrt(3)) / 1000;
        }

        setResult(kw);
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((value) => {
            if (value.systemType && value.voltage && value.current) {
                calculate(value as z.infer<typeof formSchema>);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    const systemType = form.watch('systemType');

    return (
        <AdvancedCalculatorWrapper
            title="Volts to kW Calculator"
            shortDescription="Convert electrical potential (Volts) and current (Amps) into real power (kiloWatts). Supports Direct Current (DC), Single-Phase AC, and Three-Phase AC systems."
            formula={
                <div className="space-y-3">
                    <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                        <span className="text-xs font-bold uppercase tracking-tighter">DC</span>
                        <span className="font-mono text-sm">kW = (V &middot; I) / 1000</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                        <span className="text-xs font-bold uppercase tracking-tighter">1&phi; AC</span>
                        <span className="font-mono text-sm">kW = (V &middot; I &middot; PF) / 1000</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                        <span className="text-xs font-bold uppercase tracking-tighter">3&phi; AC</span>
                        <span className="font-mono text-sm">kW = (V &middot; I &middot; PF &middot; &radic;3) / 1000</span>
                    </div>
                </div>
            }
            educationalContent={
                <div className="space-y-6">
                    <p>
                        Understanding the relationship between Voltage, Current, and Power is fundamental to electrical engineering. This calculator determines the **Real Power (kW)**, which is the actual power used to perform work in a circuit.
                    </p>

                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> Power Factor (PF)</h4>
                        <p className="text-sm opacity-80">
                            In AC systems, Power Factor is the ratio of real power to apparent power. A unity PF (1.0) means all power is being used effectively. Inductive loads like motors typically have a PF between 0.7 and 0.9.
                        </p>
                    </div>

                    <h3 className="font-headline font-bold text-xl md:text-2xl mt-12 mb-6 text-foreground">Calculation Modes</h3>
                    <div className="flex flex-col gap-6">
                        <div className="p-5 rounded-2xl bg-secondary/20 border border-border">
                            <h5 className="font-bold text-primary mb-2 flex items-center gap-2">Direct Current (DC)</h5>
                            <p className="text-sm opacity-80">Simple V &times; I calculation. Common in battery systems, solar panels (string level), and electronic circuits.</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-secondary/20 border border-border">
                            <h5 className="font-bold text-primary mb-2 flex items-center gap-2">Three-Phase AC</h5>
                            <p className="text-sm opacity-80">Industrial standard. The &radic;3 (approx. 1.732) multiplier accounts for the phase displacement in balanced 3-phase systems.</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Form {...form}>
                <form className="space-y-8">
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="systemType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">System Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background h-12 text-lg font-medium border-border/60">
                                                <SelectValue placeholder="Select system type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="dc">Direct Current (DC)</SelectItem>
                                            <SelectItem value="ac1">AC Single Phase (1&phi;)</SelectItem>
                                            <SelectItem value="ac3">AC Three Phase (3&phi;)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="voltage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Voltage (Volts)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} className="bg-background h-12 text-lg font-mono font-bold" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="current"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Current (Amps)</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} className="bg-background h-12 text-lg font-mono font-bold" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {systemType !== 'dc' && (
                            <FormField
                                control={form.control}
                                name="powerFactor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Power Factor (0.0 - 1.0)</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" {...field} className="bg-background h-12 text-lg font-mono" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </form>
            </Form>

            {result !== null && (
                <div className="mt-16 space-y-8 animate-in fade-in zoom-in-95 duration-700">
                    <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-950 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Zap className="h-48 w-48 text-primary" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.4em] mb-6 text-primary/80 italic font-headline">Calculated Real Power</span>
                        <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-6 mb-6">
                            <span className="text-6xl md:text-8xl lg:text-9xl font-headline font-extrabold tracking-tighter tabular-nums leading-none">
                                {result < 10 ? result.toFixed(3) : result.toFixed(2)}
                            </span>
                            <span className="text-3xl md:text-4xl font-bold opacity-60">kW</span>
                        </div>
                        <div className="px-12 py-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl shadow-inner">
                            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-300">
                                {(result * 1000).toLocaleString()} Watts
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
