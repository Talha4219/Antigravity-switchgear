'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SunMedium, InfoIcon, Zap, TrendingUp } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
  panelWattage: z.coerce.number().min(1),
  panelCount: z.coerce.number().min(1),
  sunHours: z.coerce.number().min(0.1),
  systemLoss: z.coerce.number().min(0).max(1).default(0.15),
});

export default function SolarPanelOutputCalculator() {
  const [result, setResult] = useState<{ daily: number, monthly: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panelWattage: 450,
      panelCount: 10,
      sunHours: 5.5,
      systemLoss: 0.15,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { panelWattage, panelCount, sunHours, systemLoss } = values;
    const peakWatts = panelWattage * panelCount;
    const dailyOutput = (peakWatts * sunHours * (1 - systemLoss)) / 1000; // kWh
    setResult({ daily: dailyOutput, monthly: dailyOutput * 30 });
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
            <FormField control={form.control} name="panelWattage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Panel Wattage (W)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="panelCount" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Panels</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="sunHours" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Avg. Sun Hours/Day</FormLabel>
                <FormControl><Input type="number" step="0.1" {...field} className="bg-background h-11 border-border font-mono" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="systemLoss" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">System Loss Margin (%)</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} className="bg-background h-11 border-border font-mono" /></FormControl>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <SunMedium className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Daily Energy Yield</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{result.daily.toFixed(1)}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-500 uppercase">kWh/Day</span>
            </div>
            <div className="px-10 py-3 rounded-full bg-primary/20 backdrop-blur-md shadow-inner border border-primary/30">
              <span className="text-3xl md:text-4xl font-black tabular-nums text-primary">{result.monthly.toFixed(0)} kWh Monthly</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
