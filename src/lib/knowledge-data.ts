
export interface FaqItem {
    question: string;
    answer: string;
}

export interface ResourceItem {
    title: string;
    description: string;
    downloadUrl: string; // In real app this would be a PDF
    type: 'Guide' | 'Manual' | 'Checklist' | 'Safety';
}

export const faqs: FaqItem[] = [
    {
        question: "What is the difference between LT and HT Switchgear?",
        answer: "LT (Low Tension) switchgear operates up to 1000V AC and is used for distribution within buildings. HT (High Tension) operates above 1000V (e.g., 11kV) and is used for power transmission and main substation switching."
    },
    {
        question: "Do you provide installation services?",
        answer: "Yes, we offer complete installation, testing, and commissioning services for all our panels across Pakistan (Karachi, Lahore, Islamabad, etc.)."
    },
    {
        question: "Are your panels IEC compliant?",
        answer: "Absolutely. All EgSwitchGear panels are designed and tested according to IEC 61439-1 & 2 standards for safety and performance."
    },
    {
        question: "How often should I service my electrical panels?",
        answer: "We recommend a comprehensive maintenance check every 6 to 12 months, depending on the environment (dust, humidity) and load conditions."
    },
    {
        question: "What is IP rating and why does it matter?",
        answer: "IP (Ingress Protection) rating defines a panel's resistance to dust and water. IP54 is suitable for most indoor industrial use, while IP65 is recommended for outdoor applications."
    }
];

export const technicalGuides: ResourceItem[] = [
    {
        title: "Guide to Selecting the Right PFI Plant",
        description: "Learn how to calculate the required KVAR to improve your power factor and avoid penalties.",
        downloadUrl: "#",
        type: "Guide"
    },
    {
        title: "Understanding ATS/AMF Logic",
        description: "A deep dive into how automatic transfer switches ensure uninterrupted power.",
        downloadUrl: "#",
        type: "Guide"
    }
];

export const manuals: ResourceItem[] = [
    {
        title: "LT Panel Installation Manual",
        description: "Step-by-step instructions for installing and wiring our standard LT Panels.",
        downloadUrl: "#",
        type: "Manual"
    },
    {
        title: "VFD Parameter Setup",
        description: "Quick reference for programming Danfoss and Siemens VFDs used in our panels.",
        downloadUrl: "#",
        type: "Manual"
    }
];

export const safetyGuidelines: ResourceItem[] = [
    {
        title: "Electrical Safety Handbook",
        description: "Essential safety protocols for maintaining and operating high-voltage equipment.",
        downloadUrl: "#",
        type: "Safety"
    },
    {
        title: "Arc Flash Prevention",
        description: "Best practices to minimize arc flash risks in industrial switchgear rooms.",
        downloadUrl: "#",
        type: "Safety"
    }
];

export const maintenanceChecklists: ResourceItem[] = [
    {
        title: "Monthly Maintenance Checklist",
        description: "A printable PDF checklist for routine visual inspections and meter readings.",
        downloadUrl: "#",
        type: "Checklist"
    },
    {
        title: "Annual Shutdown Maintenance",
        description: "Comprehensive protocol for cleaning, tightening, and testing during planned shutdowns.",
        downloadUrl: "#",
        type: "Checklist"
    }
];
