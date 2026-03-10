import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search Our Technical Solutions | EgSwitchGear',
    description: 'Search for products, technical guides, industrial solutions, and company insights across the EgSwitchGear platform.',
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
