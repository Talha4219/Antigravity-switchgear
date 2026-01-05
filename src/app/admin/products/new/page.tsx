'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    specs: '',
    applications: '',
    imageId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          applications: formData.applications.split(',').map(app => app.trim()), // Convert comma-separated string to array
        }),
      });

      if (!res.ok) throw new Error('Failed to create product');

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Enter product details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="e.g. Industrial Switchgear" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Product description" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specs">Specifications</Label>
            <Input id="specs" placeholder="e.g. 415V, 800A" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applications">Applications (comma separated)</Label>
            <Input id="applications" placeholder="e.g. Industrial, Commercial, Residential" required onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Product Image</Label>
            <ImageUpload
              value={formData.imageId}
              onChange={(url) => setFormData({ ...formData, imageId: url })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Product
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
