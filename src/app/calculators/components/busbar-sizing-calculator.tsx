'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, Thermometer, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    current: z.coerce.number().min(1, "Current must be greater than 0"),
    material: z.enum(['copper', 'aluminum']),
    tempRise: z.coerce.number().min(1, "Temperature rise must be greater than 0"),
});

export default function BusbarSizingCalculator() {
    const [suggestion, setSuggestion] = useState<{ width: number, thickness: number } | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current: 400,
            material: 'copper',
            tempRise: 30,
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { current, material, tempRise } = values;

        // Constant k based on material and temp rise
        const k = material === 'copper' ? 30.5 : 23.5;
        const tempFactor = Math.sqrt(tempRise / 30);
        const adjustedK = k * tempFactor;

        // Area = (I / k) ^ (1/0.61) - simplified engineering approximation
        const area = Math.pow(current / adjustedK, 1 / 0.61);

        // Suggest standard sizing (standard thicknesses are 5, 10, 15mm)
        let thickness = 5;
        if (current > 630) thickness = 10;
        const width = Math.ceil(area / thickness / 5) * 5; // Round up to nearest 5mm

        setSuggestion({ width, thickness });
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Busbar Size Calculator for Switchgear Panels"
            shortDescription="The Busbar Sizing Calculator is designed for professionals who need to determine the proper busbar dimensions for switchgear and MCC panels."
            formula={<code>Area &propto; (I/k)<sup>1.6</sup></code>}
            educationalContent={
                <div className="space-y-4">
                    <p>Selecting the correct busbar size ensures optimal current-carrying capacity, reduces power losses, and prevents overheating in electrical panels.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                            <h5 className="font-bold text-orange-700 mb-1">Copper (Cu)</h5>
                            <p className="text-xs text-orange-600">Higher conductivity, smaller footprint, best for high-density panels.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <h5 className="font-bold text-slate-700 mb-1">Aluminum (Al)</h5>
                            <p className="text-xs text-slate-600">Cost-effective, lighter weight, requires larger cross-section for same load.</p>
                        </div>
                    </div>
                    <p>Ideal for industrial switchgear design, electrical panel manufacturing, and high-current applications, this tool simplifies a complex engineering calculation while maintaining safety and efficiency standards.</p>
                </div>
            }
            faq={[
                { question: "What is standard temperature rise?", answer: "Industrial standard is typically 30°C or 50°C above ambient." },
                { question: "Why round to 5mm?", answer: "Most busbar manufacturers produce standard widths in 5mm or 10mm increments." }
            ]}
        >
            <Form {...form}>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold">
                        <FormField control={form.control} name="current" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Load Current (Amps)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="material" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Material</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select Material" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="copper">Copper (Cu)</SelectItem>
                                        <SelectItem value="aluminum">Aluminum (Al)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="tempRise" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Temp Rise (°C)</FormLabel>
                                <FormControl><Input type="number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </form>
            </Form>

            {suggestion && (
                <div className="mt-10 p-8 rounded-3xl bg-primary shadow-xl text-white relative overflow-hidden">
                    <Ruler className="absolute top-0 right-0 p-8 opacity-10" size={150} />
                    <div className="relative z-10">
                        <span className="text-xs font-black uppercase tracking-widest opacity-70 italic">Recommended Busbar Size</span>
                        <div className="text-5xl md:text-6xl font-black my-4 tabular-nums">
                            {suggestion.width} x {suggestion.thickness} <span className="text-2xl opacity-60">mm</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            <ShieldCheck size={16} /> IEC 61439 Recommended Minimum
                        </div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
