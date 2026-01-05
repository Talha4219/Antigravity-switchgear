
'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container py-16 md:py-24">
            <div className="space-y-4 mb-8">
                <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto" />
                <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="flex flex-col overflow-hidden h-full">
                        <CardHeader className="p-0 border-b">
                            <Skeleton className="h-56 w-full" />
                        </CardHeader>
                        <CardContent className="flex-grow pt-6 space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <div className="flex gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <Skeleton className="h-16 w-full" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 pb-6">
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
