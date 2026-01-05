'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Ruler, ShieldCheck, Thermometer, Wind } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
    current: z.coerce.number().min(1, "Current must be greater than 0"),
    voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
    length: z.coerce.number().min(1, "Length must be greater than 0"),
    material: z.enum(['copper', 'aluminum']),
    installationMethod: z.enum(['tray', 'conduit', 'direct_buried', 'air']),
});

export default function CableSizingExpert() {
    const [size, setSize] = useState<string | null>(null);
    const [voltageDrop, setVoltageDrop] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current: 50,
            voltage: 400,
            length: 50,
            material: 'copper',
            installationMethod: 'tray',
        },
    });

    const calculate = (values: z.infer<typeof formSchema>) => {
        const { current, material, length, installationMethod, voltage } = values;

        // Constant k based on material and installation
        let resistivity = material === 'copper' ? 0.0172 : 0.0282; // ohm*mm2/m

        // Installation factor (simplified)
        const methodFactor = {
            'tray': 1.0,
            'conduit': 0.8,
            'direct_buried': 0.7,
            'air': 1.1
        }[installationMethod] || 1.0;

        // Required Area to keep VD < 3%
        const maxVD = voltage * 0.03;
        const requiredArea = (2 * length * current * resistivity) / maxVD;

        // Standard sizes array (mm2)
        const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
        const recommendedSize = standardSizes.find(s => s >= requiredArea / methodFactor) || standardSizes[standardSizes.length - 1];

        setSize(recommendedSize.toString());
        setVoltageDrop(((2 * length * current * resistivity) / recommendedSize));
    };

    useEffect(() => {
        calculate(form.getValues());
        const subscription = form.watch((v) => calculate(v as any));
        return () => subscription.unsubscribe();
    }, [form.watch]);

    return (
        <AdvancedCalculatorWrapper
            title="Switchgear Cable Sizing Calculator"
            shortDescription="Our Switchgear Cable Sizing Calculator helps electricians, engineers, and contractors quickly determine the correct cable size for any switchgear installation."
            formula={<span>Area = (2 &middot; L &middot; I &middot; &rho;) / V<sub>drop</sub></span>}
            educationalContent={
                <div className="space-y-4">
                    <p>Correct cable sizing is crucial to prevent overheating, voltage drop, and energy loss. By inputting load current, voltage, installation method, cable material, and length, this tool provides the minimum cross-section area required for safe operation.</p>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4">
                        <Wind size={24} className="text-primary mt-1" />
                        <div>
                            <h4 className="font-bold">Installation Factors</h4>
                            <p className="text-sm">Cables in conduits dissipate heat less effectively than cables on open trays, requiring larger sizes for the same current load.</p>
                        </div>
                    </div>
                    <p>Whether you are designing industrial distribution boards, electrical switchgear panels, or motor control centers, this calculator saves time, ensures compliance with electrical codes, and improves system reliability.</p>
                </div>
            }
            faq={[
                { question: "What is the max allowed voltage drop?", answer: "Typically 3% for lighting and 5% for power circuits per IEC 60364." },
                { question: "Does ambient temperature affect this?", answer: "Yes, extreme heat requires further derating of cable capacity." }
            ]}
        >
            <Form {...form}>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="current" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Load Current (Amps)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="length" render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-way Length (m)</FormLabel>
                            <FormControl><Input type="number" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="material" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cable Material</FormLabel>
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
                    <FormField control={form.control} name="installationMethod" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Installation Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="tray">Open Tray / Ladder</SelectItem>
                                    <SelectItem value="conduit">In Conduit / Trunking</SelectItem>
                                    <SelectItem value="direct_buried">Direct Buried</SelectItem>
                                    <SelectItem value="air">Free Air</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </form>
            </Form>

            {size && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-primary text-white text-center">
                        <span className="text-xs font-black uppercase tracking-widest opacity-70">Recommended Cable Size</span>
                        <div className="text-3xl font-black my-2">{size} mm²</div>
                        <div className="text-sm font-bold opacity-80 italic">Standard Core Area</div>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900 text-white text-center border border-white/10">
                        <span className="text-xs font-black uppercase tracking-widest opacity-50">Estimated Voltage Drop</span>
                        <div className="text-3xl font-black my-2 text-primary">{voltageDrop?.toFixed(2)}V</div>
                        <div className="text-sm font-bold opacity-50">({((voltageDrop || 0) / form.getValues('voltage') * 100).toFixed(1)}% of supply)</div>
                    </div>
                </div>
            )}
        </AdvancedCalculatorWrapper>
    );
}
