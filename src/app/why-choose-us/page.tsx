import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Trophy, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Why Choose EgSwitchGear? | Best Electrical Panel Manufacturer in Pakistan',
    description: 'Compare EgSwitchGear against other local and imported switchgear suppliers. We offer certified quality, competitive pricing, and 24/7 support.',
    keywords: ['EgSwitchGear vs Competitors', 'Best Switchgear Pakistan', 'Certified Panel Builder', 'Schneider Electric Partner'],
};

export default function WhyChooseUsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-muted/40 py-20 md:py-32">
                <div className="container text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Why Leading Industries Trust <span className="text-primary">EgSwitchGear</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-10 text-balance">
                        We don't just build electrical panels; we engineer peace of mind. Discover the difference certified quality makes for your business.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="h-12 px-8 text-lg">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                            <Link href="/projects">View Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Trust Signals Grid */}
            <section className="py-20 container">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader>
                            <ShieldCheck className="w-12 h-12 text-primary mb-2" />
                            <CardTitle>ISO Certified</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Manufacturing processes compliant with ISO 9001:2015 quality standards.
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader>
                            <BadgeCheck className="w-12 h-12 text-primary mb-2" />
                            <CardTitle>IEC Compliant</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            All panels designed and tested according to IEC 61439-1 & 2 safety norms.
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader>
                            <Trophy className="w-12 h-12 text-primary mb-2" />
                            <CardTitle>20+ Years</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Two decades of excellence in serving Pakistan's industrial sector.
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-primary/20">
                        <CardHeader>
                            <CheckCircle2 className="w-12 h-12 text-primary mb-2" />
                            <CardTitle>Genuine Parts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Direct partner with global brands like Schneider, Siemens, and Terasaki.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Competitor Comparison Table */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The EgSwitchGear Advantage</h2>
                        <p className="text-muted-foreground text-lg">How we stack up against the competition.</p>
                    </div>

                    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[30%] text-lg">Feature</TableHead>
                                    <TableHead className="text-lg font-bold text-primary">EgSwitchGear</TableHead>
                                    <TableHead className="text-lg">Generic Local Assembler</TableHead>
                                    <TableHead className="text-lg">Check Imported</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Component Authenticity</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">100% Genuine (Verifiable)</TableCell>
                                    <TableCell className="text-muted-foreground">Often Counterfeit/Refurbished</TableCell>
                                    <TableCell className="text-muted-foreground">Genuine</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Design Standard</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">IEC 61439 Form 2/4</TableCell>
                                    <TableCell className="text-muted-foreground">Non-Standard / Basic</TableCell>
                                    <TableCell className="text-muted-foreground">Standard</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Customization</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">Fully Tailored Dimensions</TableCell>
                                    <TableCell className="text-muted-foreground">Limited</TableCell>
                                    <TableCell className="text-muted-foreground">Standard Sizes Only</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Busbar Material</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">99.9% Electrolytic Copper</TableCell>
                                    <TableCell className="text-muted-foreground">Impure Copper / Mixed</TableCell>
                                    <TableCell className="text-muted-foreground">Copper / Aluminum</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">After-Sales Support</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">24/7 Local Team (Karachi/Lahore)</TableCell>
                                    <TableCell className="text-muted-foreground">Unreliable</TableCell>
                                    <TableCell className="text-muted-foreground">No Local Presence</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Pricing</TableCell>
                                    <TableCell className="text-green-600 font-semibold bg-green-50 dark:bg-green-900/10">Competitive</TableCell>
                                    <TableCell className="text-muted-foreground">Cheap</TableCell>
                                    <TableCell className="text-muted-foreground">Very Expensive</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>

            {/* Trusted Brands Section */}
            <section className="py-16 container">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold mb-4">Official Partners & Brands</h3>
                    <p className="text-muted-foreground">We use only genuine, authorized components from global leaders.</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Using text representations styled as logos for now, replace with actual SVGs/Images */}
                    <div className="text-2xl font-bold text-slate-700">Schneider Electric</div>
                    <div className="text-2xl font-bold text-teal-700">SIEMENS</div>
                    <div className="text-2xl font-bold text-red-600">ABB</div>
                    <div className="text-2xl font-bold text-blue-700">TERASAKI</div>
                    <div className="text-2xl font-bold text-blue-600">Legrand</div>
                    <div className="text-2xl font-bold text-red-500">MITSUBISHI</div>
                </div>
            </section>

            {/* Quality Assurance Process */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Quality Assurance Process</h2>
                        <p className="text-muted-foreground text-lg">Every panel undergoes a rigorous 4-stage inspection before dispatch.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2" />

                        <div className="bg-background border rounded-lg p-6 relative">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">1</div>
                            <h4 className="font-bold text-lg mb-2">Design Audit</h4>
                            <p className="text-sm text-muted-foreground">CAD drawings verified against load calculations and IEC standards.</p>
                        </div>
                        <div className="bg-background border rounded-lg p-6 relative">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">2</div>
                            <h4 className="font-bold text-lg mb-2">Fabrication Check</h4>
                            <p className="text-sm text-muted-foreground">Sheet metal gauge, powder coating thickness (microns), and structural integrity check.</p>
                        </div>
                        <div className="bg-background border rounded-lg p-6 relative">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">3</div>
                            <h4 className="font-bold text-lg mb-2">Component Testing</h4>
                            <p className="text-sm text-muted-foreground">Insulation Resistance (IR), High Voltage (HV) Injection, and Continuity testing.</p>
                        </div>
                        <div className="bg-background border rounded-lg p-6 relative">
                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto md:mx-0 relative z-10">4</div>
                            <h4 className="font-bold text-lg mb-2">Final Commissioning</h4>
                            <p className="text-sm text-muted-foreground">Functional tests of interlocks, relays, and meters under simulated load.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 container text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to upgrade your infrastructure?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join hundreds of satisfied industrial clients who trust EgSwitchGear for their power distribution needs.
                </p>
                <Button size="xl" className="text-lg px-10 h-14">
                    <Link href="/contact">Contact Our Engineers</Link>
                </Button>
            </section>
        </div>
    );
}
