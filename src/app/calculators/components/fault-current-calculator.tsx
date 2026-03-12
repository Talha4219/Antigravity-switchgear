'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

const formSchema = z.object({
  voltage: z.coerce.number().min(1, "Voltage must be greater than 0"),
  kVA: z.coerce.number().min(1, "kVA must be greater than 0"),
  impedance: z.coerce.number().min(0.1, "Impedance must be greater than 0"),
});

export default function FaultCurrentCalculator() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voltage: 480,
      kVA: 1500,
      impedance: 5.75,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { voltage, kVA, impedance } = values;
    if (voltage > 0 && kVA > 0 && impedance > 0) {
      const faultCurrent = (kVA * 1000) / (voltage * Math.sqrt(3)) / (impedance / 100);
      setResult(faultCurrent);
    } else {
      setResult(null);
    }
  };

  // Real-time calculation
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
            <FormField control={form.control} name="voltage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Secondary Voltage (V)</FormLabel>
                <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="kVA" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Transformer Rating (kVA)</FormLabel>
                <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="impedance" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Transformer Impedance (%Z)</FormLabel>
                <FormControl><Input type="number" step="0.1" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="pt-2">
            <p className="text-[10px] text-muted-foreground italic">* Values update automatically on modification.</p>
          </div>
        </form>
      </Form>

      {result !== null && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-primary/5 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-primary">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="h-40 w-40" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70">Available Fault Current</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums drop-shadow-sm">{result.toFixed(0)}</span>
              <span className="text-xl md:text-2xl font-bold opacity-60">Amps</span>
            </div>
            <div className="px-13 py-3 rounded-full bg-current bg-opacity-10 backdrop-blur-md shadow-inner border border-current/10">
              <span className="text-3xl md:text-4xl text-black font-black tabular-nums">S.C. KA: {(result / 1000).toFixed(2)}</span>
            </div>
          </div>

          <Alert className="bg-primary/5 text-primary border-primary/20 rounded-2xl py-6 px-8 shadow-sm">
            <InfoIcon className="h-6 w-6" />
            <div className="ml-4">
              <AlertTitle className="text-lg font-headline font-bold mb-1">Engineering Guidance</AlertTitle>
              <AlertDescription className="text-sm font-medium opacity-90 leading-relaxed">
                Choose the next standard AIC rating for your breakers (e.g., 65kA or 100kA) based on this worst-case scenario. For a more precise study that includes cable impedance, contact our switchgear design team.
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
}
