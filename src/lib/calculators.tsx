import React from 'react';
import { Zap, TrendingDown, Server, Network, Gauge, Ruler, LayoutPanelLeft, Sun, Clock, SunMedium, Battery, ShieldCheck, InfoIcon, ShieldAlert, TrendingUp, Lightbulb, Activity, Coins } from "lucide-react";
import FaultCurrentCalculator from "@/app/calculators/components/fault-current-calculator";
import VoltageDropCalculator from "@/app/calculators/components/voltage-drop-calculator";
import LoadCalculator from "@/app/calculators/components/load-calculator";
import TransformerSizingCalculator from "@/app/calculators/components/transformer-sizing-calculator";
import PowerFactorCorrectionCalculator from "@/app/calculators/components/power-factor-correction-calculator";
import CableSizeCalculator from "@/app/calculators/components/cable-size-calculator";
import CableTrayFillCalculator from "@/app/calculators/components/cable-tray-fill-calculator";
import IlluminanceCalculator from "@/app/calculators/components/illuminance-calculator";
import EmergencyLightingRunTimeCalculator from "@/app/calculators/components/emergency-lighting-calculator";
import SolarPanelOutputCalculator from "@/app/calculators/components/solar-panel-output-calculator";
import SolarBatterySizingCalculator from "@/app/calculators/components/solar-battery-sizing-calculator";
import VoltsToKWCalculator from "@/app/calculators/components/volts-to-kw-calculator";
import ShortCircuitAdvanced from "@/app/calculators/components/short-circuit-advanced";
import BusbarSizingCalculator from "@/app/calculators/components/busbar-sizing-calculator";
import CableSizingExpert from "@/app/calculators/components/cable-sizing-expert";
import BreakerSelectionCalculator from "@/app/calculators/components/breaker-selection-calculator";
import VoltageDropAdvanced from "@/app/calculators/components/voltage-drop-advanced-v2";
import LoadCurrentAdvanced from "@/app/calculators/components/load-current-advanced-v2";
import MotorStarterCalculator from "@/app/calculators/components/motor-starter-calculator";
import EnergyCostCalculator from "@/app/calculators/components/energy-cost-calculator";
import TransformerSizingAdvanced from "@/app/calculators/components/transformer-sizing-advanced";
import ArcFlashCalculator from "@/app/calculators/components/arc-flash-calculator";

export type CalculatorInfo = {
    slug: string;
    title: string;
    description: React.ReactNode;
    shortDescription?: string;
    icon: React.ElementType;
    formula: React.ReactNode;
    component: React.ElementType;
    seoTitle?: string;
    educationalContent?: React.ReactNode;
    faq?: { question: string, answer: string }[];
    category: 'System Analysis' | 'Power Distribution' | 'Cabling & Containment' | 'Lighting & Safety' | 'Renewable Energy';
    relatedProducts?: { slug: string, title: string, imageUrl?: string }[];
};

export const calculatorData: CalculatorInfo[] = [
    {
        slug: 'fault-current',
        title: 'Fault Current Calculator',
        shortDescription: "Calculate the available short-circuit current at a transformer's secondary terminals to determine required Equipment SCCR and AIC ratings.",
        description: <p>Calculates the symmetrical short-circuit fault current in a three-phase system based on the transformer's kVA rating, voltage, and impedance. This is crucial for selecting appropriately rated protective devices.</p>,
        icon: Zap,
        formula: (
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
        ),
        educationalContent: (
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
        ),
        faq: [
            { question: "What is AIC rating?", answer: "Ampere Interrupting Capacity (AIC) is the maximum fault current that a circuit breaker can safely interrupt without failing." },
            { question: "Does cable length affect this?", answer: "Yes, this calculator provides the 'worst-case' current at the transformer terminals. Real-world cable impedance will reduce the available fault current at downstream panels." }
        ],
        component: FaultCurrentCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'voltage-drop',
        title: 'Voltage Drop Calculator',
        seoTitle: 'Voltage Drop Calculator | EgSwitchGear',
        shortDescription: "Calculate precise voltage drop using NEC Chapter 9, Table 9 data for and ensuring your electrical circuits remain within safe operating limits.",
        description: <p>Engineered for electrical contractors and engineers, this tool uses NEC Chapter 9, Table 9 standards to calculate expected voltage drop. Includes adjustable power factors, conduit materials (Steel vs. PVC), and wiring configurations.</p>,
        icon: TrendingDown,
        formula: (
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
        ),
        educationalContent: (
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
        ),
        faq: [
            { question: "How does the conduit material affect calculation?", answer: "Ferromagnetic conduits like steel generate induction and eddy currents, increasing the reactance (X) of the circuit compared to PVC or Aluminum." },
            { question: "When should I use the 'Other/Manual' tab?", answer: "Use this when you have specific data from a wire manufacturer for unique cables like shielded VFD cables or high-voltage lines that differ from NEC Table 9." }
        ],
        component: VoltageDropCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'load-calculator',
        title: 'Electrical Load Calculator',
        shortDescription: "Aggregate multiple industrial and commercial branches to determine total system Amperage and Apparent Power (kVA) requirements.",
        description: <p>Comprehensive load analysis tool for switchgear sizing. Add multiple branch circuits, specify phase types and power factors, and calculate total system Amperage and kVA demand according to industrial standards.</p>,
        icon: Server,
        formula: (
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
        ),
        educationalContent: (
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
        ),
        faq: [
            { question: "What is the 125% rule?", answer: "NEC requires continuous loads to be sized at 125% of their rating to prevent heat buildup in breakers." },
            { question: "How do I handle unbalanced loads?", answer: "This tool assumes a balanced 3-phase system. For significantly unbalanced phases, each phase must be calculated independently." }
        ],
        component: LoadCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'transformer-sizing',
        title: 'Transformer Sizing Calculator',
        shortDescription: "Determine the optimal kVA rating for your electrical substation or distribution transformer, including safety margins and future growth factors.",
        description: <p>Helps determine the appropriate kVA size for a transformer based on total load, voltage, and considerations for future expansion.</p>,
        icon: Network,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Required kVA</span>
                    <span className="font-mono text-sm text-right">kVA = (V &middot; I &middot; &radic;3) / 1000</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Sizing a transformer correctly is vital for maintaining voltage stability and ensuring long-term reliability.
                </p>
                <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10 my-8 shadow-sm">
                    <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-3">
                        <ShieldAlert className="h-5 w-5" /> The 80% Loading Rule
                    </h4>
                    <p className="m-0 text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
                        Standard practice suggests sizing a transformer so that it operates at <strong>80% capacity</strong> under maximum load.
                    </p>
                </div>
            </div>
        ),
        component: TransformerSizingCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'power-factor-correction',
        title: 'Power Factor Correction Calculator',
        shortDescription: "Optimize your electrical system by calculating the precise capacitor bank rating (kVAR) needed to eliminate reactive power penalties and reduce system losses.",
        description: <p>Calculates the required reactive power (kVAR) from a capacitor bank needed to improve a system's power factor from a current level to a target level.</p>,
        icon: Gauge,
        formula: (
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
        ),
        educationalContent: (
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
        ),
        faq: [
            { question: "Where should I install capacitors?", answer: "Usually at the main service entrance (Centralized) or directly at large motors (Decentralized)." },
            { question: "Can I over-correct?", answer: "Yes. Bringing the PF into a leading state (Capacitive) can cause resonance. Aiming for 0.95 is the sweet spot." }
        ],
        component: PowerFactorCorrectionCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'cable-size-calculator',
        title: 'Cable Size Calculator',
        shortDescription: "Determine the required conductor gauge based on current carrying capacity and voltage drop limitations for industrial installations.",
        description: <p>Comprehensive <strong>electric cable capacity calculator</strong>, <strong>cable ratings calculator</strong>, and <strong>domestic cable size calculator</strong> for professional and residential use. Estimates required sizes based on load, distance, and voltage drop.</p>,
        icon: Ruler,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Circular Mils (CM)</span>
                    <span className="font-mono text-sm text-right">CM = (K &middot; I &middot; L &middot; Multi) / V_drop</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Correct cable sizing prevents overheating and ensures that voltage levels at the load remain within the operating specifications of the connected equipment.
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> NEC 310.15</h4>
                    <p className="text-sm opacity-80">This tool provides an estimation. Always cross-reference with NEC Table 310.15(B)(16) for specific insulation types (THHN, XHHW) and ambient temperature deratings.</p>
                </div>
            </div>
        ),
        component: CableSizeCalculator,
        category: 'Cabling & Containment',
    },
    {
        slug: 'cable-tray-fill',
        title: 'Cable Tray Fill Calculator',
        shortDescription: "Optimize containment systems by calculating volumetric fill percentages according to NEC 392 standards for commercial and industrial cable management.",
        description: <p>Calculates the percentage of a cable tray's cross-sectional area that is occupied by cables, ensuring compliance with NEC (National Electrical Code) fill requirements.</p>,
        icon: LayoutPanelLeft,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Fill %</span>
                    <span className="font-mono text-sm text-right">Fill = (&Sigma; Area_cable / Area_tray) &middot; 100</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Proper cable tray management is critical for heat dissipation and fire safety. Overfilling a tray prevents airflow, causing cables to overheat and potentially degrade insulation over time.
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> NEC 392.22</h4>
                    <p className="text-sm opacity-80">For power cables, NEC generally suggests a maximum fill based on cross-sectional area, often limited to 40-50% for ventilated trays to ensure adequate cooling.</p>
                </div>
            </div>
        ),
        component: CableTrayFillCalculator,
        category: 'Cabling & Containment',
    },
    {
        slug: 'illuminance-calculator',
        title: 'Illuminance Calculator',
        shortDescription: "Calculate light levels for workspaces and industrial facilities to ensure compliance with occupational health and safety standards.",
        description: <p>Estimates the average illuminance level (in lux or foot-candles) for a space, based on total lumens of light sources, the area, and factors for utilization and light loss.</p>,
        icon: Sun,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Illuminance (E)</span>
                    <span className="font-mono text-sm text-right">E = &Phi; / A</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Proper lighting is essential for precision work and safety. <strong>Lux</strong> measures light per square meter, while <strong>Foot-candles</strong> measure light per square foot.
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-3">
                        <Lightbulb className="h-4 w-4" /> Recommended Levels
                    </h4>
                    <p className="text-sm opacity-80">Offices generally require 300-500 Lux, while precision assembly lines may need up to 1000 Lux for optimal performance.</p>
                </div>
            </div>
        ),
        component: IlluminanceCalculator,
        category: 'Lighting & Safety',
    },
    {
        slug: 'emergency-lighting-run-time',
        title: 'Emergency Lighting Runtime',
        shortDescription: "Calculate the backup duration for emergency lighting systems to ensure compliance with life safety codes and fire regulations.",
        description: <p>Calculates the expected discharge time for an emergency lighting battery system based on battery capacity, total lamp wattage, and inverter efficiency.</p>,
        icon: Clock,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Minutes</span>
                    <span className="font-mono text-sm text-right">T = (Ah &middot; V &middot; &eta; / W) &middot; 60</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Emergency lighting must remain operational during power failures to allow for safe evacuation. Standards like **NFPA 101** dictate minimum durations for critical egress paths.
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> The 90-Minute Rule</h4>
                    <p className="text-sm opacity-80">Most jurisdictions require emergency lighting systems to provide a minimum of **90 minutes** of illumination upon loss of normal power.</p>
                </div>
            </div>
        ),
        component: EmergencyLightingRunTimeCalculator,
        category: 'Renewable Energy',
    },
    {
        slug: 'solar-panel-output',
        title: 'Solar Panel Energy Output',
        shortDescription: "Estimate the daily and monthly energy production (kWh) of your solar array based on local irradiance and system efficiencies.",
        description: <p>Estimates the power generation capacity of a solar photovoltaic (PV) system, considering panel wattage, quantity, average sunlight hours, and system losses.</p>,
        icon: SunMedium,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Energy (kWh)</span>
                    <span className="font-mono text-sm text-right">E = P_array &middot; H_sun &middot; (1 - L)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    The actual output of a solar system depends heavily on **Location** (Peak Sun Hours) and **System Losses** (inverter inefficiency, shading, and cable losses).
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><SunMedium className="h-4 w-4" /> Peak Sun Hours</h4>
                    <p className="text-sm opacity-80">This is not the total daylight duration, but the equivalent number of hours where solar irradiance is 1000W/m&sup2;. In Pakistan, this typically ranges from 4.5 to 6.5 hours.</p>
                </div>
            </div>
        ),
        component: SolarPanelOutputCalculator,
        category: 'Renewable Energy',
    },
    {
        slug: 'solar-battery-sizing',
        title: 'Solar Battery Bank Sizing',
        shortDescription: "Size your energy storage system to provide reliable power during cloudy days and nighttime, accounting for Depth of Discharge and autonomy requirements.",
        description: <p>Determines the required Ah (Amp-hour) capacity for a battery storage system based on daily energy consumption and desired days of autonomy.</p>,
        icon: Battery,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Capacity (Ah)</span>
                    <span className="font-mono text-sm text-right">Ah = (Wh_daily &middot; Days) / (V_sys &middot; DoD)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    The lifespan of a solar battery is directly linked to the **Depth of Discharge (DoD)**. Consistently draining a battery to 0% will rapidly degrade its capacity.
                </p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> Battery Chemistries</h4>
                    <p className="text-sm opacity-80">Lead-acid batteries are typically sized for 50% DoD, while advanced Lithium (LiFePO4) batteries safely support 80-90% DoD, allowing for a smaller backup bank.</p>
                </div>
            </div>
        ),
        component: SolarBatterySizingCalculator,
        category: 'Renewable Energy',
    },
    {
        slug: 'volts-to-kw',
        title: 'Volts to kW Calculator',
        shortDescription: "Convert electrical potential (Volts) and current (Amps) into real power (kiloWatts). Supports Direct Current (DC), Single-Phase AC, and Three-Phase AC systems.",
        description: <p>Converts electrical voltage and current into real power (kW), supporting DC, single-phase AC, and three-phase AC systems. Essential for quick power estimation and equipment sizing.</p>,
        icon: Zap,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">DC</span>
                    <span className="font-mono text-sm">kW = (V &middot; I) / 1000</span>
                </div>
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">1&phi; AC</span>
                    <span className="font-mono text-sm">kW = (V &middot; I &middot; PF) / 1000</span>
                </div>
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">3&phi; AC</span>
                    <span className="font-mono text-sm">kW = (V &middot; I &middot; PF &middot; &radic;3) / 1000</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-6">
                <p>
                    Understanding the relationship between Voltage, Current, and Power is fundamental to electrical engineering. This calculator determines the **Real Power (kW)**, which is the actual power used to perform work in a circuit.
                </p>

                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><InfoIcon className="h-4 w-4" /> Power Factor (PF)</h4>
                    <p className="text-sm opacity-80">
                        In AC systems, Power Factor is the ratio of real power to apparent power. A unity PF (1.0) means all power is being used effectively. Inductive loads like motors typically have a PF between 0.7 and 0.9.
                    </p>
                </div>
            </div>
        ),
        component: VoltsToKWCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'short-circuit-current',
        title: 'Switchgear Short-Circuit Current Calculator',
        seoTitle: 'Fault Current Calculator | EgSwitchGear',
        shortDescription: "Our Switchgear Short-Circuit Current Calculator helps engineers and electricians accurately determine the prospective short-circuit current in any electrical distribution system.",
        description: <p>Accurately determine the prospective short-circuit current in any electrical distribution system. Critical for selecting protective devices and designing switchgear panels.</p>,
        icon: Zap,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Fault Current</span>
                    <span className="font-mono text-sm text-right">I<sub>sc</sub> = (kVA &middot; 1000) / (V &middot; &radic;3 &middot; Z%)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Short-circuit currents are critical for selecting protective devices, designing switchgear panels, and ensuring the safety of industrial and commercial electrical installations.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><ShieldCheck size={18} /> Safety Compliance</h4>
                    <p className="text-sm">By inputting system voltage, transformer ratings, impedance, and cable lengths, this calculator instantly provides the expected fault current in kiloamperes (kA).</p>
                </div>
                <p>It’s an essential tool for switchgear designers, panel builders, and electrical safety engineers who need precise calculations to prevent equipment damage, reduce downtime, and comply with international electrical standards.</p>
            </div>
        ),
        component: ShortCircuitAdvanced,
        category: 'System Analysis',
    },
    {
        slug: 'busbar-sizing',
        title: 'Busbar Sizing Calculator',
        shortDescription: "The Busbar Sizing Calculator is designed for professionals who need to determine the proper busbar dimensions for switchgear and MCC panels.",
        description: <p>Professional <strong>busbar size calculator</strong> as per <strong>IEC 61439-1 & 2</strong> standards. Calculate the optimal <strong>copper busbar size for 6300A 415V switchgear</strong>, including temperature rise and current-carrying capacity for <strong>bus coupler panels</strong> and main busbar systems.</p>,
        icon: Ruler,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Formula</span>
                    <span className="font-mono text-sm text-right">Area &propto; (I/k)<sup>1.6</sup></span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Selecting the correct busbar size ensures optimal current-carrying capacity, reduces power losses, and prevents overheating in electrical panels.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/20">
                        <h5 className="font-bold text-orange-700 dark:text-orange-400 mb-1">Copper (Cu)</h5>
                        <p className="text-xs text-orange-600 dark:text-orange-300/80">Higher conductivity, smaller footprint, best for high-density panels.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/10 dark:border-slate-900/20">
                        <h5 className="font-bold text-slate-700 dark:text-slate-400 mb-1">Aluminum (Al)</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300/80">Cost-effective, lighter weight, requires larger cross-section for same load.</p>
                    </div>
                </div>
                <p>Ideal for industrial switchgear design, electrical panel manufacturing, and high-current applications, this tool simplifies a complex engineering calculation while maintaining safety and efficiency standards.</p>
            </div>
        ),
        component: BusbarSizingCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'cable-sizing-pro',
        title: 'Switchgear Cable Sizing Calculator',
        shortDescription: "Quickly determine the correct cable size for any switchgear installation to prevent overheating, voltage drop, and energy loss.",
        description: <p>Our Switchgear Cable Sizing Calculator helps electricians, engineers, and contractors quickly determine the correct cable size for any switchgear installation. Correct cable sizing is crucial to prevent overheating, voltage drop, and energy loss.</p>,
        icon: Ruler,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Area (mm²)</span>
                    <span className="font-mono text-sm text-right">A = (2 &middot; L &middot; I &middot; &rho;) / V<sub>drop</sub></span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>By inputting load current, voltage, installation method, cable material, and length, this tool provides the minimum cross-section area required for safe operation.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4">
                    <LayoutPanelLeft size={24} className="text-primary mt-1" />
                    <div>
                        <h4 className="font-bold">Installation Factors</h4>
                        <p className="text-sm">Cables in conduits dissipate heat less effectively than cables on open trays, requiring larger sizes for the same current load.</p>
                    </div>
                </div>
                <p>Whether you are designing industrial distribution boards, electrical switchgear panels, or motor control centers, this calculator saves time, ensures compliance with electrical codes, and improves system reliability.</p>
            </div>
        ),
        faq: [
            { question: "What is the max allowed voltage drop?", answer: "Typically 3% for lighting and 5% for power circuits per IEC 60364." },
            { question: "Does ambient temperature affect this?", answer: "Yes, extreme heat requires further derating of cable capacity." }
        ],
        component: CableSizingExpert,
        category: 'Cabling & Containment',
    },
    {
        slug: 'breaker-selection',
        title: 'MCB & Circuit Breaker Selection Calculator for Switchgear',
        seoTitle: 'Breaker Selection Tool | EgSwitchGear',
        shortDescription: "Selecting the right protective device is essential for safe and reliable switchgear operation. Our MCB & Circuit Breaker Selection Calculator allows engineers and designers to quickly determine the correct rating.",
        description: <p>Quickly determine the correct rating for MCB and MCCB devices. Recommended breaker sizes to prevent overcurrent and equipment damage. By inputting load current, system type, and motor starting characteristics, this calculator provides recommended breaker sizes to prevent overcurrent, short-circuits, and equipment damage.</p>,
        icon: Gauge,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Breaker Rating</span>
                    <span className="font-mono text-sm text-right">Rating &ge; I<sub>load</sub> &middot; 1.25</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>For motor loads, circuit breakers must accommodate high starting currents (often 6-8x rated current) without nuisance tripping. It’s an indispensable tool for switchgear panel manufacturers, electrical contractors, and maintenance teams looking to optimize panel protection and comply with industry standards.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><ShieldAlert size={18} className="text-primary" /> Protection Logic</h4>
                    <p className="text-sm">Circuit breakers are the primary defense in any electrical system. Sizing them correctly ensures that the breaker trips only during actual faults or overloads, not during normal starting events.</p>
                </div>
            </div>
        ),
        faq: [
            { question: "What is the difference between MCB and MCCB?", answer: "MCBs are typically used for lower current circuits (up to 63A-125A), while MCCBs handle higher currents up to 2500A and offer adjustable trip settings." },
            { question: "Why use a 1.25 safety factor?", answer: "The NEC requires breakers to be sized at 125% of the continuous load to prevent thermal fatigue of the tripping mechanism." }
        ],
        component: BreakerSelectionCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'voltage-drop-pro',
        title: 'Voltage Drop Calculator for Switchgear Systems',
        seoTitle: 'Voltage Drop Pro | EgSwitchGear',
        shortDescription: "The Voltage Drop Calculator allows engineers and electricians to ensure that voltage levels remain within safe limits across switchgear systems and electrical panels.",
        description: <p>Ensure that voltage levels remain within safe limits across switchgear systems and electrical panels to avoid equipment malfunction and energy loss. Excessive voltage drop can cause equipment malfunction, energy loss, and safety hazards.</p>,
        icon: TrendingDown,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Voltage Drop</span>
                    <span className="font-mono text-sm text-right">V<sub>drop</sub> = (2 &middot; L &middot; I &middot; &rho;) / Area</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Excessive voltage drop can cause equipment malfunction, energy loss, and safety hazards. This calculator estimates voltage drop based on cable length, load current, conductor size, and material.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><TrendingDown size={18} className="text-primary" /> Efficiency Impact</h4>
                    <p className="text-sm">High voltage drop leads to significant I&sup2;R power losses in cables, generating heat and increasing electricity bills.</p>
                </div>
                <p>Perfect for industrial switchgear, distribution panels, and long cable runs, it helps in proper cable selection, system design optimization, and compliance with electrical codes.</p>
            </div>
        ),
        faq: [
            { question: "What is a 'safe' limit?", answer: "Generally under 3% for critical power and lighting, and 5% for general purpose power." },
            { question: "Does material affect it?", answer: "Yes, Aluminum has ~60% the conductivity of Copper, resulting in higher voltage drop for the same size." }
        ],
        component: VoltageDropAdvanced,
        category: 'Power Distribution',
    },
    {
        slug: 'load-current-pro',
        title: 'Switchgear Load Current Calculator',
        shortDescription: "The Load Current Calculator is designed to help engineers and electricians calculate the total current drawn by a load or electrical panel.",
        description: <p>Calculate the total current drawn by a load or electrical panel for safe switchgear design and protection device selection. Proper load current calculation ensures correct cable sizing, protection device selection, and reliable operation of industrial and commercial switchgear panels.</p>,
        icon: Server,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Current (I)</span>
                    <span className="font-mono text-sm text-right">I = P / (&radic;3 &middot; V &middot; PF)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Proper load current calculation ensures correct cable sizing, protection device selection, and reliable operation of industrial and commercial switchgear panels.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><Activity size={18} className="text-primary" /> Why Accuracy Matters</h4>
                    <p className="text-sm">Underestimating load current leads to nuisance tripping and overheating, while overestimating adds unnecessary cost to cable and breaker selection.</p>
                </div>
                <p>This tool is essential for switchgear designers, electrical contractors, and maintenance engineers to ensure optimal system performance and avoid overloads.</p>
            </div>
        ),
        faq: [
            { question: "kW vs kVA?", answer: "kW is 'Real Power' (work done), while kVA is 'Apparent Power' (total power supplied including reactive component)." },
            { question: "What is a typical Power Factor?", answer: "Industrial motors usually operate between 0.7 and 0.9. Improving this saves cost (see PFI tools)." }
        ],
        component: LoadCurrentAdvanced,
        category: 'System Analysis',
    },
    {
        slug: 'motor-starter-pro',
        title: 'Motor Starter & MCCB Selection Calculator for Switchgear',
        seoTitle: 'Motor Starter Pro | EgSwitchGear',
        shortDescription: "Our Motor Starter & MCCB Selection Calculator simplifies the process of choosing the correct motor starter and molded case circuit breaker for motors in switchgear panels.",
        description: <p>Simplify the process of choosing the correct motor starter and molded case circuit breaker for motors in switchgear panels. This ensures motors are protected from overcurrent, short-circuits, and electrical faults while maintaining compliance with electrical standards.</p>,
        icon: LayoutPanelLeft,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Motor Amps</span>
                    <span className="font-mono text-sm text-right">I<sub>rated</sub> &approx; kW / (V &middot; &eta; &middot; PF)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>This ensures motors are protected from overcurrent, short-circuits, and electrical faults while maintaining compliance with electrical standards.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><LayoutPanelLeft size={18} className="text-primary" /> Starter Types</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                        <li><strong>DOL (Direct On Line):</strong> Simple, but high inrush current.</li>
                        <li><strong>Star-Delta:</strong> Reduces starting current to 1/3 of DOL.</li>
                        <li><strong>VFD:</strong> Full control over acceleration and speed.</li>
                    </ul>
                </div>
                <p>Ideal for industrial automation, motor control centers, and switchgear panel designers, this tool saves time, reduces errors, and enhances system safety.</p>
            </div>
        ),
        faq: [
            { question: "When to use Star-Delta?", answer: "Typically for motors above 5.5kW or 7.5kW to comply with utility starting current limits." },
            { question: "Why size MCCB higher than FLC?", answer: "To avoid nuisance tripping during the high current motor start-up phase." }
        ],
        component: MotorStarterCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'energy-consumption',
        title: 'Switchgear Energy Consumption Calculator',
        seoTitle: 'Energy Consumption Tool | EgSwitchGear',
        shortDescription: "The Switchgear Energy Consumption Calculator provides a simple way to estimate electrical energy usage and costs for industrial and commercial switchgear panels.",
        description: <p>Estimate electrical energy usage and costs for industrial and commercial switchgear panels based on power and rates. By entering load power, operating hours, and electricity rate, the calculator outputs total energy consumed in kWh and the estimated operating cost.</p>,
        icon: Gauge,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Energy Cost</span>
                    <span className="font-mono text-sm text-right">Cost = P &middot; t &middot; Rate</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>By entering load power, operating hours, and electricity rate, the calculator outputs total energy consumed in kWh and the estimated operating cost.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><Zap size={18} className="text-primary" /> Financial Optimization</h4>
                    <p className="text-sm">This tool is especially useful for facility managers and engineers looking to plan power budgets and identify energy-intensive equipment.</p>
                </div>
                <p>It also helps in identifying energy-intensive equipment and improving overall system efficiency by quantifying potential savings from power factor correction or equipment upgrades.</p>
            </div>
        ),
        faq: [
            { question: "Is this for Single Phase?", answer: "It works for both, as long as you input the total Real Power (kW)." },
            { question: "Does it include demand charges?", answer: "No, this calculates direct energy consumption cost. Utility bills may include additional fixed or peak-demand charges." }
        ],
        component: EnergyCostCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'transformer-sizing-pro',
        title: 'Switchgear Transformer Sizing Calculator',
        seoTitle: 'Transformer Sizing Pro | EgSwitchGear',
        shortDescription: "The Transformer Sizing Calculator is designed to help engineers select the right transformer capacity for their switchgear and distribution systems.",
        description: <p>Select the right transformer capacity for switchgear and distribution systems to prevent overloading and ensure reliable power. Accurate transformer sizing prevents overloading, reduces energy losses, and ensures reliable power distribution.</p>,
        icon: Network,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Sizing</span>
                    <span className="font-mono text-sm text-right">kVA<sub>rec</sub> &ge; (Load &middot; DF) &middot; (1 + Growth)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Accurate transformer sizing prevents overloading, reduces energy losses, and ensures reliable power distribution. It considers the total connected load and the diversity factor (simultaneity).</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><Activity size={18} className="text-primary" /> Diversity Factor</h4>
                    <p className="text-sm">In most systems, not all loads run at 100% capacity at the same time. The Diversity Factor accounts for this, preventing over-capitalization on oversized transformers.</p>
                </div>
                <p>This calculator is an essential tool for industrial switchgear design, enabling efficient planning and safe operation of electrical systems.</p>
            </div>
        ),
        faq: [
            { question: "What is a safe diversity factor?", answer: "Industrial plants usually range from 0.7 to 0.9 depending on the number of non-coincident loads." },
            { question: "How much expansion should I plan for?", answer: "Typical engineering practice suggests 20% to 30% for future-proofing industrial infrastructure." }
        ],
        component: TransformerSizingAdvanced,
        category: 'Power Distribution',
    },
    {
        slug: 'arc-flash-hazard',
        title: 'NFPA 70E Arc Flash Calculator',
        seoTitle: 'Arc Flash Hazard Tool | EgSwitchGear',
        shortDescription: "The Switchgear Arc Flash Calculator is a critical tool for electrical safety compliance. It calculates incident energy and recommended PPE.",
        description: <p>Comprehensive <strong>arc flash calculator</strong> and hazard assessment tool. Determine incident energy and safety boundaries as per NFPA 70E standards. Includes <strong>arc flash suit calculator</strong> and AIC rating analysis. Arc flash hazards are a major safety concern in switchgear panels, MCCs, and industrial electrical systems.</p>,
        icon: ShieldCheck,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Incident Energy</span>
                    <span className="font-mono text-sm text-right">E = 4.184 &middot; C<sub>f</sub> &middot; E<sub>n</sub> &middot; (t / 0.2) &middot; (20 / d)&sup2;</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Arc flash hazards are a major safety concern in switchgear panels, MCCs, and industrial electrical systems. This calculator helps determine safe working distances and PPE requirements.</p>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-red-700"><ShieldAlert size={18} /> High Risk Alert</h4>
                    <p className="text-sm text-red-600">Incident energy above 40 cal/cm&sup2; is considered "Dangerous" - no safe PPE exists to protect against the pressure blast at these levels.</p>
                </div>
                <p>This tool is designed for safety engineers, switchgear operators, and maintenance personnel, helping to prevent accidents and maintain a safe working environment.</p>
            </div>
        ),
        faq: [
            { question: "What is NFPA 70E?", answer: "The standard for electrical safety in the workplace, outlining requirements for PPE and safe work practices." },
            { question: "How to reduce arc flash?", answer: "Using faster clearing protective devices or arc-resistant switchgear designs minimizes the energy released." }
        ],
        component: ArcFlashCalculator,
        category: 'Lighting & Safety',
    },
    {
        slug: 'pfi-bank-sizing',
        title: 'PFI Plant Capacity & Capacitor Bank Calculator',
        shortDescription: "Optimize your system's power factor and reduce energy costs with precise switchgear rating calculations for power factor correction panels.",
        description: <p>Advanced <strong>capacitor bank calculator</strong> for <strong>PFI electrical</strong> systems. Optimize power factor and reduce energy costs with precise <strong>switchgear rating calculations</strong> for power factor correction panels. Proper PFI sizing reduces reactive power charges and improves transformer efficiency.</p>,
        icon: Gauge,
        formula: (
            <div className="space-y-3">
                <div className="flex justify-between items-center gap-4 text-primary-foreground/90">
                    <span className="text-xs font-bold uppercase tracking-tighter">Capacitor Rating</span>
                    <span className="font-mono text-sm text-right">kVAR = P<sub>kW</sub> &middot; (tan &phi;<sub>1</sub> - tan &phi;<sub>2</sub>)</span>
                </div>
            </div>
        ),
        educationalContent: (
            <div className="space-y-4">
                <p>Power Factor Improvement (PFI) is essential for industrial plants to avoid utility penalties and reduce heating in cables and transformers.</p>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-primary" /> System Benefits</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                        <li><strong>Reduced Billing:</strong> Eliminates low power factor surcharges.</li>
                        <li><strong>Voltage Stability:</strong> Reduces voltage drops under heavy load.</li>
                        <li><strong>Released Capacity:</strong> Allows existing transformers to handle more real power (kW).</li>
                    </ul>
                </div>
                <p>Our tool calculates the exact kVAR required to shift from your current power factor to your target (typically 0.95 or higher), ensuring your switchgear design is both cost-effective and technically sound.</p>
            </div>
        ),
        faq: [
            { question: "What is a good target PF?", answer: "Most utilities penalize below 0.90. A target of 0.95 to 0.98 is usually optimal." },
            { question: "Does PFI reduce real power (kW)?", answer: "No, it reduces Apparent Power (kVA) and Reactive Power (kVAR), which reduces the current drawn from the utility." }
        ],
        component: PowerFactorCorrectionCalculator,
        category: 'System Analysis',
    },
]
