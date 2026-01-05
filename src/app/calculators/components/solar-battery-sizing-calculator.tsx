'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Battery, InfoIcon, ShieldCheck, Zap } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

const formSchema = z.object({
  dailyConsumption: z.coerce.number().min(1),
  autonomyDays: z.coerce.number().min(1).default(1),
  dod: z.coerce.number().min(0.1).max(1).default(0.5),
  systemVoltage: z.coerce.number().min(1).default(48),
});

export default function SolarBatterySizingCalculator() {
  const [result, setResult] = useState<{ totalWh: number, totalAh: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyConsumption: 10, // in kWh
      autonomyDays: 1,
      dod: 0.5,
      systemVoltage: 48,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { dailyConsumption, autonomyDays, dod, systemVoltage } = values;
    const totalConsumptionWh = dailyConsumption * 1000 * autonomyDays;
    const requiredWh = totalConsumptionWh / dod;
    const requiredAh = requiredWh / systemVoltage;
    setResult({ totalWh: requiredWh, totalAh: requiredAh });
  };

  useEffect(() => {
    calculate(form.getValues());
    const subscription = form.watch((value) => {
      calculate(value as z.infer<typeof formSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <AdvancedCalculatorWrapper
      title="Solar Battery Bank Sizing"
      shortDescription="Size your energy storage system to provide reliable power during cloudy days and nighttime, accounting for Depth of Discharge and autonomy requirements."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Capacity (Ah)</span>
            <span className="font-mono text-sm text-right">Ah = (Wh_daily &middot; Days) / (V_sys &middot; DoD)</span>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            The lifespan of a solar battery is directly linked to the **Depth of Discharge (DoD)**. Consistently draining a battery to 0% will rapidly degrade its capacity.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> Battery Chemistries</h4>
            <p className="text-sm opacity-80">Lead-acid batteries are typically sized for 50% DoD, while advanced Lithium (LiFePO4) batteries safely support 80-90% DoD, allowing for a smaller backup bank.</p>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="dailyConsumption" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Daily Use (kWh)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="autonomyDays" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Autonomy Days</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="dod" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Depth of Discharge (0-1)</FormLabel>
                <FormControl><Input type="number" step="0.05" {...field} className="bg-background h-11 border-border font-mono" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="systemVoltage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">System Voltage (V)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono" /></FormControl>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Battery className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Required Storage Capacity</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{Math.round(result.totalAh)}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-500 uppercase">Ah @ {form.getValues('systemVoltage')}V</span>
            </div>
            <div className="px-10 py-3 rounded-full bg-primary/20 backdrop-blur-md shadow-inner border border-primary/30">
              <span className="text-2xl md:text-4xl font-black tabular-nums text-primary">{(result.totalWh / 1000).toFixed(1)} kWh Total Bank</span>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
