import React from 'react';
import { Zap, TrendingDown, Server, Network, Gauge, Ruler, LayoutPanelLeft, Sun, Clock, SunMedium, Battery } from "lucide-react";
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
    icon: React.ElementType;
    formula: React.ReactNode;
    component: React.ElementType;
    category: 'System Analysis' | 'Power Distribution' | 'Cabling & Containment' | 'Lighting & Safety' | 'Renewable Energy';
};

export const calculatorData: CalculatorInfo[] = [
    {
        slug: 'fault-current',
        title: 'Fault Current Calculator',
        description: <p>Calculates the symmetrical short-circuit fault current in a three-phase system based on the transformer's kVA rating, voltage, and impedance. This is crucial for selecting appropriately rated protective devices.</p>,
        icon: Zap,
        formula: <code>I_fault = (kVA * 1000) / (V * sqrt(3)) / (Z / 100)</code>,
        component: FaultCurrentCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'voltage-drop',
        title: 'Voltage Drop Calculator',
        description: <p>Engineered for electrical contractors and engineers, this tool uses NEC Chapter 9, Table 9 standards to calculate expected voltage drop. Includes adjustable power factors, conduit materials (Steel vs. PVC), and wiring configurations.</p>,
        icon: TrendingDown,
        formula: <code>VD = (PhaseMultiplier * Z * I * L) / 1000</code>,
        component: VoltageDropCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'load-calculator',
        title: 'Load Calculator',
        description: <p>Estimates the total electrical load and required current for a system by summing up individual loads. This is a fundamental step in designing and sizing an electrical system.</p>,
        icon: Server,
        formula: <code>Total Amps = Total VA / (V * Phase_Multiplier)</code>,
        component: LoadCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'transformer-sizing',
        title: 'Transformer Sizing Calculator',
        description: <p>Helps determine the appropriate kVA size for a transformer based on total load, voltage, and considerations for future expansion.</p>,
        icon: Network,
        formula: <code>kVA = (Load Amps * V * Phase_Multiplier) / 1000</code>,
        component: TransformerSizingCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'power-factor-correction',
        title: 'Power Factor Correction Calculator',
        description: <p>Calculates the required reactive power (kVAR) from a capacitor bank needed to improve a system's power factor from a current level to a target level.</p>,
        icon: Gauge,
        formula: <code>kVAR = kW * (tan(acos(PF_current)) - tan(acos(PF_target)))</code>,
        component: PowerFactorCorrectionCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'cable-size-calculator',
        title: 'Cable Size Calculator',
        description: <p>Estimates the required electrical cable size (in AWG) based on the load current, distance, and acceptable voltage drop, which is essential for safety and efficiency.</p>,
        icon: Ruler,
        formula: <code>CM = (Multiplier * K * I * L) / Max_VD</code>,
        component: CableSizeCalculator,
        category: 'Cabling & Containment',
    },
    {
        slug: 'cable-tray-fill',
        title: 'Cable Tray Fill Calculator',
        description: <p>Calculates the percentage of a cable tray's cross-sectional area that is occupied by cables, ensuring compliance with NEC (National Electrical Code) fill requirements.</p>,
        icon: LayoutPanelLeft,
        formula: <code>Fill % = (Total Cable Area / Max Fill Area) * 100</code>,
        component: CableTrayFillCalculator,
        category: 'Cabling & Containment',
    },
    {
        slug: 'illuminance-calculator',
        title: 'Illuminance Calculator',
        description: <p>Estimates the average illuminance level (in lux or foot-candles) for a space, based on total lumens of light sources, the area, and factors for utilization and light loss.</p>,
        icon: Sun,
        formula: <code>E = (Lumens * CU * LLF) / Area</code>,
        component: IlluminanceCalculator,
        category: 'Lighting & Safety',
    },
    {
        slug: 'emergency-lighting-run-time',
        title: 'Emergency Lighting Run Time',
        description: <p>Calculates how long an emergency lighting system can operate on its battery backup, based on battery capacity, voltage, and total power draw of the lights.</p>,
        icon: Clock,
        formula: <code>Run Time = (Ah * V) / (Load / Efficiency)</code>,
        component: EmergencyLightingRunTimeCalculator,
        category: 'Lighting & Safety',
    },
    {
        slug: 'solar-panel-output',
        title: 'Solar Panel Output Calculator',
        description: <p>Estimates the expected energy output (in kWh) of a solar panel system based on panel ratings, number of panels, peak sun hours, and system efficiency.</p>,
        icon: SunMedium,
        formula: <code>Energy = Total kW * Sun Hours * Perf. Ratio</code>,
        component: SolarPanelOutputCalculator,
        category: 'Renewable Energy',
    },
    {
        slug: 'solar-battery-sizing',
        title: 'Solar Battery Sizing Calculator',
        description: <p>Determines the required battery bank capacity (in kWh and Ah) for an off-grid or backup solar power system, considering daily energy use and desired autonomy.</p>,
        icon: Battery,
        formula: <code>kWh = (Daily Use * Autonomy) / DoD</code>,
        component: SolarBatterySizingCalculator,
        category: 'Renewable Energy',
    },
    {
        slug: 'volts-to-kw',
        title: 'Volts to kW Calculator',
        description: <p>Converts electrical voltage and current into real power (kW), supporting DC, single-phase AC, and three-phase AC systems. Essential for quick power estimation and equipment sizing.</p>,
        icon: Zap,
        formula: <code>kW = (V * I * PF * Multiplier) / 1000</code>,
        component: VoltsToKWCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'short-circuit-current',
        title: 'Switchgear Short-Circuit Current Calculator',
        description: <p>Accurately determine the prospective short-circuit current in any electrical distribution system. Critical for selecting protective devices and designing switchgear panels.</p>,
        icon: Zap,
        formula: <code>I<sub>sc</sub> = (kVA * 1000) / (V * &radic;3 * Z%)</code>,
        component: ShortCircuitAdvanced,
        category: 'System Analysis',
    },
    {
        slug: 'busbar-sizing',
        title: 'Busbar Size Calculator for Switchgear Panels',
        description: <p>Determine proper busbar dimensions for switchgear and MCC panels. Ensures optimal current-carrying capacity and prevents overheating.</p>,
        icon: Ruler,
        formula: <code>Area &propto; (I/k)<sup>1.6</sup></code>,
        component: BusbarSizingCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'cable-sizing-pro',
        title: 'Switchgear Cable Sizing Calculator',
        description: <p>Quickly determine the correct cable size for any switchgear installation to prevent overheating, voltage drop, and energy loss.</p>,
        icon: Ruler,
        formula: <code>Area = (2 * L * I * &rho;) / V<sub>drop</sub></code>,
        component: CableSizingExpert,
        category: 'Cabling & Containment',
    },
    {
        slug: 'breaker-selection',
        title: 'MCB & Circuit Breaker Selection Calculator for Switchgear',
        description: <p>Quickly determine the correct rating for MCB and MCCB devices. Recommended breaker sizes to prevent overcurrent and equipment damage.</p>,
        icon: Gauge,
        formula: <code>Rating &ge; I<sub>load</sub> * 1.25</code>,
        component: BreakerSelectionCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'voltage-drop-pro',
        title: 'Voltage Drop Calculator for Switchgear Systems',
        description: <p>Ensure that voltage levels remain within safe limits across switchgear systems and electrical panels to avoid equipment malfunction and energy loss.</p>,
        icon: TrendingDown,
        formula: <code>V<sub>drop</sub> = (2 * L * I * &rho;) / Area</code>,
        component: VoltageDropAdvanced,
        category: 'Power Distribution',
    },
    {
        slug: 'load-current-pro',
        title: 'Switchgear Load Current Calculator',
        description: <p>Calculate the total current drawn by a load or electrical panel for safe switchgear design and protection device selection.</p>,
        icon: Server,
        formula: <code>I = P / (&radic;3 * V * PF)</code>,
        component: LoadCurrentAdvanced,
        category: 'System Analysis',
    },
    {
        slug: 'motor-starter-pro',
        title: 'Motor Starter & MCCB Selection Calculator for Switchgear',
        description: <p>Simplify the process of choosing the correct motor starter and molded case circuit breaker for motors in switchgear panels.</p>,
        icon: LayoutPanelLeft,
        formula: <code>I<sub>rated</sub> &approx; kW / (V * &eta; * PF)</code>,
        component: MotorStarterCalculator,
        category: 'Power Distribution',
    },
    {
        slug: 'energy-consumption',
        title: 'Switchgear Energy Consumption Calculator',
        description: <p>Estimate electrical energy usage and costs for industrial and commercial switchgear panels based on power and rates.</p>,
        icon: Gauge,
        formula: <code>Cost = P * t * Rate</code>,
        component: EnergyCostCalculator,
        category: 'System Analysis',
    },
    {
        slug: 'transformer-sizing-pro',
        title: 'Switchgear Transformer Sizing Calculator',
        description: <p>Select the right transformer capacity for switchgear and distribution systems to prevent overloading and ensure reliable power.</p>,
        icon: Network,
        formula: <code>kVA<sub>rec</sub> &ge; (Load * DF) * (1 + Growth)</code>,
        component: TransformerSizingAdvanced,
        category: 'Power Distribution',
    },
    {
        slug: 'arc-flash-safety',
        title: 'Switchgear Arc Flash Calculator',
        description: <p>Critical tool for electrical safety compliance. Calculates incident energy and safe working distances for switchgear panels.</p>,
        icon: Zap,
        formula: <code>E = 4.184 * C<sub>f</sub> * E<sub>n</sub> * (t/0.2) * (20/d)<sup>2</sup></code>,
        component: ArcFlashCalculator,
        category: 'Lighting & Safety',
    },
]
