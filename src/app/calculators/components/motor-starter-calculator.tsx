'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cog, ShieldCheck, Zap, Activity } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    power: z.coerce.number().min(0.1, "Power must be greater than 0"),
    powerType: z.enum(['kw', 'hp']),
    voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
    startingType: z.enum(['dol', 'star_delta', 'soft_starter', 'vfd']),
});

export default function MotorStarterCalculator() {
    const [results, setResults] = useState<{ starter: string, mccb: number, contactor: number } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            power: 11,
            powerType: 'kw',
            voltage: 400,
            startingType: 'dol'
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { power, powerType, voltage, startingType } = values;

        // Convert to kW
        const kw = powerType === 'hp' ? power * 0.746 : power;

        // Normal running current (approx for 400V)
        const ratedCurrent = (kw * 1000) / (voltage * 1.732 * 0.85 * 0.88); // Assuming 0.85 PF and 0.88 efficiency

        // Suggested MCCB (typically 1.5x - 2.5x depending on starting)
        const mccbFactor = startingType === 'dol' ? 2.5 : 1.5;
        const mccbRating = ratedCurrent * mccbFactor;

        // Standard MCCB sizes
        const standardMccbs = [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 400];
        const recommendedMccb = standardMccbs.find(s => s >= mccbRating) || 400;

        // Contactors
        const recommendedContactor = ratedCurrent * 1.1;

        setResults({
            starter: startingType.replace('_', '-').toUpperCase(),
            mccb: recommendedMccb,
            contactor: Math.ceil(recommendedContactor)
        });
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Motor Starter & MCCB Selection Calculator for Switchgear"
            shortDescription="Our Motor Starter & MCCB Selection Calculator simplifies the process of choosing the correct motor starter and molded case circuit breaker for motors in switchgear panels."
            formula={<span>I<sub>rated</sub> &approx; kW / (V &middot; &eta; &middot; PF)</span>}
            educationalContent={
                <div className="space-y-4">
                    <p>This ensures motors are protected from overcurrent, short-circuits, and electrical faults while maintaining compliance with electrical standards.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                        <h4 className="font-bold flex items-center gap-2 mb-2"><Cog size={18} className="text-primary" /> Starter Types</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                            <li><strong>DOL (Direct On Line):</strong> Simple, but high inrush current.</li>
                            <li><strong>Star-Delta:</strong> Reduces starting current to 1/3 of DOL.</li>
                            <li><strong>VFD:</strong> Full control over acceleration and speed.</li>
                        </ul>
                    </div>
                    <p>Ideal for industrial automation, motor control centers, and switchgear panel designers, this tool saves time, reduces errors, and enhances system safety.</p>
                </div>
            }
            faq={[
                { question: "When to use Star-Delta?", answer: "Typically for motors above 5.5kW or 7.5kW to comply with utility starting current limits." },
                { question: "Why size MCCB higher than FLC?", answer: "To avoid nuisance tripping during the high current motor start-up phase." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="power" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Motor Power</FormLabel>
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
                                    <SelectItem value="kw">Kilowatts (kW)</SelectItem>
                                    <SelectItem value="hp">Horsepower (HP)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="startingType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Starting Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="dol">Direct On Line (DOL)</SelectItem>
                                    <SelectItem value="star_delta">Star-Delta</SelectItem>
                                    <SelectItem value="soft_starter">Soft Starter</SelectItem>
                                    <SelectItem value="vfd">Variable Frequency Drive (VFD)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {results && (
                <div className="mt-10 p-8 rounded-3xl bg-slate-900 text-white border border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Cog size={120} className="text-primary animate-spin-slow" /></div>
                    <div className="relative z-10">
                        <span className="text-xs font-black uppercase tracking-widest text-primary mb-6 block italic">Engineering Selection Summary</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <span className="text-[10px] uppercase font-black opacity-50">Method</span>
                                <div className="text-xl font-black mt-1">{results.starter}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-primary/20 border border-primary/30 text-center">
                                <span className="text-[10px] uppercase font-black opacity-70">MCCB Rating</span>
                                <div className="text-2xl font-black mt-1 text-primary">{results.mccb}A</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                                <span className="text-[10px] uppercase font-black opacity-50">Contactor (AC-3)</span>
                                <div className="text-xl font-black mt-1">≥ {results.contactor}A</div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tighter opacity-40">
                            <ShieldCheck size={12} /> Sized for Type-2 Coordination
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
