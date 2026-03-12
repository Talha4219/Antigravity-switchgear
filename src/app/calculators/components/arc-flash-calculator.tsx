'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCircle, ShieldAlert, Zap, ShieldCheck } from 'lucide-react';

const formSchema = z.object({
    faultCurrent: z.coerce.number().min(1, "Current must be greater than 0"),
    time: z.coerce.number().min(0.01, "Clearing time must be > 0"),
    distance: z.coerce.number().min(0.1, "Distance must be > 0"),
    voltage: z.coerce.number().min(1, "Voltage must be > 0"),
});

export default function ArcFlashCalculator() {
    const [energy, setEnergy] = useState<number | null>(null);
    const [category, setCategory] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            faultCurrent: 20,
            time: 0.1,
            distance: 18, // inches
            voltage: 480
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { faultCurrent, time, distance } = values;

        // Simplified empirical Lee formula for estimation
        // Energy = 5.271 * I_bf * t * (distance / 20)^-2 (very rough approximation for non-standard tool)
        // Professional tools use IEEE 1584. This is an EDUCATIONAL ESTIMATOR.
        const incidentEnergy = (5.271 * faultCurrent * time * Math.pow(distance / 18, -2));

        setEnergy(incidentEnergy);

        // NFPA 70E Categories
        if (incidentEnergy < 1.2) setCategory(0);
        else if (incidentEnergy < 4) setCategory(1);
        else if (incidentEnergy < 8) setCategory(2);
        else if (incidentEnergy < 25) setCategory(3);
        else if (incidentEnergy < 40) setCategory(4);
        else setCategory(5); // Danger
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
                    <FormField control={form.control} name="faultCurrent" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fault Current (kA)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="time" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clearing Time (sec)</FormLabel>
                            <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="distance" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Working Distance (inches)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {energy !== null && (
                <div className="mt-10 p-8 rounded-3xl bg-slate-900 text-white text-center border-t-8 border-red-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><ShieldAlert size={150} /></div>
                    <div className="relative z-10">
                        <span className="text-xs font-black uppercase tracking-widest text-red-500 mb-4 block">Incident Energy Result</span>
                        <div className="text-6xl font-black mb-2 tabular-nums">{energy.toFixed(2)}</div>
                        <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-8">cal / cm²</div>

                        <div className={`mx-auto w-fit px-8 py-4 rounded-2xl border-2 font-black text-xl uppercase tracking-tighter shadow-2xl ${category === 5 ? 'bg-red-600 border-red-400 text-white animate-pulse' : 'bg-orange-600 border-orange-400 text-white'}`}>
                            PPE Category: {category === 5 ? 'Extreme Hazard' : category}
                        </div>
                        <p className="mt-6 text-[10px] opacity-40 uppercase font-bold tracking-widest italic">
                            Refer to NFPA 70E Table 130.7(C)(15) for clothing specs
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
