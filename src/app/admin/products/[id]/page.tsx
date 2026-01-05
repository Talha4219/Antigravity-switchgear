'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        specs: '',
        applications: '',
        imageId: '',
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`/api/products/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setFormData({
                    ...data,
                    applications: Array.isArray(data.applications) ? data.applications.join(', ') : data.applications
                });
            } catch (error) {
                console.error(error);
                alert('Failed to load product');
                router.push('/admin/products');
            } finally {
                setDataLoading(false);
            }
        }
        fetchProduct();
    }, [params.id, router]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    applications: formData.applications.split(',').map(app => app.trim()),
                }),
            });

            if (!res.ok) throw new Error('Failed to update product');

            router.push('/admin/products');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (dataLoading) {
        return <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Product</CardTitle>
                <CardDescription>Update product details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" value={formData.name} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specs">Specifications</Label>
                        <Input id="specs" value={formData.specs} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="applications">Applications (comma separated)</Label>
                        <Input id="applications" value={formData.applications} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageId">Image ID / URL</Label>
                        <Input id="imageId" value={formData.imageId} required onChange={handleChange} />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Product
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
