'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Ruler, InfoIcon, ShieldCheck, Zap } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CABLE_TABLE: Record<string, number> = {
  '14 AWG': 4110,
  '12 AWG': 6530,
  '10 AWG': 10380,
  '8 AWG': 16510,
  '6 AWG': 26240,
  '4 AWG': 41740,
  '3 AWG': 52620,
  '2 AWG': 66360,
  '1 AWG': 83690,
  '1/0 AWG': 105600,
  '2/0 AWG': 133100,
  '3/0 AWG': 167800,
  '4/0 AWG': 211600,
  '250 kcmil': 250000,
  '300 kcmil': 300000,
  '350 kcmil': 350000,
  '400 kcmil': 400000,
  '500 kcmil': 500000,
};

const formSchema = z.object({
  load: z.coerce.number().min(1),
  voltage: z.coerce.number().min(1),
  phase: z.enum(['1ph', '3ph']),
  distance: z.coerce.number().min(1),
  voltageDrop: z.coerce.number().min(0.1).max(10).default(3),
});

export default function CableSizeCalculator() {
  const [result, setResult] = useState<{ size: string, circularMils: number, percentage: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      load: 100,
      voltage: 480,
      phase: '3ph',
      distance: 100,
      voltageDrop: 3,
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { load, voltage, phase, distance, voltageDrop } = values;

    // Simplistic CM calculation for educational purposes: CM = (2 * K * I * L) / V_drop
    // K for Copper = 12.9
    const k = 12.9;
    const l = distance * 3.28; // convert meters to feet
    const allowedDropV = (voltage * voltageDrop) / 100;
    const phaseMult = phase === '3ph' ? 1.732 : 2;

    const requiredCM = (phaseMult * k * load * l) / allowedDropV;

    let selectedSize = '500 kcmil';
    let selectedCM = 500000;

    const sizes = Object.entries(CABLE_TABLE).sort((a, b) => a[1] - b[1]);
    for (const [size, cm] of sizes) {
      if (cm >= requiredCM) {
        selectedSize = size;
        selectedCM = cm;
        break;
      }
    }

    setResult({ size: selectedSize, circularMils: selectedCM, percentage: voltageDrop });
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
      title="Cable Size Calculator"
      shortDescription="Determine the required conductor gauge based on current carrying capacity and voltage drop limitations for industrial installations."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Circular Mils (CM)</span>
            <span className="font-mono text-sm text-right">CM = (K &middot; I &middot; L &middot; Multi) / V_drop</span>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Correct cable sizing prevents overheating and ensures that voltage levels at the load remain within the operating specifications of the connected equipment.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> NEC 310.15</h4>
            <p className="text-sm opacity-80">This tool provides an estimation. Always cross-reference with NEC Table 310.15(B)(16) for specific insulation types (THHN, XHHW) and ambient temperature deratings.</p>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="load" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Load (Amps)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background shadow-sm border-border h-11" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="voltage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Voltage (V)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background shadow-sm border-border h-11" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="distance" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">One-way distance (M)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background shadow-sm border-border h-11" /></FormControl>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Ruler className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Required Cable Gauge</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{result.size}</span>
            </div>
            <div className="px-10 py-3 rounded-full bg-primary/20 backdrop-blur-md shadow-inner border border-primary/30">
              <span className="text-2xl md:text-3xl font-black tabular-nums text-primary">{result.circularMils.toLocaleString()} CM</span>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
