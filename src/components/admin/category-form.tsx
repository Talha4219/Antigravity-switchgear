'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters'),
    description: z.string().optional(),
    content: z.string().optional(),
    level: z.string().optional(), // Handled as string in form, converted to number
    parentCategory: z.string().optional(),
    keywords: z.string().optional(), // Comma separated string
});

interface CategoryFormProps {
    initialData?: any;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || '',
            slug: initialData?.slug || '',
            description: initialData?.description || '',
            content: initialData?.content || '',
            level: initialData?.level?.toString() || '0',
            parentCategory: initialData?.parentCategory || '',
            keywords: initialData?.keywords?.join(', ') || '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const url = initialData
                ? `/api/categories/${initialData._id}`
                : '/api/categories';
            const method = initialData ? 'PUT' : 'POST';

            const formattedValues = {
                ...values,
                level: parseInt(values.level || '0'),
                keywords: values.keywords?.split(',').map((k) => k.trim()).filter(Boolean) || [],
            };

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedValues),
            });

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            toast({
                title: 'Success',
                description: `Category ${initialData ? 'updated' : 'created'} successfully`,
            });

            router.push('/admin/categories');
            router.refresh();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Category Name (e.g. LT Panels)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="slug-name (e.g. lt-panels)" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Unique identifier for URLs.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Level</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0">Main Category (0)</SelectItem>
                                                    <SelectItem value="1">Sub Category (1)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parentCategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parent Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="parent-slug" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Required for Sub Categories.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description (SEO)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Meta description for search engines..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="keywords"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Keywords</FormLabel>
                                        <FormControl>
                                            <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Comma separated list of SEO keywords.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Big Content Editor */}
                <Card>
                    <CardContent className="pt-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold">"SEO Expert" Content (HTML Supported)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="<h1>Title</h1><p>Rich description...</p>"
                                            className="min-h-[400px] font-mono text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This content will be displayed at the top of the category page. Use standard HTML tags (h1, h2, p, ul, li) for formatting.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? 'Update Category' : 'Create Category'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
