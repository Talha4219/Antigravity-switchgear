'use client';

import { CategoryForm } from '@/components/admin/category-form';
import { useData } from '@/hooks/use-data';
import { Loader2 } from 'lucide-react';
import { use } from 'react';

// Next.js 15: params is a promise
export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: category, isLoading } = useData<any>(`/api/categories/${id}`);

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Category</h2>
                <p className="text-muted-foreground">
                    Update category details and SEO content.
                </p>
            </div>
            <CategoryForm initialData={category} />
        </div>
    );
}
