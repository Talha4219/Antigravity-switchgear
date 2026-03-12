'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Network, InfoIcon, ShieldAlert, Cpu, Server } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  load: z.coerce.number().min(1, "Load must be greater than 0"),
  voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
  phase: z.enum(['1ph', '3ph']),
  futureGrowth: z.coerce.number().min(0).max(100).default(20),
});

const standardKVASizes = [15, 30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500];

export default function TransformerSizingCalculator() {
  const [result, setResult] = useState<{ requiredKVA: number, recommendedKVA: number, current: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      load: 100,
      voltage: 480,
      phase: '3ph',
      futureGrowth: 20,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { load, voltage, phase, futureGrowth } = values;
    if (load > 0 && voltage > 0) {
      const phaseMultiplier = phase === '3ph' ? Math.sqrt(3) : 1;
      const baseKVA = (load * voltage * phaseMultiplier) / 1000;
      const totalKVA = baseKVA * (1 + futureGrowth / 100);

      const recommendedKVA = standardKVASizes.find(size => size >= totalKVA) || standardKVASizes[standardKVASizes.length - 1];
      setResult({ requiredKVA: totalKVA, recommendedKVA: recommendedKVA, current: load });
    } else {
      setResult(null);
    }
  };

  useEffect(() => {
    calculate(form.getValues());
    const subscription = form.watch((value) => {
      calculate(value as z.infer<typeof formSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="load" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Total Load Current (A)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background shadow-sm border-border h-11" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="voltage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">System Voltage (V)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background shadow-sm border-border h-11" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="phase" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Configuration</FormLabel>
                <Select onValueChange={(val) => { field.onChange(val); }} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="bg-background h-11 border-border"><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="1ph">Single Phase</SelectItem><SelectItem value="3ph">Three Phase</SelectItem></SelectContent>
                </Select>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Server className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Required Transformer Rating</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{result.requiredKVA.toFixed(1)}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-500">kVA</span>
            </div>
            <div className="px-10 py-3 rounded-full bg-primary/20 backdrop-blur-md shadow-inner border border-primary/30">
              <span className="text-2xl md:text-3xl font-black tabular-nums text-primary">Next Size: {result.recommendedKVA} kVA</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
