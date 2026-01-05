import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env');
    process.exit(1);
}

// Standalone Schema Definitions to avoid import issues
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    description: { type: String, trim: true },
    content: { type: String },
    keywords: { type: [String], default: [] },
    level: { type: Number, default: 0 },
    parentCategory: { type: String, default: null },
    relatedCategories: { type: [String], default: [] },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, index: true },
    subCategory: { type: String },
    // Other fields optional for this script
}, { strict: false }); // Strict false to allow other fields to exist without defining them

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// Full Mega Menu Data and Content (Same as before)
const productCategories = [
    {
        title: 'Electrical Power Panels Distribution',
        items: [
            'LT Panels', 'ATS/AMF Panels', 'Sync Panels', 'MCC Panels', 'PFI Plant',
            'VFD Panel', 'Phase Correction Panel', 'Sub-Main Panels', 'Auto & Manual Change Over Panels',
            'Control & Relay Panels', 'Bus Coupler', 'Feeder Pillar', 'Lighting Panels',
            'Distribution Boards', 'Bus Tie Duct'
        ]
    },
    {
        title: 'Cable Management Solutions',
        items: [
            'Cable Trays', 'Cable Trunking', 'Cable Ladders', 'Cable Tray Accessories',
            'Services Boxes', 'Bus Way System'
        ]
    },
    {
        title: 'Industrial Automation & Control',
        items: [
            'PLC Automation Systems', 'Building Management Systems (BMS)', 'Energy Monitoring Systems'
        ]
    },
    {
        title: 'Lighting & Emergency Systems',
        items: [
            'Commercial & Industrial Lighting', 'Street Lighting Poles', 'Emergency Lighting (CBS)',
            'Power Backup Systems'
        ]
    },
    {
        title: 'Security & Safety Solutions',
        items: [
            'CCTV Surveillance Systems', 'Fire Alarm Systems', 'Access Control Solutions',
            'Lightning Protection & Earthing Systems', 'Earthing Material Manufacturing'
        ]
    },
    {
        title: 'Industrial & Telecom Enclosures',
        items: [
            'Data Racks', 'TV & Telephone Junction Boxes', 'Meter Boxes'
        ]
    },
    {
        title: 'Storage & Infrastructure Solutions',
        items: [
            'Warehousing & Racking Systems', 'Industrial Furniture', 'Employee & Staff Lockers',
            'Tools Cabinets'
        ]
    },
    {
        title: 'Fabrication & Coating Services',
        items: [
            'Powder Coating', 'Hot Dip Galvanized Zinc Coating', 'Laser Cutting Services',
            'Custom Fabrication Services'
        ]
    },
    {
        title: 'Solar Systems',
        items: [
            'Solar Panels', 'Inverters', 'Mounting Structures', 'Batteries'
        ]
    },
];

const RESEARCH_CONTENT: Record<string, string> = {
    'LT Panels': `
        <h3>Essential Industrial Switchgear for Safe and Efficient Power Distribution</h3>
        <p>Low Tension (LT) Panels are fundamental components in modern electrical distribution systems, designed to manage, distribute, and safeguard electricity at low voltage levels. They serve as the central hub for controlling and distributing power from a main source to various electrical devices.</p>
        <h4>Key Benefits</h4>
        <ul>
            <li><strong>Enhanced Safety:</strong> Provides critical protection against short circuits and overloads.</li>
            <li><strong>Reliable Distribution:</strong> Ensures consistent power flow to critical machinery.</li>
            <li><strong>Energy Efficiency:</strong> Helps in monitoring and optimizing power usage.</li>
        </ul>
        <h4>Applications</h4>
        <p>Widely used in factories, commercial buildings, data centers, and hospitals for main power distribution.</p>
    `,
    'ATS/AMF Panels': `
        <h3>Seamless Power, Uninterrupted Operations</h3>
        <p>Automatic Transfer Switch (ATS) and Automatic Mains Failure (AMF) panels are the intelligent brain of your backup power system. They automatically detect power outages and seamlessly switch your load to a backup generator, ensuring zero downtime.</p>
        <h4>How It Works</h4>
        <p>When the main grid fails, the AMF controller signals the generator to start. Once the generator is stable, the ATS transfers the load. When grid power returns, it safely transfers back and cools down the generator.</p>
        <h4>Key Features</h4>
        <ul>
            <li>Automatic Generator Start/Stop</li>
            <li>Real-time Grid Monitoring (Voltage/Frequency)</li>
            <li>Seamless Load Transfer</li>
        </ul>
    `,
    'PFI Plant': `
        <h3>Optimize Power Efficiency and Reduce Costs</h3>
        <p>Power Factor Improvement (PFI) Plants are designed to optimize the efficiency of your electrical system by correcting the power factor towards unity (1.0). This reduces reactive power waste and eliminates utility penalties.</p>
        <h4>Why You Need PFI</h4>
        <ul>
            <li><strong>Lower Electricity Bills:</strong> Avoid low power factor penalties.</li>
            <li><strong>Increased Capacity:</strong> Free up transformer and cable capacity.</li>
            <li><strong>Equipment Longevity:</strong> Reduce heat loss and component stress.</li>
        </ul>
    `,
    'Cable Management Solutions': `
        <h3>Optimizing Industrial Operations</h3>
        <p>Efficient cable management is the foundation of safety and reliability. Our solutions organize, route, and protect electrical and data cables to prevent hazards and ensure system integrity.</p>
        <h4>Our Offerings</h4>
        <ul>
            <li><strong>Cable Trays:</strong> Perforated, Ladder, and Mesh types.</li>
            <li><strong>Trunking:</strong> Secure enclosure for sensitive wiring.</li>
            <li><strong>Accessories:</strong> Comprehensive range of bends, couplers, and supports.</li>
        </ul>
    `
};

const DEFAULT_CONTENT = (name: string) => `
    <h3>High-Quality ${name} Solutions in Pakistan</h3>
    <p>EgSwitchGear provides top-tier <strong>${name}</strong> designed for industrial reliability and performance. Our solutions are engineered to meet international safety standards and operational requirements.</p>
    <h4>Why Choose Our ${name}?</h4>
    <ul>
        <li><strong>Durability:</strong> Built to withstand harsh industrial environments.</li>
        <li><strong>Customization:</strong> Tailored specifications to meet your project needs.</li>
        <li><strong>Compliance:</strong> Manufactured in accordance with IEC and local standards.</li>
    </ul>
    <p>Contact us today for a quote on superior ${name} solutions.</p>
`;

async function seed() {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected.');

    console.log('Clearing existing categories...');
    await Category.deleteMany({});

    console.log('Seeding categories...');

    for (const group of productCategories) {
        // Create Main Category
        const mainSlug = group.title;
        await Category.create({
            name: group.title,
            slug: mainSlug,
            description: `Comprehensive ${group.title} solutions for industrial applications.`,
            content: RESEARCH_CONTENT[group.title] || DEFAULT_CONTENT(group.title),
            keywords: [group.title, 'Industrial Equipment', 'Pakistan Switchgear'],
            level: 0,
            relatedCategories: group.items,
        });
        console.log(`Created Main: ${group.title}`);

        // Create Sub Categories
        for (const item of group.items) {
            await Category.create({
                name: item,
                slug: item,
                description: `Premium ${item} manufacturing and supply in Pakistan.`,
                content: RESEARCH_CONTENT[item] || DEFAULT_CONTENT(item),
                keywords: [item, group.title, 'Switchgear', 'Electrical Panel'],
                level: 1,
                parentCategory: mainSlug,
                relatedCategories: [mainSlug],
            });
            console.log(`  -> Created Sub: ${item}`);
        }
    }

    const productCount = await Product.countDocuments();
    console.log(`Verified ${productCount} existing products.`);

    console.log('Seeding complete.');
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
