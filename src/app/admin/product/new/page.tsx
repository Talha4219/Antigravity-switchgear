'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const productSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    shortDescription: z.string().optional(),
    specs: z.string().min(10, 'Specifications must be at least 10 characters'),
    applications: z.string().min(2, 'At least one application is required'),
    imageId: z.string().min(2, 'Image URL/ID is required'),
    category: z.string().min(2, 'Category is required'),
    subCategory: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: '',
            description: '',
            shortDescription: '',
            specs: '',
            applications: '',
            imageId: '',
            category: '',
            subCategory: '',
        },
    });

    async function onSubmit(data: ProductFormValues) {
        setIsLoading(true);
        try {
            // Convert comma-separated applications string to array
            const formattedData = {
                ...data,
                applications: data.applications.split(',').map((item) => item.trim()),
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            toast({
                title: 'Success',
                description: 'Product created successfully',
            });

            router.push('/admin/products');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container py-10 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                        Enter the information for the new product.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 100kVA Transformer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="imageId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image URL / ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="/images/products/transformer.jpg" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Path to the image in public folder or external URL
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <select
                                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    {...field}
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="LT Panels">LT Panels</option>
                                                    <option value="HT Panels">HT Panels</option>
                                                    <option value="PFI Plant">PFI Plant</option>
                                                    <option value="Cable Trays">Cable Trays</option>
                                                    <option value="Solar Systems">Solar Systems</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sub-Category (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Distribution" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overview / Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Detailed description of the product..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Technical Specifications</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Voltage: 220V&#10;Current: 10A&#10;Material: Steel"
                                                className="min-h-[150px] font-mono text-sm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Use new lines for each specification requirement.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="applications"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Applications</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Industrial, Commercial, Residential (Comma separated)" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Separate multiple applications with commas.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-4">
                                <Button variant="outline" type="button" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Create Product
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
