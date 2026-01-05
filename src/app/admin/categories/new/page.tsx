'use client';

import { CategoryForm } from '@/components/admin/category-form';

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Create Category</h2>
                <p className="text-muted-foreground">
                    Add a new product category with SEO content.
                </p>
            </div>
            <CategoryForm />
        </div>
    );
}
