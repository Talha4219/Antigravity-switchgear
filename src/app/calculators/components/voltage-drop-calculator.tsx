'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, Calculator as CalcIcon, TrendingDown } from 'lucide-react';
import AdvancedCalculatorWrapper from './AdvancedCalculatorWrapper';

// NEC Chapter 9, Table 9 Constants (Simplified for common sizes)
// R = Resistance (Ohms/1000ft), X = Reactance (Ohms/1000ft)
const NEC_TABLE_9: Record<string, { rCopperSteel: number, xCopperSteel: number, rCopperPVC: number, xCopperPVC: number }> = {
  '14 AWG': { rCopperSteel: 3.1, xCopperSteel: 0.058, rCopperPVC: 3.1, xCopperPVC: 0.048 },
  '12 AWG': { rCopperSteel: 2.0, xCopperSteel: 0.054, rCopperPVC: 2.0, xCopperPVC: 0.045 },
  '10 AWG': { rCopperSteel: 1.2, xCopperSteel: 0.050, rCopperPVC: 1.2, xCopperPVC: 0.042 },
  '8 AWG': { rCopperSteel: 0.78, xCopperSteel: 0.052, rCopperPVC: 0.77, xCopperPVC: 0.043 },
  '6 AWG': { rCopperSteel: 0.49, xCopperSteel: 0.051, rCopperPVC: 0.49, xCopperPVC: 0.042 },
  '4 AWG': { rCopperSteel: 0.31, xCopperSteel: 0.048, rCopperPVC: 0.31, xCopperPVC: 0.040 },
  '3 AWG': { rCopperSteel: 0.25, xCopperSteel: 0.047, rCopperPVC: 0.25, xCopperPVC: 0.039 },
  '2 AWG': { rCopperSteel: 0.20, xCopperSteel: 0.045, rCopperPVC: 0.19, xCopperPVC: 0.038 },
  '1 AWG': { rCopperSteel: 0.16, xCopperSteel: 0.046, rCopperPVC: 0.15, xCopperPVC: 0.038 },
  '1/0 AWG': { rCopperSteel: 0.12, xCopperSteel: 0.044, rCopperPVC: 0.12, xCopperPVC: 0.037 },
  '2/0 AWG': { rCopperSteel: 0.10, xCopperSteel: 0.043, rCopperPVC: 0.097, xCopperPVC: 0.036 },
};

const formSchema = z.object({
  method: z.enum(['nec', 'estimated', 'other']),
  phase: z.enum(['dc', 'single-ac', 'three-ac']),
  voltage: z.coerce.number().min(1),
  load: z.coerce.number().min(0.1),
  distance: z.coerce.number().min(1),
  pf: z.coerce.number().min(0).max(1).default(0.85),
  wireSize: z.string().default('3 AWG'),
  conduit: z.enum(['steel', 'pvc']).default('steel'),
  manualR: z.coerce.number().optional(),
  manualX: z.coerce.number().optional(),
});

export default function VoltageDropCalculator() {
  const [result, setResult] = useState<{ drop: number, percentage: number, zValue?: number } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: 'nec',
      phase: 'single-ac',
      voltage: 120,
      load: 1,
      distance: 500,
      pf: 0.85,
      wireSize: '3 AWG',
      conduit: 'steel',
    },
  });

  const method = form.watch('method');

  function calculate(values: z.infer<typeof formSchema>) {
    const { phase, voltage, load, distance, pf, wireSize, conduit, manualR, manualX } = values;

    let r = 0;
    let x = 0;

    if (values.method === 'nec') {
      const data = NEC_TABLE_9[wireSize];
      if (!data) {
        setResult(null); // Clear result if wireSize is invalid for NEC method
        return;
      }
      r = conduit === 'steel' ? data.rCopperSteel : data.rCopperPVC;
      x = conduit === 'steel' ? data.xCopperSteel : data.xCopperPVC;
    } else if (values.method === 'estimated') {
      // Simplistic estimation for educational purposes
      r = 0.25;
      x = 0.04;
    } else {
      r = manualR || 0;
      x = manualX || 0;
    }

    // Effective Impedance Z for AC
    const phi = Math.acos(pf);
    const zValue = r * pf + x * Math.sin(phi);

    // Distance in 1000ft (Calculator uses meters for user input, convert to ft for NEC data)
    const distanceFeet = distance * 3.28084;
    const l1000 = distanceFeet / 1000;

    let vDrop = 0;
    if (phase === 'dc') {
      vDrop = 2 * load * r * l1000;
    } else if (phase === 'single-ac') {
      vDrop = 2 * load * zValue * l1000;
    } else {
      vDrop = Math.sqrt(3) * load * zValue * l1000;
    }

    const percentage = (vDrop / voltage) * 100;
    setResult({ drop: vDrop, percentage, zValue: values.method !== 'estimated' ? zValue : undefined });
  }

  // Real-time calculation on form changes
  const formValues = form.watch();

  // Explicitly calculate when values change
  useEffect(() => { // Changed useState to useEffect
    // Initial calculate trigger
    calculate(form.getValues()); // Calculate on initial mount
    const subscription = form.watch((value) => {
      calculate(value as z.infer<typeof formSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]); // Dependency array includes form.watch to re-subscribe if it changes (though it usually doesn't)

  return (
    <AdvancedCalculatorWrapper
      title="Voltage Drop Calculator"
      shortDescription="Calculate precise voltage drop using NEC Chapter 9, Table 9 data for and ensuring your electrical circuits remain within safe operating limits."
      formula={
        <div className="space-y-3">
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">1&phi; / DC</span>
            <span className="font-mono text-sm">V_drop = 2 &middot; I &middot; Z &middot; L</span>
          </div>
          <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
            <span className="text-xs font-bold uppercase tracking-tighter">3&phi; AC</span>
            <span className="font-mono text-sm">V_drop = &radic;3 &middot; I &middot; Z &middot; L</span>
          </div>
          <div className="pt-3 border-t border-white/10 mt-2">
            <p className="text-[10px] opacity-70 font-sans italic leading-tight">
              Z (Effective Impedance) = R &middot; cos(&phi;) + X &middot; sin(&phi;)
            </p>
          </div>
        </div>
      }
      educationalContent={
        <div className="space-y-6">
          <p>
            When electrical current moves through a wire, it is pushed by electrical potential (voltage) and it needs to surpass a certain level of contrary pressure caused by the wire. The <strong>voltage drop</strong> is the amount of electrical potential (voltage) loss caused by the contrary pressure.
          </p>

          <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 my-8 shadow-sm">
            <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-3">
              <InfoIcon className="h-5 w-5" /> Standard Safety Recommendations
            </h4>
            <p className="m-0 text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
              The National Electrical Code (NEC) suggests a maximum voltage drop of <strong>3%</strong> for branch circuits and <strong>5%</strong> for combined feeder and branch circuits for optimal performance. Excessive drop leads to motor failure and inefficient energy use.
            </p>
          </div>

          <h3 className="font-headline font-bold text-xl md:text-2xl mt-12 mb-6">Critical Factors Influencing Drop</h3>
          <div className="flex flex-col gap-6">
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Wire Material
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">Copper offers superior conductivity over aluminum, significantly reducing potential loss for identical wire gauges.</p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Cross Section
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">Increasing wire diameter reduces resistance. In AWG, a 3-gauge decrease doubles the cross-sectional area.</p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> System Length
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">Voltage drop accumulates linearly. Long runs to outbuildings or well pumps require careful diameter selection.</p>
            </div>
            <div className="space-y-2 p-5 rounded-xl bg-secondary/20 border border-border">
              <h5 className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Load Intensity
              </h5>
              <p className="text-sm opacity-80 leading-relaxed">As current (Amperage) increases, the potential loss follows Ohm's Law (V = IR) proportionally.</p>
            </div>
          </div>
        </div>
      }
      faq={[
        { question: "How does the conduit material affect calculation?", answer: "Ferromagnetic conduits like steel generate induction and eddy currents, increasing the reactance (X) of the circuit compared to PVC or Aluminum." },
        { question: "When should I use the 'Other/Manual' tab?", answer: "Use this when you have specific data from a wire manufacturer for unique cables like shielded VFD cables or high-voltage lines that differ from NEC Table 9." }
      ]}
    >
      <Tabs defaultValue="nec" onValueChange={(val) => {
        form.setValue('method', val as any);
        calculate(form.getValues());
      }}>
        <div className="relative mb-10 overflow-x-auto pb-2 scrollbar-hide w-full">
          <TabsList className="flex w-full min-w-[320px] bg-secondary/50 p-1">
            <TabsTrigger value="nec" className="flex-1 font-bold py-2.5">NEC Standards</TabsTrigger>
            <TabsTrigger value="estimated" className="flex-1 font-bold py-2.5">Quick Estimate</TabsTrigger>
            <TabsTrigger value="other" className="flex-1 font-bold py-2.5">Manual Entry</TabsTrigger>
          </TabsList>
        </div>

        <Form {...form}>
          <form className="space-y-8">
            <div className="flex flex-col gap-6">
              <FormField control={form.control} name="phase" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Circuit Phase</FormLabel>
                  <Select onValueChange={(val) => { field.onChange(val); calculate(form.getValues()); }} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="bg-background shadow-sm border-border/50 h-11"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="dc">Direct Current (DC)</SelectItem>
                      <SelectItem value="single-ac">AC Single Phase</SelectItem>
                      <SelectItem value="three-ac">AC Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />

              <FormField control={form.control} name="voltage" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Source Voltage (V)</FormLabel>
                  <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="load" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Load (Amps)</FormLabel>
                  <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="distance" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">One-way (Meters)</FormLabel>
                  <FormControl><Input type="number" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="wireSize" render={({ field }) => (
                <FormItem className={method !== 'nec' ? 'opacity-30 grayscale pointer-events-none' : ''}>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Wire Gauge (AWG)</FormLabel>
                  <Select onValueChange={(val) => { field.onChange(val); calculate(form.getValues()); }} defaultValue={field.value} disabled={method !== 'nec'}>
                    <FormControl><SelectTrigger className="bg-background shadow-sm border-border/50 h-11"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {Object.keys(NEC_TABLE_9).map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />

              <FormField control={form.control} name="conduit" render={({ field }) => (
                <FormItem className={method !== 'nec' ? 'opacity-30 grayscale pointer-events-none' : ''}>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Conduit Material</FormLabel>
                  <Select onValueChange={(val) => { field.onChange(val); calculate(form.getValues()); }} defaultValue={field.value} disabled={method !== 'nec'}>
                    <FormControl><SelectTrigger className="bg-background shadow-sm border-border/50 h-11"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="steel">Steel (Magnetic)</SelectItem>
                      <SelectItem value="pvc">PVC / AL (Non-Mag)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />

              <FormField control={form.control} name="pf" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Power Factor (0.1-1)</FormLabel>
                  <FormControl><Input type="number" step="0.05" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-background shadow-sm border-border/50 h-11" /></FormControl>
                </FormItem>
              )} />

              {method === 'other' && (
                <>
                  <FormField control={form.control} name="manualR" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider text-primary font-bold">Res. R (&Omega;/1k')</FormLabel>
                      <FormControl><Input type="number" step="0.001" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-primary/5 border-primary/20 h-11" /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="manualX" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-muted-foreground tracking-wider text-primary font-bold">React. X (&Omega;/1k')</FormLabel>
                      <FormControl><Input type="number" step="0.001" {...field} onChange={(e) => { field.onChange(e); calculate(form.getValues()); }} className="bg-primary/5 border-primary/20 h-11" /></FormControl>
                    </FormItem>
                  )} />
                </>
              )}
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-muted-foreground italic">* Values update automatically on modification.</p>
            </div>
          </form>
        </Form>
      </Tabs>

      {result && (
        <div className="mt-12 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative p-10 md:p-16 rounded-[3rem] bg-slate-950 border-4 border-primary/20 flex flex-col items-center text-center shadow-2xl overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingDown className="h-48 w-48 text-primary" />
            </div>

            <div className="relative w-full max-w-lg mb-12">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">Voltage Drop Severity</span>
                <span className="text-4xl md:text-6xl font-headline font-black tracking-tighter tabular-nums leading-none">
                  {result.percentage.toFixed(2)}<span className="text-xl md:text-2xl opacity-40 ml-1">%</span>
                </span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${result.percentage > 5 ? 'bg-destructive shadow-[0_0_20px_rgba(239,68,68,0.5)]' : result.percentage > 3 ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]' : 'bg-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]'}`}
                  style={{ width: `${Math.min(result.percentage * 10, 100)}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 px-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Minimal</span>
                <span className="text-[8px] font-bold text-primary/60 uppercase tracking-widest border-x border-white/10 px-4 italic">NEC 3-5% Standard</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Excessive</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-4xl font-headline font-black tracking-tighter leading-none">{result.drop.toFixed(2)}</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-slate-500 mt-2">Volts Lost</span>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div className={`px-8 py-3 rounded-full backdrop-blur-xl border ${result.percentage > 3 ? (result.percentage > 5 ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-orange-500/10 border-orange-500/20 text-orange-500') : 'bg-primary/10 border-primary/20 text-primary'}`}>
                <span className="text-xl md:text-2xl font-black tracking-tight leading-none">
                  {result.percentage <= 3 ? 'OPTIMAL' : result.percentage <= 5 ? 'CAUTION' : 'NON-COMPLIANT'}
                </span>
              </div>
            </div>
          </div>

          {result.percentage > 5 && (
            <Alert variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 rounded-2xl py-6 px-8 animate-pulse shadow-lg">
              <AlertTriangle className="h-6 w-6" />
              <div className="ml-4">
                <AlertTitle className="text-lg font-headline font-bold mb-1">Excessive Drop Detected</AlertTitle>
                <AlertDescription className="text-sm font-medium opacity-90 leading-relaxed">
                  Your configuration exceeds the NEC 5% recommendation (Total Feeder + Branch). Performance of industrial motors and precision electronics may be significantly degraded. Consider increasing wire size or choosing a nearer source.
                </AlertDescription>
              </div>
            </Alert>
          )}

          <div className="flex flex-col gap-4">
            <div className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 text-center transition-all hover:border-primary/30 group">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-2 group-hover:text-primary transition-colors">Eff. Impedance (Z)</span>
              <p className="font-mono text-lg font-bold">{result.zValue?.toFixed(4) || '---'} &Omega;</p>
            </div>
            <div className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 text-center transition-all hover:border-primary/30 group">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-2 group-hover:text-primary transition-colors">Compliance Status</span>
              <p className={`font-headline text-lg font-bold ${result.percentage <= 5 ? 'text-emerald-500' : 'text-destructive'}`}>
                {result.percentage <= 5 ? 'EXCELLENT' : 'CRITICAL'}
              </p>
            </div>
            <div className="bg-secondary/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 text-center transition-all hover:border-primary/30 group col-span-2 md:col-span-1">
              <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest block mb-1 group-hover:text-primary transition-colors font-sans italic">Data Reference</span>
              <p className="font-headline text-sm font-black uppercase opacity-80 pt-1">NEC Chapter 9</p>
              <p className="text-[10px] font-mono opacity-60">Table 9 (R/X)</p>
            </div>
          </div>
        </div>
      )}
    </AdvancedCalculatorWrapper>
  );
}
