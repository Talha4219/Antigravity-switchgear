'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Server, InfoIcon, AlertTriangle, Zap, Network, ShieldCheck } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loadItemSchema = z.object({
  description: z.string().min(1, "Required"),
  power: z.coerce.number().min(0.1),
  pf: z.coerce.number().min(0.1).max(1).default(0.85),
  phase: z.enum(['1ph', '3ph']),
});

const formSchema = z.object({
  loads: z.array(loadItemSchema),
  voltage: z.coerce.number().min(1),
});

export default function LoadCalculator() {
  const [result, setResult] = useState<{ current: number, va: number, watts: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loads: [{ description: 'Main Industrial Motor', power: 75, pf: 0.85, phase: '3ph' }],
      voltage: 480,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "loads"
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { loads, voltage } = values;
    let totalWatts = 0;
    let totalVA = 0;

    loads.forEach((load) => {
      const itemKW = load.power;
      const itemKVA = itemKW / load.pf;
      totalWatts += itemKW * 1000;
      totalVA += itemKVA * 1000;
    });

    // We assume 3-phase for the main breaker calc if any load is 3-phase, or just use the voltage provided.
    // Standard industrial calc: I = VA / (V * 1.732)
    const totalCurrent = totalVA / (voltage * 1.732);
    setResult({ current: totalCurrent, va: totalVA, watts: totalWatts });
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
      title="Electrical Load Calculator"
      shortDescription="Aggregate multiple industrial and commercial branches to determine total system Amperage and Apparent Power (kVA) requirements."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Current (I)</span>
            <span className="font-mono text-sm text-right">I = VA / (V &middot; 1.732)</span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-2">
            <p className="text-[10px] opacity-70 font-sans italic leading-tight">
              Standard 3&phi; balanced system calculation.
            </p>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Accurate load calculation is the foundation of any switchgear project. It ensures that busbars, breakers, and transformers are neither undersized (causing failure) nor vastly oversized (wasting budget).
          </p>

          <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 my-8 shadow-sm">
            <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-3">
              <InfoIcon className="h-5 w-5" /> Watts vs. VA
            </h4>
            <p className="m-0 text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
              In AC systems, <strong>Watts</strong> (Real Power) is the energy doing work, while <strong>VA</strong> (Apparent Power) is the total power flowing through the wires. Equipment MUST be sized for VA.
            </p>
          </div>
        </div>
      }
      faq={[
        { question: "What is the 125% rule?", answer: "NEC requires continuous loads to be sized at 125% of their rating to prevent heat buildup in breakers." },
        { question: "How do I handle unbalanced loads?", answer: "This tool assumes a balanced 3-phase system. For significantly unbalanced phases, each phase must be calculated independently." }
      ]}
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="bg-secondary/20 p-8 rounded-3xl border border-border/50 shadow-inner">
            <FormField control={form.control} name="voltage" render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Main System Voltage (V)</FormLabel>
                <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); }} className="bg-background shadow-sm border-border h-12 text-lg font-mono font-bold" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> Connected Load Branches
            </h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-6 p-8 rounded-[2rem] bg-card border border-border relative group shadow-sm hover:shadow-md transition-all">
                <FormField control={form.control} name={`loads.${index}.description`} render={({ field }) => (
                  <FormItem className="xl:col-span-1">
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Description</FormLabel>
                    <FormControl><Input {...field} placeholder="e.g. Conveyor" className="bg-background h-11 border-border/60" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`loads.${index}.phase`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Phase</FormLabel>
                    <Select onValueChange={(val) => { field.onChange(val); }} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-11 bg-background border-border/60"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="1ph">Single Phase</SelectItem><SelectItem value="3ph">Three Phase</SelectItem></SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`loads.${index}.power`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Rating (kW)</FormLabel>
                    <FormControl><Input type="number" {...field} className="h-11 bg-background border-border/60 font-mono font-bold" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`loads.${index}.pf`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">PF</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} className="h-11 bg-background border-border/60 font-mono" /></FormControl>
                  </FormItem>
                )} />

                {fields.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-destructive/90" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" size="lg" className="w-full border-dashed border-2 hover:bg-primary/5 hover:border-primary/40 transition-all py-10 rounded-2xl flex flex-col gap-2" onClick={() => append({ description: '', power: 10, pf: 0.85, phase: '3ph' })}>
            <div className="bg-primary/10 p-3 rounded-xl">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <span className="font-headline font-bold text-lg">Integrate Additional Load</span>
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-16 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-950 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Network className="h-48 w-48 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.4em] mb-6 text-primary/80 italic font-headline">Aggregated System Demand</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-6 mb-6">
              <span className="text-6xl md:text-8xl lg:text-9xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{(result.va / 1000).toFixed(1)}</span>
              <span className="text-3xl md:text-4xl font-bold text-slate-500">kVA</span>
            </div>
            <div className="px-12 py-4 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <span className="text-2xl md:text-4xl font-black tabular-nums text-primary">{(result.watts / 1000).toFixed(1)} kW | {result.current.toFixed(1)} Amps</span>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-secondary/40 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] block mb-3">Effective System PF</span>
              <p className="font-mono text-3xl font-bold">{(result.watts / result.va).toFixed(2)}</p>
              <div className="mt-4 h-1 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(result.watts / result.va) * 100}%` }} />
              </div>
            </div>
            <div className="bg-secondary/40 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] block mb-2">Compliance Alert</span>
              {result.current > 1000 ? (
                <div className="flex items-center gap-3 text-amber-500">
                  <AlertTriangle className="h-6 w-6" />
                  <span className="font-bold text-lg leading-tight uppercase">High Current System</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-emerald-500">
                  <ShieldCheck className="h-6 w-6" />
                  <span className="font-bold text-lg leading-tight uppercase">Standard Load Profile</span>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">System demands above 1000A require specific NEC transformer and busbar considerations.</p>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
