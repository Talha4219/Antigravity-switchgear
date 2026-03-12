'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, ShieldCheck, Zap, Activity } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
    kva: z.coerce.number().min(1, "kVA must be greater than 0"),
    impedance: z.coerce.number().min(0.1, "Impedance must be greater than 0"),
    cableLength: z.coerce.number().min(0, "Length cannot be negative"),
});

export default function ShortCircuitAdvanced() {
    const [result, setResult] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voltage: 400,
            kva: 1000,
            impedance: 5,
            cableLength: 10,
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { voltage, kva, impedance, cableLength } = values;
        // Transformer fault current
        const baseFault = (kva * 1000) / (voltage * Math.sqrt(3)) / (impedance / 100);

        // Simple cable attenuation (estimation for estimation tool)
        // In a real study, this would involve complex impedance R + jX
        // For this tool, we assume a standard cable impedance contribution
        const cableFactor = 1 / (1 + (cableLength * 0.005));
        const finalFault = baseFault * cableFactor;

        setResult(finalFault);
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
                    <FormField control={form.control} name="voltage" render={({ field }) => (
                        <FormItem>
                            <FormLabel>System Voltage (V)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="kva" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Transformer kVA</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="impedance" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Impedance (%Z)</FormLabel>
                            <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="cableLength" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cable Length (m)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {result !== null && (
                <div className="mt-10 p-8 rounded-3xl bg-primary/5 border-2 border-primary/20 text-center">
                    <Zap className="mx-auto text-primary mb-2" size={32} />
                    <span className="text-sm font-bold uppercase tracking-widest opacity-60">Prospective Fault Current</span>
                    <div className="text-6xl font-black text-primary my-2 tabular-nums">{(result / 1000).toFixed(2)} kA</div>
                    <div className="text-xl font-bold opacity-80">({result.toFixed(0)} Amps)</div>
                </div>
            )}
        </>
    );
}
