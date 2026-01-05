'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Battery, Clock, InfoIcon, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  batteryCapacity: z.coerce.number().min(1),
  loadWatts: z.coerce.number().min(1),
  efficiency: z.coerce.number().min(0.1).max(1).default(0.9),
});

export default function EmergencyLightingRunTimeCalculator() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batteryCapacity: 100, // in Ah
      loadWatts: 200,
      efficiency: 0.9,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { batteryCapacity, loadWatts, efficiency } = values;
    // Assuming 12V system for AH to Wh conversion
    const totalWh = batteryCapacity * 12 * efficiency;
    const runtimeHours = totalWh / loadWatts;
    setResult(runtimeHours * 60); // convert to minutes
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
      title="Emergency Lighting Runtime"
      shortDescription="Calculate the backup duration for emergency lighting systems to ensure compliance with life safety codes and fire regulations."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Minutes</span>
            <span className="font-mono text-sm text-right">T = (Ah &middot; V &middot; &eta; / W) &middot; 60</span>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Emergency lighting must remain operational during power failures to allow for safe evacuation. Standards like **NFPA 101** dictate minimum durations for critical egress paths.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> The 90-Minute Rule</h4>
            <p className="text-sm opacity-80">Most jurisdictions require emergency lighting systems to provide a minimum of **90 minutes** of illumination upon loss of normal power.</p>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="batteryCapacity" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Battery Capacity (Ah @ 12V)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="loadWatts" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Emergency Load (W)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="efficiency" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Inverter Efficiency (0-1)</FormLabel>
                <FormControl><Input type="number" step="0.05" {...field} className="bg-background h-11 border-border font-mono" /></FormControl>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result !== null && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className={`relative p-8 md:p-12 rounded-[2.5rem] border-4 flex flex-col items-center text-center shadow-2xl overflow-hidden ${result < 90 ? 'bg-destructive/5 border-destructive/20 text-destructive' : 'bg-slate-900 border-primary/20 text-white'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Clock className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Backup Runtime</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums leading-none">{result.toFixed(0)}</span>
              <span className="text-2xl md:text-3xl font-bold opacity-60">MINUTES</span>
            </div>
            <div className={`px-10 py-3 rounded-full backdrop-blur-md shadow-inner border shadow-inner ${result < 90 ? 'bg-destructive/10 border-destructive/20' : 'bg-primary/20 border-primary/30 text-primary'}`}>
              <span className="text-2xl md:text-3xl font-black tabular-nums">{result >= 90 ? 'COMPLIANT' : 'NON-COMPLIANT'}</span>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
