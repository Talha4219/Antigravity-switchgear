
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="bg-muted p-6 rounded-full mb-8">
                <FileQuestion className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
                404 - Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/">Back to Home</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/products">Browse Products</Link>
                </Button>
            </div>
        </div>
    );
}
