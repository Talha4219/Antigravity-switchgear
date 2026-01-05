
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container py-16 md:py-24">
            <div className="space-y-4 mb-12 text-center">
                <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto" />
                <Skeleton className="h-6 w-full md:w-2/3 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="h-full flex flex-col">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-6 w-3/4" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <Skeleton className="h-20 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
