'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

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
    <AdvancedCalculatorWrapper
      title="Fault Current Calculator"
      shortDescription="Calculate the available short-circuit current at a transformer's secondary terminals to determine required Equipment SCCR and AIC ratings."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Formula</span>
            <span className="font-mono text-sm text-right">I_sc = (kVA &middot; 1000) / (V &middot; &radic;3 &middot; Z)</span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-2">
            <p className="text-[10px] opacity-70 font-sans italic leading-tight">
              Where Z is the per-unit impedance.
            </p>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            The <strong>Available Fault Current</strong> (also known as Short Circuit Current) is the maximum amount of current that can flow through an electrical system during a fault condition (like a short circuit).
          </p>

          <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 my-8 shadow-sm">
            <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" /> Why SCCR Matters
            </h4>
            <p className="m-0 text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
              Every piece of electrical equipment has an <strong>SCCR (Short Circuit Current Rating)</strong>. If the available fault current exceeds this rating, the equipment may explode or cause catastrophic damage during a short circuit. Professional switchgear design ensures all components are rated above this calculated value.
            </p>
          </div>

          <h3 className="font-headline font-bold text-xl md:text-2xl mt-12 mb-6">Key Terms</h3>
          <div className="flex flex-col gap-6">
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Transformer kVA
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">The power rating of the supply transformer. Larger transformers can deliver higher currents during a fault.</p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Impedance (%Z)
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">The internal resistance of the transformer. Lower impedance results in higher available fault current.</p>
            </div>
          </div>
        </div>
      }
      faq={[
        { question: "What is AIC rating?", answer: "Ampere Interrupting Capacity (AIC) is the maximum fault current that a circuit breaker can safely interrupt without failing." },
        { question: "Does cable length affect this?", answer: "Yes, this calculator provides the 'worst-case' current at the transformer terminals. Real-world cable impedance will reduce the available fault current at downstream panels." }
      ]}
    >
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
              <span className="text-5xl md:text-7xl lg:text-2xl font-headline font-extrabold tracking-tighter tabular-nums drop-shadow-sm">{result.toFixed(0)}</span>
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
    </AdvancedCalculatorWrapper>
  );
}
