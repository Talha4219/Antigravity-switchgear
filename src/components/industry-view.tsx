
import Image from 'next/image';
import Link from 'next/link';
import { IndustryData } from '@/lib/industry-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IndustryViewProps {
    industry: IndustryData;
}

export function IndustryView({ industry }: IndustryViewProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: industry.title,
        description: industry.shortDescription,
        provider: {
            '@type': 'Organization',
            name: 'EgSwitchGear',
            url: 'https://www.egswitchgear.com'
        },
        areaServed: {
            '@type': 'Country',
            name: 'Pakistan'
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Related Products',
            itemListElement: industry.recommendedProducts.map((prod, index) => ({
                '@type': 'Offer',
                position: index + 1,
                itemOffered: {
                    '@type': 'Product',
                    name: prod.title,
                    url: `https://www.egswitchgear.com/products/${prod.slug}`
                }
            }))
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative bg-muted/30 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider">
                            Industry Solution
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
                            {industry.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
                            {industry.shortDescription}
                        </p>
                        <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all" asChild>
                            <Link href="/contact">
                                Consult an Expert <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </section>

            <div className="container py-16 lg:py-24 space-y-20">

                {/* Overview & content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Expert Power Solutions</h2>
                        <div
                            className="prose prose-lg dark:prose-invert text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: industry.overview }}
                        />
                    </div>

                    {/* Challenges Section */}
                    <div className="bg-muted/50 rounded-2xl p-8 border border-border/50">
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="h-8 w-1 bg-primary rounded-full" />
                            Key Challenges We Solve
                        </h3>
                        <ul className="space-y-4">
                            {industry.challenges.map((challenge, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <div className="mt-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full p-1 flex-shrink-0">
                                        <span className="sr-only">Challenge</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm md:text-base">{challenge}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Our Approach / Solutions */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Our Engineering Approach</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            How EgSwitchGear delivers reliability and safety for {industry.title.split('for ')[1] || 'your industry'}.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {industry.solutions.map((sol, idx) => (
                            <Card key={idx} className="border-border/60 hover:border-primary/50 transition-colors shadow-sm bg-card/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        {sol.split(':')[0]}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {sol.split(':')[1] || sol}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recommended Products */}
                <div className="bg-secondary/20 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Recommended Equipment</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {industry.recommendedProducts.map((prod, idx) => (
                            <Link key={idx} href={`/products/${prod.slug}`} className="group block">
                                <div className="bg-background border rounded-xl p-6 h-full hover:shadow-md transition-all group-hover:border-primary/50 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{prod.title}</h4>
                                        <p className="text-sm text-muted-foreground">View Specifications</p>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <div className="rounded-full bg-secondary p-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a custom solution?</h2>
                        <p className="text-lg text-primary-foreground/90 mb-10 text-balance">
                            Our engineering team is ready to audit your requirements and design a tailored electrical infrastructure for your project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="xl" variant="secondary" className="text-primary font-semibold text-lg px-8" asChild>
                                <Link href="/contact">Request a Proposal</Link>
                            </Button>
                            <Button size="xl" variant="outline" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 text-lg px-8">
                                <Link href="/products">Browse All Products</Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
