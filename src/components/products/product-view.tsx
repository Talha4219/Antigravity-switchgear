'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, FileDown, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { useQuoteDialog } from '@/components/conversion/quote-dialog-provider';
import { Product } from '@/models/Product'; // Assuming type import

interface ProductViewProps {
    product: Product;
    nextProduct?: Product | null;
    prevProduct?: Product | null;
}

export function StaticProductView({ product, nextProduct, prevProduct }: ProductViewProps) {
    const { openQuoteDialog } = useQuoteDialog();

    // Basic JSON-LD for Product
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.shortDescription,
        // image: product.images?.[0] || 'https://egswitchgear.com/og-image.jpg',
        brand: {
            '@type': 'Brand',
            name: 'EgSwitchgear'
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'PKR',
            price: '0' // Request for Quote
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative bg-muted/30 pt-12 pb-20 md:pt-20 md:pb-24 border-b">
                <div className="container grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div>
                            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Industrial Standard</Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                                {product.title}
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {product.shortDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                size="lg"
                                className="text-lg px-8 shadow-lg shadow-primary/25"
                                onClick={() => openQuoteDialog(`Inquiry about ${product.title}`)}
                            >
                                Get a Query <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 border-2"
                                onClick={() => openQuoteDialog(`Datasheet Request: ${product.title}`)}
                            >
                                <FileDown className="mr-2 h-5 w-5" /> Download Datasheet
                            </Button>
                        </div>
                    </div>
                    {/* Dynamic Image Handling */}
                    <div className="flex items-center justify-center bg-white rounded-xl overflow-hidden shadow-lg border relative aspect-video md:aspect-square">
                        {/* 
                           We check if imageId is a path (contains /) or an ID.
                           Static data uses imageUrl in imageId prop now (mapped in page.tsx). 
                        */}
                        <img
                            // src={product.imageId}
                            src={product.imageId && (product.imageId.startsWith('/') || product.imageId.startsWith('http')) ? product.imageId : '/placeholder-product.jpg'}
                            alt={product.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </section>

            {/* Content & Sidebar Grid */}
            <div className="container py-12 md:py-20">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Product Overview</h2>
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: product.description }} // Description now contains HTML from static data overview
                            />
                        </section>

                        {/* Specifications (Example Table) */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
                            <div className="rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                        <tr>
                                            <th className="px-6 py-3">Parameter</th>
                                            <th className="px-6 py-3">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* If specs is a string (DB) vs object (Static) - simplified text for now */}
                                        <tr className="bg-background border-b">
                                            <td className="px-6 py-4 font-medium text-foreground">Details</td>
                                            <td className="px-6 py-4 text-muted-foreground">{product.specs}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4 text-primary">Manufacturing Excellence</h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    All our panels are fabricated using the <strong>largest CNC laser cutting facility in the region</strong> for precision fitment and superior quality.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full border-primary/20 text-primary hover:bg-primary/5 group"
                                    asChild
                                >
                                    <Link href="/manufacturing" className="flex items-center justify-center gap-2">
                                        View Our Facility <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </div>

                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                            <CardContent className="pt-6">
                                <h3 className="text-lg font-semibold mb-4">Need Technical Help?</h3>
                                <p className="text-sm text-muted-foreground mb-4 font-normal">
                                    Our engineers are available to assist with load calculations and design.
                                </p>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => openQuoteDialog(`Technical Support: ${product.title}`)}
                                >
                                    <Phone className="mr-2 h-4 w-4" /> Contact Engineers
                                </Button>
                            </CardContent>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating CTA */}
            <section className="bg-primary text-primary-foreground py-12 md:py-16">
                <div className="container text-center space-y-6">
                    <h2 className="text-3xl font-bold">Ready to Upgrade Your Power Infrastructure?</h2>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                        Get a customized quote for {product.title} today. Fast delivery and installation across Pakistan.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="px-8 font-bold text-primary"
                            onClick={() => openQuoteDialog(`Quote for ${product.title}`)}
                        >
                            Get a Quote Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Navigation Footer */}
            <div className="border-t">
                <div className="container flex justify-between py-8">
                    {prevProduct ? (
                        <Link href={`/products/${prevProduct.slug}`} className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <div className="text-left">
                                <div className="text-xs font-medium">Previous</div>
                                <div className="text-sm font-semibold text-foreground group-hover:text-primary">{prevProduct.title}</div>
                            </div>
                        </Link>
                    ) : (<div />)}

                    {nextProduct ? (
                        <Link href={`/products/${nextProduct.slug}`} className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-right">
                            <div className="text-right">
                                <div className="text-xs font-medium">Next</div>
                                <div className="text-sm font-semibold text-foreground group-hover:text-primary">{nextProduct.title}</div>
                            </div>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : (<div />)}
                </div>
            </div>
        </div >
    );
}
