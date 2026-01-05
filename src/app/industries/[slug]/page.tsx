
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustryList } from '@/lib/industry-data';
import { IndustryView } from '@/components/industry-view';

interface IndustryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const industry = getIndustryBySlug(resolvedParams.slug);

    if (!industry) {
        return {
            title: 'Industry Solution Not Found | EgSwitchGear',
        };
    }

    return {
        title: `${industry.title} | EgSwitchGear`,
        description: industry.shortDescription,
        keywords: industry.keywords,
        openGraph: {
            title: industry.title,
            description: industry.shortDescription,
            type: 'article',
            images: [
                {
                    url: industry.heroImage, // Ensure this fallback or actual image logic is robust
                    width: 1200,
                    height: 630,
                    alt: industry.title,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    const industries = getIndustryList();
    return industries.map((industry) => ({
        slug: industry.slug,
    }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
    const resolvedParams = await params;
    const industry = getIndustryBySlug(resolvedParams.slug);

    if (!industry) {
        notFound();
    }

    return <IndustryView industry={industry} />;
}
