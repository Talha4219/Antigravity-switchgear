import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Industry Insights & Engineering Blog | EgSwitchGear',
    description: 'Stay updated with the latest trends in power distribution, industrial automation, and electrical safety standards from the EgSwitchGear experts.',
    keywords: ['electrical engineering blog', 'switchgear industry news', 'power distribution trends', 'automation insights', 'technical articles Pakistan'],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
