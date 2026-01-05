export interface IndustryData {
    slug: string;
    title: string;
    shortDescription: string;
    keywords: string[];
    heroImage: string;
    overview: string;
    challenges: string[];
    solutions: string[];
    recommendedProducts: { title: string; slug: string }[];
}

export const industries: Record<string, IndustryData> = {
    'factories-manufacturing': {
        slug: 'factories-manufacturing',
        title: 'Switchgear for Factories & Manufacturing Plants',
        shortDescription: 'Robust, high-capacity power distribution systems designed for the continuous demands of industrial manufacturing.',
        keywords: ['Industrial Switchgear Pakistan', 'Factory Electrical Distribution', 'Manufacturing Power Solutions', 'Heavy Duty Electrical Panels', 'EgSwitchgear Industry'],
        heroImage: '/images/industries/factory-hero.jpg',
        overview: `
      <p><strong>Manufacturing plants</strong> are the heartbeat of the economy, and they cannot afford a single second of downtime. At <strong>EgSwitchGear</strong>, we understand that industrial power systems must be more than just functional; they must be <strong>invincible</strong>.</p>
      <p>Our industrial switchgear solutions are engineered to withstand harsh environments, heavy motor loads, and continuous 24/7 operation. From main incoming power to final sub-circuits, we provide a complete electrical infrastructure that guarantees safety and efficiency for textile mills, steel plants, pharmaceutical units, and automotive factories across Pakistan.</p>
    `,
        challenges: [
            'Voltage Fluctuations: Protecting sensitive machinery from grid instability.',
            'Heavy Start-up Loads: Managing high inrush currents from large motors.',
            'Harmonic Distortion: Mitigating noise from VFDs and automation equipment.',
            'Harsh Environments: Resisting dust, heat, and vibration common in factory floors.'
        ],
        solutions: [
            'Heavy-Duty MCC Panels: Modular Motor Control Centers with Type-2 coordination.',
            'PFI Plants with Detuned Reactors: To correct power factor while blocking harmonics.',
            'High Icu Main Boards: 100kA+ short circuit rated ACBs for maximum safety.',
            'IP54/IP65 Enclosures: Dust and water-resistant designs for greater longevity.'
        ],
        recommendedProducts: [
            { title: 'LT Panels', slug: 'lt-panels' },
            { title: 'MCC Panels', slug: 'mcc-panels' },
            { title: 'PFI Plant', slug: 'pfi-plant' },
            { title: 'Bus Way System', slug: 'bus-way-system' }
        ]
    },
    'commercial-buildings': {
        slug: 'commercial-buildings',
        title: 'Electrical Panels for Commercial Buildings',
        shortDescription: 'Efficient, space-saving, and aesthetic power solutions for high-rise buildings, malls, and corporate offices.',
        keywords: ['Commercial Building Switchgear', 'High Rise Electrical Panels', 'Shopping Mall Power Distribution', 'Office Building Electrical', 'EgSwitchgear Commercial'],
        heroImage: '/images/industries/commercial-hero.jpg',
        overview: `
      <p>Modern <strong>commercial buildings</strong> require intelligent power management that balances load demand with energy efficiency. <strong>EgSwitchGear</strong> provides specialized electrical panel solutions for high-rises, shopping malls, and mixed-use complexes.</p>
      <p>Our designs prioritize <strong>safety, compactness, and aesthetics</strong>. We ensure your main distribution boards fit into tight electrical rooms while providing easy access for maintenance. With integrated metering and BMS compatibility, our panels help facility managers monitor usage and reduce operational costs.</p>
    `,
        challenges: [
            'Space Constraints: Fitting high-capacity systems into small electrical rooms.',
            'Safety Compliance: Meeting strict fire safety and building codes.',
            'Load Diversity: Managing varying loads from HVAC, lighting, and elevators.',
            'Aesthetics: Ensuring visible panels blend with modern interiors.'
        ],
        solutions: [
            'Compact Main Distribution Boards: Optimized layouts to save floor space.',
            'Distribution Boards (DBs): aesthetically pleasing flush-mounted sub-boards.',
            'Cable Trays & Trunking: Organized cable management systems.',
            'Lighting Control Panels: Automated systems to save energy.'
        ],
        recommendedProducts: [
            { title: 'Sub-Main Panels', slug: 'sub-main-panels' },
            { title: 'Distribution Boards', slug: 'distribution-boards' },
            { title: 'Cable Trays', slug: 'cable-trays' },
            { title: 'Lighting Panels', slug: 'lighting-panels' }
        ]
    },
    'water-treatment': {
        slug: 'water-treatment',
        title: 'Automation Solutions for Water Treatment Plants',
        shortDescription: 'Smart automation and motor control for pumping stations, RO plants, and wastewater management.',
        keywords: ['Water Treatment Automation', 'RO Plant Control Panel', 'Pump Control Panel', 'Wastewater SCADA', 'EgSwitchgear Water'],
        heroImage: '/images/industries/water-hero.jpg',
        overview: `
      <p>Water treatment and distribution rely heavily on precise process control. <strong>EgSwitchGear</strong> specializes in <strong>automation and control panels</strong> for Reverse Osmosis (RO) plants, sewage treatment facilities, and municipal pumping stations.</p>
      <p>We integrate advanced <strong>PLCs and VFDs</strong> to automate pump sequencing, monitor flow rates, and ensure consistent water pressure. Our panels are specially treated to resist corrosion in high-humidity and chemical-rich environments, ensuring long-term reliability.</p>
    `,
        challenges: [
            'Corrosion: High humidity and chemical exposure attacking electrical components.',
            'Energy Waste: Inefficient pump operation leading to high electricity bills.',
            'Complex Sequencing: Managing multiple pumps and valves in precise order.',
            'Remote Monitoring: Need for centralized control of scattered pumping sites.'
        ],
        solutions: [
            'VFD Control Panels: To vary pump speed based on demand, saving up to 40% energy.',
            'PLC Automation: Soft-PLC logic for fully automatic plant operation.',
            'Stainless Steel Enclosures: Optional SS-304/316 cabinets for corrosion resistance.',
            'SCADA Integration: For remote monitoring and data logging of flow levels.'
        ],
        recommendedProducts: [
            { title: 'VFD Panel', slug: 'vfd-panel' },
            { title: 'PLC Automation Systems', slug: 'plc-automation-systems' },
            { title: 'Control & Relay Panels', slug: 'control-relay-panels' },
            { title: 'ATS/AMF Panels', slug: 'ats-amf-panels' }
        ]
    },
    'hospitals': {
        slug: 'hospitals',
        title: 'Power Distribution for Hospitals',
        shortDescription: 'Fail-safe electrical infrastructure designed for critical healthcare environments where reliability is a matter of life.',
        keywords: ['Hospital Electric Panels', 'Critical Power Distribution', 'Medical Facility Switchgear', 'Isolated Power Systems', 'EgSwitchgear Healthcare'],
        heroImage: '/images/industries/hospital-hero.jpg',
        overview: `
      <p>In a <strong>hospital</strong>, power failure is not an option. Critical life-support systems, operating theaters, and ICUs demand <strong>100% power availability</strong> and clean, stable voltage. <strong>EgSwitchGear</strong> provides hospital-grade power distribution solutions designed for zero tolerance to failure.</p>
      <p>Our systems feature <strong>automatic changeovers (ATS)</strong> with millisecond response times, isolated power panels for operation theaters to prevent shock, and harmonic filtering to protect sensitive medical imaging equipment (MRI, CT Scanners).</p>
    `,
        challenges: [
            'Zero Downtime: Absolute necessity for continuous power.',
            'Electrical Noise: Protecting sensitive diagnostic equipment from interference.',
            'Patient Safety: Preventing micro-shocks in cardiac protected areas.',
            'Hygiene: Clean-room compatible panels for sterile environments.'
        ],
        solutions: [
            'Fast-Acting ATS Panels: Seamless switching to backup generators.',
            'Isolation Transformers: For Operating Theaters (IPS) to ensure patient safety.',
            'UPS Distribution Boards: dedicated circuits for critical loads.',
            'Energy Management Systems: To monitor power quality and vital parameters.'
        ],
        recommendedProducts: [
            { title: 'ATS/AMF Panels', slug: 'ats-amf-panels' },
            { title: 'Sync Panels', slug: 'sync-panels' },
            { title: 'Power Backup Systems', slug: 'power-backup-systems' },
            { title: 'Building Management Systems', slug: 'building-management-systems-bms' }
        ]
    },
    'solar-projects': {
        slug: 'solar-projects',
        title: 'Electrical Systems for Solar Projects',
        shortDescription: 'AC/DC combiners and grid-tie interface panels for commercial and industrial solar installations.',
        keywords: ['Solar Electrical Panels', 'AC Combiner Box', 'Solar LT Panel', 'Net Metering DB', 'EgSwitchgear Solar'],
        heroImage: '/images/industries/solar-hero.jpg',
        overview: `
      <p>As Pakistan moves towards renewable energy, <strong>EgSwitchGear</strong> stands at the forefront of providing electrical infrastructure for <strong>Solar PV projects</strong>. Whether it's a 50kW commercial rooftop or a 10MW industrial solar park, we supply the critical interface between the solar inverters and the grid.</p>
      <p>We manufacture <strong>Solar LT Panels</strong>, AC Combiner Boxes, and Net Metering compliant distribution boards. Our panels are designed to handle bi-directional power flow and provide necessary protection for your expensive solar investment.</p>
    `,
        challenges: [
            'Bi-Directional Flow: Managing power import and export safely.',
            'Outdoor Conditions: Equipment often exposed to direct sunlight and rain.',
            'DC Arc Faults: Preventing fire hazards in high-voltage DC circuits.',
            'Grid Synchronization: Ensuring safe connection with WAPDA/Utility utility.'
        ],
        solutions: [
            'Solar LT Interconnection Panels: With motorized breakers for grid synchronization.',
            'AC Combiner Boxes: To aggregate output from multiple string inverters.',
            'Outdoor Feeder Pillars: Weatherproof IP65 protection for ground-mounted systems.',
            'Surge Protection: Type 1+2 SPDs to protect against lightning surges.'
        ],
        recommendedProducts: [
            { title: 'Solar Panels', slug: 'solar-panels' },
            { title: 'LT Panels', slug: 'lt-panels' },
            { title: 'Feeder Pillar', slug: 'feeder-pillar' },
            { title: 'Lightning Protection', slug: 'lightning-protection-earthing-systems' }
        ]
    }
};

export function getIndustryBySlug(slug: string): IndustryData | null {
    return industries[slug] || null;
}

export function getIndustryList(): IndustryData[] {
    return Object.values(industries);
}
