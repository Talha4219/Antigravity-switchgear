import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Electrical Engineering Calculators',
    description: 'Professional electrical engineering calculators for cable sizing, voltage drop, arc flash analysis, and power factor correction. Optimized for NEC and IEC standards.',
    keywords: [
        'electrical calculators', 'cable sizing tool Pakistan', 'voltage drop calculator',
        'arc flash analysis tool', 'load calculation switchgear', 'power factor calculator',
        'switchgear rating calculation', 'electrical switchgear cost estimate',
        'electric cable capacity calculator', 'cable ratings calculator', 'busbar calculator',
        'domestic cable size calculator', 'EgSwitchGear calculators'
    ],
    alternates: {
        canonical: 'https://www.egswitchgear.com/calculators',
    },
};

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
