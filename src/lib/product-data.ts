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
        imageUrl: '/low-tension.jpg'
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
        imageUrl: '/low-tension.jpg'
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
        imageUrl: '/ats-amf-panels.jpg'
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
        imageUrl: '/pfi-plant.jpg'
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
        imageUrl: '/mcc-panels.jpg'
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
        imageUrl: '/vfd-panel.png'
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
        imageUrl: '/sync-panels.png'
    },
    'phase-correction-panel': {
        slug: 'phase-correction-panel',
        title: 'Phase Correction Panels',
        shortDescription: 'Advanced phase correction panels to balance electrical loads and improve system efficiency.',
        keywords: [
            'Phase Correction Panel',
            'Load Balancing Panel',
            'Phase Balancer',
            'Unbalanced Load Solution',
            'Industrial Power Quality'
        ],
        overview: `
    <p><strong>EgSwitchGear Phase Correction Panels</strong> are designed to automatically balance uneven electrical loads across three phases. In industrial and commercial installations, unbalanced phases lead to overheating, energy losses, voltage drops, and premature equipment failure.</p>

    <p>Our panels continuously monitor phase currents and intelligently redistribute loads to maintain optimal balance. This improves transformer efficiency, reduces neutral current, enhances motor life, and ensures compliance with power quality standards.</p>

    <p>Phase correction is especially critical for facilities with fluctuating single-phase loads such as offices, malls, workshops, and mixed-use buildings.</p>
  `,
        features: [
            'Automatic phase load balancing',
            'Reduction in neutral current',
            'Improved transformer and cable life',
            'Microprocessor-based monitoring',
            'Low maintenance operation'
        ],
        specifications: {
            'System Voltage': '415V AC',
            'Control Type': 'Automatic / Manual',
            'Response Time': 'Real-time',
            'Protection': 'Overload, Short Circuit',
            'Enclosure': 'IP54 / IP65'
        },
        applications: [
            'Commercial Buildings',
            'Shopping Malls',
            'Educational Institutes',
            'Mixed Load Industrial Facilities'
        ],
        whyChooseUs: [
            '<strong>Power Quality Experts:</strong> Designed to solve real-world imbalance issues.',
            '<strong>Energy Efficiency:</strong> Reduces losses and improves system performance.'
        ],
        imageUrl: '/phase-correction-panel.jpg'
    },
    'sub-main-panels': {
        slug: 'sub-main-panels',
        title: 'Sub-Main Distribution Panels (SMDB)',
        shortDescription: 'Reliable sub-main panels for efficient downstream power distribution.',
        keywords: [
            'SMDB Panel',
            'Sub Main Distribution Board',
            'Power Sub Panel',
            'Electrical Distribution Panel'
        ],
        overview: `
    <p><strong>Sub-Main Distribution Panels (SMDB)</strong> act as an essential link between main LT panels and final load distribution points. They ensure controlled, protected, and organized power flow to different sections of a facility.</p>

    <p>EgSwitchGear SMDBs are custom designed based on load calculations, breaker coordination, and future expansion needs. Each outgoing feeder is individually protected, improving safety and fault isolation.</p>

    <p>Our panels are widely used in high-rise buildings, factories, hospitals, and infrastructure projects where reliability and selective protection are critical.</p>
  `,
        features: [
            'Individual feeder protection',
            'Compact and space-saving design',
            'High-quality MCCB/MCB integration',
            'Clear labeling and cable management'
        ],
        specifications: {
            'Rated Voltage': '415V',
            'Incoming': 'MCCB / Isolator',
            'Outgoing': 'MCB / MCCB',
            'Busbar': 'Copper / Aluminum',
            'Standard': 'IEC 61439'
        },
        applications: [
            'Commercial Buildings',
            'Industrial Units',
            'Hospitals',
            'Infrastructure Projects'
        ],
        whyChooseUs: [
            '<strong>Custom Load Design:</strong> Panels built as per actual site demand.',
            '<strong>Safety Focused:</strong> Proper fault segregation and protection.'
        ],
        imageUrl: '/SMDB.jpg'
    },
    'auto-manual-changeover': {
        slug: 'auto-manual-changeover',
        title: 'Auto & Manual Changeover Panels',
        shortDescription: 'Safe and reliable power changeover between utility and generator sources.',
        keywords: [
            'Changeover Panel',
            'Manual Changeover Switch',
            'Automatic Changeover Panel',
            'Generator Changeover'
        ],
        overview: `
    <p><strong>Auto & Manual Changeover Panels</strong> ensure seamless switching between main utility power and standby generators during outages. These panels are critical for maintaining continuity of operations.</p>

    <p>Automatic versions switch power without human intervention, while manual changeover panels provide a cost-effective solution for smaller installations. Both designs include robust interlocking to prevent back-feeding and equipment damage.</p>

    <p>EgSwitchGear changeover panels are engineered for durability, safety, and smooth operation across residential, commercial, and industrial environments.</p>
  `,
        features: [
            'Electrical & mechanical interlocking',
            'Manual / automatic operation',
            'Clear source indication',
            'Heavy-duty switching devices'
        ],
        specifications: {
            'Current Range': '32A – 3200A',
            'Operation': 'Auto / Manual',
            'Switch Type': 'Contactor / Motorized MCCB',
            'Enclosure': 'Indoor / Outdoor'
        },
        applications: [
            'Residential Buildings',
            'Commercial Facilities',
            'Factories',
            'Telecom Sites'
        ],
        whyChooseUs: [
            '<strong>Fail-Safe Design:</strong> Prevents simultaneous source connection.',
            '<strong>Flexible Options:</strong> Available for all load sizes.'
        ],
        imageUrl: '/SMDB.jpg'
    },
    'control-relay-panels': {
        slug: 'control-relay-panels',
        title: 'Control & Relay Panels',
        shortDescription: 'Precision control and relay panels for automation and protection systems.',
        keywords: [
            'Control Panel',
            'Relay Panel',
            'Protection Panel',
            'Automation Control'
        ],
        overview: `
    <p><strong>Control & Relay Panels</strong> are the intelligence centers of electrical and automation systems. They house relays, timers, PLCs, and logic circuits responsible for protection, sequencing, and interlocking.</p>

    <p>EgSwitchGear designs these panels for power plants, substations, process industries, and automation projects where accuracy and reliability are paramount.</p>

    <p>Each panel is engineered with clear wiring layouts, ferrule marking, and tested logic to ensure long-term dependable operation.</p>
  `,
        features: [
            'Custom logic design',
            'High-quality relays and terminals',
            'Clear wiring and labeling',
            'Easy maintenance access'
        ],
        specifications: {
            'Control Voltage': '24V / 110V / 230V',
            'Components': 'Relays, Timers, PLC',
            'Mounting': 'Floor / Wall Mounted',
            'Standard': 'IEC / ANSI'
        },
        applications: [
            'Power Plants',
            'Industrial Automation',
            'Substations',
            'Process Control Systems'
        ],
        whyChooseUs: [
            '<strong>Engineering Accuracy:</strong> Logic tested before dispatch.',
            '<strong>Industrial Reliability:</strong> Designed for harsh environments.'
        ],
        imageUrl: '/SMDB.jpg'
    },
    'bus-coupler': {
        slug: 'bus-coupler',
        title: 'Bus Coupler Panels',
        shortDescription: 'Essential bus coupler panels for safe and flexible power distribution management.',
        keywords: [
            'Bus Coupler Panel',
            'Electrical Bus Tie',
            'Busbar Coupler',
            'Switchgear Interconnector'
        ],
        overview: `
    <p><strong>EgSwitchGear Bus Coupler Panels</strong> are high-current switching devices designed to connect or isolate two busbar systems within a switchboard. They provide critical flexibility in power management, allowing for maintenance on one section without shutting down the entire facility.</p>

    <p>Equipped with heavy-duty Air Circuit Breakers (ACB) or Load Break Switches, our bus couplers are engineered for maximum reliability and safety. They include comprehensive interlocking logic (Mechanical and Electrical) to prevent improper switching sequences.</p>

    <p>Our bus couplers are indispensable for data centers, hospitals, and industrial plants where redundant power paths and high availability are required.</p>
  `,
        features: [
            'Mechanical and electrical interlocking',
            'High current carrying capacity',
            'Robust busbar support system',
            'Thermal monitoring sensors',
            'Integrated protection relays'
        ],
        specifications: {
            'Rated Current': 'Up to 6300A',
            'Rated Voltage': '415V / 690V AC',
            'Short Circuit Rating': 'Up to 100kA',
            'Breaking Capacity': 'As per IEC 60947',
            'Standards': 'IEC 61439-1'
        },
        applications: [
            'Data Centers',
            'Industrial Process Plants',
            'Power Substations',
            'Multi-source Power Systems'
        ],
        whyChooseUs: [
            '<strong>Seamless Power Transfer:</strong> Engineered for reliability and safety.',
            '<strong>Custom Interlocking:</strong> Designed to prevent operational errors.'
        ],
        imageUrl: '/bus-coupler.webp'
    },
    'feeder-pillar': {
        slug: 'feeder-pillar',
        title: 'Outdoor Feeder Pillars',
        shortDescription: 'Weatherproof outdoor feeder pillars for public and industrial power distribution.',
        keywords: [
            'Feeder Pillar',
            'Outdoor Distribution Board',
            'L.V. Feeder Pillar',
            'Street Lighting Pillar'
        ],
        overview: `
    <p><strong>EgSwitchGear Outdoor Feeder Pillars</strong> are rugged, weatherproof enclosures designed for distributing low-voltage power in external environments. They are the ideal solution for public utilities, street lighting, and industrial site distribution.</p>

    <p>Fabricated from heavy-gauge galvanized steel or aluminum and finished with specialized UV-resistant powder coating, our feeder pillars are built to withstand rain, dust, and extreme heat. They feature secure locking mechanisms to prevent unauthorized access.</p>

    <p>Internal layouts are optimized for easy cable termination and include high-quality fuse units or MCCBs for circuit protection.</p>
  `,
        features: [
            'Weatherproof (IP65) construction',
            'Anti-corrosive galvanized finish',
            'Secure three-point locking system',
            'Detachable gland plates for easy cabling',
            'Internal lighting and heating (optional)'
        ],
        specifications: {
            'Material': 'Galvanized Steel / Aluminum',
            'IP Rating': 'IP65',
            'Finish': 'Polyester Powder Coated',
            'Current Rating': 'Up to 1600A',
            'Voltage': '415V AC'
        },
        applications: [
            'Street Lighting Systems',
            'Public Utilities Distribution',
            'Parks and Recreational Areas',
            'Industrial Site Infrastructure'
        ],
        whyChooseUs: [
            '<strong>Extreme Durability:</strong> Engineered for life in outdoor Pakistan.',
            '<strong>Public Safety:</strong> Robust and secure anti-tamper design.'
        ],
        imageUrl: '/feeder-pillar.jpg'
    },
    'lighting-panels': {
        slug: 'lighting-panels',
        title: 'Lighting Control Panels',
        shortDescription: 'Smart lighting control panels for energy efficiency and automated illumination management.',
        keywords: [
            'Lighting Panel',
            'Automated Lighting Control',
            'Street Light Control Board',
            'Energy Saving Panel'
        ],
        overview: `
    <p><strong>EgSwitchGear Lighting Control Panels</strong> provide centralized management of indoor and outdoor illumination systems. By integrating timers, photocells, and sensors, our panels ensure that lights are only active when needed, significantly reducing energy costs.</p>

    <p>For industrial facilities and commercial high-rises, these panels allow for complex scheduling and remote override. They protect lighting circuits from overloads and provide clear status indicators for maintenance crews.</p>

    <p>We offer both conventional contactor-based panels and smart panels integrated with DALI or Building Management Systems (BMS).</p>
  `,
        features: [
            'Automatic timer and sensor control',
            'Individual branch circuit protection',
            'Manual bypass switches',
            'Status indication lamps',
            'Energy management integration'
        ],
        specifications: {
            'Control Logic': 'PLC / Timer / Photocell',
            'Current Rating': 'Up to 400A',
            'Phases': '3-Phase or Single-Phase',
            'Protection': 'MCB / RCBO',
            'Enclosure': 'IP54'
        },
        applications: [
            'Commercial Office Buildings',
            'Industrial Warehouses',
            'Street and Highway Lighting',
            'Sports Stadiums'
        ],
        whyChooseUs: [
            '<strong>Energy Efficiency:</strong> Designed to cut operational costs immediately.',
            '<strong>Automation Experts:</strong> Seamlessly integrate with your existing systems.'
        ],
        imageUrl: '/lighting-panels.png'
    },
    'distribution-boards': {
        slug: 'distribution-boards',
        title: 'Final Distribution Boards (DB)',
        shortDescription: 'Premium final distribution boards for residential and commercial electrical circuits.',
        keywords: [
            'Distribution Board',
            'Consumer Unit',
            'Electrical Sub-Panel',
            'MCB Board'
        ],
        overview: `
    <p><strong>EgSwitchGear Distribution Boards (DB)</strong> are the final point of electrical distribution in any facility. They house the circuit breakers (MCBs and RCDs) that protect individual lighting, power, and utility circuits.</p>

    <p>Our DBs are designed for safety, aesthetics, and ease of installation. We offer flush-mounted versions for homes and offices that blend seamlessly with interiors, and surface-mounted versions for industrial use.</p>

    <p>With high-quality busbar systems and ample wiring space, EgSwitchGear DBs ensure that your electrical installation is organized, labeled, and safe for end-users.</p>
  `,
        features: [
            'Compact and aesthetic design',
            'High-grade flame-retardant material',
            'Insulated busbar system',
            'Comprehensive labeling system',
            'Easy internal access'
        ],
        specifications: {
            'Incoming': 'MCB / Isolator / RCCB',
            'Ways': '4, 8, 12, 16, 24 Ways',
            'Mounting': 'Flush / Surface',
            'Material': 'Steel Sheet / Thermoplastic',
            'IP Rating': 'IP40 / IP54'
        },
        applications: [
            'Residential Apartments',
            'Commercial Offices',
            'Hotel Rooms',
            'Retail Stores'
        ],
        whyChooseUs: [
            '<strong>Focus on Safety:</strong> Every board is built for maximum protection.',
            '<strong>User Friendly:</strong> Clearly labeled and easy to operate.'
        ],
        imageUrl: '/distribution-boards.jpg'
    },
    'bus-tie-duct': {
        slug: 'bus-tie-duct',
        title: 'Bus Tie Ducts & Busways',
        shortDescription: 'High-current bus tie ducts for efficient and high-capacity power interconnection.',
        keywords: [
            'Bus Tie Duct',
            'Busway System',
            'High Current Busbar',
            'Transformer to Panel Connection'
        ],
        overview: `
    <p><strong>EgSwitchGear Bus Tie Ducts</strong> are engineered for the transport of high-current power between major components like transformers and main LT panels. Unlike multiple cable runs, bus ducts offer a compact, efficient, and low-loss alternative.</p>

    <p>Our bus tie ducts feature high-purity copper or aluminum busbars housed in robust, ventilated or non-ventilated enclosures. They are designed to withstand high thermal and mechanical stresses during short-circuit events.</p>

    <p>Every bus duct is custom-fabricated based on the exact spatial constraints of your facility, ensuring a perfect fit and professional installation.</p>
  `,
        features: [
            'High current density copper/aluminum',
            'Compact space-saving design',
            'Superior short-circuit withstand',
            'Low voltage drop performance',
            'Flexible joint designs'
        ],
        specifications: {
            'Current Rating': 'Up to 6300A',
            'Voltage': 'Up to 1000V',
            'Conductor Material': '99.9% Pure Copper / Aluminum',
            'Enclosure': 'Steel / Aluminum',
            'Standard': 'IEC 60439 / 61439'
        },
        applications: [
            'Main Transformer Connections',
            'Switchboard Interconnections',
            'Large Industrial Complexes',
            'High-Rise Building Risers'
        ],
        whyChooseUs: [
            '<strong>Precision Engineering:</strong> Custom measured for a flawless fit.',
            '<strong>High Performance:</strong> Optimized for low heat and high efficiency.'
        ],
        imageUrl: '/bus-tie-duct.png'
    },
    'cable-trays': {
        slug: 'cable-trays',
        title: 'Industrial Cable Trays',
        shortDescription: 'Heavy-duty perforated and solid bottom cable trays for organized cable management.',
        keywords: [
            'Cable Tray',
            'Perforated Cable Tray',
            'Cable Management System',
            'Industrial Cable Support'
        ],
        overview: `
    <p><strong>EgSwitchGear Industrial Cable Trays</strong> provide a professional and reliable solution for supporting large volumes of power and data cables. Designed for durability and ease of installation, our trays ensure that your electrical infrastructure is organized and safe.</p>

    <p>We manufacture both perforated and solid-bottom trays in various materials, including Pre-Galvanized, Hot-Dip Galvanized, and Stainless Steel. Our precision-engineered designs allow for maximum ventilation and heat dissipation, extending the life of your cables.</p>

    <p>Whether for a factory floor, a commercial high-rise, or a data center, our cable trays provide the structural integrity needed for heavy cable loads.</p>
  `,
        features: [
            'High load-bearing capacity',
            'Smooth edges to prevent cable damage',
            'Standard and custom widths available',
            'Excellent heat dissipation (Perforated)',
            'Corrosion-resistant finishes'
        ],
        specifications: {
            'Material': 'Pre-Galv / Hot-Dip Galv / SS',
            'Type': 'Perforated / Solid Bottom',
            'Width': '50mm to 1000mm',
            'Length': '2400mm / 3000mm Standard',
            'Thickness': '1.2mm to 3.0mm'
        },
        applications: [
            'Manufacturing Plants',
            'Power Stations',
            'Commercial Buildings',
            'Infrastructure Tunnels'
        ],
        whyChooseUs: [
            '<strong>Superior Quality:</strong> Built to international structural standards.',
            '<strong>Long Life:</strong> Highly resistant to rust and environmental stress.'
        ],
        imageUrl: '/cable-trays.webp'
    },
    'cable-trunking': {
        slug: 'cable-trunking',
        title: 'Cable Trunking Systems',
        shortDescription: 'Secure and aesthetic cable trunking for organized wiring in commercial and industrial spaces.',
        keywords: [
            'Cable Trunking',
            'Electrical Ducting',
            'Surface Trunking',
            'Wall Mounted Trunking'
        ],
        overview: `
    <p><strong>EgSwitchGear Cable Trunking Systems</strong> offer a secure, enclosed path for electrical wiring, protecting cables from dust, moisture, and mechanical damage. Our trunking solutions are ideal for installations where aesthetics and protection are equally important.</p>

    <p>Available in various sizes and sections (Single, Double, or Multi-compartment), our trunking is easy to install and allows for future wiring additions or modifications. We use high-quality sheet steel with a durable powder-coated finish to ensure a professional look in any environment.</p>

    <p>From office partitions to industrial control rooms, our trunking provides a clean and safe wiring environment.</p>
  `,
        features: [
            'Secure snap-fit or screw-on covers',
            'Multi-compartment options for separation',
            'Impact-resistant construction',
            'Wide range of fittings and accessories',
            'Professional powder-coated finish'
        ],
        specifications: {
            'Section': 'Single / Double / Triple',
            'Material': 'CRCA Steel / Pre-Galvanized',
            'Finish': 'Powder Coated (Any Color)',
            'Thickness': '1.0mm to 2.0mm',
            'Standard': 'As per IEC'
        },
        applications: [
            'Office Fit-outs',
            'Control Rooms',
            'Retail Showrooms',
            'Laboratory Installations'
        ],
        whyChooseUs: [
            '<strong>Clean Aesthetics:</strong> Designed for modern professional interiors.',
            '<strong>Modular Design:</strong> Easy to expand and modify as needs change.'
        ],
        imageUrl: '/cable-trunking.png'
    },
    'cable-ladders': {
        slug: 'cable-ladders',
        title: 'Heavy-Duty Cable Ladders',
        shortDescription: 'Strong and ventilated cable ladders for large-diameter high-voltage power cables.',
        keywords: [
            'Cable Ladder',
            'Heavy Duty Cable Support',
            'Industrial Cable Racking',
            'Power Cable Ladder'
        ],
        overview: `
    <p><strong>EgSwitchGear Heavy-Duty Cable Ladders</strong> are specifically designed to support large-diameter power cables and heavy cable bundles. Their open architecture provides maximum ventilation, preventing heat buildup in high-current conductors.</p>

    <p>Constructed with robust side rails and rungs (either welded or swaged), our ladders offer exceptional strength-to-weight ratios. They are the preferred choice for industrial plants, oil and gas facilities, and major infrastructure projects where cables need to travel over long spans.</p>

    <p>Our ladders are available in various materials and finishes to withstand even the most corrosive environments.</p>
  `,
        features: [
            'Exceptional load-bearing strength',
            'Maximum air circulation for cables',
            'Long span capability (up to 6m)',
            'Easy cable dropping and exiting',
            'Durable rust-proof finishes'
        ],
        specifications: {
            'Material': 'Steel / Hot-Dip Galv / Aluminum',
            'Rail Height': '75mm to 150mm',
            'Rung Spacing': '200mm / 300mm',
            'Width': '150mm to 1200mm',
            'Thickness': '1.5mm to 3.0mm'
        },
        applications: [
            'Oil & Gas Facilities',
            'Major Power Plants',
            'Heavy Manufacturing',
            'Infrastructure Bridges'
        ],
        whyChooseUs: [
            '<strong>Built for Strength:</strong> No sagging even under maximum load.',
            '<strong>Thermal Optimized:</strong> Keeps your high-power cables cool.'
        ],
        imageUrl: '/cable-ladders.jpg'
    },
    'cable-tray-accessories': {
        slug: 'cable-tray-accessories',
        title: 'Cable Tray Fittings & Accessories',
        shortDescription: 'Comprehensive range of bends, tees, and connectors for flexible cable tray routing.',
        keywords: [
            'Cable Tray Bends',
            'Tray Tee Joint',
            'Tray Connector',
            'Cable Support Fittings'
        ],
        overview: `
    <p><strong>EgSwitchGear Cable Tray Fittings & Accessories</strong> are the essential components that allow for the seamless routing of cable systems around corners, obstacles, and elevation changes. A complete system is only as good as its fittings.</p>

    <p>We manufacture a full range of precision-measured Horizontal Bends, Internal/External Risers, Tees, Crosses, and Reducers. Every fitting is designed to maintain the required cable bending radius and structural integrity of the overall run.</p>

    <p>Our accessories are manufactured to the same high standards as our trays, ensuring perfect alignment and finish throughout the installation.</p>
  `,
        features: [
            'Precision laser-cut dimensions',
            'Smooth radius to protect cables',
            'Uniform finish with main trays',
            'Heavy-duty connector plates included',
            'Wide variety for all routing needs'
        ],
        specifications: {
            'Range': 'Bends, Tees, Crosses, Reducers',
            'Angle': '45°, 90° Standard',
            'Material': 'Match with Tray System',
            'Radius': '300mm / 600mm / Custom',
            'Fittings': 'Nut/Bolt or Snap-on'
        },
        applications: [
            'All Cable Management Installations',
            'Complex Industrial Routing',
            'Commercial Building Shafts'
        ],
        whyChooseUs: [
            '<strong>Perfect Compatibility:</strong> Designed to fit our trays flawlessly.',
            '<strong>High Precision:</strong> Eliminates site modification and delays.'
        ],
        imageUrl: '/cable-tray-accessories.jpg'
    },
    'services-boxes': {
        slug: 'services-boxes',
        title: 'Floor Service Boxes',
        shortDescription: 'Integrated floor boxes for convenient power and data access in modern offices.',
        keywords: [
            'Floor Box',
            'Service Box',
            'Underfloor Outlet',
            'Office Floor Socket'
        ],
        overview: `
    <p><strong>EgSwitchGear Floor Service Boxes</strong> provide discrete and convenient access to power, data, and multimedia connections directly from the floor. They are the ideal solution for open-plan offices, boardrooms, and showrooms where wall outlets are impractical.</p>

    <p>Our floor boxes are designed to be flush-mounted into raised floors or screeded floors. They feature durable covers (available in Stainless Steel or custom finishes) that can withstand foot traffic and office furniture loads.</p>

    <p>Internal modules are customizable, allowing for any combination of electrical sockets, RJ45 ports, and HDMI connectors.</p>
  `,
        features: [
            'Flush-to-floor aesthetic design',
            'Durable, load-bearing covers',
            'Customizable internal modules',
            'Easy installation in various floor types',
            'Safety cable exits to prevent tripping'
        ],
        specifications: {
            'Material': 'Stainless Steel / Galvanized Steel',
            'Compartments': '1, 2, 3, or 4 Way',
            'Outlet Type': 'Universal / British / Data',
            'Depth': 'Adjustable for different floor levels',
            'Finish': 'Polished / Brushed / Carpet Infill'
        },
        applications: [
            'Modern Open Plan Offices',
            'Conference & Board Rooms',
            'Exhibition Halls',
            'Shopping Mall Kiosks'
        ],
        whyChooseUs: [
            '<strong>Premium Finish:</strong> Enhances the look of any professional space.',
            '<strong>High Versatility:</strong> Configure the outlets exactly as you need.'
        ],
        imageUrl: '/services-boxes.jpg'
    },
    'bus-way-system': {
        slug: 'bus-way-system',
        title: 'Busway & Busplug Systems',
        shortDescription: 'Modular busway systems for flexible and high-capacity industrial power distribution.',
        keywords: [
            'Busway',
            'Busbar Trunking',
            'Plugin Busway',
            'Industrial Power Distribution'
        ],
        overview: `
    <p><strong>EgSwitchGear Busway Systems</strong> (also known as Busbar Trunking) represent the modern alternative to traditional cabling for high-capacity power distribution. Our modular systems provide a safe, compact, and extremely flexible way to distribute power across large distances and floors.</p>

    <p>With integrated "Tap-off" points, our busway allows for new machines or panels to be connected quickly and safely without powering down the entire line. This makes it the perfect choice for dynamic manufacturing environments and modern data centers.</p>

    <p>Our busways are engineered for low voltage drop and superior short-circuit withstand, using high-purity conductors and robust, ventilated enclosures.</p>
  `,
        features: [
            'Modular and expandable design',
            'Safe "Hot-tap" plugin capability',
            'Compact cross-section vs. cables',
            'Superior short-circuit performance',
            'Reduced installation time and labor'
        ],
        specifications: {
            'Current Range': '100A to 6300A',
            'Conductor': 'Tinned Copper / Aluminum',
            'Enclosure': 'Aluminum / Galvanized Steel',
            'Tap-off Boxes': 'MCB / MCCB Integrated',
            'Standard': 'IEC 61439-6'
        },
        applications: [
            'Heavy Industry Production Lines',
            'Data Center Server Rows',
            'High-Rise Building Vertical Risers',
            'Automotive Assembly Plants'
        ],
        whyChooseUs: [
            '<strong>Maximum Flexibility:</strong> Add or move loads in minutes, not days.',
            '<strong>Future Proof:</strong> Easily adapt your power layout as your business grows.'
        ],
        imageUrl: '/bus-way-system.png'
    },
    'plc-automation-systems': {
        slug: 'plc-automation-systems',
        title: 'PLC & SCADA Automation Systems',
        shortDescription: 'Industrial-grade PLC systems for precise process control and automated manufacturing.',
        keywords: [
            'PLC Panel',
            'SCADA System',
            'Industrial Automation',
            'Process Control Panel'
        ],
        overview: `
    <p><strong>EgSwitchGear PLC & SCADA Automation Systems</strong> are the brains of modern industrial operations. We design and integrate advanced logic control systems that automate complex processes, improve precision, and reduce human error.</p>

    <p>Using top-tier controllers from Siemens, Schneider, and ABB, we build custom panels that handle everything from simple machine sequencing to plant-wide SCADA monitoring. Our systems provide real-time data visualization, fault logging, and remote control capabilities.</p>

    <p>Whether you need to automate a textile production line, a water treatment plant, or a chemical process, our engineering team provides full-cycle support from logic design to on-site commissioning.</p>
  `,
        features: [
            'Custom PLC logic and HMI design',
            'Real-time SCADA monitoring and data logging',
            'Remote access and control capability',
            'Seamless integration with field instruments',
            'Fail-safe emergency shutdown logic'
        ],
        specifications: {
            'Controllers': 'Siemens S7 / Schneider M221 / ABB AC500',
            'Communication': 'Profinet / Modbus / Ethernet IP',
            'HMI': '4\" to 15\" Touch Panels',
            'Software': 'TIA Portal / EcoStruxure / Ignition SCADA',
            'Protection': 'Opto-isolated I/O'
        },
        applications: [
            'Automated Production Lines',
            'Water & Wastewater Plants',
            'Chemical & Process Industries',
            'Packaging & Material Handling'
        ],
        whyChooseUs: [
            '<strong>Software Experts:</strong> We don\'t just build panels; we program solutions.',
            '<strong>Turnkey Service:</strong> From logic design to final factory commissioning.'
        ],
        imageUrl: '/plc-automation.jpg'
    },
    'building-management-systems-bms': {
        slug: 'building-management-systems-bms',
        title: 'Building Management Systems (BMS)',
        shortDescription: 'Integrated BMS solutions for centralized control of HVAC, lighting, and security.',
        keywords: [
            'BMS Panel',
            'Building Automation',
            'Smart Building Solutions',
            'HVAC Control System'
        ],
        overview: `
    <p><strong>EgSwitchGear Building Management Systems (BMS)</strong> provide a centralized platform to monitor and control all mechanical and electrical equipment within a facility. Our solutions transform ordinary buildings into "Smart Buildings" that are more efficient, comfortable, and safe.</p>

    <p>We integrate HVAC systems, lighting controls, elevator monitoring, and fire safety into a single, intuitive interface. By using intelligent occupancy and environmental sensors, our BMS can reduce energy consumption by up to 30%, significantly lowering operational costs for high-rise buildings and malls.</p>

    <p>Our open-protocol approach (BACnet/LonWorks) ensures that your building can evolve and integrate with new technologies in the future.</p>
  `,
        features: [
            'Centralized HVAC and lighting control',
            'Energy trend analysis and reporting',
            'Predictive maintenance alerts',
            'Occupancy-based resource optimization',
            'Multi-protocol integration (BACnet, Modbus)'
        ],
        specifications: {
            'Architecture': 'Distributed or Centralized Control',
            'Connectivity': 'TCP/IP / BACnet MSTP',
            'Sensors': 'Temp, Humidity, CO2, Occupancy',
            'Interface': 'Web-based & Mobile App Dashboard',
            'Standard': 'As per ISO 16484'
        },
        applications: [
            'Corporate Office High-Rises',
            'Shopping Malls & Retail Centers',
            'Hospitals & Healthcare Facilities',
            'Modern University Campuses'
        ],
        whyChooseUs: [
            '<strong>Efficiency Leaders:</strong> We focus on maximizing your ROI through energy savings.',
            '<strong>Seamless Integration:</strong> Unify all your building systems into one dashboard.'
        ],
        imageUrl: '/bms-system.png'
    },
    'energy-monitoring-systems': {
        slug: 'energy-monitoring-systems',
        title: 'Industrial Energy Monitoring Systems (EMS)',
        shortDescription: 'Real-time energy tracking systems to identify wastage and optimize industrial power consumption.',
        keywords: [
            'Energy Metering System',
            'EMS Software',
            'Power Quality Analyzer',
            'Industrial Energy Tracking'
        ],
        overview: `
    <p><strong>EgSwitchGear Energy Monitoring Systems (EMS)</strong> turn data into savings. In an era of rising electricity costs, our EMS provides deep visibility into where and how power is being used across your facility, allowing you to identify wastage and optimize production cycles.</p>

    <p>Our system uses high-precision digital power meters and specialized software to track kWh, kVAR, Power Factor, and Harmonics in real-time. With detailed heat maps and automated reports, you can pinpoint inefficient machinery and monitor your facility's carbon footprint.</p>

    <p>Our EMS is a critical tool for facilities aiming for ISO 50001 certification and those looking to eliminate utility penalties and reduce Peak Demand charges.</p>
  `,
        features: [
            'Real-time power parameter tracking',
            'Automated daily/weekly energy reports',
            'Penalty and Peak-Demand alerts',
            'Harmonic and power quality analysis',
            'Multi-site comparison dashboard'
        ],
        specifications: {
            'Metering': 'Class 0.5S / 1.0 Energy Meters',
            'Data Acquisition': 'Modbus Gateway / Data Logger',
            'Software': 'Cloud-based or On-premise EMS',
            'Parameters': 'V, I, kW, kVAR, kVA, PF, THD',
            'Standard': 'Complying with ISO 50001'
        },
        applications: [
            'Textile & Pharmaceutical Plants',
            'Steel & Heavy Manufacturing',
            'Data Centers with High Power Density',
            'Commercial High-Rise Complexes'
        ],
        whyChooseUs: [
            '<strong>Data-Driven Savings:</strong> We provide the insights needed to slash your bills.',
            '<strong>Future Ready:</strong> Fully scalable from a single meter to thousands.'
        ],
        imageUrl: '/energy-monitoring.jpg'
    },
    'commercial-industrial-lighting': {
        slug: 'commercial-industrial-lighting',
        title: 'Commercial & Industrial LED Lighting',
        shortDescription: 'High-efficacy and durable LED lighting solutions for large-scale facilities.',
        keywords: [
            'Industrial LED Light',
            'High Bay lighting',
            'Warehouse Luminaire',
            'Commercial Panel Light'
        ],
        overview: `
    <p><strong>EgSwitchGear Commercial & Industrial LED Lighting</strong> solutions are designed for performance in the most demanding environments. We provide high-efficacy luminaires that offer superior brightness while consuming up to 70% less energy than traditional HID or fluorescent lighting.</p>

    <p>Our industrial High-Bay and Low-Bay lights are built with robust thermal management and IK-rated impact resistance, making them perfect for factory floors and warehouses. For commercial spaces, our sleek Panel and Linear lights provide glare-free, uniform illumination that enhances productivity and comfort.</p>

    <p>All our lighting products use premium drivers and LED chips (Osram/Philips/Cree) to ensure a lifespan exceeding 50,000 hours with minimal lumen depreciation.</p>
  `,
        features: [
            'High luminous efficacy (up to 160 lm/W)',
            'Robust IP and IK ratings for industrial use',
            'Flicker-free, uniform light distribution',
            'Glare control for enhanced comfort',
            'Long lifespan with 5-year warranty'
        ],
        specifications: {
            'Lumen Output': 'Up to 30,000 Lumens (High Bay)',
            'Color Temp (CCT)': '3000K, 4000K, 6500K',
            'Beam Angle': '30°, 60°, 90°, 120°',
            'Protection': 'IP65 / IP66 Waterproof',
            'CRI': 'Ra > 80 (Standard)'
        },
        applications: [
            'Warehouses & Logistic Hubs',
            'Manufacturing Facility Floors',
            'Automotive Showrooms',
            'Modern Office Buildings'
        ],
        whyChooseUs: [
            '<strong>Efficiency Experts:</strong> We calculate lighting lux levels for your specific site.',
            '<strong>Premium Quality:</strong> We use only top-tier globally recognized LED components.'
        ],
        imageUrl: '/industrial-lighting.jpg'
    },
    'street-lighting-poles': {
        slug: 'street-lighting-poles',
        title: 'Street Lighting Poles & Brackets',
        shortDescription: 'High-quality galvanized steel poles for public, commercial, and industrial external lighting.',
        keywords: [
            'Street Light Pole',
            'Octagonal Pole',
            'Galvanized Lamp Post',
            'High Mast Lighting'
        ],
        overview: `
    <p><strong>EgSwitchGear Street Lighting Poles</strong> are engineered for strength, durability, and aesthetics. As a manufacturer, we provide a wide range of poles, from standard functional street lights to decorative posts for parks and housing societies.</p>

    <p>Our poles are fabricated from high-grade steel and undergo high-quality Hot-Dip Galvanization to provide over 20 years of maintenance-free service in even the most humid environments. We offer Octagonal, Conical, and Round designs with single or double-arm brackets.</p>

    <p>Every pole is designed to withstand local wind load conditions and features a secure, weather-protected base compartment for easy wiring and fuse installation.</p>
  `,
        features: [
            'Hot-Dip Galvanized for maximum rust protection',
            'Wind load calculated design (ASCE/TIA)',
            'Internal cable junction with secure access door',
            'Octagonal, Conical, and Tubular profiles',
            'Standard heights from 6m to 12m'
        ],
        specifications: {
            'Material': 'High Tensile Steel (Q235/Q345)',
            'Coating': 'Hot Dip Galv (70-90 microns)',
            'Height': '3m to 30m (High Mast)',
            'Shape': 'Octagonal / Round / Conical',
            'Base Plate': 'Standard or Custom with J-Bolts'
        },
        applications: [
            'Public Roads and Highways',
            'Industrial Complex Access Paths',
            'Housing Society Streets',
            'Parks and Perimeter Security'
        ],
        whyChooseUs: [
            '<strong>Corrosion Mastery:</strong> Our galvanizing process is built for the long term.',
            '<strong>Custom Design:</strong> We can fabricate poles as per your unique architectural needs.'
        ],
        imageUrl: '/lighting-poles.png'
    },
    'emergency-lighting-cbs': {
        slug: 'emergency-lighting-cbs',
        title: 'Central Battery Systems (CBS)',
        shortDescription: 'Reliable central battery systems for building-wide emergency and exit lighting.',
        keywords: [
            'Central Battery System',
            'CBS Panel',
            'Emergency Lighting System',
            'UPS for Lighting'
        ],
        overview: `
    <p><strong>EgSwitchGear Central Battery Systems (CBS)</strong> ensure that your facility is never in the dark during emergency events. Unlike individual battery packs in chaque light fixture, a CBS provides a centralized, easy-to-manage source of backup power for all emergency and exit lights.</p>

    <p>Our systems automatically monitor the main grid. In the event of an outage, they instantly activate lighting circuits using high-quality valve-regulated lead-acid (VRLA) batteries. This ensures safe evacuation routes are illuminated as per the latest fire and safety regulations.</p>

    <p>With integrated branch monitoring and automated test cycles, our CBS panels significantly reduce maintenance time and guarantee that your system is ready when it matters most.</p>
  `,
        features: [
            'Centralized monitoring and testing',
            'Instant battery backup activation',
            'Intelligent battery charging and lifecycle mgmt',
            'Branch circuit fault monitoring',
            'Compliance with BS EN 50171'
        ],
        specifications: {
            'Inverter Type': 'Pure Sine Wave',
            'Backup Duration': '1 Hour / 3 Hours Standard',
            'Battery Type': 'VRLA (Deep Cycle)',
            'Monitoring': 'LCD Display & Web/BMS Interface',
            'Standard': 'BS-5266-1 / Civil Defense Approved'
        },
        applications: [
            'Shopping Malls & Retail Hubs',
            'Hospitals & Hotels',
            'Cinemas & Public Assemblies',
            'High-Rise Corporate Buildings'
        ],
        whyChooseUs: [
            '<strong>Reliability Focused:</strong> We use deep-cycle batteries for maximum cycle life.',
            '<strong>Compliance Experts:</strong> We ensure your facility meets all civil defense codes.'
        ],
        imageUrl: '/cbs-system.jpg'
    },
    'power-backup-systems': {
        slug: 'power-backup-systems',
        title: 'Industrial & Commercial UPS Systems',
        shortDescription: 'Uninterruptible Power Supply (UPS) solutions for critical data and industrial processes.',
        keywords: [
            'Industrial UPS',
            'Online UPS',
            'Power Backup Panel',
            'Data Center Power'
        ],
        overview: `
    <p><strong>EgSwitchGear Power Backup Systems</strong> provide clean, stabilized, and continuous power for your most sensitive equipment. From IT infrastructure to industrial automation, an Uninterruptible Power Supply (UPS) is the final line of defense against power surges, voltage sags, and outages.</p>

    <p>We provide high-efficiency Online Double-Conversion UPS systems that isolate your load from grid disturbances. For industrial environments, we offer rugged systems that can handle inductive motor loads and harsh temperatures.</p>

    <p>Our solutions range from single-phase rack-mounted units to large three-phase modular systems that can scale with your business growth.</p>
  `,
        features: [
            'Online double-conversion technology',
            'High input power factor correction',
            'Zero transfer time to battery',
            'Modular and scalable architecture',
            'Advanced LCD graphical interface'
        ],
        specifications: {
            'Topology': 'Online Double Conversion',
            'Capacity': '1kVA to 800kVA',
            'Voltage': 'Single-Phase / 3-Phase',
            'Waveform': 'Pure Sine Wave',
            'Efficiency': 'Up to 96% in Eco-mode'
        },
        applications: [
            'Data Centers & Server Rooms',
            'Critical Medical Equipment',
            'Industrial Automation & PLCs',
            'Banking & Financial Infrastructure'
        ],
        whyChooseUs: [
            '<strong>Power Quality Specialists:</strong> We ensure your equipment is protected from all grid issues.',
            '<strong>Support Network:</strong> Dedicated battery maintenance and replacement services.'
        ],
        imageUrl: '/ups-system.webp'
    },
    'cctv-surveillance-systems': {
        slug: 'cctv-surveillance-systems',
        title: 'Industrial CCTV Surveillance Systems',
        shortDescription: 'Advanced IP-based CCTV systems for high-security industrial and commercial monitoring.',
        keywords: [
            'Industrial CCTV',
            'IP Surveillance System',
            'Security Camera Installation',
            'Network Video Recorder (NVR)'
        ],
        overview: `
    <p><strong>EgSwitchGear Industrial CCTV Surveillance Systems</strong> provide 24/7 high-definition security for your critical assets. In today's environment, a robust surveillance system is not just about recording; it's about real-time intelligence, deterring crime, and ensuring operational safety.</p>

    <p>We provide end-to-end IP-based solutions using top-tier cameras (Hikvision/Dahua/Axis) that feature AI-driven analytics such as facial recognition, perimeter intrusion alerts, and license plate recognition. Our systems are designed to operate in harsh industrial conditions, featuring explosion-proof and weather-resistant housings.</p>

    <p>From centralized command centers to mobile app monitoring, we ensure that your facility is always under a watchful eye.</p>
  `,
        features: [
            'High-definition IP cameras (4K resolution)',
            'AI analytics for intrusion and object detection',
            'Remote monitoring via secure mobile app',
            'Large-capacity redundant storage (NVR/NAS)',
            'Night-vision and thermal imaging options'
        ],
        specifications: {
            'Camera Type': 'Dome / Bullet / PTZ',
            'Resolution': '2MP to 12MP (4K)',
            'Storage': '4-Bay to 24-Bay NVRs',
            'Analytics': 'VCA (Video Content Analysis)',
            'Standard': 'ONVIF Compliant'
        },
        applications: [
            'Industrial Warehouses & Factories',
            'Commercial Shopping Centers',
            'Public Infrastructure & Parks',
            'High-Security Banking Zones'
        ],
        whyChooseUs: [
            '<strong>System Integrators:</strong> We design the network, not just mount cameras.',
            '<strong>Reliability:</strong> We use only enterprise-grade storage and camera hardware.'
        ],
        imageUrl: '/cctv-system.jpg'
    },
    'fire-alarm-systems': {
        slug: 'fire-alarm-systems',
        title: 'Addressable Fire Alarm Systems',
        shortDescription: 'Life-saving addressable fire detection and alarm systems for early warning and protection.',
        keywords: [
            'Fire Alarm Panel',
            'Smoke Detector',
            'Addressable Fire System',
            'Building Fire Safety'
        ],
        overview: `
    <p><strong>EgSwitchGear Fire Alarm Systems</strong> are designed to provide the earliest possible warning of a fire event, protecting lives and minimizing property damage. Our "Addressable" systems can pinpoint the exact location of a triggered sensor, allowing for rapid response by emergency teams.</p>

    <p>We integrate high-sensitivity smoke, heat, and flame detectors into a centralized control panel that can also manage elevators, HVAC dampers, and fire suppression systems. Our panels feature intuitive displays and can be integrated with Building Management Systems (BMS).</p>

    <p>Regulatory compliance is at our core—each system is designed and installed to meet the most stringent local and international fire safety codes.</p>
  `,
        features: [
            'Pinpoint accurate addressable detection',
            'Integration with suppression and HVAC',
            'Self-diagnostic sensor monitoring',
            'Remote notification to emergency services',
            'Backlit LCD for clear status reporting'
        ],
        specifications: {
            'Panel Type': 'Addressable / Conventional',
            'Loop Capacity': '1 to 8 Loops (Up to 2000 devices)',
            'Battery': '24V DC Backup Integrated',
            'Certification': 'UL Listed / LPCB Approved',
            'Standard': 'EN54 / NFPA 72'
        },
        applications: [
            'Multi-Story Hotels & Apartments',
            'Large Industrial Manufacturing',
            'Server Rooms & Data Centers',
            'Educational Campuses'
        ],
        whyChooseUs: [
            '<strong>Safety First:</strong> We never compromise on detection speed or reliability.',
            '<strong>Full Compliance:</strong> Our systems are built to pass all civil defense inspections.'
        ],
        imageUrl: '/fire-alarm.jpg'
    },
    'access-control-solutions': {
        slug: 'access-control-solutions',
        title: 'Electronic Access Control Solutions',
        shortDescription: 'Secure and manageable access control systems for restricted areas and employee attendance.',
        keywords: [
            'Access Control System',
            'Biometric Time Attendance',
            'Electronic Door Lock',
            'RFID Card Reader'
        ],
        overview: `
    <p><strong>EgSwitchGear Access Control Solutions</strong> give you total control over who enters your facility and when. From simple single-door biometric locks to complex multi-site RFID systems, our solutions secure your sensitive areas while streamlining employee movement.</p>

    <p>We provide a variety of authentication methods including Fingerprint, Face ID, Iris recognition, and Proximity Cards. Our web-based software allows administrators to manage permissions, track attendance, and receive real-time alerts for unauthorized entry attempts.</p>

    <p>Integrated with your security network, our access control becomes a powerful tool for both security and HR management.</p>
  `,
        features: [
            'Biometric and RFID authentication',
            'Web-based user and permission management',
            'Time & Attendance reporting for HR',
            'Anti-passback and lockdown logic',
            'Integration with Fire Alarm for emergency release'
        ],
        specifications: {
            'Auth Methods': 'Face / Fingerprint / Card / PIN',
            'Connectivity': 'TCP/IP / RS485 / Wiegand',
            'Lock Types': 'Mag-Lock / Electric Strike / Drop Bolt',
            'User Capacity': 'Up to 100,000 Users',
            'Software': 'Cloud or On-Premise management'
        },
        applications: [
            'Corporate Office Headquarters',
            'Restricted Lab & R&D Facilities',
            'IT Server Rooms',
            'Government Infrastructure'
        ],
        whyChooseUs: [
            '<strong>Security Architecture:</strong> We design multi-layered restricted access.',
            '<strong>Reliability:</strong> High-performance readers with low false-rejection rates.'
        ],
        imageUrl: '/access-control.webp'
    },
    'lightning-protection-earthing-systems': {
        slug: 'lightning-protection-earthing-systems',
        title: 'Lightning Protection Systems',
        shortDescription: 'Comprehensive lightning protection systems to shield structures and electronics from strikes.',
        keywords: [
            'Lightning Arrester',
            'Structural Protection',
            'ESE Lightning System',
            'Surge Protection'
        ],
        overview: `
    <p><strong>EgSwitchGear Lightning Protection Systems</strong> safeguard your structures and sensitive electronics from the devastating power of direct lightning strikes. A single strike can lead to fires, structural damage, and catastrophic loss of electronic equipment.</p>

    <p>We provide both 'Conventional' Faraday Cage systems and 'Early Streamer Emission' (ESE) arresters. Our engineering approach includes risk assessment, specialized earthing, and the installation of Surge Protection Devices (SPDs) to prevent transient voltages from entering your electrical network.</p>

    <p>Protecting high-rise buildings, telecommunication towers, and sensitive industrial plants is a specialty of our engineering team.</p>
  `,
        features: [
            'ESE and Conventional Arrester options',
            'Low-impedance down conductor system',
            'Specialized structural bonding',
            'Comprehensive surge protection (Type 1 & 2)',
            'Certified strike-counter options'
        ],
        specifications: {
            'System Type': 'Faraday Cage / ESE Arrester',
            'Arrester Material': 'Stainless Steel / Copper',
            'Down Conductor': 'Bare Copper Tape / PVC Coated',
            'Standard': 'IEC 62305 / NF C 17-102',
            'Earth Resistance': '< 10 Ohms (Typical)'
        },
        applications: [
            'Industrial High-Rises',
            'Telecom Towers',
            'Petrochemical Storage Tanks',
            'Hospitals & Schools'
        ],
        whyChooseUs: [
            '<strong>Calculated Safety:</strong> We use software to model the protection zone.',
            '<strong>End-to-End:</strong> From the roof arrester to the deep earthing pit.'
        ],
        imageUrl: '/lightning-protection.webp'
    },
    'earthing-material-manufacturing': {
        slug: 'earthing-material-manufacturing',
        title: 'Earthing & Grounding Materials',
        shortDescription: 'Manufactured earthing materials including rods, plates, and chemical compounds.',
        keywords: [
            'Earthing Rod',
            'Copper Plate',
            'Earthing Chemical',
            'Grounding System'
        ],
        overview: `
    <p><strong>EgSwitchGear Earthing & Grounding Materials</strong> are the foundation of any safe electrical installation. A proper earthing system ensures that fault currents are safely dissipated into the ground, preventing electric shocks and equipment damage.</p>

    <p>We manufacture a complete range of high-quality earthing materials, including Pure Copper and Copper-Bonded Grounding Rods, Earth Plates, Busbars, and specialized Earth Enhancement Compound (Backfill). Our materials are designed for high conductivity and long-term resistance to soil corrosion.</p>

    <p>Whether for a utility substation or a residential home, our manufactured materials provide the low-resistance path required for safety.</p>
  `,
        features: [
            'High-conductivity copper and bonded steel',
            'Corrosion-resistant for all soil types',
            'Moisture-retaining chemical backfill',
            'Precision-machined clamps and connectors',
            'Standard and custom dimensions'
        ],
        specifications: {
            'Rods': 'Solid Copper / Copper-Bonded Steel',
            'Plates': 'Pure Electrolytic Copper / GI',
            'Compound': 'Bentonite / Carbon-based backfill',
            'Thickness (Rod)': '14mm / 16mm / 20mm',
            'Standard': 'BS 7430 / IEEE 80'
        },
        applications: [
            'Electrical Substations',
            'Data Center Grounding',
            'Residential Safety Earthing',
            'Industrial Machine Grounding'
        ],
        whyChooseUs: [
            '<strong>Factory Direct:</strong> We manufacture the components, ensuring quality control.',
            '<strong>Long Life:</strong> Materials designed for 30+ years in the ground.'
        ],
        imageUrl: '/earthing-materials.jpg'
    },
    'data-racks': {
        slug: 'data-racks',
        title: 'Server & Network Data Racks',
        shortDescription: 'Professional server and network enclosures for organized IT infrastructure.',
        keywords: [
            'Server Rack',
            'Network Cabinet',
            '19 Inch Rack',
            'Data Center Enclosure'
        ],
        overview: `
    <p><strong>EgSwitchGear Server & Network Data Racks</strong> provide a secure and ventilated environment for your critical IT hardware. From small wall-mounted cabinets for edge networking to heavy-duty server racks for data centers, our enclosures are built for standard 19-inch mounting.</p>

    <p>Our racks feature superior cable management systems, high-ventilation perforated doors, and integrated PDU mounting options. They are fabricated from high-grade cold-rolled steel and finished with professional powder coating to ensure durability and aesthetic appeal.</p>

    <p>Every rack is designed for easy equipment installation and maintenance access, with removable side panels and adjustable mounting rails.</p>
  `,
        features: [
            'Standard 19\" mounting with adjustable depths',
            'High-flow perforated or tempered glass doors',
            'Vertical and horizontal cable management',
            'Secure locking side and rear panels',
            'Integrated cooling fan units'
        ],
        specifications: {
            'Height': '6U, 9U, 12U ... 42U, 47U',
            'Width': '600mm / 800mm',
            'Depth': '600mm / 800mm / 1000mm / 1200mm',
            'Material': 'SPCC Cold Rolled Steel',
            'Load Capacity': 'Up to 1500kg (Static)'
        },
        applications: [
            'Corporate Data Centers',
            'IT Network Rooms',
            'Security Command Centers',
            'Telecom Exchange Rooms'
        ],
        whyChooseUs: [
            '<strong>Professional Finish:</strong> Built for high-end server environments.',
            '<strong>Thermal Optimized:</strong> Designed to keep your hardware running cool.'
        ],
        imageUrl: '/data-racks.jpg'
    },
    'tv-telephone-junction-boxes': {
        slug: 'tv-telephone-junction-boxes',
        title: 'TV & Telephone Connection Boxes',
        shortDescription: 'Organized junction boxes for TV, telephone, and low-voltage signal distribution.',
        keywords: [
            'Telephone Junction Box',
            'TV Splitter Box',
            'Low Voltage Cabinet',
            'Signal Distribution Board'
        ],
        overview: `
    <p><strong>EgSwitchGear TV & Telephone Junction Boxes</strong> are the central distribution points for communication signals within a building. They provide an organized and protected space for telephone Krone modules, TV splitters, and coaxial cable connections.</p>

    <p>Eliminating the mess of loose cables, our junction boxes ensure that your communication network is easy to troubleshoot and expand. Available in flush-mounted and surface-mounted designs, they feature secure locking and professional labeling areas.</p>

    <p>Our boxes are high-grade steel fabricated, ensuring EMI/RFI shielding for stable signal quality throughout the facility.</p>
  `,
        features: [
            'Centralized signal distribution',
            'Organized module mounting and cabling',
            'EMI/RFI shielding (Steel construction)',
            'Flush or surface mounting options',
            'Secure key-locking system'
        ],
        specifications: {
            'Material': 'Sheet Steel / PVC options',
            'Capacity': '10 Pair to 500 Pair (Telephone)',
            'Finish': 'Powder Coated (Typical White/Grey)',
            'IP Rating': 'IP40 / IP44',
            'Internal': 'Adjustable mounting rails / backboard'
        },
        applications: [
            'High-Rise Apartments',
            'Hotels & Guest Houses',
            'Large Office Complexes',
            'University Hostels'
        ],
        whyChooseUs: [
            '<strong>Organization First:</strong> We turn cable chaos into professional networks.',
            '<strong>Quality Build:</strong> Robust hinges and locks for long-term use.'
        ],
        imageUrl: '/junction-boxes.jpg'
    },
    'meter-boxes': {
        slug: 'meter-boxes',
        title: 'Electrical Meter Boxes & Cabinets',
        shortDescription: 'Secure and weather-protected enclosures for utility energy meters.',
        keywords: [
            'Electric Meter Box',
            'Utility Meter Cabinet',
            'Safety Meter Enclosure',
            'Outdoor Meter Board'
        ],
        overview: `
    <p><strong>EgSwitchGear Electrical Meter Boxes</strong> are designed to house utility energy meters, providing protection from the elements and preventing unauthorized tampering. Our meter boxes are approved by various utility companies for residential and commercial connections.</p>

    <p>Fabricated from weather-resistant materials like Galvanized Steel or High-Impact Polycarbonate, our boxes feature transparent observation windows for easy meter reading. They include dedicated locations for incoming service fuses and outgoing circuit breakers.</p>

    <p>Safety is paramount—our boxes feature proper earthing terminals and anti-tamper seal provisions to ensure utility compliance.</p>
  `,
        features: [
            'Transparent window for meter reading',
            'Anti-tamper seal and lock provisions',
            'Weatherproof (IP54/65) for outdoor use',
            'Integrated fuse and breaker compartments',
            'High-impact resistant construction'
        ],
        specifications: {
            'Material': 'Galvanized Steel / Polycarbonate / GRP',
            'Meters': 'Single Phase / 3-Phase capacity',
            'Type': 'Single Meter / Multi-Tenant Cabinets',
            'Standard': 'Compliant with local Utility (WAPDA/KE etc.)',
            'Mounting': 'Wall / Pole / Flush Mounted'
        },
        applications: [
            'Residential Housing Projects',
            'Commercial Plaza Tenant Metering',
            'Industrial Power In-feeds',
            'Public Utility Distribution'
        ],
        whyChooseUs: [
            '<strong>Utility Approved:</strong> Designed to meet local power company standards.',
            '<strong>Tamper Proof:</strong> Robust security features to prevent energy theft.'
        ],
        imageUrl: '/meter-boxes.webp'
    },
    'warehousing-racking-systems': {
        slug: 'warehousing-racking-systems',
        title: 'Industrial Warehousing & Racking',
        shortDescription: 'Heavy-duty pallet racking and shelving systems for optimized warehouse storage.',
        keywords: [
            'Pallet Racking',
            'Warehouse Shelving',
            'Industrial Storage System',
            'Heavy Duty Racks'
        ],
        overview: `
    <p><strong>EgSwitchGear Industrial Warehousing & Racking Systems</strong> are engineered to maximize your vertical storage space and streamline inventory management. Our racking solutions are designed for strength, safety, and operational efficiency in high-volume environments.</p>

    <p>We provide a variety of systems including Selective Pallet Racking, Drive-In Racking, and Long-Span Shelving. Each system is fabricated from high-tensile steel and features a robust powder-coated finish. Our engineering team provides layout optimization services to ensure you get the maximum pallet positions out of your available floor area.</p>

    <p>Safety is integrated into every design, with heavy-duty uprights, cross-beams, and safety locking pins ensuring stability under maximum load.</p>
  `,
        features: [
            'High load-bearing capacity uprights and beams',
            'Adjustable beam levels for diverse load sizes',
            'Modular design for easy expansion',
            'Safety locking mechanisms on all beams',
            'Corrosion-resistant powder coated finish'
        ],
        specifications: {
            'Material': 'High Tensile Cold Rolled Steel',
            'Capacity': '500kg to 3000kg per level',
            'Finish': 'Industrial Powder Coating',
            'Type': 'Selective / Drive-in / Cantilever',
            'Standard': 'As per FEM / RMI Standards'
        },
        applications: [
            'Large Distribution Centers',
            'Manufacturing Raw Material Stores',
            'Cold Storage Facilities',
            'Retail Back-room Storage'
        ],
        whyChooseUs: [
            '<strong>Space Optimization:</strong> We design layouts that maximize your storage density.',
            '<strong>Certified Strength:</strong> Racks designed for the heaviest industrial loads.'
        ],
        imageUrl: '/warehousing-racks.jpg'
    },
    'industrial-furniture': {
        slug: 'industrial-furniture',
        title: 'Heavy-Duty Industrial Furniture',
        shortDescription: 'Ergonomic and robust workstations, benches, and furniture for industrial environments.',
        keywords: [
            'Industrial Workstation',
            'Heavy Duty Workbench',
            'Workshop Table',
            'Industrial Seating'
        ],
        overview: `
    <p><strong>EgSwitchGear Industrial Furniture</strong> is built to withstand the rigors of a 24/7 manufacturing environment. Unlike standard office furniture, our industrial line features heavy-gauge steel construction, impact-resistant surfaces, and ergonomic designs that enhance worker productivity.</p>

    <p>From heavy-duty workbenches with integrated tool storage to specialized assembly line workstations, we provides custom solutions tailored to your specific process. Our furniture is finished with durable powder coating that resists chemicals, scratches, and oil.</p>

    <p>We focus on ergonomics, ensuring that work heights and tool access are optimized to reduce strain and increase efficiency on the factory floor.</p>
  `,
        features: [
            'All-welded heavy-gauge steel construction',
            'Ergonomic adjustable height options',
            'Integrated power and air tool points',
            'Chemical and scratch resistant surfaces',
            'Customizable tool board and shelving attachments'
        ],
        specifications: {
            'Top Material': 'Steel / Hardwood / ESD Laminate',
            'Frame': 'Tubular or C-Channel Steel',
            'Load Capacity': 'Up to 1000kg (Static)',
            'Finish': 'Epoxy Powder Coated',
            'Accessories': 'Drawers, Power Strips, LED Lighting'
        },
        applications: [
            'Electronics Assembly Lines',
            'Automotive Repair Workshops',
            'Industrial R&D Laboratories',
            'Quality Control Stations'
        ],
        whyChooseUs: [
            '<strong>Built to Last:</strong> Furniture that survives decades of industrial use.',
            '<strong>Process Specific:</strong> We customize every bench to your team\'s workflow.'
        ],
        imageUrl: '/industrial-furniture.webp'
    },
    'employee-staff-lockers': {
        slug: 'employee-staff-lockers',
        title: 'Staff & Employee Lockers',
        shortDescription: 'Secure and ventilated steel lockers for staff and employee changing rooms.',
        keywords: [
            'Staff Locker',
            'Steel Locker Cabinet',
            'Industrial Changing Room Locker',
            'Secure Personal Storage'
        ],
        overview: `
    <p><strong>EgSwitchGear Staff & Employee Lockers</strong> provide a professional and secure storage solution for workers' personal belongings. Designed for durability and hygiene, our lockers are a staple in industrial changing rooms, gyms, and educational institutions.</p>

    <p>Each locker features an integrated ventilation system to maintain airflow and prevent odors. We use high-quality cam locks or padlock hasps for security, and the reinforced doors are designed to withstand repetitive daily use.</p>

    <p>Available in various configurations (1 to 6 tiers), our lockers can be customized in color to match your facility's branding while providing a clean, organized look to staff areas.</p>
  `,
        features: [
            'Anticorrosive steel construction',
            'Integrated door ventilation slots',
            'Reinforced doors with acoustic bumpers',
            'Secure master-key or padlock options',
            'Anti-bacterial powder coat available'
        ],
        specifications: {
            'Material': '0.7mm to 1.2mm Cold Rolled Steel',
            'Tiers': '1, 2, 3, 4, 5, or 6 Tier',
            'Dimensions': 'Standard 1800H x 300W x 450D mm',
            'Finish': 'Polyester Powder Coated',
            'Lock': 'Cam Lock / Padlock Hasp / Digital'
        },
        applications: [
            'Factory Changing Rooms',
            'High-School & University Corridors',
            'Gyms & Fitness Centers',
            'Hospital Staff Areas'
        ],
        whyChooseUs: [
            '<strong>Hygiene Focused:</strong> Easy-to-clean surfaces with proper airflow.',
            '<strong>Robust Security:</strong> Doors and locks designed for daily industrial use.'
        ],
        imageUrl: '/staff-lockers.jpg'
    },
    'tools-cabinets': {
        slug: 'tools-cabinets',
        title: 'Mobile & Stationary Tool Cabinets',
        shortDescription: 'Organized and secure storage for industrial tools and sensitive equipment.',
        keywords: [
            'Tool Cabinet',
            'Mobile Tool Trolley',
            'Workshop Storage',
            'CNC Tool Storage'
        ],
        overview: `
    <p><strong>EgSwitchGear Tool Cabinets</strong> are the ultimate solution for organizing and protecting expensive industrial tools. A well-organized workshop is a safe and productive workshop, and our cabinets ensure every tool has its place.</p>

    <p>We offer both stationary cabinets for heavy equipment and mobile tool trolleys for technicians on the move. Our drawers feature high-quality ball-bearing slides that open smoothly even under full load. With integrated central locking, you can ensure your inventory remains secure at all times.</p>

    <p>Specialized options are available for CNC tooling, featuring protective plastic inserts that prevent damage to precision cutters and holders.</p>
  `,
        features: [
            'Heavy-duty ball-bearing drawer slides',
            'Centralized key-locking system',
            'Mobile versions with industrial casters',
            'Non-slip drawer liners included',
            'Full-width aluminum drawer pulls'
        ],
        specifications: {
            'Load Capacity': '40kg to 100kg per drawer',
            'Cabinet Type': 'Stationary / Mobile / Wall Mounted',
            'Drawer Count': '3 to 15 Drawers per unit',
            'Finish': 'Textured Powder Coating',
            'Specialized': 'Anti-static (ESD) options'
        },
        applications: [
            'Automotive Workshops',
            'CNC Machining Centers',
            'Maintenance & Engineering Departments',
            'Aircraft Hangar Maintenance'
        ],
        whyChooseUs: [
            '<strong>Organization Mastery:</strong> Maximize technician efficiency with perfect storage.',
            '<strong>Heavy Duty:</strong> Drawers that never sag, even when full of heavy steel tools.'
        ],
        imageUrl: '/tool-cabinets.webp'
    },
    'powder-coating': {
        slug: 'powder-coating',
        title: 'Industrial Powder Coating Services',
        shortDescription: 'Professional electrostatic powder coating for durable and aesthetic metal finishing.',
        keywords: [
            'Powder Coating Service',
            'Metal Finishing',
            'Electrostatic Spray Painting',
            'Durable Metal Coating'
        ],
        overview: `
    <p><strong>EgSwitchGear Powder Coating Services</strong> provide a superior, durable finish for all types of metal products. As part of our integrated manufacturing facility, we offer high-volume conveyorized powder coating that ensures a consistent, high-quality result every time.</p>

    <p>The process involves a multi-stage chemical pre-treatment (Phospatizing) to ensure maximum adhesion and corrosion resistance. We then apply dry powder electrostatically and cure it under controlled high temperatures to create a hard, beautiful finish that is far tougher than conventional liquid paint.</p>

    <p>With a vast range of RAL colors and textures (Matt, Glossy, Hammer-tone), we can match any architectural or industrial specification.</p>
  `,
        features: [
            'Automated 7-stage chemical pre-treatment',
            'Consistent finish for high-volume batches',
            'High resistance to UV, chemicals, and impact',
            'Environmentally friendly (No VOCs)',
            'Huge variety of RAL colors and textures'
        ],
        specifications: {
            'Max Part Size': '3000L x 1500W x 2000H mm',
            'Coating Type': 'Epoxy / Polyester / Hybrid',
            'Curing Temp': '180°C to 200°C',
            'Thickness': '60 to 120 microns',
            'Compliance': 'As per ASTM Standards'
        },
        applications: [
            'Electrical Enclosures & Panels',
            'Automotive Parts & Rims',
            'Architectural Windows & Doors',
            'Industrial Machinery & Furniture'
        ],
        whyChooseUs: [
            '<strong>Quality Control:</strong> We monitor every stage from pre-treatment to curing.',
            '<strong>Durability:</strong> Our finishes are built to survive harsh industrial environments.'
        ],
        imageUrl: '/powder-coating.webp'
    },
    'hot-dip-galvanized-zinc-coating': {
        slug: 'hot-dip-galvanized-zinc-coating',
        title: 'Hot-Dip Galvanizing Services',
        shortDescription: 'Premium zinc coating services for unmatched corrosion protection of steel structures.',
        keywords: [
            'Hot Dip Galvanizing',
            'Zinc Coating Service',
            'Corrosion Protection Steel',
            'Galvanized Steel Finish'
        ],
        overview: `
    <p><strong>EgSwitchGear Hot-Dip Galvanizing Services</strong> offer the ultimate protection for steel against rust and corrosion. Unlike paint, galvanizing creates a metallurgical bond with the steel, forming a series of zinc-iron alloy layers that protect even if the surface is scratched.</p>

    <p>Our process involves immersing cleaned steel into a molten zinc bath at approximately 450°C. This ensures that every corner, hollow, and internal surface of your structure is coated. This is the gold standard for outdoor infrastructure, power towers, and coastal installations.</p>

    <p>A galvanized structure from EgSwitchGear can easily last 25 to 50 years without maintenance, providing the lowest lifecycle cost for any steel protection method.</p>
  `,
        features: [
            'Complete all-surface coverage (including internals)',
            'Self-healing metallurgical bond',
            'Unmatched resistance to mechanical damage',
            'Maintenance-free service life (25+ years)',
            'Cathodic protection for exposed steel'
        ],
        specifications: {
            'Zinc Purity': '99.9% Special High Grade Zinc',
            'Bath Temp': '440°C to 460°C',
            'Coating Weight': 'Minimum 610g/m² (Typical)',
            'Standard': 'ASTM A123 / ISO 1461',
            'Testing': 'Magnetic thickness & Adhesion tests'
        },
        applications: [
            'Power Transmission Towers',
            'Street Light Poles & High Masts',
            'Outdoor Cable Management Systems',
            'Construction Steel Beams & Framework'
        ],
        whyChooseUs: [
            '<strong>Lifetime Protection:</strong> We provide coating that outlasts the structure itself.',
            '<strong>Volume Capacity:</strong> Large bath sizes for major infrastructure components.'
        ],
        imageUrl: '/hot-dip-galvanizing.jpg'
    },
    'laser-cutting-services': {
        slug: 'laser-cutting-services',
        title: 'Precision CNC Laser Cutting',
        shortDescription: 'High-precision laser cutting for sheet metal fabrication and custom parts.',
        keywords: [
            'Laser Cutting Service',
            'CNC Metal Cutting',
            'Sheet Metal Fabrication',
            'Precision Steel Cutting'
        ],
        overview: `
    <p><strong>EgSwitchGear Precision CNC Laser Cutting</strong> brings your digital designs to life with unmatched accuracy. Using state-of-the-art Fiber Laser technology, we can cut complex shapes out of Mild Steel, Stainless Steel, and Aluminum with tolerances as tight as +/- 0.1mm.</p>

    <p>Laser cutting eliminates the need for expensive tooling, making it ideal for both rapid prototyping and full-scale production runs. The process leaves a clean, burr-free edge that often requires no further finishing, reducing your overall manufacturing costs.</p>

    <p>Whether you need custom electrical panel cutouts, decorative architectural screens, or precision machine parts, our laser services provide the speed and accuracy your project demands.</p>
  `,
        features: [
            'High-precision cutting (+/- 0.1mm accuracy)',
            'Clean edges with minimal heat-affected zones',
            'High-speed processing for production runs',
            'Ability to cut complex and intricate patterns',
            'Supports CAD/DXF file imports for direct production'
        ],
        specifications: {
            'Max Sheet Size': '1500mm x 3000mm',
            'Mild Steel': 'Up to 20mm thickness',
            'Stainless Steel': 'Up to 10mm thickness',
            'Aluminum': 'Up to 10mm thickness',
            'Technology': 'High-Efficiency Fiber Laser'
        },
        applications: [
            'Electrical Panel Doors & Enclosures',
            'Custom Brackets & Automotive Parts',
            'Architectural Screens & Signage',
            'Industrial Machine Components'
        ],
        whyChooseUs: [
            '<strong>Technology Leaders:</strong> We use the latest high-wattage fiber lasers.',
            '<strong>Material Knowledge:</strong> We optimize laser settings for a perfect edge on every metal.'
        ],
        imageUrl: '/laser-cutting.jpg'
    },
    'custom-fabrication-services': {
        slug: 'custom-fabrication-services',
        title: 'Bespoke Metal Fabrication',
        shortDescription: 'End-to-end custom metal fabrication from design to final product.',
        keywords: [
            'Metal Fabrication',
            'Custom Steel Work',
            'Welding & Assembly',
            'Sheet Metal Engineering'
        ],
        overview: `
    <p><strong>EgSwitchGear Custom Fabrication Services</strong> turn your unique engineering challenges into reality. We are more than just a shop; we are an engineering-driven fabrication partner capable of handling everything from initial design to final assembly and finishing.</p>

    <p>Our facility is equipped for CNC Bending, TIG/MIG/Spot Welding, and precision assembly. Our team of skilled fabricators works closely with your drawings to ensure every weld, fold, and joint meets your specifications. We specialize in creating custom enclosures, trolleys, skids, and industrial housings.</p>

    <p>With integrated Laser Cutting, Bending, and Powder Coating under one roof, we provide a true one-stop-shop experience for all your custom metalwork needs.</p>
  `,
        features: [
            'Full-service CNC bending and forming',
            'Certified TIG, MIG, and ARC welding',
            'In-house engineering and CAD design support',
            'Prototypes to high-volume production',
            'Integrated finishing (Powder coat/Galvanizing)'
        ],
        specifications: {
            'Welding': 'MS / SS / Aluminum certified',
            'Bending': 'CNC Synchronized Press Brake',
            'Assembly': 'Mechanical and Hardware integration',
            'Inspection': 'Dimensional & Weld quality checks',
            'Design': 'SolidWorks / AutoCAD support'
        },
        applications: [
            'Custom Electrical Enclosures',
            'Industrial Machine Guards & Skids',
            'Commercial Kitchen Equipment',
            'Specialized Transport Trolleys'
        ],
        whyChooseUs: [
            '<strong>Total Solution:</strong> Design, Cut, Bend, Weld, and Finish—all in one place.',
            '<strong>Engineering Driven:</strong> We focus on structural integrity and precision.'
        ],
        imageUrl: '/custom-fabrication.jpg'
    },
    'solar-panels': {
        slug: 'solar-panels',
        title: 'High-Efficiency Solar Modules (PV)',
        shortDescription: 'Tier-1 Mono-PERC solar panels for residential, commercial, and industrial arrays.',
        keywords: [
            'Solar Panel',
            'Photovoltaic Module',
            'Mono-PERC Panel',
            'Tier-1 Solar Panels'
        ],
        overview: `
    <p><strong>EgSwitchGear Solar Panels</strong> are the engine of your renewable energy system. We provide Tier-1 high-efficiency Mono-PERC modules that offer the highest energy yield per square meter, even in the high-temperature environment of Pakistan.</p>

    <p>Our panels feature Half-Cut cell technology which reduces internal losses and improves performance under partial shade. With anti-reflective glass and robust frames, these panels are designed for a 25-year service life with minimal degradation.</p>

    <p>Whether you are building a small residential system or a multi-megawatt industrial solar park, our panels provide the reliability and ROI your investment deserves.</p>
  `,
        features: [
            'Tier-1 High-Efficacy Mono-PERC technology',
            'Half-Cut cell design for better shade performance',
            'Superior temperature coefficient for hot climates',
            'High-strength reinforced aluminum frames',
            '25-Year linear power output warranty'
        ],
        specifications: {
            'Efficiency': 'Up to 21.5% +',
            'Technology': 'Mono-PERC / Bifacial options',
            'Power Range': '540W to 670W+ per panel',
            'Protection': 'IP68 Junction Box with bypass diodes',
            'Certifications': 'IEC 61215 / IEC 61730'
        },
        applications: [
            'Residential Rooftop Solar',
            'Commercial Office Arrays',
            'Industrial Captive Power Plants',
            'Off-Grid & Hybrid Solar Systems'
        ],
        whyChooseUs: [
            '<strong>Tier-1 Only:</strong> We only supply world-renowned, bankable solar brands.',
            '<strong>Performance Proven:</strong> Selected for maximum yield in high-heat zones.'
        ],
        imageUrl: '/solar-mounting.jpg'
    },
    'inverters': {
        slug: 'inverters',
        title: 'Smart Solar Inverters',
        shortDescription: 'Advanced grid-tie, hybrid, and off-grid inverters for smart energy management.',
        keywords: [
            'Solar Inverter',
            'Hybrid Inverter',
            'Grid-Tie Inverter',
            'Solar Power Converter'
        ],
        overview: `
    <p><strong>EgSwitchGear Smart Solar Inverters</strong> are the intelligent core of your solar power system. They convert the DC power from your panels into clean, usable AC power for your facility, while managing the flow between the grid, your solar array, and your battery storage.</p>

    <p>We provide a range of On-Grid, Off-Grid, and Hybrid inverters from globally leading brands. Our inverters feature dual-MPPT trackers to maximize yield from different roof orientations and include comprehensive mobile apps for real-time monitoring of your energy production and savings.</p>

    <p>With integrated protection against surges and grid fluctuations, our inverters ensure your solar investment remains safe and productive.</p>
  `,
        features: [
            'High DC-to-AC conversion efficiency (>98%)',
            'Multiple MPPT trackers for maximum yield',
            'Mobile app and web portal monitoring',
            'Battery management for hybrid systems',
            'Integrated DC and AC surge protection'
        ],
        specifications: {
            'Type': 'Grid-Tie / Hybrid / Off-Grid',
            'Phase': 'Single-Phase / 3-Phase',
            'Efficiency': 'Up to 98.6%',
            'Monitoring': 'WiFi / Ethernet / GPRS',
            'Warranty': '5 to 10 Year Standard'
        },
        applications: [
            'Net-Metered Residential Systems',
            'Commercial Zero-Export Solutions',
            'Industrial Hybrid Backups',
            'Remote Off-Grid Power Stations'
        ],
        whyChooseUs: [
            '<strong>Intelligence First:</strong> Our inverters optimize your energy use 24/7.',
            '<strong>Authorized Support:</strong> Local technical support and warranty services.'
        ],
        imageUrl: '/solar-inverters.webp'
    },
    'mounting-structures': {
        slug: 'mounting-structures',
        title: 'Solar Mounting Structures',
        shortDescription: 'Engineered metal structures for secure and optimized solar panel installation.',
        keywords: [
            'Solar Mounting Frame',
            'Rooftop Solar Structure',
            'Ground Mount Solar',
            'Galvanized Solar Racking'
        ],
        overview: `
    <p><strong>EgSwitchGear Solar Mounting Structures</strong> are designed to survive the harshest winds while maintaining the perfect angle for your solar panels. As a fabricator, we provide engineered solutions that far exceed standard aluminum rails.</p>

    <p>We manufacture structures from High-Grade Hot-Dip Galvanized steel for ground mounts and industrial roofs, ensuring they never rust. For residential rooftops, we provide sleek, lightweight aluminum mounting systems that are fast to install and easy on your structures.</p>

    <p>Every structure is designed with wind-load calculations to ensure your panels stay exactly where they belong, even during the most severe storms.</p>
  `,
        features: [
            'Wind load calculated engineering (up to 150km/h)',
            'Hot-Dip Galvanized or Anodized Aluminum',
            'Corrosion-free for 25+ years',
            'Adjustable tilt for seasonal optimization',
            'Universal clamps for all panel sizes'
        ],
        specifications: {
            'Material': 'Galvanized Steel / Aluminum 6005-T5',
            'Structure Type': 'Elevated / Flush-mount / Ground-mount',
            'Finish': 'Hot Dip Galv (80+ microns)',
            'Compliance': 'As per ASCE/SEI 7 Standards',
            'Fasteners': 'Stainless Steel (SS304)'
        },
        applications: [
            'Elevated Rooftop Structures',
            'Industrial Tin-Shed Mounting',
            'Utility-Scale Ground Arrays',
            'Solar Carport Structures'
        ],
        whyChooseUs: [
            '<strong>Fabrication Quality:</strong> We build the strongest structures in the industry.',
            '<strong>Rust Proof:</strong> We guarantee our galvanized finish for the life of your panels.'
        ],
        imageUrl: '/solar-mounting.jpg'
    },
    'batteries': {
        slug: 'batteries',
        title: 'Solar Energy Storage Batteries',
        shortDescription: 'High-performance Lithium-Ion and Deep-Cycle batteries for reliable solar backup.',
        keywords: [
            'Solar Battery',
            'Lithium-Ion Pack',
            'Deep Cycle Battery',
            'Energy Storage System (ESS)'
        ],
        overview: `
    <p><strong>EgSwitchGear Solar Energy Storage Batteries</strong> allow you to use your solar power even when the sun goes down. From the latest Lithium-Iron-Phosphate (LiFePO4) technology to reliable Deep-Cycle Gel batteries, we provide the storage solution that fits your budget and energy needs.</p>

    <p>Our Lithium solutions offer 10+ years of life, deep discharge cycles, and integrated Smart BMS monitoring. For cost-effective backup, our heavy-duty Tubular and Gel batteries provide dependable performance for night-time loads and outages.</p>

    <p>Secure your energy independence with a battery system that is sized correctly for your load and environment.</p>
  `,
        features: [
            'High cycle life (up to 6000 cycles for Lithium)',
            'Integrated Smart Battery Management (BMS)',
            'Fast charging and high discharge capability',
            'Maintenance-free sealed designs',
            'Compact and wall-mountable options'
        ],
        specifications: {
            'Chemistry': 'Lithium (LiFePO4) / VRLA / Gel / Tubular',
            'Voltage': '12V / 24V / 48V / 51.2V',
            'Capacity': '100Ah to 1000Ah +',
            'Life Expectancy': '2 - 15 Years (Based on Chemistry)',
            'Standard': 'IEC 62619 / UN38.3 (Lithium)'
        },
        applications: [
            'Hybrid Solar Energy Storage',
            'Off-Grid Power Systems',
            'Critical Backup for Servers & UPS',
            'Industrial Peak-Shaving Systems'
        ],
        whyChooseUs: [
            '<strong>Life-Cycle Value:</strong> we only supply batteries with proven high-cycle counts.',
            '<strong>Safety First:</strong> Advanced BMS keeps your batteries within safe limits.'
        ],
        imageUrl: '/solar-batteries.webp'
    },



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
