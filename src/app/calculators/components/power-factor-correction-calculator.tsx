'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Gauge, InfoIcon, TrendingUp, Zap, TrendingDown } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  power: z.coerce.number().min(1, "Real power must be greater than 0"),
  currentPF: z.coerce.number().min(0.1).max(1),
  targetPF: z.coerce.number().min(0.1).max(1),
});

export default function PowerFactorCorrectionCalculator() {
  const [result, setResult] = useState<{ kVAR: number, currentKVA: number, targetKVA: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      power: 100,
      currentPF: 0.8,
      targetPF: 0.95,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { power, currentPF, targetPF } = values;

    if (currentPF >= targetPF) {
      const currentKVA = power / currentPF;
      setResult({ kVAR: 0, currentKVA, targetKVA: currentKVA });
      return;
    }

    const angle1 = Math.acos(currentPF);
    const angle2 = Math.acos(targetPF);
    const requiredKVAR = power * (Math.tan(angle1) - Math.tan(angle2));

    const currentKVA = power / currentPF;
    const targetKVA = power / targetPF;

    setResult({ kVAR: requiredKVAR, currentKVA, targetKVA });
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
      title="Power Factor Correction"
      shortDescription="Optimize your electrical system by calculating the precise capacitor bank rating (kVAR) needed to eliminate reactive power penalties and reduce system losses."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Capacitor kVAR</span>
            <span className="font-mono text-sm text-right">Q = P &middot; (tan &phi;1 - tan &phi;2)</span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-2">
            <p className="text-[10px] opacity-70 font-sans italic leading-tight">
              Where &phi;1 is the current angle and &phi;2 is the target angle.
            </p>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Power factor is the ratio between <strong>Real Power (kW)</strong> and <strong>Apparent Power (kVA)</strong>. A low power factor means your system is drawing more current than it actually uses to do work.
          </p>

          <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 my-8 shadow-sm">
            <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-3">
              <InfoIcon className="h-5 w-5" /> The Beer Analogy
            </h4>
            <p className="m-0 text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
              The liquid is the <strong>Real Power (kW)</strong>. The foam is the <strong>Reactive Power (kVAR)</strong>. The entire glass is the <strong>Apparent Power (kVA)</strong>.
            </p>
          </div>

          <h3 className="font-headline font-bold text-xl md:text-2xl mt-12 mb-6 text-foreground">Correction Benefits</h3>
          <div className="flex flex-col gap-6">
            <div className="p-5 rounded-2xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary mb-2 flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Save Utility Bills</h5>
              <p className="text-sm opacity-80">Stop paying reactive power surcharges that can inflate industrial bills by 10-15%.</p>
            </div>
            <div className="p-5 rounded-2xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary mb-2 flex items-center gap-2"><Zap className="h-4 w-4" /> Capacity Boost</h5>
              <p className="text-sm opacity-80">Free up room on transformers and conductors for new machinery without hardware upgrades.</p>
            </div>
          </div>
        </div>
      }
      faq={[
        { question: "Where should I install capacitors?", answer: "Usually at the main service entrance (Centralized) or directly at large motors (Decentralized)." },
        { question: "Can I over-correct?", answer: "Yes. Bringing the PF into a leading state (Capacitive) can cause resonance. Aiming for 0.95 is the sweet spot." }
      ]}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="power" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Real Power (kW)</FormLabel>
                <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="currentPF" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Present Power Factor</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="targetPF" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Target Power Factor</FormLabel>
                <FormControl><Input type="number" step="0.01" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="pt-2">
            <p className="text-[10px] text-muted-foreground italic">* kVAR requirement updates automatically as parameters change.</p>
          </div>
        </form>
      </Form>

      {result !== null && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingDown className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Required Capacitor Correction</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums drop-shadow-sm text-white">{result.kVAR.toFixed(1)}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-500">kVAR</span>
            </div>
            <div className="px-10 py-3 rounded-full bg-primary/20 backdrop-blur-md shadow-inner border border-primary/30">
              <span className="text-2xl md:text-3xl font-black tabular-nums text-primary">Bank Capacity: {Math.ceil(result.kVAR / 5) * 5} kVAR</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1">New Total kVA</span>
              <p className="font-mono text-lg font-bold text-emerald-500">{result.targetKVA.toFixed(1)} kVA</p>
            </div>
            <div className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1">Demand Reduction</span>
              <p className="font-mono text-lg font-bold text-emerald-500">{(((result.currentKVA - result.targetKVA) / result.currentKVA) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
