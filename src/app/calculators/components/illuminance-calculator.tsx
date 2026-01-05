'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Lightbulb, InfoIcon, ShieldCheck, Sun } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  lumens: z.coerce.number().min(1),
  area: z.coerce.number().min(1),
  unit: z.enum(['lux', 'fc']),
});

export default function IlluminanceCalculator() {
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lumens: 10000,
      area: 50,
      unit: 'lux',
    },
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { lumens, area, unit } = values;
    let illuminance = lumens / area;
    if (unit === 'fc') {
      illuminance = illuminance / 10.764; // Approximation
    }
    setResult(illuminance);
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
      title="Illuminance Calculator"
      shortDescription="Calculate light levels for workspaces and industrial facilities to ensure compliance with occupational health and safety standards."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Illuminance (E)</span>
            <span className="font-mono text-sm text-right">E = &Phi; / A</span>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Proper lighting is essential for precision work and safety. <strong>Lux</strong> measures light per square meter, while <strong>Foot-candles</strong> measure light per square foot.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> Recommended Levels</h4>
            <p className="text-sm opacity-80">Offices generally require 300-500 Lux, while precision assembly lines may need up to 1000 Lux for optimal performance.</p>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6">
            <FormField control={form.control} name="lumens" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Source Lumens</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="area" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Illuminated Area (m&sup2; or ft&sup2;)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-11 border-border font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="unit" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Output Unit</FormLabel>
                <Select onValueChange={(val) => { field.onChange(val); }} defaultValue={field.value}>
                  <FormControl><SelectTrigger className="h-11 bg-background border-border"><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="lux">Lux (Metric)</SelectItem><SelectItem value="fc">Foot-candles (Imperial)</SelectItem></SelectContent>
                </Select>
              </FormItem>
            )} />
          </div>
        </form>
      </Form>

      {result !== null && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white/90">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sun className="h-40 w-40 text-primary" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-70 italic text-primary">Calculated Light Intensity</span>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4 mb-4">
              <span className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter tabular-nums text-white leading-none">{result.toFixed(1)}</span>
              <span className="text-2xl md:text-3xl font-bold text-slate-500 uppercase">{form.getValues('unit')}</span>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
