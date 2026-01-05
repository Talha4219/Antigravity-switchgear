'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LayoutPanelLeft, PlusCircle, Trash2, InfoIcon, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const cableItemSchema = z.object({
  description: z.string().min(1, "Name required"),
  quantity: z.coerce.number().int().min(1),
  diameter: z.coerce.number().min(0.1),
});

const formSchema = z.object({
  cables: z.array(cableItemSchema),
  trayWidth: z.coerce.number().min(1),
  trayDepth: z.coerce.number().min(1),
});

export default function CableTrayFillCalculator() {
  const [result, setResult] = useState<{ totalArea: number, trayArea: number, percentage: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cables: [{ description: 'Main Feeder 4C x 240mm', quantity: 4, diameter: 50 }],
      trayWidth: 300,
      trayDepth: 100,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cables"
  });

  const calculate = (values: z.infer<typeof formSchema>) => {
    const { cables, trayWidth, trayDepth } = values;
    let totalCableArea = 0;

    cables.forEach((cable) => {
      const radius = cable.diameter / 2;
      const area = Math.PI * Math.pow(radius, 2) * cable.quantity;
      totalCableArea += area;
    });

    const trayArea = trayWidth * trayDepth;
    const percentage = (totalCableArea / trayArea) * 100;

    setResult({ totalArea: totalCableArea, trayArea, percentage });
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
      title="Cable Tray Fill Calculator"
      shortDescription="Optimize containment systems by calculating volumetric fill percentages according to NEC 392 standards for commercial and industrial cable management."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">Fill %</span>
            <span className="font-mono text-sm text-right">Fill = (&Sigma; Area_cable / Area_tray) &middot; 100</span>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            Proper cable tray management is critical for heat dissipation and fire safety. Overfilling a tray prevents airflow, causing cables to overheat and potentially degrade insulation over time.
          </p>
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> NEC 392.22</h4>
            <p className="text-sm opacity-80">For power cables, NEC generally suggests a maximum fill based on cross-sectional area, often limited to 40-50% for ventilated trays to ensure adequate cooling.</p>
          </div>
        </div>
      }
    >
      <Form {...form}>
        <form className="space-y-8">
          <div className="flex flex-col gap-6 bg-secondary/20 p-8 rounded-3xl border border-border/50 shadow-inner">
            <FormField control={form.control} name="trayWidth" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Tray Width (mm)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-12 text-lg font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="trayDepth" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Useful Depth (mm)</FormLabel>
                <FormControl><Input type="number" {...field} className="bg-background h-12 text-lg font-mono font-bold" /></FormControl>
              </FormItem>
            )} />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" /> Cable Inventory
            </h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-6 p-8 rounded-[2rem] bg-card border border-border relative group shadow-sm hover:shadow-md transition-all">
                <FormField control={form.control} name={`cables.${index}.description`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Description</FormLabel>
                    <FormControl><Input {...field} className="h-11 bg-background border-border/60" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`cables.${index}.quantity`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Qty</FormLabel>
                    <FormControl><Input type="number" {...field} className="h-11 bg-background border-border/60 font-mono" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name={`cables.${index}.diameter`} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-muted-foreground">Outer Dia (mm)</FormLabel>
                    <FormControl><Input type="number" {...field} className="h-11 bg-background border-border/60 font-mono font-bold" /></FormControl>
                  </FormItem>
                )} />

                {fields.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" size="lg" className="w-full border-dashed border-2 hover:bg-primary/5 transition-all py-10 rounded-2xl flex flex-col gap-2" onClick={() => append({ description: '', quantity: 1, diameter: 20 })}>
            <PlusCircle className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">Add Cable Specification</span>
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-16 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className={`relative p-10 md:p-16 rounded-[3rem] border-4 flex flex-col items-center text-center shadow-2xl overflow-hidden ${result.percentage > 50 ? 'bg-destructive/5 border-destructive/20 text-destructive' : 'bg-slate-950 border-primary/20 text-white'}`}>
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <LayoutPanelLeft className="h-48 w-48 text-primary" />
            </div>

            <div className="relative mb-10 group">
              {/* Circular Progress Ring */}
              <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90 transition-transform duration-1000 group-hover:scale-110">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-white/5 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className={`fill-none transition-all duration-1000 ${result.percentage > 50 ? 'stroke-destructive' : 'stroke-primary'}`}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}%`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - Math.min(result.percentage, 100) / 100)}%`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-6xl font-headline font-black tracking-tighter leading-none">{result.percentage.toFixed(1)}<span className="text-xl md:text-2xl opacity-60 ml-1">%</span></span>
                <span className="text-[10px] uppercase tracking-widest font-black opacity-40 mt-2">Volume Fill</span>
              </div>
            </div>

            <div className={`px-12 py-4 rounded-full backdrop-blur-xl border shadow-inner ${result.percentage > 50 ? 'bg-destructive/10 border-destructive/20' : 'bg-primary/10 border-primary/20 text-primary'}`}>
              <span className="text-2xl md:text-4xl font-black tabular-nums tracking-tight">
                {result.percentage <= 40 ? 'OPTIMAL' : result.percentage <= 50 ? 'CAUTION' : 'OVERFILLED'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-secondary/40 backdrop-blur-sm p-8 rounded-3xl border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-2">Total Cable Area</span>
              <p className="font-mono text-2xl font-bold">{Math.round(result.totalArea).toLocaleString()} mm&sup2;</p>
            </div>
            <div className="bg-secondary/40 backdrop-blur-sm p-8 rounded-3xl border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1">Available Tray Area</span>
              <p className="font-mono text-2xl font-bold">{result.trayArea.toLocaleString()} mm&sup2;</p>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
