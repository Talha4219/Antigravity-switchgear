'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type CalculatorWrapperProps = {
    title: string;
    description: React.ReactNode;
    formula: React.ReactNode;
    children: React.ReactNode;
};

export default function CalculatorWrapper({ title, description, formula, children }: CalculatorWrapperProps) {
    return (
        <>
            <section className="bg-primary text-primary-foreground">
                <div className="container py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">{title}</h1>
                    <div className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto prose dark:prose-invert">
                        {description}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container max-w-4xl">
                    <div className="flex flex-col gap-8 items-stretch">
                        <Card>
                            <CardHeader>
                                <CardTitle>Calculator</CardTitle>
                                <CardDescription>Enter the values below to calculate the result.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {children}
                            </CardContent>
                        </Card>
                        <Card className="bg-secondary">
                            <CardHeader>
                                <CardTitle>Formula</CardTitle>
                                <CardDescription>The formula used for this calculation.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 bg-muted rounded-md text-sm text-center font-mono text-muted-foreground overflow-x-auto">
                                    {formula}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}
