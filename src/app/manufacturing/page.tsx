import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Factory, Cpu, Zap, Timer, Sliders } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
    title: 'Largest CNC Laser Cutting Machine in the Region | EG Switchgear',
    description: 'EG Switchgear operates the largest CNC laser cutting machine in the region, delivering high-precision, fast, and reliable switchgear manufacturing solutions.',
    keywords: [
        'largest cnc laser cutting machine', 'cnc laser cutting switchgear',
        'switchgear manufacturing facility', 'precision metal fabrication',
        'evergreen switchgear', 'eg switchgear'
    ],
};

export default function ManufacturingPage() {
    const advantages = [
        {
            title: 'High-Precision',
            description: 'CNC laser cutting for switchgear panels with microns-level accuracy.',
            icon: Cpu,
        },
        {
            title: 'Large Format',
            description: 'Ability to process large-format metal sheets for industrial enclosures.',
            icon: Sliders,
        },
        {
            title: 'Superior Quality',
            description: 'Exceptional edge quality and dimensional accuracy on every cut.',
            icon: Zap,
        },
        {
            title: 'Efficiency',
            description: 'Reduced material wastage and optimized manufacturing workflows.',
            icon: Timer,
        },
        {
            title: 'Speed',
            description: 'Faster manufacturing and project delivery timelines for EPC clients.',
            icon: Factory,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Advanced Manufacturing Facility with the Largest CNC Laser Cutting Machine in the Region
                        </h1>
                        <p className="mt-6 text-xl text-white/80 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                            Setting new benchmarks in switchgear fabrication with state-of-the-art precision technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-background">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-headline font-bold text-primary mb-6">Manufacturing Excellence at Evergreen Switchgear</h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
                                    <p>
                                        Evergreen Switchgear (EG Switchgear) operates a state-of-the-art switchgear manufacturing facility equipped with the largest CNC laser cutting machine in the region. This advanced capability allows us to deliver high-precision electrical switchgear components, superior build quality, and faster production turnaround for industrial and commercial power distribution projects.
                                    </p>
                                    <p>
                                        Our investment in advanced CNC technology reinforces our commitment to quality, innovation, and reliable electrical switchgear manufacturing.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-headline font-bold text-primary mb-6">Largest CNC Laser Cutting Machine for Precision Fabrication</h2>
                                <p className="text-foreground/80 leading-relaxed mb-6">
                                    The largest CNC laser cutting machine at EG Switchgear enables accurate cutting of complex metal components used in low voltage and medium voltage switchgear, control panels, and electrical enclosures. With exceptional cutting speed and precision, we ensure consistent quality across all switchgear products.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                    {advantages.map((adv) => (
                                        <Card key={adv.title} className="border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                                            <CardContent className="p-4 flex gap-4">
                                                <div className="bg-primary/10 p-2 rounded-lg h-fit">
                                                    <adv.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm">{adv.title}</h3>
                                                    <p className="text-xs text-muted-foreground mt-1">{adv.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                                <h3 className="text-2xl font-headline font-bold text-primary mb-6">Enhancing Switchgear Quality & Performance</h3>
                                <p className="text-foreground/80 leading-relaxed mb-6">
                                    Our CNC laser cutting facility directly enhances the performance, safety, and reliability of our electrical switchgear solutions. Precision-cut components ensure:
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        'Perfect fitment and assembly',
                                        'Improved electrical safety standards',
                                        'Enhanced durability and mechanical strength',
                                        'Long-term operational reliability'
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-foreground/80">
                                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-[#0B1221] text-white p-8 rounded-3xl shadow-2xl">
                                <h3 className="text-2xl font-headline font-bold mb-6">Scalable & Customized Solutions</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    The largest CNC laser cutting machine allows Evergreen Switchgear to support everything from high-volume production to time-sensitive power distribution requirements.
                                </p>
                                <div className="grid gap-3">
                                    {[
                                        'High-volume switchgear production',
                                        'Customized switchgear panel designs',
                                        'Complex industrial and infrastructure projects',
                                        'Time-sensitive power distribution requirements'
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-3 text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-16 bg-muted/30">
                <div className="container text-center max-w-4xl">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-12">Why Choose EG Switchgear’s Manufacturing Facility</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            'Leading switchgear manufacturing company',
                            'Largest CNC laser cutting machine in the region',
                            'Advanced precision metal fabrication',
                            'Compliance with international electrical standards',
                            'Reliable delivery and technical support'
                        ].map((item) => (
                            <div key={item} className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border flex flex-col items-center gap-4">
                                <CheckCircle className="h-8 w-8 text-primary" />
                                <p className="font-semibold text-sm leading-tight">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-background text-center">
                <div className="container max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Powering the Future with Advanced Manufacturing</h2>
                    <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                        At Evergreen Switchgear (EG Switchgear), our advanced manufacturing facility is designed to support the future of safe, efficient, and sustainable power distribution systems.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="rounded-full px-8">
                            <Link href="/contact">Visit Our Facility</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                            <Link href="/products">Explore Products</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
