
import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, BookOpen, ShieldAlert, Wrench } from 'lucide-react';
import { faqs, technicalGuides, manuals, safetyGuidelines, maintenanceChecklists } from '@/lib/knowledge-data';

export const metadata: Metadata = {
    title: 'Knowledge Hub & Resources | EgSwitchGear',
    description: 'Access technical guides, installation manuals, safety guidelines, and FAQs about industrial switchgear and power distribution.',
    keywords: ['Electrical FAQ', 'Switchgear Manuals', 'Electrical Safety Guidelines', 'Maintenance Checklist', 'EgSwitchGear Resources'],
};

export default function ResourcesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="bg-muted/40 py-20">
                <div className="container text-center max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Knowledge Hub</h1>
                    <p className="text-xl text-muted-foreground text-balance">
                        Your centralized resource for technical documentation, safety protocols, and expert answers.
                    </p>
                </div>
            </section>

            <div className="container py-16 space-y-24">

                {/* FAQs */}
                <section id="faqs" className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Common queries about our products and services.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`}>
                                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                {/* Resources Grid */}
                <section id="downloads">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Technical Resources</h2>
                        <p className="text-muted-foreground">Download generic guides and manuals.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">

                        {/* Tech Guides */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-6 w-6 text-primary" /> Technical Guides
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {technicalGuides.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start group">
                                        <div>
                                            <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="shrink-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Manuals */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-blue-600" /> Installation Manuals
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {manuals.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start group">
                                        <div>
                                            <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="shrink-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Safety */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldAlert className="h-6 w-6 text-red-600" /> Safety Guidelines
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {safetyGuidelines.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start group">
                                        <div>
                                            <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="shrink-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Maintenance */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wrench className="h-6 w-6 text-orange-600" /> Maintenance Checklists
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {maintenanceChecklists.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start group">
                                        <div>
                                            <h4 className="font-semibold group-hover:text-primary transition-colors">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="shrink-0">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                    </div>
                </section>

                {/* CTA */}
                <section className="bg-card border rounded-2xl p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
                    <p className="text-muted-foreground mb-8">Our support team is available 24/7 to answer your specific technical queries.</p>
                    <Button size="lg" asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </section>

            </div>
        </div>
    );
}
