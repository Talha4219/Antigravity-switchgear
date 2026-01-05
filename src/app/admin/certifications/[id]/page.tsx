'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function EditCertificationPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        issuingBody: '',
        description: '',
        imageId: '',
    });

    useEffect(() => {
        async function fetchCertification() {
            try {
                const res = await fetch(`/api/certifications/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setFormData(data);
            } catch (error) {
                console.error(error);
                alert('Failed to load certification');
                router.push('/admin/certifications');
            } finally {
                setDataLoading(false);
            }
        }
        fetchCertification();
    }, [params.id, router]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/certifications/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to update certification');

            router.push('/admin/certifications');
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
                <CardTitle>Edit Certification</CardTitle>
                <CardDescription>Update certification details.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Certification Name</Label>
                        <Input id="name" value={formData.name} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="issuingBody">Issuing Body</Label>
                        <Input id="issuingBody" value={formData.issuingBody} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} required onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageId">Image ID / URL</Label>
                        <Input id="imageId" value={formData.imageId} required onChange={handleChange} />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Certification
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
