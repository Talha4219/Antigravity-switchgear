export interface ProductData {
    slug: string;
    title: string;
    shortDescription: string;
    keywords: string[];
    overview: string;
    features: string[];
    specifications: Record<string, string>;
    applications: string[];
    whyChooseUs: string[];
    imageUrl: string;
}


// --- Helper to normalize slugs ---
// --- Helper to normalize slugs ---
export function normalizeSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/&/g, '-and-') // Replace & with -and-
        .replace(/\s+/g, '-')   // Replace spaces with -
        .replace(/\//g, '-')    // Replace / with -
        .replace(/[^a-z0-9-]/g, '') // Remove any other non-URL-friendly characters
        .replace(/-+/g, '-')    // Remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end
}

// --- Factory for Default Content ---
function createProduct(title: string, categoryGroup: string): ProductData {
    const slug = normalizeSlug(title);
    return {
        slug,
        title: `${title} - Manufacturer in Pakistan`,
        shortDescription: `Top-rated ${title} manufactured by EgSwitchGear in Pakistan. High-quality industrial solutions complying with IEC standards.`,
        keywords: [title, categoryGroup, 'Industrial Switchgear', 'Pakistan Electrical', 'EgSwitchgear', 'Manufacturer Pakistan', 'Supplier Karachi'],
        overview: `
      <p><strong>EgSwitchGear</strong> is a leading manufacturer of high-quality <strong>${title}</strong> in Pakistan, designed to meet the rigorous demands of the <strong>${categoryGroup}</strong> sector.</p>
      <p>Our solutions are engineered for durability, safety, and efficiency, ensuring your infrastructure operates without interruption. Whether for a new installation or an upgrade, our ${title} systems are manufactured to international standards (IEC) and customized to your specific project requirements in Karachi, Lahore, and Islamabad.</p>
    `,
        features: [
            'Industrial Grade Build: Designed for harsh environments.',
            'Compliance: Manufactured in accordance with international safety standards.',
            'Customizable: Tailored dimensions and specifications.',
            'Durability: Long-lasting materials and high-quality finish.',
            'Easy Maintenance: Accessible design for routine checks.'
        ],
        specifications: {
            'Rated Voltage': '400V / 230V AC, 50Hz',
            'Standards Compliance': 'IEC 61439-1, IEC 60947',
            'Operating Temperature': '-10°C to +55°C',
            'Enclosure Material': 'Powder Coated Steel (14/16 SWG)',
            'Protection Class (IP Rating)': 'IP54 (Indoor) / IP65 (Outdoor)',
            'Origin': 'Made in Pakistan (EgSwitchgear)'
        },
        applications: [
            'Industrial Factories',
            'Commercial Buildings',
            'Infrastructure Projects',
            'Residential Complexes'
        ],
        whyChooseUs: [
            '<strong>Expert Engineering:</strong> Decades of experience in power solutions.',
            '<strong>Quality Assurance:</strong> Rigorous testing before delivery.',
            '<strong>After-Sales Support:</strong> Dedicated maintenance and support team.'
        ],
        imageUrl: '/placeholder-product.jpg'
    };
}

// --- Manual Overrides (The ones we wrote specific content for) ---
const manualProducts: Record<string, ProductData> = {
    'lt-panels': {
        slug: 'lt-panels',
        title: 'LT Panels (Low Tension Switchgear)',
        shortDescription: 'High-performance Low Tension (LT) Panels for efficient power distribution and protection in industrial and commercial facilities.',
        keywords: ['LT Panels', 'Low Tension Panels', 'Electrical Distribution Board', 'LT Switchgear Pakistan', 'Industrial Power Panels', '440V Panel', 'Power Distribution Center', 'EgSwitchgear LT Panel'],
        overview: `
      <p><strong>EgSwitchGear's LT Panels</strong> are engineered to be the backbone of your low-voltage power distribution system. Designed for <strong>440V/415V three-phase applications</strong>, our Low Tension Panels ensure safe, reliable, and efficient controlling of electricity in factories, high-rise buildings, and commercial complexes.</p>
      <p>Constructed with high-grade sheet metal and equipped with premium circuit breakers (ACB, MCCB), our panels offer robust protection against overloads, short circuits, and earth faults. Whether you need a <strong>Main Distribution Board (MDB)</strong> or a sub-distribution interface, our custom-fabricated LT Panels provide the flexibility and safety your operations demand.</p>
    `,
        features: [
            'Robust Construction: Fabricated from 14/16 SWG powder-coated steel sheets for longevity.',
            'High Breaking Capacity: Equipped with top-tier ACBs and MCCBs (Schnieder, Siemens, Terasaki, etc.).',
            'Safety First: Proper busbar insulation, shrouding, and earth leakage protection.',
            'Monitoring: Digital Voltmeter, Ammeter, and Power Factor meters for real-time monitoring.',
            'Cooling: Integrated ventilation fans and louvers for thermal management.',
            'Customizable: Designs tailored to specific load requirements and space constraints.'
        ],
        specifications: {
            'Rated Voltage': '415V AC, 50Hz',
            'Rated Current': 'Up to 6300A',
            'Insulation Voltage': '1000V',
            'Short Circuit Rating': 'Up to 100kA for 1 sec',
            'Protection Class': 'IP54 / IP65 (Outdoor)',
            'Enclosure Material': 'CRCA Sheet Steel (Powder Coated)',
            'Standards Compliance': 'IEC 61439-1, IEC 60947',
            'Busbar Material': '99.9% Pure Copper (Tinned/Sleeved)'
        },
        applications: ['Manufacturing Industries (Textile, Pharma, Steel)', 'Commercial High-Rise Buildings', 'Hospitals and Data Centers', 'Shopping Malls and Plazas', 'Infrastructure Projects'],
        whyChooseUs: [
            '<strong>Certified Quality:</strong> We adhere to strict IEC standards for safety and performance.',
            '<strong>Custom Fabrication:</strong> In-house CNC manufacturing ensures precise dimensions and fit.',
            '<strong>Premium Components:</strong> We only use genuine switchgear components from reputable global brands.',
            '<strong>After-Sales Support:</strong> 24/7 technical support and maintenance services.'
        ],
        imageUrl: '/placeholder-product.jpg'
    },
    'ats-amf-panels': {
        slug: 'ats-amf-panels',
        title: 'ATS / AMF Panels (Automatic Transfer Switch)',
        shortDescription: 'Seamless automatic power switching solutions between main grid and generators for uninterrupted operations.',
        keywords: ['ATS Panel', 'AMF Panel', 'Automatic Transfer Switch', 'Generator Control Panel', 'Auto Changeover Switch', 'Backup Power Solutions', 'EgSwitchgear AMF'],
        overview: `
      <p>Ensure zero downtime with <strong>EgSwitchGear's ATS (Automatic Transfer Switch) and AMF (Automatic Mains Failure) Panels</strong>. These critical systems act as the bridge between your main utility power and your backup generators.</p>
      <p>When the grid power fails, our AMF panel instantly detects the outage, signals your generator to start, and automatically transfers the load once the voltage stabilizes. Upon grid restoration, it safely switches the load back to the utility and cools down the generator, requiring <strong>zero manual intervention</strong>. Perfect for hospitals, data centers, and continuous process industries where power loss is not an option.</p>
    `,
        features: [
            'Instant Switching: Millisecond switching capability for minimal disruption.',
            'Smart Controller: Digital Deep Sea / ComAp controllers for precise generator management.',
            'Battery Monitoring: Built-in battery chargers to ensure generator starting reliability.',
            'Safety Interlocks: Mechanical and Electrical interlocking to prevent cross-connection.',
            'Manual Override: Easy manual mode for maintenance and testing.',
            'Remote Monitoring: Optional remote access for system status and alarms.'
        ],
        specifications: {
            'Operation Mode': 'Automatic / Manual / Test',
            'Voltage System': '3-Phase 4-Wire, 415V AC',
            'Current Rating': '32A to 4000A',
            'Switching Device': 'Magnetic Contactor / Motorized Breaker',
            'Controller Type': 'Microprocessor Based (Deep Sea/SmartGen)',
            'Enclosure Protection': 'IP52 (Indoor) / IP65 (Outdoor)',
            'Response Time': 'Configurable (Typ. 3-10 Seconds)'
        },
        applications: ['Telecommunication Tower Sites', 'Hospitals and Healthcare Facilities', 'Banks and Financial Institutions', 'Cold Storage Warehouses', 'Residential Complexes'],
        whyChooseUs: [
            '<strong>Reliability:</strong> Fail-safe logic ensures power is always available when you need it.',
            '<strong>Component Quality:</strong> Heavy-duty contactors and motorized breakers for thousands of switching cycles.',
            '<strong>Expert Configuration:</strong> Pre-programmed settings to match your specific generator model.'
        ],
        imageUrl: '/placeholder-product.jpg'
    },
    'pfi-plant': {
        slug: 'pfi-plant',
        title: 'PFI Plant (Power Factor Improvement)',
        shortDescription: 'Industrial Power Factor Improvement plants to reduce electricity costs and eliminate utility penalties.',
        keywords: ['PFI Plant', 'Power Factor Correction', 'Capacitor Bank Panel', 'WAPDA Penalty SAVER', 'Reactive Power Compensation', 'Industrial Energy Saving', 'EgSwitchgear PFI'],
        overview: `
      <p>Slash your electricity bills and optimize your power capacity with <strong>EgSwitchGear's PFI (Power Factor Improvement) Plants</strong>. Inductive loads like motors and transformers create "Reactive Power" (KVAR) which lowers your efficiency and incurs heavy penalties from utility providers (WAPDA/KE).</p>
      <p>Our PFI Panels automatically inject corrective reactive power using heavy-duty capacitors, maintaining your Power Factor close to <strong>0.99 or 1.0</strong>. This not only eliminates penalties but also reduces cable heating, improves voltage regulation, and frees up transformer capacity.</p>
    `,
        features: [
            'Auto-Correction: Intelligent PFI relay automatically switches capacitor steps.',
            'Heavy Duty Capacitors: Industrial-grade capacitors with discharge resistors.',
            'Harmonic Detuning: Optional reactors to protect against harmonic distortion.',
            'Temperature Protection: Automatic cutoff in case of panel overheating.',
            'Cost Savings: ROI often achieved within 6-12 months via penalty savings.',
            'Modular Design: Easy expansion of capacitor steps.'
        ],
        specifications: {
            'System Voltage': '400/415V or 11kV (HT)',
            'Banks Configuration': 'Automatic Steps (e.g. 25, 50, 100 kVAR)',
            'Capacitor Type': 'Dry Type / Oil Filled (Heavy Duty)',
            'Controller': '6/12/16 Stage Automatic PF Regulator',
            'Reactor Detuning': '7% or 14% (Optional)',
            'Switching': 'Special Capacitor Duty Contactors',
            'Discharge Devices': 'Resistors connected across terminals'
        },
        applications: ['Textile Spinning & Weaving Mills', 'Plastic Molding & Extrusion Plants', 'Steel Furnaces and Rolling Mills', 'Cement and Chemical Industries', 'Large Commercial Buildings'],
        whyChooseUs: [
            '<strong>Guaranteed Savings:</strong> We design systems that eliminate low PF penalties.',
            '<strong>Engineering Audit:</strong> We analyze your load profile before design.',
            '<strong>Long Life Steps:</strong> We use special contactors to prevent capacitor surge damage.'
        ],
        imageUrl: '/placeholder-product.jpg'
    },
    'mcc-panels': {
        slug: 'mcc-panels',
        title: 'MCC Panels (Motor Control Centers)',
        shortDescription: 'Centralized control and protection for industrial electric motors.',
        keywords: ['MCC Panel', 'Motor Control Center', 'DOL Starter Panel', 'Star Delta Starter', 'Motor Protection', 'Industrial Motor Control'],
        overview: `<p><strong>MCC Panels</strong> provide a centralized location for controlling multiple heavy-duty motors. Essential for process industries, they allow for remote start/stop, speed control, and comprehensive protection for all your electric motors.</p>`,
        features: ['Centralized Control', 'VFD/Soft Starter Integration', 'Overload Protection', 'Modular Busbar Design'],
        specifications: {
            'Voltage': '415V AC',
            'Busbar Rating': 'Up to 5000A',
            'Starter Types': 'DOL, Star-Delta, VFD, Soft Starter',
            'Protection': 'Overload, Short Circuit, Phase Failure'
        },
        applications: ['Water Pumping Stations', 'HVAC Systems', 'Conveyor Belts', 'Process Plants'],
        whyChooseUs: ['Space saving modular design', 'Easy maintenance access', 'Integrated with PLC systems'],
        imageUrl: '/placeholder-product.jpg'
    },
    'vfd-panel': {
        slug: 'vfd-panel',
        title: 'VFD Control Panels',
        shortDescription: 'Variable Frequency Drive panels for precise motor speed control and energy saving.',
        keywords: ['VFD Panel', 'Variable Frequency Drive', 'Motor Speed Control', 'Energy Saver Panel', 'Inverter Panel'],
        overview: `<p><strong>VFD Panels</strong> are efficient motor control solutions that vary the frequency and voltage supplied to an electric motor. This provides precise speed control and significant energy savings, especially in pump and fan applications.</p>`,
        features: ['Smooth Start/Stop', 'Energy Savings up to 40%', 'Speed Control Potentiometer', 'Bypass Switch'],
        specifications: {
            'Drive Brands': 'Danfoss, Siemens, ABB, Mitsubishi',
            'Power Range': '0.75kW to 500kW',
            'Cooling': 'Forced Air Cooling',
            'Input': '3-Phase 380V-440V'
        },
        applications: ['Tube Wells', 'Industrial Fans', 'Extruders', 'Boiler Feed Pumps'],
        whyChooseUs: ['Expert parameter programming', 'Harmonic filtering included', 'Robust thermal management'],
        imageUrl: '/placeholder-product.jpg'
    },
    'sync-panels': {
        slug: 'sync-panels',
        title: 'Synchronization & Load Sharing Panels',
        shortDescription: 'Synchronize multiple generators to operate as a single power source.',
        keywords: ['Sync Panel', 'Generator Synchronization', 'Load Sharing Panel', 'Power Sync', 'Parallel Operation'],
        overview: `<p><strong>Synchronization Panels</strong> allow multiple generators to run in parallel, effectively combining their output. This provides flexibility, redundancy, and efficiency, as you can run only the number of generators needed for the current load.</p>`,
        features: ['Auto Synchronization', 'Active & Reactive Load Sharing', 'Reverse Power Protection', 'Bus Bar Management'],
        specifications: {
            'Gen-Set Support': '2 to 32 Generators',
            'Controller': 'Deep Sea 8610 / ComAp IG-NT',
            'Busbar': 'Full load capacity of total generation',
            'Protection': 'Vector Shift, ROCOF (Mains decoupling)'
        },
        applications: ['Large Industrial Plants', 'Independent Power Producers (IPP)', 'Rental Power Fleets'],
        whyChooseUs: ['Complex logic programming expertise', 'Fuel saving optimization strategy', 'Seamless load adding/shedding'],
        imageUrl: '/placeholder-product.jpg'
    }
};

// --- Definition of All Categories ---
export const allCategories = [
    // Electrical Power Panels Distribution
    { group: 'Electrical Power Panels', items: ['LT Panels', 'ATS/AMF Panels', 'Sync Panels', 'MCC Panels', 'PFI Plant', 'VFD Panel', 'Phase Correction Panel', 'Sub-Main Panels', 'Auto & Manual Change Over Panels', 'Control & Relay Panels', 'Bus Coupler', 'Feeder Pillar', 'Lighting Panels', 'Distribution Boards', 'Bus Tie Duct'] },
    // Cable Management Solutions
    { group: 'Cable Management Solutions', items: ['Cable Trays', 'Cable Trunking', 'Cable Ladders', 'Cable Tray Accessories', 'Services Boxes', 'Bus Way System'] },
    // Industrial Automation & Control
    { group: 'Industrial Automation', items: ['PLC Automation Systems', 'Building Management Systems (BMS)', 'Energy Monitoring Systems'] },
    // Lighting & Emergency Systems
    { group: 'Lighting & Emergency Systems', items: ['Commercial & Industrial Lighting', 'Street Lighting Poles', 'Emergency Lighting (CBS)', 'Power Backup Systems'] },
    // Security & Safety Solutions
    { group: 'Security & Safety Solutions', items: ['CCTV Surveillance Systems', 'Fire Alarm Systems', 'Access Control Solutions', 'Lightning Protection & Earthing Systems', 'Earthing Material Manufacturing'] },
    // Industrial & Telecom Enclosures
    { group: 'Industrial & Telecom Enclosures', items: ['Data Racks', 'TV & Telephone Junction Boxes', 'Meter Boxes'] },
    // Storage & Infrastructure Solutions
    { group: 'Storage & Infrastructure Solutions', items: ['Warehousing & Racking Systems', 'Industrial Furniture', 'Employee & Staff Lockers', 'Tools Cabinets'] },
    // Fabrication & Coating Services
    { group: 'Fabrication & Coating Services', items: ['Powder Coating', 'Hot Dip Galvanized Zinc Coating', 'Laser Cutting Services', 'Custom Fabrication Services'] },
    // Solar Systems
    { group: 'Solar Systems', items: ['Solar Panels', 'Inverters', 'Mounting Structures', 'Batteries'] }
];

// --- Generate Full Dictionary ---
const generatedProducts: Record<string, ProductData> = {};

allCategories.forEach(category => {
    category.items.forEach(item => {
        const slug = normalizeSlug(item);
        // Use manual content if available, otherwise generate default
        if (manualProducts[slug]) {
            generatedProducts[slug] = manualProducts[slug];
        } else {
            generatedProducts[slug] = createProduct(item, category.group);
        }
    });
});

export const products = generatedProducts;


export function getProductBySlug(slug: string): ProductData | null {
    return products[slug] || null;
}

export function getProductList() {
    return Object.values(products).map(p => ({
        slug: p.slug,
        title: p.title
    }));
}

export function getNextProduct(currentSlug: string): ProductData | null {
    const keys = Object.keys(products);
    const index = keys.indexOf(currentSlug);
    if (index === -1 || index === keys.length - 1) return null;
    return products[keys[index + 1]];
}

export function getPrevProduct(currentSlug: string): ProductData | null {
    const keys = Object.keys(products);
    const index = keys.indexOf(currentSlug);
    if (index === -1 || index === 0) return null;
    return products[keys[index - 1]];
}
